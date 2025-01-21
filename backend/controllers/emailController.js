import fs from "fs/promises"
import path from "path"
import { fileURLToPath } from "url"
import { dirname } from "path"
import Handlebars from "handlebars"
import EmailTemplate from "../models/emailTemplate.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export const getEmailLayout = async (req, res) => {
    try {
        console.log("Getting email layout")
        const layoutPath = path.join(__dirname, "../templates/layout.html")
        console.log("Layout path:", layoutPath)

        const layout = await fs.readFile(layoutPath, "utf8")
        console.log("Layout loaded successfully")

        res.json({ layout })
    } catch (error) {
        console.error("Error reading layout:", error)
        res.status(500).json({ error: "Error fetching email layout" })
    }
}

export const uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" })
        }

        const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
        res.json({ url: imageUrl })
    } catch (error) {
        console.error("Error uploading image:", error)
        res.status(500).json({ error: "Error uploading image" })
    }
}

export const uploadEmailConfig = async (req, res) => {
    try {
        const { title, content, footer, images, styles, sections } = req.body

        const template = new EmailTemplate({
            title,
            content,
            footer,
            images,
            styles,
            sections,
        })

        await template.save()
        res.json({ message: "Template saved successfully", template })
    } catch (error) {
        console.error("Error saving template:", error)
        res.status(500).json({ error: "Error saving template" })
    }
}

export const renderAndDownloadTemplate = async (req, res) => {
    try {
        const { template } = req.body

        // Read the base template
        const baseTemplate = await fs.readFile(path.join(__dirname, "../templates/layout.html"), "utf8")

        // Register Handlebars helpers
        Handlebars.registerHelper("if_eq", function (a, b, opts) {
            if (a === b) return opts.fn(this)
            return opts.inverse(this)
        })

        // Compile template with Handlebars
        const compiledTemplate = Handlebars.compile(baseTemplate)

        // Prepare the data
        const templateData = {
            title: template.title || "",
            content: template.content || "",
            footer: template.footer || "",
            images: template.images || [],
            sections: [{ type: "title" }, { type: "content" }, { type: "image" }, { type: "footer" }],
            ...template.styles,
        }

        // Render with template data and styles
        const renderedHtml = compiledTemplate(templateData)

        res.json({ html: renderedHtml })
    } catch (error) {
        console.error("Error rendering template:", error)
        res.status(500).json({ error: "Error rendering template" })
    }
}

