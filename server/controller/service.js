const Service = require("../model/service");
const AddService = async (req, res) => {
  try {
    const { service_name, service_charge, units, description, category_id } =
      req.body;
    const service_image = req.file.filename;
    const Services = await Service({
      service_name,
      service_charge,
      units,
      description,
      category_id,
      service_image,
      worker_id: req.admin,
    });
    const AddedService = await Services.save();
    res.json({ AddedService, success: true });
  } catch (err) {
    console.log(err);
  }
};
const GetService = async (req, res) => {
  try {
    const FindService = await Service.find({ worker_id: req.admin })
      .populate("category_id")
      .populate("worker_id");
    res.send(FindService);
  } catch (err) {
    console.log(err);
  }
};
const GetWorkerAllService = async (req, res) => {
  try {
    const FindService = await Service.find({ worker_id: req.admin })
      .populate("category_id")
      .populate("worker_id");
    res.send(FindService);
  } catch (err) {
    console.log(err);
  }
};
const GetWorkerService = async (req, res) => {
  try {
    const FindService = await Service.find({ worker_id: req.params.id })
      .populate("category_id")
      .populate("worker_id");
    res.send(FindService);
  } catch (err) {
    console.log(err);
  }
};
const SingleService = async (req, res) => {
  try {
    const FindSingleService = await Service.findById(req.params.id).populate(
      "category_id"
    );
    res.send(FindSingleService);
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

const UpdateService = async (req, res) => {
  try {
    const { service_name, service_charge, units, description } = req.body;
    const service_image = req.file.filename;
    const findService = await Service.findById(req.params.id);
    if (!findService) {
      const success = false;
      res.send({ massge: "Service not Found", success });
    }
    const NewService = {};
    if (service_name) {
      NewService.service_name = service_name;
    }
    if (service_charge) {
      NewService.service_charge = service_charge;
    }
    if (units) {
      NewService.units = units;
    }
    if (description) {
      NewService.description = description;
    }
    if (service_image) {
      NewService.service_image = service_image;
    }
    const updateService = await Service.findByIdAndUpdate(
      req.params.id,
      { $set: NewService },
      { new: true }
    );

    res.send(updateService);
  } catch (err) {
    console.log(err);
  }
};
module.exports = {
  AddService,
  GetService,
  DeleteService,
  SingleService,
  UpdateService,
  GetWorkerService,
  GetWorkerAllService,
};
