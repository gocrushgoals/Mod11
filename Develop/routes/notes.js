// Import the necessary modules
import express from 'express';
import bodyParser from 'body-parser';

// Initialize the express app
const app = express();
app.use(bodyParser.json());

// Define routes for your application in routes/notes.js. You'll need routes for:
// - Landing page
// - Notes page
// - Saving a new note
// - Clearing the form
// - Retrieving existing notes

// Import the routes
import notesRoutes from './routes/notes';

// Use the routes
app.use('/notes', notesRoutes);

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});