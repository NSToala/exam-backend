import { config } from "dotenv"

config()

export default {
    MONGODB_URI: process.env.MONGO_URI || "mongodb://localhost/examen",
    PORT: process.env.PORT || 3000,
    SECRET: 'MY-EXAM'
}