import express from "express"
import multer from "multer"
import path from "path"
import { fileURLToPath } from "url"
import { dirname } from "path"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const router = express.Router()

// Configure multer for image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../uploads/"))
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`)
    },
})

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif/
        const mimetype = filetypes.test(file.mimetype)
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase())

        if (mimetype && extname) {
            return cb(null, true)
        }
        cb(new Error("Only image files are allowed!"))
    },
})

// Import controllers
import {
    getEmailLayout,
    uploadImage,
    uploadEmailConfig,
    renderAndDownloadTemplate,
} from "../controllers/emailController.js"

// Define routes
router.get("/getEmailLayout", getEmailLayout)
router.post("/uploadImage", upload.single("image"), uploadImage)
router.post("/uploadEmailConfig", uploadEmailConfig)
router.post("/renderAndDownloadTemplate", renderAndDownloadTemplate)

export default router

