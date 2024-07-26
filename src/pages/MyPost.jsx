import React, { useEffect, useState } from 'react';
import service from '../appwrite/config';
import { useSelector } from 'react-redux';
import { Container, PostCard } from '../components';

export default function MyPosts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const userData = useSelector((state) => state.auth.userData);

    useEffect(() => {
        if (userData) {
            const fetchPosts = async () => {
                const response = await service.getPostsByUserId(userData.$id);
                if (response) {
                    setPosts(response.documents);
                }
                setLoading(false);
            };

            fetchPosts();
        } else {
            setLoading(false);
        }
    }, [userData]);

    if (loading) {
        return (
            <div className="w-full py-8 text-center">
                <p>Loading your posts...</p>
            </div>
        );
    }

    return (
        <div className="w-full py-8">
            <Container>
                <h1 className="text-3xl font-bold mb-6 text-center">
                    My Posts
                </h1>
                <div className="flex flex-wrap -mx-2">
                    {posts.length === 0 ? (
                        <p className="text-center w-full">
                            You have no posts yet or refresh the page to see
                            your posts.
                        </p>
                    ) : (
                        posts.map((post) => (
                            <div
                                key={post.$id}
                                className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
                            >
                                <PostCard {...post} />
                            </div>
                        ))
                    )}
                </div>
            </Container>
        </div>
    );
}
