// We use routes for Schema utilization

const express = require("express");
const User = require("../models/User");
const router = express.Router();

// Express-validator is a set of express.js middlewares that wraps validator.js validator and sanitizer functions. We use it in place of if else
const { body, validationResult } = require("express-validator");

// For defining a user individualy so that its data could get stored separately and only that user would have the access we use jwt
const jwt = require("jsonwebtoken");

//  bcrypt is a password-hashing function
const bcrypt = require("bcryptjs");

// We can also use .env file to store it
// It is secret and third part of token
const jwtSecret = "MyNameIsDeekshaDewanganAndIAmGoodGirl";

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

    // Here we are generating the salt
    const salt = await bcrypt.genSalt(10);

    // Here hash of the password will be formed and in later commands we will store that hash
    let secPassword = await bcrypt.hash(req.body.password, salt);

    // This will be reflected in database
    try {
      await User.create({
        // req.body requests the data that we have written in body part of thunderClient
        // We can even hardcore it like password: "123456"
        // Later we will get data from user
        name: req.body.name,

        // Here the hashed foem of password will get stored
        password: secPassword,
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
      let userData = await User.findOne({ email });

      if (!userData) {
        return res
          .status(400)
          .json({ errors: "Try logging in with correct credentials" });
      }

      // Comparing passwords that are in hashed form here we are using bcrypt because req.body.password is normal password and userData.password is hashed password
      const pwdCompare = await bcrypt.compare(
        req.body.password,
        userData.password
      );

      // Here we are checking whether the password retrieved from data{retrieved from the above commands} is matching with the password entered by user
      if (!pwdCompare) {
        return res
          .status(400)
          .json({ errors: "Try logging in with correct credentials" });
      }

      // data is an object which is necessary for the signature part
      const data = {
        // Second part of token
        user: {
          id: userData.id,
        },
      };

      // Signature part
      const authToken = jwt.sign(data, jwtSecret);

      return res.json({ success: true, authToken: authToken });
    } catch (error) {
      console.log(error);

      res.json({ success: false });
    }
  }
);

module.exports = router;
