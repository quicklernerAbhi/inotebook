const express = require("express");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const fetchuser = require("../middleware/fetchuser");
const router = express.Router();
const iwt_secret = "secret";
// route 1 for signing up  user log in is not necessary
router.post(
  "/createuser",
  [
    body("email", "Enter a valid email").isEmail(),
    body("name", "Enter a valid name").isLength({ min: 2 }),
    body("password", "password must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    // console.log(req.body);
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    try {
      // checking email is alredy have
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({
          success,
          error: "sorry, user with this email is alredy exist",
        });
      }
      // hashing password
      // creating salt
      var salt = await bcrypt.genSaltSync(10);
      // hashing password
      let secpassword = await bcrypt.hashSync(req.body.password, salt);

      // create a user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secpassword,
      });
      // sending web token
      // const iwt_secret = "secret";
      let data = {
        user: {
          id: user.id,
        },
      };
      var authtokan = jwt.sign(data, iwt_secret);
      success = true;
      res.json({ success, authtokan, user });
      // console.log(data);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Some error ocurred");
    }
  }
);
// route 2 for login  user log in is doing
router.post(
  "/loginuser",
  [
    body("email", "Enter a valid email").isEmail(),

    body("password", "password must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    // console.log(req.body);
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // checking email of user want to login
      let { email, password } = req.body;
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ success, error: "please give right credentials" });
      }
      // testing hashed password (compairing)
      let passwordcompared = await bcrypt.compare(password, user.password);
      // sending web token
      if (!passwordcompared) {
        res
          .status(500)
          .json({ success, error: "please try with correct credentials" });
      }

      let data = {
        user: {
          id: user.id,
        },
      };
      var authtokan = jwt.sign(data, iwt_secret);
      success = true;
      res.json({ success, authtokan });
      // console.log(data);
      console.log("login successful");
    } catch (error) {
      console.log(error.message);
      res.status(500).send("please try to login with right credentials");
    }
  }
);

// route 3 for getting user information //user is already logged in
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    let userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("error occured at server side");
  }
});
module.exports = router;
