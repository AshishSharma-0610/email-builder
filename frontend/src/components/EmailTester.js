import React, { useState } from 'react';
import axios from 'axios';

export function EmailTester({ templateId }) {
    const [email, setEmail] = useState('');
    const [sending, setSending] = useState(false);
    const [result, setResult] = useState(null);

    const sendTestEmail = async (e) => {
        e.preventDefault();
        setSending(true);
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/sendTestEmail`, {
                templateId,
                testEmail: email
            });
            setResult({ type: 'success', message: 'Test email sent successfully!' });
        } catch (error) {
            setResult({ type: 'error', message: 'Failed to send test email' });
        } finally {
            setSending(false);
        }
    };

    return (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-medium mb-4">Send Test Email</h3>
            <form onSubmit={sendTestEmail} className="space-y-4">
                <div>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter test email address"
                        className="w-full px-3 py-2 border rounded-md"
                        required
                    />
                </div>
                <button
                    type="submit"
                    disabled={sending}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:opacity-50"
                >
                    {sending ? 'Sending...' : 'Send Test Email'}
                </button>
                {result && (
                    <div className={`mt-2 text-sm ${result.type === 'success' ? 'text-green-600' : 'text-red-600'
                        }`}>
                        {result.message}
                    </div>
                )}
            </form>
        </div>
    );
}

