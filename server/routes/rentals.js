const express = require("express");
const router = express.Router();
const Rental = require("../models/rental");
const UserController = require("../controllers/user");

router.get("/secret", UserController.authMiddleware, function(req, res) {
  res.json({ secret: true });
});

router.get("", (req, res) => {
  Rental.find({}, function(err, foundRentals) {
    res.json(foundRentals);
  });
});

router.get("/:id", (req, res) => {
  const rentalId = req.params.id;
  Rental.findById(rentalId, (err, foundRental) => {
    if (err) {
      res.status(422).send({
        errors: [{ title: "Rental Error!", detail: "Could not find rental!" }]
      });
    }
    res.json(foundRental);
  });
});

module.exports = router;
