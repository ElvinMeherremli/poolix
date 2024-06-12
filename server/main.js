const express = require("express");
const dotenv = require("dotenv");
const app = express();
dotenv.config();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

app.use(cors());
app.use(bodyParser.json());

//] schema
//? services
const serviceSchema = new mongoose.Schema(
  {
    img: String,
    title: String,
    descr: String,
    benefits: {
      descrBenefits: String,
      benefitsArray: [String],
    },
    solutions: {
      descrSolutions: String,
    },
  },
  { timestamps: true }
);
//? worlkers
const workerSchema = new mongoose.Schema(
  {
    img: String,
    name: String,
    position: String,
    descr: String
  },
  { timestamps: true }
)
//? Testimonials
const testimonialSchema = new mongoose.Schema(
  {
    rating: Number,
    descr: String,
    name: String,
    whoIs: String
  }
)

//] model
//? services
const serviceModel = mongoose.model("Service", serviceSchema);
//? worlkers
const workerModel = mongoose.model("Worker", workerSchema);
//? Testimonials
const testimonialModel = mongoose.model("Testimonial", testimonialSchema);

//] requests
//? services
app.get("/api/services", async (req, res) => {
  const { title } = req.query;
  let services;
  if (title) services = await serviceModel.find({ title: title });
  else services = await serviceModel.find();

  if (services.length > 0) {
    res.status(200).send({
      message: "success",
      data: services,
    });
  } else {
    res.status(204).send({
      message: "not found",
      data: null,
    });
  }
});
app.get("/api/services/:id", async (req, res) => {
  const { id } = req.params;
  let services;
  try {
    services = await serviceModel.findById(id);
  } catch (error) {
    res.send({ error: error });
  }

  if (services) {
    res.status(200).send({
      message: "success",
      data: services,
    });
  } else {
    res.status(204).status({
      message: "not found",
      data: null,
    });
  }
});
app.post("/api/services", async (req, res) => {
  const Service = new serviceModel(req.body);
  await Service.save();
  res.send(Service);
});
app.delete("/api/services/:id", async (req, res) => {
  const { id } = req.params;
  let response;
  try {
    response = await serviceModel.findByIdAndDelete(id);
  } catch (error) {
    res.send({
      message: "not found",
    });
  }
  if (response) {
    res.send({
      message: "deleted",
      response: response,
    });
  } else {
    res.send({
      message: "fatal error (doesnt deleted...)",
    });
  }
});
app.delete("/api/services", async (req, res) => {
  let response;
  try {
    response = await serviceModel.deleteMany({});
  } catch (error) {
    res.send({
      message: "error",
      error: error,
    });
  }

  if (response.deletedCount > 0) {
    res.send({
      message: "success",
      deletedCount: response.deletedCount,
    });
  } else {
    res.send({
      message: "no documents to delete",
    });
  }
});

//? workers
app.get("/api/workers", async (req, res) => {
  const { title } = req.query;
  let workers;
  if (title) workers = await workerModel.find({ title: title });
  else workers = await workerModel.find();

  if (workers.length > 0) {
    res.status(200).send({
      message: "success",
      data: workers,
    });
  } else {
    res.status(204).send({
      message: "not found",
      data: null,
    });
  }
});
app.get("/api/workers/:id", async (req, res) => {
  const { id } = req.params;
  let workers;
  try {
    workers = await workerModel.findById(id);
  } catch (error) {
    res.send({ error: error });
  }

  if (workers) {
    res.status(200).send({
      message: "success",
      data: workers,
    });
  } else {
    res.status(204).status({
      message: "not found",
      data: null,
    });
  }
});
app.post("/api/workers", async (req, res) => {
  const Worker = new workerModel(req.body);
  await Worker.save();
  res.send(Worker);
});
app.delete("/api/workers/:id", async (req, res) => {
  const { id } = req.params;
  let response;
  try {
    response = await workerModel.findByIdAndDelete(id);
  } catch (error) {
    res.send({
      message: "not found",
    });
  }
  if (response) {
    res.send({
      message: "deleted",
      response: response,
    });
  } else {
    res.send({
      message: "fatal error (doesnt deleted...)",
    });
  }
});
app.delete("/api/workers", async (req, res) => {
  let response;
  try {
    response = await workerModel.deleteMany({});
  } catch (error) {
    res.send({
      message: "error",
      error: error,
    });
  }

  if (response.deletedCount > 0) {
    res.send({
      message: "success",
      deletedCount: response.deletedCount,
    });
  } else {
    res.send({
      message: "no documents to delete",
    });
  }
});

//? Testimonials
app.get("/api/testimonials", async (req, res) => {
  const { title } = req.query;
  let testimonials;
  if (title) testimonials = await testimonialModel.find({ title: title });
  else testimonials = await testimonialModel.find();

  if (testimonials.length > 0) {
    res.status(200).send({
      message: "success",
      data: testimonials,
    });
  } else {
    res.status(204).send({
      message: "not found",
      data: null,
    });
  }
});
app.get("/api/testimonials/:id", async (req, res) => {
  const { id } = req.params;
  let testimonials;
  try {
    testimonials = await testimonialModel.findById(id);
  } catch (error) {
    res.send({ error: error });
  }

  if (testimonials) {
    res.status(200).send({
      message: "success",
      data: testimonials,
    });
  } else {
    res.status(204).status({
      message: "not found",
      data: null,
    });
  }
});
app.post("/api/testimonials", async (req, res) => {
  const Testimonial = new testimonialModel(req.body);
  await Testimonial.save();
  res.send(Testimonial);
});
app.delete("/api/testimonials/:id", async (req, res) => {
  const { id } = req.params;
  let response;
  try {
    response = await testimonialModel.findByIdAndDelete(id);
  } catch (error) {
    res.send({
      message: "not found",
    });
  }
  if (response) {
    res.send({
      message: "deleted",
      response: response,
    });
  } else {
    res.send({
      message: "fatal error (doesnt deleted...)",
    });
  }
});
app.delete("/api/testimonials", async (req, res) => {
  let response;
  try {
    response = await testimonialModel.deleteMany({});
  } catch (error) {
    res.send({
      message: "error",
      error: error,
    });
  }

  if (response.deletedCount > 0) {
    res.send({
      message: "success",
      deletedCount: response.deletedCount,
    });
  } else {
    res.send({
      message: "no documents to delete",
    });
  }
});

mongoose
  .connect(process.env.CONNECTION_STRING)
  .then((res) => console.log("\nconnect"))
  .catch((err) => console.log(err));

app.listen(process.env.PORT, function (err) {
  if (err) console.log("Error in server setup");
  console.log(
    "Server listening on Port",
    process.env.PORT,
    "\n\nhttp://localhost:1212/api/services",
    "\nhttp://localhost:1212/api/workers",
    "\nhttp://localhost:1212/api/testimonials",
  );
});
