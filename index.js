const express = require('express');
const cors = require('cors');
const app = express();
//const PORT = 3000;
const PORT = 80;

app.use(cors()); // Allow mobile app requests
app.use(express.json());

app.get('/api/status', (req, res) => {
  res.json({ message: "AWS Backend is reachable from Galway!" });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at http://34.252.254.167:${PORT}`);
});