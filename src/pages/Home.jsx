import React, { useEffect, useState } from 'react';
import appwriteService from '../appwrite/config';
import { Container, PostCard } from '../components';

function Home() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 8;

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents);
            }
            setLoading(false);
        });
    }, []);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
    const totalPages = Math.ceil(posts.length / postsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if (loading) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex justify-center items-center h-screen">
                        <div className="flex items-center space-x-2">
                            <div
                                className="spinner-border animate-spin inline-block w-8 h-8 border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full"
                                role="status"
                            ></div>
                            <span className="text-xl">Loading...</span>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }

    if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-7xl font-bold hover:text-gray-500">
                                Login to read and add posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }

    return (
        <div className="w-full py-8">
            <Container>
                <div className="flex flex-wrap">
                    {currentPosts.map((post) => (
                        <div
                            key={post.$id}
                            className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
                        >
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
                {totalPages > 1 && (
                    <div className="flex justify-center mt-4">
                        <ul className="flex list-none">
                            {[...Array(totalPages)].map((_, index) => (
                                <li key={index} className="mx-1">
                                    <button
                                        onClick={() => paginate(index + 1)}
                                        className={`px-3 py-2 rounded-lg ${
                                            currentPage === index + 1
                                                ? 'bg-blue-500 text-white'
                                                : 'bg-gray-200 hover:bg-gray-300'
                                        }`}
                                    >
                                        {index + 1}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </Container>
        </div>
    );
}

export default Home;
