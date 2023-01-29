// We use routes for Schema utilization

const express = require("express");
const User = require("../models/User");
const router = express.Router();

// Express-validator is a set of express.js middlewares that wraps validator.js validator and sanitizer functions. We use it in place of if else
const { body, validationResult } = require("express-validator");

// ROUTE 1: Create a User using: POST "/api/auth/createuser". No login required
router.post(
  "/createuser",

  body("name", "Incorrect Name").isLength({ min: 3 }),
  body("password", "Incorrect Password").isLength({ min: 5 }),
  body("email", "Incorrect Email").isEmail(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // This will be reflected in database
    try {
      await User.create({

        // req.body requests the data that we have written in body part of thunderClient
        // We can even hardcore it like password: "123456"
        // Later we will get data from user
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
        location: req.body.location,

        // We are sending json response
      }).then(res.json({ success: true }));

    } catch (error) {
      console.log(error);

      // When endpoint will be hit and this response will be bought
      res.json({ success: false });
    }
  }
);

// ROUTE 2: Create a User using: POST "/api/auth/logineuser"
router.post(
  "/loginuser",

  body("password", "Incorrect Password").isLength({ min: 5 }),
  body("email", "Incorrect Email").isEmail(),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Data we would verify the existence
    let email = req.body.email;

    try {

      // To find whether user exists or not if it will exist then it will return the data
      let userData = await User.findOne({email});

      if (!userData) {
        return res
          .status(400)
          .json({ errors: "Try logging in with correct credentials" });
      }

      // Here we are checking whether the password retrieved from data{retrieved from the above commands} is matching with the password entered by user
      if (req.body.password !== userData.password) {
        return res
          .status(400)
          .json({ errors: "Try logging in with correct credentials" });
      }

      return res.json({ success: true });

    } catch (error) {
      console.log(error);

      res.json({ success: false });
    }
  }
);

module.exports = router;
