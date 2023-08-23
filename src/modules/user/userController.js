const jwt = require("jsonwebtoken");
const User = require("../../modals/userModal");
const TempUser = require("../../modals/tempUserModal");
const asyncHandler = require("express-async-handler");

const getUser = async (req, res) => {
  const getAllUser = await User.find().select("-password");
  res.send(getAllUser);
};

const register = asyncHandler(async (req, res) => {

const databaseOtp = TempUser.findOne({email : e })
  
  if (req.body.otp == databaseOtp) {
  
 
  
   
    // user create
    const user = await User.create({
      email,
      mobileNumber,
      otp: generatedOtp,
    });

    if (user) {
      res.status(201).json({
        massage: "user created ",
        data: user,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("invalid user data");
    }
  } else {
    // res.status(400);
    throw new Error("Worng email or mobile number");
  }
});

const otp = asyncHandler(async (req, res) => {
  if (otp == "") {
    res.send("Please");
  }
  const userLogin = await User.findOne({ email: email });

  // if (userLogin && (bcrypt.compare(password, userLogin.password))) {
  //     res.status(201).json({
  //         _id: userLogin._id,
  //         name: userLogin.name,
  //         email: userLogin.email,
  //         token: generateToken(userLogin._id)
  //     })
  // } else {
  //     res.status(401)
  //     throw new Error("invalid credentials")
  // }
});
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.send("enter all field");
  }
  const userLogin = await User.findOne({ email: email });

  // if (userLogin && (bcrypt.compare(password, userLogin.password))) {
  //     res.status(201).json({
  //         _id: userLogin._id,
  //         name: userLogin.name,
  //         email: userLogin.email,
  //         token: generateToken(userLogin._id)
  //     })
  // } else {
  //     res.status(401)
  //     throw new Error("invalid credentials")
  // }
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

const getMe = (req, res) => {
  // res.status(200)
  // const user = {
  //     id: req.user._id,
  //     name: req.user.name,
  //     email: req.user.email
  // }
  // res.send(user)
};

module.exports = { register, loginUser, getUser, getMe };
