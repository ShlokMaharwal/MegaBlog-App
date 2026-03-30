import React, { useEffect, useState } from 'react'
import { Container, PostForm } from '../components'
import appwriteService from "../appwrite/config"
import { useNavigate, useParams } from 'react-router-dom'

function EditPost() {
  const [post, setPost] = useState(null)
  const { slug } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) setPost(post)
      })
    } else navigate('/')
  }, [slug, navigate])

  return post ? (
    <div className='py-10 min-h-screen bg-slate-50'>
      <Container>
        <div className="mb-7">
          <p className="text-amber-600 text-xs font-semibold uppercase tracking-widest mb-1">Editor</p>
          <h1 className="text-3xl font-extrabold text-slate-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Edit Post
          </h1>
          <p className="text-slate-400 text-sm mt-1 truncate max-w-lg">
            Editing: <span className="text-slate-600 font-medium">{post.title}</span>
          </p>
        </div>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null
}

export default EditPost
