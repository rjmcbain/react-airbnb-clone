const express = require("express");

const app = express();

app.get("/rentals", function(req, res) {
  res.json({ success: true });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, function() {
  console.log(`Server is running on port ${PORT}`);
});
