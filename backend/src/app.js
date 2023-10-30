import express from "express";
import cors from "cors";
import morgan from "morgan";

import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
import {options} from "./swaggerOptions";
const specs = swaggerJSDoc(options);

import userRoutes from "./routes/user";
import vehicleRoutes from "./routes/vehicle";
import parkRoutes from "./routes/park";
import parktimeRoutes from "./routes/parktime";
import bookingRoutes from "./routes/booking";
import parkVehicleRoutes from "./routes/parkVehicle";


const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use(userRoutes);
app.use(vehicleRoutes);
app.use(parkRoutes);
app.use(parktimeRoutes);
app.use(bookingRoutes);
app.use(parkVehicleRoutes);

app.use("/docs", swaggerUI.serve, swaggerUI.setup(specs));

export default app