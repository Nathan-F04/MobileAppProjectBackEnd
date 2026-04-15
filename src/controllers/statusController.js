// src/controllers/statusController.js
export const getStatus = (req, res) => {
  res.json({
    status: "Online",
    message: "AWS Backend is reachable!",
    owner: "Nathan Ferry",
    timestamp: new Date()
  });
};