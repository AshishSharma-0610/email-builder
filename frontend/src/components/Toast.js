import React from 'react';

export function Toast({ message, type = 'success', onClose }) {
    const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';

    return (
        <div className={`fixed bottom-4 right-4 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg`}>
            <div className="flex items-center space-x-2">
                <span>{message}</span>
                <button onClick={onClose} className="ml-2 hover:text-gray-200">
                    ×
                </button>
            </div>
        </div>
    );
}

export function useToast() {
    const [toast, setToast] = React.useState(null);

    const showToast = (message, type = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    const ToastComponent = toast ? (
        <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
        />
    ) : null;

    return [ToastComponent, showToast];
}

