import React, { useState, useCallback, useEffect } from "react"
import { Editor } from "@tinymce/tinymce-react"
import ImageUploader from "./ImageUploader"
import PreviewPanel from "./PreviewPanel"
import { LoadingSpinner } from "./LoadingSpinner"
import { ErrorMessage } from "./ErrorMessage"
import axios from "axios"
import { useToast } from "./Toast"

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000/api"

function EmailBuilder() {
    const [template, setTemplate] = useState({
        title: "",
        content: "",
        footer: "",
        images: [],
    })

    const [styles, setStyles] = useState({
        titleSize: 24,
        titleColor: "#000000",
        titleAlignment: "left",
        contentSize: 16,
        contentColor: "#000000",
        contentAlignment: "left",
        footerSize: 14,
        footerColor: "#666666",
        footerAlignment: "center",
    })

    const [sections, setSections] = useState([
        { id: "title", type: "title", label: "Title" },
        { id: "content", type: "content", label: "Content" },
        { id: "images", type: "image", label: "Images" },
        { id: "footer", type: "footer", label: "Footer" },
    ])

    const [layout, setLayout] = useState("")
    const [loading, setLoading] = useState({
        layout: true,
        save: false,
        download: false,
        upload: false,
    })
    const [error, setError] = useState(null)
    const [Toast, showToast] = useToast()

    useEffect(() => {
        const fetchLayout = async () => {
            try {
                setLoading((prev) => ({ ...prev, layout: true }))
                const response = await axios.get(`${API_URL}/getEmailLayout`)
                setLayout(response.data.layout)
                setError(null)
            } catch (err) {
                setError("Failed to load email layout. Please refresh the page.")
                showToast("Failed to load email layout", "error")
            } finally {
                setLoading((prev) => ({ ...prev, layout: false }))
            }
        }
        fetchLayout()
    }, [])

    const handleImageUpload = useCallback(async (files) => {
        const formData = new FormData()
        formData.append("image", files[0])

        try {
            setLoading((prev) => ({ ...prev, upload: true }))
            const response = await axios.post(`${API_URL}/uploadImage`, formData)
            setTemplate((prev) => ({
                ...prev,
                images: [...prev.images, { url: response.data.url, alt: files[0].name }],
            }))
            showToast("Image uploaded successfully")
        } catch (error) {
            showToast("Failed to upload image", "error")
        } finally {
            setLoading((prev) => ({ ...prev, upload: false }))
        }
    }, [])

    const handleSave = async () => {
        try {
            setLoading((prev) => ({ ...prev, save: true }))
            const templateData = {
                ...template,
                styles,
                sections: sections.map(({ type }) => ({ type })),
            }
            await axios.post(`${API_URL}/uploadEmailConfig`, templateData)
            showToast("Template saved successfully")
        } catch (error) {
            showToast("Failed to save template", "error")
        } finally {
            setLoading((prev) => ({ ...prev, save: false }))
        }
    }

    const handleDownload = async () => {
        try {
            setLoading((prev) => ({ ...prev, download: true }))
            const response = await axios.post(`${API_URL}/renderAndDownloadTemplate`, {
                template: {
                    ...template,
                    styles,
                    sections: sections.map(({ type }) => ({ type })),
                },
            })

            const blob = new Blob([response.data.html], { type: "text/html" })
            const url = window.URL.createObjectURL(blob)
            const a = document.createElement("a")
            a.href = url
            a.download = `${template.title || "email-template"}.html`
            document.body.appendChild(a)
            a.click()
            document.body.removeChild(a)
            window.URL.revokeObjectURL(url)
            showToast("Template downloaded successfully")
        } catch (error) {
            showToast("Failed to download template", "error")
        } finally {
            setLoading((prev) => ({ ...prev, download: false }))
        }
    }

    const handleEditorChange = (content, editor) => {
        const fieldName = editor.id
        setTemplate((prev) => ({
            ...prev,
            [fieldName]: content,
        }))
    }

    if (loading.layout) {
        return <LoadingSpinner />
    }

    if (error) {
        return <ErrorMessage message={error} />
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Email Builder</h2>

                {/* Render Sections without Drag-and-Drop */}
                {sections.map((section) => (
                    <div key={section.id} className="bg-white p-4 mb-4 rounded-lg shadow">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-semibold">{section.label}</h3>
                        </div>

                        {section.id === "images" ? (
                            <ImageUploader onUpload={handleImageUpload} loading={loading.upload} />
                        ) : (
                            <Editor
                                apiKey={process.env.REACT_APP_TINYMCE_API_KEY}
                                id={section.id}
                                value={template[section.id]}
                                onEditorChange={handleEditorChange}
                                init={{
                                    height: 200,
                                    menubar: false,
                                    plugins: [
                                        "advlist",
                                        "autolink",
                                        "lists",
                                        "link",
                                        "image",
                                        "charmap",
                                        "preview",
                                        "searchreplace",
                                        "visualblocks",
                                        "code",
                                        "fullscreen",
                                        "insertdatetime",
                                        "media",
                                        "table",
                                        "code",
                                        "help",
                                        "wordcount",
                                    ],
                                    toolbar:
                                        "undo redo | formatselect | bold italic | " +
                                        "alignleft aligncenter alignright alignjustify | " +
                                        "bullist numlist | removeformat | help",
                                    content_style:
                                        'body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; font-size: 14px; }',
                                    entity_encoding: "raw",
                                }}
                            />
                        )}
                    </div>
                ))}

                <div className="flex space-x-4">
                    <button
                        onClick={handleSave}
                        disabled={loading.save}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
                    >
                        {loading.save ? "Saving..." : "Save Template"}
                    </button>
                    <button
                        onClick={handleDownload}
                        disabled={loading.download}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
                    >
                        {loading.download ? "Generating..." : "Download HTML"}
                    </button>
                </div>
            </div>

            <div className="sticky top-0">
                <PreviewPanel template={template} styles={styles} layout={layout} sections={sections} />
            </div>

            {Toast}
        </div>
    )
}

export default EmailBuilder
