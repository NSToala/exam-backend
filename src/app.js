import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";

import pkg from "../package.json";
import authRoutes from "./routes/auth.routes";
import usersRoutes from "./routes/user.routes";

import { createRoles, createAdmin, createUser} from "./libs/initialSetup";

const app = express();
createRoles();
createAdmin();
createUser();

// Settings
app.set("pkg", pkg);
app.set("port", process.env.PORT || 3000);
app.set("json spaces", 4);

// Middlewares
const corsOptions = {
    // origin: "http://localhost:3000",
};

app.use(cors(corsOptions));
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes 

app.get("/", (req, res) => {
    res.json({
        message: "API REST EXAM",
        name: app.get("pkg").name,
        version: app.get("pkg").version,
        description: app.get("pkg").description,
        author: app.get("pkg").author,
    });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);

export default app;