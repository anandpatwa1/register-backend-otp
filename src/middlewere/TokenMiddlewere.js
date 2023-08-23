const jwt = require('jsonwebtoken')
const tempUser = require('../modals/tempUserModal')
const User = require('../modals/userModal')
const asyncHandler = require('express-async-handler')

const Userprotect = asyncHandler(async (req, res, next) => {
    let token
    if (req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(" ")[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.tempUser = await User.findById(decoded.id).select("-password")
            next()

        } catch (error) {
            console.log(error);
            res.status(401)
            throw new Error("not authorized ")
        }
    }
    else{
        res.status(401)
        throw new Error("Please login again")
    }
})

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
  };
  
module.exports = {Userprotect , generateToken}