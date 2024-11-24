const UserRegister = require("../model/user-register");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const key = "Hello";
const nodemailer = require("nodemailer");


const UserRegistered = async (req, res) => {
  try {
    const { name, email, phone, address, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const secpass = await bcrypt.hash(password, salt);

    const Register = await new UserRegister({
      name,
      email,
      phone,
      address,
      password: secpass,
    });
    const Registered = Register.save();
    const success = true;
    res.json({ Registered, success });

    // Create transporter
    let transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "er.abdulmajeedm@gmail.com",
        pass: "dsoltmobxqlrlvvv",
      },
    });

    // Compose email
    let mailOptions = {
      from: "er.abdulmajeedm@gmail.com",
      to: email,
      subject: "Welcome to Our Platform",
      text: `Dear ${name},\n\nWelcome to our platform! We're thrilled to have you join us.\n\nOnce again, welcome aboard!`,
    };

    try {
      // Send email
      await transporter.sendMail(mailOptions);
      console.log("Registration email sent successfully.");
      res
        .status(200)
        .json({ message: "Registration successful. Confirmation email sent." });
    } catch (error) {
      console.error("Error sending registration email:", error);
      res.status(500).json({ error: "Failed to send registration email." });
    }
  } catch (err) {
    console.log(err);
  }
};

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserRegister.findOne({ email });
    if (!user) {
      const success = false;
      return res.json({ massege: "Email Not Found", success });
    }
    const ismatch = await bcrypt.compare(password, user.password);
    if (!ismatch) {
      const success = false;
      return res.json({ massege: "Incorrect Password", success });
    }
    const data = user.id;
    const token = await jwt.sign(data, key);
    const success = true;
    res.json({ token, success });
  } catch (err) {
    console.log(err);
  }
};

const UserDetails = async (req, res) => {
  try {
    const Details = await UserRegister.find();
    if (!Details) {
      const success = false;
      res.send({ massege: "Worker Not Found", success });
    }
    res.send(Details);
  } catch (err) {
    console.log(err);
  }
};

///////////////////////////////////////

const users = [{ emailId: "", otp: null }];

// Generate random OTP
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000);
}

// Send OTP via email
async function sendOTP(email, otp) {
  // Create transporter
  let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "er.abdulmajeedm@gmail.com",
      pass: "dsoltmobxqlrlvvv",
    },
  });

  // Compose email
  let mailOptions = {
    from: "er.abdulmajeedm@gmail.com",
    to: email,
    subject: "Password Reset OTP",
    text: `Your OTP for password reset is: ${otp}`,
  };

  try {
    // Send email
    await transporter.sendMail(mailOptions);
    console.log("OTP sent successfully.");
    console.log(users[0].otp, "otp");
  } catch (error) {
    console.error("Error sending OTP:", error);
  }
}

const EmailEnter = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await UserRegister.findOne({ email });
    console.log(user);
    if (!user) {
      const success = false;
      return res.json({ massege: "Email Not Found", success });
    }

    // Generate OTP
    const otp = generateOTP();

    // Save OTP to user object (for demonstration purposes; in real-world scenario, you would store OTP securely)
    users[0].otp = otp;
    users[0].emailId = email;

    // Send OTP via email
    await sendOTP(email, otp);

    const success = true;
    res.json({ success });
  } catch (err) {
    console.log(err);
  }
};

const OTPEnter = async (req, res) => {
  try {
    const { otps } = req.body;

    console.log(otps, "otppps");
    console.log(users[0].otp, "stored otppps");
    if (users[0].otp != otps) {
      return res.json({ success: false, message: "Invalid OTP" });
      console.log("wrong");
    }

    // Clear OTP after successful verification
    users[0].otp = null;

    const success = true;
    res.json({ success });
  } catch (err) {
    console.log(err);
  }
};

const RessetPassword = async (req, res) => {
  try {
    const { password, repassword } = req.body;

    // console.log(otps,'otppps')
    // console.log(users[0],'stored otppps')
    if (password != repassword) {
      return res.json({ success: false, message: "Password did not match" });
      console.log("wrong");
    }

    const findEmail = await UserRegister.findOne({ email: users[0].emailId });
    console.log(findEmail._id, "findEmail");

    const salt = await bcrypt.genSalt(10);
    const secpass = await bcrypt.hash(password, salt);
    // if (!findEmail) {
    //   const success = false;
    //   res.send({ massge: "Email not Found", success });
    // }
    const NewService = {};
    if (password) {
      NewService.password = secpass;
    }

    const updateService = await UserRegister.findByIdAndUpdate(
      findEmail._id,
      { $set: NewService },
      { new: true }
    );

    const success = true;
    res.json({ success });
  } catch (err) {
    console.log(err);
  }
};
module.exports = {
  UserRegistered,
  Login,
  UserDetails,
  EmailEnter,
  OTPEnter,
  RessetPassword,
};
