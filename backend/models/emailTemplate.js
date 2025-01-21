import mongoose from "mongoose"

const emailTemplateSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    content: {
        type: String,
        required: true,
    },
    footer: {
        type: String,
        default: "",
    },
    images: [
        {
            url: String,
            alt: String,
        },
    ],
    styles: {
        titleSize: {
            type: Number,
            default: 24,
        },
        titleColor: {
            type: String,
            default: "#000000",
        },
        titleAlignment: {
            type: String,
            default: "left",
        },
        contentSize: {
            type: Number,
            default: 16,
        },
        contentColor: {
            type: String,
            default: "#000000",
        },
        contentAlignment: {
            type: String,
            default: "left",
        },
        footerSize: {
            type: Number,
            default: 14,
        },
        footerColor: {
            type: String,
            default: "#666666",
        },
        footerAlignment: {
            type: String,
            default: "center",
        },
    },
    sections: [
        {
            type: {
                type: String,
                enum: ["title", "content", "image", "footer"],
                required: true,
            },
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
})

export default mongoose.model("EmailTemplate", emailTemplateSchema)

