import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function TemplateList() {
    const [templates, setTemplates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTemplates = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/templates`);
                setTemplates(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch templates');
                setLoading(false);
            }
        };

        fetchTemplates();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this template?')) {
            try {
                await axios.delete(`${process.env.REACT_APP_API_URL}/templates/${id}`);
                setTemplates(templates.filter(template => template._id !== id));
            } catch (err) {
                setError('Failed to delete template');
            }
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 my-4">
                <div className="flex">
                    <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className="ml-3">
                        <p className="text-sm text-red-700">{error}</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Email Templates</h2>
                <Link
                    to="/builder"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                >
                    Create New Template
                </Link>
            </div>

            {templates.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">No templates found. Create your first template!</p>
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {templates.map((template) => (
                        <div
                            key={template._id}
                            className="bg-white rounded-lg shadow-md overflow-hidden"
                        >
                            <div className="p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    {template.title}
                                </h3>
                                <p className="text-gray-500 text-sm mb-4">
                                    Last updated: {new Date(template.updatedAt).toLocaleDateString()}
                                </p>
                                <div className="flex space-x-3">
                                    <Link
                                        to={`/builder/${template._id}`}
                                        className="flex-1 bg-blue-100 text-blue-600 px-4 py-2 rounded-md text-center hover:bg-blue-200 transition-colors"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(template._id)}
                                        className="flex-1 bg-red-100 text-red-600 px-4 py-2 rounded-md hover:bg-red-200 transition-colors"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default TemplateList;

