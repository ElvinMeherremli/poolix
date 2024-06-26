const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

dotenv.config();
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Schemas and Models
const ImageSchema = new mongoose.Schema({
  path: { type: String, required: true },
  preview: { type: String, required: true }
});

const serviceSchema = new mongoose.Schema({
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
}, { timestamps: true });

const workerSchema = new mongoose.Schema({
  img: String,
  name: String,
  position: String,
  descr: String,
}, { timestamps: true });

const testimonialSchema = new mongoose.Schema({
  rating: Number,
  descr: String,
  name: String,
  whoIs: String,
});

const portfolioSchema = new mongoose.Schema({
  img: String,
});

const UsersSchema = new mongoose.Schema({
  role: String,
  username: String,
  password: String,
  img: String,
  email: String,
  fullname: String,
  busket: []
});

const CartSchema = new mongoose.Schema({
  img: String,
  productName: String,
  price: Number
});

const serviceModel = mongoose.model("Service", serviceSchema);
const workerModel = mongoose.model("Worker", workerSchema);
const testimonialModel = mongoose.model("Testimonial", testimonialSchema);
const portfolioModel = mongoose.model("Portfolio", portfolioSchema);
const userModel = mongoose.model("User", UsersSchema);
const cartModel = mongoose.model("Cart", CartSchema);

// Routes
// Cart routes
app.get("/api/cart", async (req, res) => {
  const { title } = req.query;
  let cart;
  if (title) cart = await cartModel.find({ title: title });
  else cart = await cartModel.find();

  if (cart.length > 0) {
    res.status(200).send({
      message: "success",
      data: cart,
    });
  } else {
    res.status(204).send({
      message: "not found",
      data: null,
    });
  }
});

app.get("/api/cart/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const cart = await cartModel.findById(id);
    if (cart) {
      res.status(200).send({
        message: "success",
        data: cart,
      });
    } else {
      res.status(404).send({
        message: "not found",
        data: null,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "error",
      error: error.message,
    });
  }
});

app.post("/api/cart", async (req, res) => {
  const Cart = new cartModel(req.body);
  await Cart.save();
  res.send(Cart);
});

app.patch("/api/cart/:id", async (req, res) => {
  const { id } = req.params;
  let response;
  try {
    response = await cartModel.findByIdAndUpdate(id, req.body, {
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

app.delete("/api/cart/:id", async (req, res) => {
  const { id } = req.params;
  let response;
  try {
    response = await cartModel.findByIdAndDelete(id);
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

app.delete("/api/cart", async (req, res) => {
  let response;
  try {
    response = await cartModel.deleteMany({});
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

// User routes
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
  try {
    const user = await userModel.findById(id);
    if (user) {
      res.status(200).send({
        message: "success",
        data: user,
      });
    } else {
      res.status(404).send({
        message: "not found",
        data: null,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "error",
      error: error.message,
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

// Service routes
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
  try {
    const service = await serviceModel.findById(id);
    if (service) {
      res.status(200).send({
        message: "success",
        data: service,
      });
    } else {
      res.status(404).send({
        message: "not found",
        data: null,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "error",
      error: error.message,
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

// Worker routes
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
  try {
    const worker = await workerModel.findById(id);
    if (worker) {
      res.status(200).send({
        message: "success",
        data: worker,
      });
    } else {
      res.status(404).send({
        message: "not found",
        data: null,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "error",
      error: error.message,
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
    response = await workerModel.findByIdAndUpdate(id, req.body, {
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

// Testimonial routes
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
  try {
    const testimonial = await testimonialModel.findById(id);
    if (testimonial) {
      res.status(200).send({
        message: "success",
        data: testimonial,
      });
    } else {
      res.status(404).send({
        message: "not found",
        data: null,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "error",
      error: error.message,
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

// Portfolio routes
app.get("/api/portfolios", async (req, res) => {
  const { title } = req.query;
  let portfolios;
  if (title) portfolios = await portfolioModel.find({ title: title });
  else portfolios = await portfolioModel.find();

  if (portfolios.length > 0) {
    res.status(200).send({
      message: "success",
      data: portfolios,
    });
  } else {
    res.status(204).send({
      message: "not found",
      data: null,
    });
  }
});

app.get("/api/portfolios/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const portfolio = await portfolioModel.findById(id);
    if (portfolio) {
      res.status(200).send({
        message: "success",
        data: portfolio,
      });
    } else {
      res.status(404).send({
        message: "not found",
        data: null,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "error",
      error: error.message,
    });
  }
});

app.post("/api/portfolios", async (req, res) => {
  const Portfolio = new portfolioModel(req.body);
  await Portfolio.save();
  res.send(Portfolio);
});

app.patch("/api/portfolios/:id", async (req, res) => {
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

app.delete("/api/portfolios/:id", async (req, res) => {
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

app.delete("/api/portfolios", async (req, res) => {
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

// Nodemailer configuration and route
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

app.post("/api/send-email", (req, res) => {
  const { email, subject, text } = req.body;

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: subject,
    text: text,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.send({
        message: "error",
        error: error.message,
      });
    } else {
      console.log("Email sent: " + info.response);
      res.send({
        message: "success",
        data: info.response,
      });
    }
  });
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
    "\nhttp://localhost:1212/api/portfolio",
    "\nhttp://localhost:1212/api/users",
    "\nhttp://localhost:1212/api/cart",
  );
});