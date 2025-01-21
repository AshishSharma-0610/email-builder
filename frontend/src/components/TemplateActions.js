import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export function TemplateActions({ template, onSuccess }) {
    const navigate = useNavigate();

    const duplicateTemplate = async () => {
        try {
            const { _id, createdAt, updatedAt, ...templateData } = template;
            templateData.title = `${templateData.title} (Copy)`;

            const response = await axios.post(`${process.env.REACT_APP_API_URL}/uploadEmailConfig`, templateData);
            onSuccess('Template duplicated successfully');
            navigate(`/builder/${response.data.template._id}`);
        } catch (error) {
            console.error('Error duplicating template:', error);
        }
    };

    const previewTemplate = () => {
        const previewWindow = window.open('', '_blank');
        previewWindow.document.write(template.content);
        previewWindow.document.close();
    };

    return (
        <div className="flex space-x-2">
            <button
                onClick={duplicateTemplate}
                className="bg-green-100 text-green-600 px-4 py-2 rounded-md hover:bg-green-200 transition-colors"
            >
                Duplicate
            </button>
            <button
                onClick={previewTemplate}
                className="bg-purple-100 text-purple-600 px-4 py-2 rounded-md hover:bg-purple-200 transition-colors"
            >
                Preview
            </button>
        </div>
    );
}

