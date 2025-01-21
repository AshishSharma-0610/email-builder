import React, { useEffect, useState } from "react"
import Handlebars from "handlebars"

function PreviewPanel({ template, styles, layout }) {
    const [compiledHtml, setCompiledHtml] = useState("")
    const [error, setError] = useState(null)

    useEffect(() => {
        if (!layout) return

        try {
            // Register Handlebars helpers
            Handlebars.registerHelper("if_eq", function (a, b, opts) {
                if (a === b) return opts.fn(this)
                return opts.inverse(this)
            })

            // Compile the template
            const compiledTemplate = Handlebars.compile(layout)

            // Prepare the data
            const templateData = {
                title: template.title || "",
                content: template.content || "",
                footer: template.footer || "",
                images: template.images || [],
                sections: [{ type: "title" }, { type: "content" }, { type: "image" }, { type: "footer" }],
                ...styles,
            }

            // Render the template
            const html = compiledTemplate(templateData)
            setCompiledHtml(html)
            setError(null)
        } catch (err) {
            console.error("Preview rendering error:", err)
            setError("Error rendering preview")
        }
    }, [template, styles, layout])

    if (error) {
        return (
            <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-2xl font-bold mb-4">Preview</h2>
                <div className="border rounded-lg p-4 text-red-500">{error}</div>
            </div>
        )
    }

    return (
        <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4">Preview</h2>
            <div className="border rounded-lg p-4">
                <iframe
                    srcDoc={compiledHtml}
                    title="Email Preview"
                    className="w-full min-h-[600px] border-0"
                    sandbox="allow-same-origin"
                />
            </div>
        </div>
    )
}

export default PreviewPanel

