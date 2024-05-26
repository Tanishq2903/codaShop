import User from "../../models/User";
import connectDb from "../../middleware/mongoose";
var CryptoJS = require("crypto-js");
var jwt = require("jsonwebtoken");

const handler = async (req, res) => {
  if (req.method === "POST") {
    console.log(req.body);
    let user = await User.findOne({ email: req.body.email });
    const bytes = CryptoJS.AES.decrypt(user.password, "secret");
    console.log(bytes.toString(CryptoJS.enc.Utf8));
    let originalText = bytes.toString(CryptoJS.enc.Utf8);
    if (user) {
      if (req.body.email == user.email && req.body.password == originalText) {
        var token = jwt.sign(
          { email: user.email, name: user.name },
          "jwtsecret",
          { expiresIn: "24h" }
        );
        res.status(200).json({ Success: "success", token });
      } else {
        res.status(400).json({ error: "email or password is incorrect" });
      }
    } else {
      res.status(400).json({ error: "No user found" });
    }
  } else {
    res
      .status(400)
      .json({ error: "this method is not allowed for this route" });
  }
};
export default connectDb(handler);