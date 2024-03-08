# Movie Lobby API

This repository contains the code for a Movie Lobby API built with Node.js, Express, TypeScript, and MongoDB. The API allows users to manage a collection of movies, including listing movies, searching for movies, adding new movies, updating existing movie information, and deleting movies.

# Prerequisites-

    Before running the API, ensure you have the following installed on your local machine:

    Node.js (https://nodejs.org/)
    MongoDB (https://www.mongodb.com/)

# Steps-

1.     Clone the repository to  local machine.
2.     Navigate to the project directory: cd src.
3.     Install required dependencies by running npm install express mongoose dotenv @types/express @types/mongoose.
4.     Save the given code as index.ts.
5.     Compile TypeScript to JavaScript by running tsc command in the terminal.
6.     Run the compiled JavaScript file using Node.js by running node index.js.
7.     The API will be accessible at http://localhost:3000.

# API Endpoints-
    GET /movies: List all movies in the lobby
    GET /search?q={query}: Search for a movie by title or genre
    POST /movies: Add a new movie to the lobby (requires "admin" role)
    PUT /movies/:id: Update an existing movie's information (requires "admin" role)
    DELETE /movies/:id: Delete a movie from the lobby (requires "admin" role)

# Testing-
    Done using Postman.
