import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

import apiRoutes from "./routes/api.js";
import viewRoutes from "./routes/views.js";

const app = express();
const port = 3000;

// Middelware for HTTP request logging
app.use(morgan("combined"));

// Middleware for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware for parsing application/json
app.use(bodyParser.json());

// Middleware for serving static files (CSS, images, etc.)
app.use(express.static(path.join(__dirname, "public")));

// Middelware to set EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Routes for API calls
app.use("/api", apiRoutes);

// Routes for serving HTML views
app.use("/", viewRoutes);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});