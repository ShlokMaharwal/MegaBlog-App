
import React, {useEffect, useState} from 'react'
import {Container, PostForm} from '../components'
import appwriteService from "../appwrite/config";
import { useNavigate,  useParams } from 'react-router-dom';

function EditPost() {
    const [post, setPosts] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) {
                    setPosts(post)
                }
            })
        } else {
            navigate('/')
        }
    }, [slug, navigate])
  return post ? (
    <div className='py-12 bg-gradient-to-b from-gray-50 to-white min-h-screen'>
        <Container>
            <div className='max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8 border border-gray-100'>
                <h1 className='text-4xl font-bold text-gray-900 mb-8 text-center'>Edit Post</h1>
                <PostForm post={post} />
            </div>
        </Container>
    </div>
  ) : null
}

export default EditPost
