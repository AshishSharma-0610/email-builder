import React from 'react';

export function StyleControls({ section, styles, onStyleChange }) {
    return (
        <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-gray-900">Style Controls</h3>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Font Size</label>
                    <input
                        type="number"
                        value={styles[`${section}Size`] || 16}
                        onChange={(e) => onStyleChange(`${section}Size`, e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        min="8"
                        max="72"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Color</label>
                    <input
                        type="color"
                        value={styles[`${section}Color`] || '#000000'}
                        onChange={(e) => onStyleChange(`${section}Color`, e.target.value)}
                        className="mt-1 block w-full h-9 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                </div>

                <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Alignment</label>
                    <select
                        value={styles[`${section}Alignment`] || 'left'}
                        onChange={(e) => onStyleChange(`${section}Alignment`, e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                        <option value="left">Left</option>
                        <option value="center">Center</option>
                        <option value="right">Right</option>
                        <option value="justify">Justify</option>
                    </select>
                </div>
            </div>
        </div>
    );
}

