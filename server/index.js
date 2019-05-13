const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const config = require("./config");
const Rental = require("./models/rental");
const FakeDb = require("./models/fake-db");
const path = require("path");

const rentalRoutes = require("./routes/rentals");
const userRoutes = require("./routes/users");
const bookingRoutes = require("./routes/bookings");

mongoose
  .connect(config.DB_URI, { useNewUrlParser: true })
  .then(() => {
    if (process.env.NODE_ENV !== "production") {
      const fakeDb = new FakeDb();
      // fakeDb.seedDb();
      console.warn("MongoDB Connected");
    }
  })
  .catch(err => console.error(err));

const app = express();

app.use(bodyParser.json());

app.use("/api/v1/rentals", rentalRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/bookings", bookingRoutes);

// app.get("/", (req, res) => res.send("Hello World"));

if (process.env.NODE_ENV === "production") {
  const appPath = path.join(__dirname, "..", "./client/build");
  app.use(express.static(appPath));

  app.get("*", function(req, res) {
    res.sendFile(path.resolve(appPath, "index.html"));
  });
}

const PORT = process.env.PORT || 3001;

app.listen(PORT, function() {
  console.log(`Server is running on port ${PORT}`);
});
