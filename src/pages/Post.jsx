import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import appwriteService from '../appwrite/config';
import { Button, Container } from '../components';
import parse from 'html-react-parser';
import { useSelector } from 'react-redux';

export default function Post() {
    const [post, setPost] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);
    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate('/');
            });
        } else navigate('/');
    }, [slug, navigate]);

    const deletePost = () => {
        setIsDeleting(true);
        appwriteService
            .deletePost(post.$id)
            .then((status) => {
                if (status) {
                    appwriteService.deleteFile(post.featuredImage);
                    navigate('/');
                }
            })
            .finally(() => {
                setIsDeleting(false);
            });
    };

    return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full h-80 flex flex-col md:flex-row md:items-center justify-center mb-4 relative border border-gray-200 rounded-xl p-4 bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
                    <img
                        src={appwriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl w-full md:w-72 h-72 object-cover mb-4 md:mb-0"
                    />

                    {isAuthor && (
                        <div className="absolute top-4 right-4 flex space-x-2">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button
                                    bgColor="bg-green-500"
                                    className="text-white"
                                >
                                    Edit
                                </Button>
                            </Link>
                            <Button
                                bgColor="bg-red-500"
                                onClick={deletePost}
                                className="text-white"
                                disabled={isDeleting}
                            >
                                {isDeleting ? 'Deleting...' : 'Delete'}
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-3xl text-center font-bold text-black-800">
                        {post.title}
                    </h1>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <div className="browser-css prose max-w-full">
                        {parse(post.content)}
                    </div>
                </div>
            </Container>
        </div>
    ) : (
        <div className="text-center py-8">Loading...</div>
    );
}
