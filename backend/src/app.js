import express from "express";
import cors from "cors";
import morgan from "morgan";

import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
import {options} from "./swaggerOptions";
const specs = swaggerJSDoc(options);

import userRoutes from "./routes/user";
import vehicleRoutes from "./routes/vehicle";


const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use(userRoutes);
app.use(vehicleRoutes);

app.use("/docs", swaggerUI.serve, swaggerUI.setup(specs));

export default app