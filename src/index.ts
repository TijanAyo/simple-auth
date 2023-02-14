import express from "express";
import * as dotenv from "dotenv";
import morgan from "morgan";

dotenv.config();

const app = express();

import authRoute from "./routes/auth.route";
import postRoute from "./routes/post.route";

// middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false}));

// Routes
app.use('/api/auth', authRoute);
app.use('/api/posts', postRoute);

export default app;