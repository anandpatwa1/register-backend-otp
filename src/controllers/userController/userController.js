const jwt = require("jsonwebtoken");
const User = require("../../modals/user/userModdal");
const asyncHandler = require("express-async-handler");
const { generateOtp } = require("../../middlewere/otp");

const getUser = async (req, res) => {
  const getAllUser = await User.find().select("-password");
  res.send(getAllUser);
};

const register = asyncHandler(async (req, res) => {
  const { email, mobileNumber } = req.body;

  if (!email && !mobileNumber) {
    res.status(400);
    throw new Error("Please fill email or mobileNumber");
  }

  // const userExistByEmail = await User.findOne({ email: email })
  const userExistByEmail = await User.findOne({ email: email });
  const userExistByNumber = await User.findOne({ mobileNumber: mobileNumber });

  if (userExistByEmail && userExistByNumber) {
    // res.status(400);
    // throw new Error("User already exist");
  }

  // const checkNumber = mobileNumber.length
  // console.log(checkNumber);

  const checkEmail = email.includes("@");

  
  if (checkEmail || mobileNumber) {
  
    //generate
    const tempOtp = Math.floor(Math.random() * (9800 - 1000 + 1) + 1000);
    const generatedOtp = 1234
 
    // Sand otp
    const otp = await generateOtp(email, generatedOtp);
   
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
