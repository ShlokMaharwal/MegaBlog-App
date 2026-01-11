import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-12 bg-gradient-to-b from-gray-50 to-white min-h-screen">
            <Container>
                <div className="max-w-4xl mx-auto">
                    <div className="w-full mb-8 relative rounded-2xl overflow-hidden shadow-lg bg-gray-200">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            onError={(e) => {
                                console.error('Post image failed to load:', post.featuredImage);
                                e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23ddd" width="100" height="100"/%3E%3Ctext x="50" y="50" text-anchor="middle" dy=".3em" fill="%23999" font-size="14"%3ENo Image%3C/text%3E%3C/svg%3E';
                            }}
                            className="w-full h-96 object-cover"
                        />

                        {isAuthor && (
                            <div className="absolute top-6 right-6 flex gap-3 z-10">
                                <Link to={`/edit-post/${post.$id}`}>
                                    <Button bgColor="bg-blue-500 hover:bg-blue-600" className="shadow-lg">
                                        ✏️ Edit
                                    </Button>
                                </Link>
                                <Button bgColor="bg-red-500 hover:bg-red-600" onClick={deletePost} className="shadow-lg">
                                    🗑️ Delete
                                </Button>
                            </div>
                        )}
                    </div>

                    <article className="bg-white rounded-2xl p-8 shadow-md border border-gray-100">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
                        <div className="w-12 h-1 bg-blue-500 mb-8 rounded-full"></div>
                        <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed">
                            {parse(post.content)}
                        </div>
                    </article>
                </div>
            </Container>
        </div>
    ) : null;
}