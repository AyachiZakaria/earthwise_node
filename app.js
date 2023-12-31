const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const quizRoutes = require('./routes/quizRoutes');
const myroutes = require('./routes/myroutes');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swaggerConfig');
const path = require('path');  // Keep the path module for manipulating file paths
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 3000;

// Remove the declaration of __dirname here

app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());
app.use('/gifs', express.static('assets'));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// Use Quiz Routes
app.use('/api/quiz', quizRoutes);
app.use('/api', myroutes);

// Use __dirname directly in the following routes
app.get('/api/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build/index.html'), function (err) {
    if (err) {
      res.status(500).send(err);
      console.log(err);
    }
  });
});

app.use('/public/images', express.static(path.join(__dirname, 'public/images')));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
