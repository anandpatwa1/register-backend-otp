const nodemailer = require("nodemailer");

const generateOtp = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    // host: "smtp.zoho.in",
    // port: 465,
    // secure: true,
    // auth: {
    //   // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    //   user: 'anandpatwa.js@zohomail.in',
    //   pass: 'technorizen'
    // },
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
        user: "angelica.heidenreich76@ethereal.email",
        pass: "E4TFDBwct1fQeQ9TYA",
    },
    tls: {
        ciphers : "SSLv3",
        rejectUnauthorized : false
    }
  });

  // send mail with defined transport object
  try {
    const info = await transporter.sendMail({
      from: '"Fred Foo 👻" <angelica.heidenreich76@ethereal.email>', // sender address
    //   to: email, // list of receivers
      to: "anandpatwa.js@zohomail.in", // list of receivers
      subject: "Hello ✔", // Subject line
      text: `This is your otp for Quoded is ${otp}`, // plain text body
      html: "<b>Hello qwertyuiop </b>", // html body
    });
    console.log("Message sent: %s", info);
  } catch (error) {
    // console.log(error);
  }

//   console.log(email);
//   console.log(otp);
};
module.exports = { generateOtp };
