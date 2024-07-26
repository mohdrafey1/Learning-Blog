import React, { useEffect, useState } from 'react';
import authService from '../appwrite/auth';

function Profile() {
    const [user, setUser] = useState(null);
    const [showDetails, setShowDetails] = useState(false);

    useEffect(() => {
        const fetchUserDetails = async () => {
            const currentUser = await authService.getCurrentUser();
            setUser(currentUser);
        };

        fetchUserDetails();
    }, []);

    const handleToggleDetails = () => {
        setShowDetails(!showDetails);
    };

    if (!user) {
        return (
            <div className="flex justify-center items-center h-screen">
                Loading...
            </div>
        );
    }

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
                <h1 className="text-2xl font-semibold mb-4">Profile</h1>
                <p className="text-gray-700 mb-4">Welcome, {user.name}</p>
                <button
                    onClick={handleToggleDetails}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                    {showDetails ? 'Hide Details' : 'Show Details'}
                </button>
                {showDetails && (
                    <div className="mt-4">
                        <p className="text-gray-700">Email: {user.email}</p>
                        <p className="text-gray-700">
                            Created At:{' '}
                            {new Date(user.registration).toLocaleString()}
                        </p>
                        {/* Add more user details as needed */}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Profile;
