const WorkerRegister = require("../model/worker-register");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const workerRegister = require("../model/worker-register");
const nodemailer = require("nodemailer");

const key = "Hello";
const WorkerRegistered = async (req, res) => {
  try {
    const { name, email,location, phone, address, category_id, password } = req.body;

    const profile = req.files['profile'][0].filename;
    const cv = req.files['cv'][0].filename;

    // const profile = req.file.filename;
    const user=await WorkerRegister.findOne({email})

    // if(user){
    //     return res.json({success:false,message:'This email already registered'})
    //  }
console.log(location,'loc')

    const salt = await bcrypt.genSalt(10);
    const secpass = await bcrypt.hash(password, salt);

    const Register = await new WorkerRegister({
      name,
      email,
      phone,
      address,
      category_id,
      pincode:location,
      profile,
      cv,
      password: secpass,
      status: "pending",
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
      text: `Dear ${name},\n\nWelcome to our platform! We're thrilled to have you join us.\n\nWait for the confirmation ,once confirmation process in done you will be getting email.\n\nOnce again, welcome aboard!`,
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

    // });
  } catch (err) {
    console.log(err);
  }
};

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await WorkerRegister.findOne({ email });
    console.log(user);
    if (!user) {
      const success = false;
      return res.json({ massege: "Email Not Found", success });
    }
    if (user.status == "pending") {
      const success = false;
      return res.json({ massege: "Wait for Admin Approve", success,user });
    }
    if (user.status == "Rejected") {
      const success = false;
      return res.json({ massege: "Your Account Has Been Rejected", success,user });
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

const WorkerDetails = async (req, res) => {
  try {
    const Details = await WorkerRegister.findById(req.admin).populate(
      "category_id"
    );
    if (!Details) {
      const success = false;
      res.send({ massege: "Worker Not Found", success });
    }
    res.send(Details);
  } catch (err) {
    console.log(err);
  }
};
const AllWorker = async (req, res) => {
  try {
    const Details = await WorkerRegister.find().populate("category_id");
    if (!Details) {
      const success = false;
      res.send({ massege: "Worker Not Found", success });
    }
    res.send(Details);
  } catch (err) {
    console.log(err);
  }
};

const AllWorkerDate = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set hours to 0 for beginning of the day

    const Details = await WorkerRegister.find({
      Date: { $gte: today },
    }).populate("category_id");

    if (!Details.length) {
      return res.status(404).send({ message: "No new registrations found" });
    }

    return res.send(Details);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

const WorkerStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const FindWorker = await WorkerRegister.findById(req.params.id);
    console.log(FindWorker, "oooo");
    if (!FindWorker) {
      const success = false;
      res.json({ massege: "Worker Not Found", success });
    }
    const NewStatus = {};
    if (status) {
      NewStatus.status = status;
    }
    const UpdatedStatus = await WorkerRegister.findByIdAndUpdate(
      req.params.id,
      { $set: NewStatus },
      { new: true }
    );
    res.send(UpdatedStatus);

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
      to: FindWorker.email,
      subject: "Welcome to Our Platform",
      html: `<p>Dear ${FindWorker.name},</p>
             <p>Your registration to our platform is ${status === 'Accepted' ? 'accepted' : 'rejected'}.</p>
             ${status === 'Accepted' ? `
               <p>Now you can login by clicking the link below.</p>
               <p><a href="http://localhost:3000/login" style="background-color: #007bff; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Login to your account</a></p>
             ` : ''}
           `,
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
    const user = await WorkerRegister.findOne({ email });
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

    const findEmail = await WorkerRegister.findOne({ email: users[0].emailId });
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

    const updateService = await WorkerRegister.findByIdAndUpdate(
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
  WorkerRegistered,
  Login,
  WorkerDetails,
  AllWorker,
  WorkerStatus,
  AllWorkerDate,
  EmailEnter,
  OTPEnter,
  RessetPassword,
};
