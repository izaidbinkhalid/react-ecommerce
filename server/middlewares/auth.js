const admin = require("../firebase");
const user = require("../models/user");
const User = require("../models/user");

exports.authCheck = async (req, res, next) => {
  // console.log(req.headers); // token
  try {
    const firebaseUser = await admin
      .auth()
      .verifyIdToken(req.headers.authtoken);
    console.log("Firebase User in AuthCheck", firebaseUser);
    req.user = firebaseUser;
    next();
  } catch (err) {
    console.log("err in models", err)
    res.status(401).json({
      err: "Invalid or Expired Token",
    });
  }
};

exports.adminCheck = async (req, res, next) => {
  const { email } = req.user;

  const adminUser = await User.findOne({ email }).exec();
  if (adminUser.role !== "admin") {
    res.status(403).json({
      err: "Admin resource. Access Denied",
    });
  } else {
    next();
  }
};
