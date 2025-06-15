const express = require('express');
const cors = require('cors')
const connectDB = require('./connect');
const { loginUser } = require('./controllers/authController');

const app = express();
app.use(cors()) 
const PORT = 3000;

app.use(express.json());

connectDB();

app.post('/login', loginUser);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
