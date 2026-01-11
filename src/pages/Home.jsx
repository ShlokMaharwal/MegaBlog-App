import React, {useEffect, useState} from 'react'
import appwriteService from "../appwrite/config";
import {Container, PostCard} from '../components'
import { useSelector } from 'react-redux'

function Home() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const authStatus = useSelector((state) => state.auth.status)

    useEffect(() => {
        setLoading(true)
        appwriteService.getPosts().then((posts) => {
            if (posts && posts.documents) {
                setPosts(posts.documents)
            } else {
                setPosts([])
            }
        }).catch((error) => {
            console.error("Error fetching posts:", error)
            setPosts([])
        }).finally(() => {
            setLoading(false)
        })
    }, [])
  
    if (loading) {
        return (
            <div className="w-full py-16 min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
                <Container>
                    <div className="text-center">
                        <div className="inline-block">
                            <div className="w-16 h-16 border-4 border-blue-500 border-t-blue-600 rounded-full animate-spin"></div>
                        </div>
                        <h1 className="text-3xl font-bold text-gray-800 mt-6">Loading posts...</h1>
                    </div>
                </Container>
            </div>
        )
    }

    if (posts.length === 0) {
        return (
            <div className="w-full py-16 min-h-screen bg-gradient-to-b from-gray-50 to-white">
                <Container>
                    <div className="flex flex-wrap justify-center">
                        <div className="p-4 w-full text-center">
                            <h1 className="text-4xl font-bold text-gray-900 mb-3">
                                {authStatus ? "📝 No posts yet. Create your first post!" : "🔐 Login to view posts"}
                            </h1>
                            <p className="text-gray-600 text-lg">
                                {authStatus ? "Share your thoughts with the world" : "Sign in to explore amazing posts"}
                            </p>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    return (
        <div className='w-full py-12 bg-gradient-to-b from-gray-50 to-white min-h-screen'>
            <Container>
                <h1 className="text-4xl font-bold text-gray-900 mb-12 text-center">Latest Posts</h1>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                    {posts.map((post) => (
                        <div key={post.$id}>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home