import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import userRouter from "../src/module/user/user.route.js";
import leadRouter from "../src/module/Leads/lead.route.js";
import countryRoutes from "../src/module/countrycode/country.route.js";
import vehicaleCodeRouter from "../src/module/vehiclemaster/vehiclemaster.route.js"
import travelcityRouter from "../src/module/travelCitys/travelCity.route.js";
import customerRouter from "./module/customers/customer.route.js";
import reportsRouter from "./module/Reports/report.route.js";
import firebaseRoutes from './module/Leads/firebase.route.js';
import annualReportRoutes from "./module/AnnualReport/annualReport.route.js";
import hoursReportRoutes from "./module/HoursReport/hoursreport.route.js";
import stateRouter from "./module/State/state.route.js";
import AssignRoutes from "./module/Assign/assign.route.js";

dotenv.config();
const app = express();


app.use(
  cors({
    origin: "http://localhost:3000" || "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.use(express.static("public"));

app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("🚀 Server started successfully");
});

app.use("/api/v1/user", userRouter);
app.use("/api/v1/lead", leadRouter);
app.use("/api/v1/country", countryRoutes);
app.use("/api/v1/vehicle", vehicaleCodeRouter);
app.use("/api/v1/travelcity", travelcityRouter);
app.use("/api/v1/customers", customerRouter); 
app.use("/api/v1/reports", reportsRouter); 
app.use("/api/v1/firebase", firebaseRoutes);
app.use("/api/v1/annualreport", annualReportRoutes);
app.use("/api/v1/hoursreport", hoursReportRoutes);
app.use("/api/v1/customer", customerRouter);
app.use("/api/v1/state", stateRouter);
app.use("/api/v1/state", stateRouter);
app.use("/api/v1/assign", AssignRoutes);
app.get('/', (req, res) => {
  res.json({ 
    message: 'Server is running',
    firebaseStatus: 'Configured' 
  });
});

app.use(errorMiddleware);

export { app };