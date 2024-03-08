// Import necessary modules
import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

//  environment variables
dotenv.config();
console.log(process.env.MONGODB_URI);

// Initialize Express app

const app = express();
const PORT = process.env.PORT ;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI!, {
});

//  Movie schema
interface Movie {
  title: string;
  genre: string;
  rating: number;
  streamingLink: string;
}

const movieSchema = new mongoose.Schema<Movie>({
  title: { type: String, required: true },
  genre: { type: String, required: true },
  rating: { type: Number, required: true },
  streamingLink: { type: String, required: true },
});

const MovieModel = mongoose.model<Movie>("Movie", movieSchema);

// Middleware to check admin role
const checkAdminRole = (req: Request, res: Response, next: NextFunction) => {
  const isAdmin = req.headers["admin"] === "true";
  if (!isAdmin) {
    return res.status(403).json({ error: "Unauthorized" });
  }
  next();
};
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to the Movies World ');
});

// Routes
app.get("/movies", async (req, res) => {
  try {
    const movies = await MovieModel.find();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/search", async (req, res) => {
  try {
    const query = req.query.q;
    const movies = await MovieModel.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { genre: { $regex: query, $options: "i" } },
      ],
    });
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/movies", checkAdminRole, async (req, res) => {
  try {
    const { title, genre, rating, streamingLink } = req.body;
    const movie = new MovieModel({ title, genre, rating, streamingLink });
    await movie.save();
    res.status(201).json(movie);
  } catch (error) {
    res.status(400).json({ error: "Bad Request" });
  }
});

app.put("/movies/:id", checkAdminRole, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, genre, rating, streamingLink } = req.body;
    const updatedMovie = await MovieModel.findByIdAndUpdate(
      id,
      { title, genre, rating, streamingLink },
      { new: true }
    );
    if (!updatedMovie) {
      return res.status(404).json({ error: "Movie not found" });
    }
    res.json(updatedMovie);
  } catch (error) {
    res.status(400).json({ error: "Bad Request" });
  }
});

app.delete("/movies/:id", checkAdminRole, async (req, res) => {
  try {
    const { id } = req.params;
    const deletedMovie = await MovieModel.findByIdAndDelete(id);
    if (!deletedMovie) {
      return res.status(404).json({ error: "Movie not found" });
    }
    res.json({ message: "Movie deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the server


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
