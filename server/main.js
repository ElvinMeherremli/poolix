const express = require("express");
const dotenv = require("dotenv");
const app = express();
dotenv.config();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

app.use(cors());
app.use(bodyParser.json());

app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));


//] schema
//? services
const ImageSchema = new mongoose.Schema({
  path: { type: String, required: true },
  preview: { type: String, required: true }
});

const serviceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    descr: { type: String, required: true },
    img: { type: String, required: true },
    benefits: {
      descrBenefits: { type: String, required: true },
    },
    solutions: {
      descrSolutions: { type: String, required: true },
    },
    imageCollection: [],
  },
  { timestamps: true }
);
//? workers
const workerSchema = new mongoose.Schema(
  {
    img: String,
    name: String,
    position: String,
    descr: String,
  },
  { timestamps: true }
);
//? Testimonials
const testimonialSchema = new mongoose.Schema({
  rating: Number,
  descr: String,
  name: String,
  whoIs: String,
});
//? Portfolio
const portfolioSchema = new mongoose.Schema({
  img: String,
});
//? users
const UsersSchema = new mongoose.Schema({
  role: String,
  username: String,
  password: String,
  img: String,
  busket: []
});

//] model
//? services
const serviceModel = mongoose.model("Service", serviceSchema);
//? workers
const workerModel = mongoose.model("Worker", workerSchema);
//? Testimonials
const testimonialModel = mongoose.model("Testimonial", testimonialSchema);
//? Portfolio
const portfolioModel = mongoose.model("Portfolio", portfolioSchema);
//? users
const userModel = mongoose.model("User", UsersSchema);


//] requests
//? users
app.get("/api/users", async (req, res) => {
  const { title } = req.query;
  let users;
  if (title) users = await userModel.find({ title: title });
  else users = await userModel.find();

  if (users.length > 0) {
    res.status(200).send({
      message: "success",
      data: users,
    });
  } else {
    res.status(204).send({
      message: "not found",
      data: null,
    });
  }
});
app.get("/api/users/:id", async (req, res) => {
  const { id } = req.params;
  let users;
  try {
    users = await userModel.findById(id);
  } catch (error) {
    res.send({ error: error });
  }

  if (users) {
    res.status(200).send({
      message: "success",
      data: users,
    });
  } else {
    res.status(204).status({
      message: "not found",
      data: null,
    });
  }
});
app.post("/api/users", async (req, res) => {
  const User = new userModel(req.body);
  await User.save();
  res.send(User);
});
app.patch("/api/users/:id", async (req, res) => {
  const { id } = req.params;
  let response;
  try {
    response = await userModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
  } catch (error) {
    res.send({ error: error });
  }
  if (response) {
    res.send({
      message: "updated",
      data: response,
    });
  } else {
    res.send({
      message: "not found",
      data: null,
    });
  }
});
app.delete("/api/users/:id", async (req, res) => {
  const { id } = req.params;
  let response;
  try {
    response = await userModel.findByIdAndDelete(id);
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
      message: "fatal error (doesn't delete...)",
    });
  }
});
app.delete("/api/users", async (req, res) => {
  let response;
  try {
    response = await userModel.deleteMany({});
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
app.patch("/api/services/:id", async (req, res) => {
  const { id } = req.params;
  let response;
  try {
    response = await serviceModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
  } catch (error) {
    res.send({ error: error });
  }
  if (response) {
    res.send({
      message: "updated",
      data: response,
    });
  } else {
    res.send({
      message: "not found",
      data: null,
    });
  }
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
      message: "fatal error (doesn't delete...)",
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
app.patch("/api/workers/:id", async (req, res) => {
  const { id } = req.params;
  let response;
  try {
    response = await workerModel.findByIdAndUpdate(id, req.body, { new: true });
  } catch (error) {
    res.send({ error: error });
  }
  if (response) {
    res.send({
      message: "updated",
      data: response,
    });
  } else {
    res.send({
      message: "not found",
      data: null,
    });
  }
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
      message: "fatal error (doesn't delete...)",
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
app.patch("/api/testimonials/:id", async (req, res) => {
  const { id } = req.params;
  let response;
  try {
    response = await testimonialModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
  } catch (error) {
    res.send({ error: error });
  }
  if (response) {
    res.send({
      message: "updated",
      data: response,
    });
  } else {
    res.send({
      message: "not found",
      data: null,
    });
  }
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
      message: "fatal error (doesn't delete...)",
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

//? Portfolio
app.get("/api/portfolio", async (req, res) => {
  const { title } = req.query;
  let portfolio;
  if (title) portfolio = await portfolioModel.find({ title: title });
  else portfolio = await portfolioModel.find();

  if (portfolio.length > 0) {
    res.status(200).send({
      message: "success",
      data: portfolio,
    });
  } else {
    res.status(204).send({
      message: "not found",
      data: null,
    });
  }
});
app.get("/api/portfolio/:id", async (req, res) => {
  const { id } = req.params;
  let portfolio;
  try {
    portfolio = await portfolioModel.findById(id);
  } catch (error) {
    res.send({ error: error });
  }

  if (portfolio) {
    res.status(200).send({
      message: "success",
      data: portfolio,
    });
  } else {
    res.status(204).status({
      message: "not found",
      data: null,
    });
  }
});
app.post("/api/portfolio", async (req, res) => {
  const Portfolio = new portfolioModel(req.body);
  await Portfolio.save();
  res.send(Portfolio);
});
app.patch("/api/portfolio/:id", async (req, res) => {
  const { id } = req.params;
  let response;
  try {
    response = await portfolioModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
  } catch (error) {
    res.send({ error: error });
  }
  if (response) {
    res.send({
      message: "updated",
      data: response,
    });
  } else {
    res.send({
      message: "not found",
      data: null,
    });
  }
});
app.delete("/api/portfolio/:id", async (req, res) => {
  const { id } = req.params;
  let response;
  try {
    response = await portfolioModel.findByIdAndDelete(id);
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
      message: "fatal error (doesn't delete...)",
    });
  }
});
app.delete("/api/portfolio", async (req, res) => {
  let response;
  try {
    response = await portfolioModel.deleteMany({});
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
    "\nhttp://localhost:1212/api/testimonials"
  );
});
