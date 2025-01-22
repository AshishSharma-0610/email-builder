import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import multer from "multer"
import path from "path"
import { fileURLToPath } from "url"
import { dirname } from "path"
import dotenv from "dotenv"

// Routes
import emailRoutes from "./routes/email.js"
import templateRoutes from "./routes/templates.js"

// Initialize dotenv
dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(
    cors({
        origin: "https://email-builder-gamma-kohl.vercel.app",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type"],
    }),
)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// MongoDB Connection
mongoose
    .connect(process.env.MONGODB_URI || "mongodb+srv://as5891936:H3HUiQhRCH1mDBkH@cluster0.qnniu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Connected to MongoDB")
    })
    .catch((err) => {
        console.error("MongoDB connection error:", err)
    })

// Serve static files from uploads directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")))

// Routes
app.use("/api", emailRoutes)
app.use("/api", templateRoutes)

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).json({ error: "Something went wrong!" })
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
    console.log(`API endpoints available at http://localhost:${PORT}/api`)
})

