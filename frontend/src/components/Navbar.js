import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
    const location = useLocation();

    return (
        <nav className="bg-white shadow-lg">
            <div className="container mx-auto px-4">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center">
                            <Link to="/" className="text-xl font-bold text-gray-800">
                                Email Builder
                            </Link>
                        </div>
                        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                            <Link
                                to="/"
                                className={`${location.pathname === '/'
                                        ? 'border-blue-500 text-gray-900'
                                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                                    } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                            >
                                Templates
                            </Link>
                            <Link
                                to="/builder"
                                className={`${location.pathname === '/builder'
                                        ? 'border-blue-500 text-gray-900'
                                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                                    } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                            >
                                New Template
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;

