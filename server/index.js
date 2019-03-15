const express = require("express");
const mongoose = require("mongoose");
const config = require("./config/dev");
const Rental = require("./models/rental");
const FakeDb = require("./models/fake-db");

const rentalRoutes = require("./routes/rentals");

mongoose
  .connect(config.DB_URI, { useNewUrlParser: true })
  .then(() => {
    const fakeDb = new FakeDb();
    fakeDb.seedDb();
    console.warn("MongoDB Connected");
  })
  .catch(err => console.error(err));

const app = express();

app.use("/api/v1/rentals", rentalRoutes);

app.get("/", (req, res) => res.send("Hello World"));

const PORT = process.env.PORT || 3001;

app.listen(PORT, function() {
  console.log(`Server is running on port ${PORT}`);
});
