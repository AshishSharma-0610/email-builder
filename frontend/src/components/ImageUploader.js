import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

function ImageUploader({ onUpload, loading }) {
    const onDrop = useCallback((acceptedFiles) => {
        onUpload(acceptedFiles);
    }, [onUpload]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.jpeg', '.jpg', '.png', '.gif']
        },
        maxSize: 5242880, // 5MB
        disabled: loading
    });

    return (
        <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer
        ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}
        ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
            <input {...getInputProps()} disabled={loading} />
            {loading ? (
                <p className="text-blue-500">Uploading...</p>
            ) : isDragActive ? (
                <p className="text-blue-500">Drop the image here...</p>
            ) : (
                <div>
                    <p className="text-gray-600">Drag & drop an image here, or click to select</p>
                    <p className="text-sm text-gray-500 mt-2">Supported formats: JPEG, PNG, GIF (max 5MB)</p>
                </div>
            )}
        </div>
    );
}

export default ImageUploader;

