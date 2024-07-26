import React from 'react';
import appwriteService from '../appwrite/config';
import { Link } from 'react-router-dom';

function PostCard({ $id, title, featuredImage }) {
    return (
        <Link to={`/post/${$id}`}>
            <div className="w-full bg-white rounded-xl p-4 shadow-lg border border-transparent hover:border-blue-300 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <div className="w-full mb-4">
                    <img
                        src={appwriteService.getFilePreview(featuredImage)}
                        alt={title}
                        className="rounded-xl w-full object-cover h-48"
                    />
                </div>
                <div className="flex items-center justify-center h-16">
                    <h2 className="text-xl font-bold text-gray-800 text-center leading-tight">
                        {title}
                    </h2>
                </div>
            </div>
        </Link>
    );
}

export default PostCard;
