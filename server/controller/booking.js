const Booking = require("../model/booking");
const WorkerRegister = require("../model/worker-register");
const Service = require("../model/service");


const nodemailer = require("nodemailer");

const AddBooking = async (req, res) => {
  try {
    const { booking, service_id, worker_id } = req.body;
    console.log(booking, "booking");
    const RequestBooking = await Booking({
      name: booking.name,
      email: booking.email,
      phone: booking.phone,
      address: booking.address,
      date: booking.date,
      time: booking.time,
      work: booking.work,
      total: booking.total,
      request: booking.request,
      service_id: service_id,
      user_id: req.admin,
      worker_id: worker_id,
    });
    const RequestedBooking = await RequestBooking.save();
    res.json({ RequestedBooking, success: true });
  } catch (err) {
    console.log(err);
  }
};
const GetBooking = async (req, res) => {
  try {
    const FindService = await Booking.find({ worker_id: req.admin }).populate(
      "service_id"
    );
    res.send(FindService);
  } catch (err) {
    console.log(err);
  }
};
const GetBookingDate = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const FindService = await Booking.find({
      worker_id: req.admin,
      BookedDate: { $gte: today }, // Filter by today's date
    }).populate("service_id");
    res.send(FindService);
  } catch (err) {
    console.log(err);
  }
};
const GetUserBooking = async (req, res) => {
  try {
    const FindService = await Booking.find({ user_id: req.admin })
      .populate("service_id")
      .populate({
        path: "service_id",
        populate: { path: "category_id" },
      });
    res.send(FindService);
  } catch (err) {
    console.log(err);
  }
};
const SingleBooking = async (req, res) => {
  try {
    const FindSingleBooking = await Booking.findById(req.params.id)
      .populate("service_id")
      .populate({
        path: "service_id",
        populate: { path: "category_id" },
      });
    res.send(FindSingleBooking);
  } catch (err) {
    console.log(err);
  }
};
const DeleteService = async (req, res) => {
  try {
    const findService = await Service.findById(req.params.id);
    if (!findService) {
      const success = false;
      res.send({ massege: "Category Not Found", success });
    }
    const FindedService = await Service.findByIdAndDelete(req.params.id);
    res.send({ FindedService });
  } catch (err) {
    console.log(err);
  }
};

const BookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    console.log(status, "ppp");
    const FindBooking = await Booking.findById(req.params.id);
    console.log(FindBooking, "oooo");
    if (!FindBooking) {
      const success = false;
      res.json({ massege: "Data Not Found", success });
    }

    let workerData; // Define a variable to hold worker data
    let serviceData; 

    // Check if FindBooking is not null
    if (FindBooking) {
      const serviceId = FindBooking.service_id;
      const workerId = FindBooking.worker_id;

      const servcie = await Service.findById(serviceId);
      const worker = await WorkerRegister.findById(workerId);

      serviceData = servcie;
      workerData = worker;

      console.log(workerData,'workerdara');
    }

    const NewStatus = {};
    if (status) {
      NewStatus.status = status;
    }
    const UpdatedStatus = await Booking.findByIdAndUpdate(
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
    // let mailOptions = {
      // user: "er.abdulmajeedm@gmail.com",
      // pass: "dsoltmobxqlrlvvv",
    //   subject: "Welcome to Our Platform",
    //   html: `<p>Dear ${FindBooking.name},</p>
    //            <p>Your registration to our platform is ${
    //              status === "Accepted" ? "accepted" : "rejected"
    //            }.</p>
    //            ${
    //              status === "Accepted"
    //                ? `
    //              <p>Now you can login by clicking the link below.</p>
    //              <p><a href="http://localhost:3000/login" style="background-color: #007bff; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Login to your account</a></p>
    //            `
    //                : ""
    //            }
    //          `,
    // };

    let mailOptions = {
        from: "er.abdulmajeedm@gmail.com",
        to: FindBooking.email,
        subject: "Booking Request Update",
        html: `<p>Dear ${FindBooking.name},</p>
                 ${
                   status === "Accepted"
                     ? `
                   <p>Your booking request for <span style="font-weight:700">${serviceData.service_name}</span> has been accepted.</p>
                   <p>Your appointment is confirmed. Thank you for choosing us!</p>
                   <p>For any query you can contact to this number : <span style="font-weight:700">${workerData.phone}</span></p>
                 `
                     : `
                   <p>We regret to inform you that your booking request for <span style="font-weight:700">${serviceData.service_name}</span> has been declined.</p>
                   <p>Please feel free to select another available worker for your service needs.</p>
                 `
                 }
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
module.exports = {
  AddBooking,
  GetBooking,
  DeleteService,
  SingleBooking,
  BookingStatus,
  GetUserBooking,
  GetBookingDate,
};
