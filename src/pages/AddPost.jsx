import React from 'react'
import { Container, PostForm } from '../components'

function AddPost() {
  return (
    <div className='py-10 min-h-screen bg-slate-50'>
      <Container>
        <div className="mb-7">
          <p className="text-indigo-600 text-xs font-semibold uppercase tracking-widest mb-1">Editor</p>
          <h1 className="text-3xl font-extrabold text-slate-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Write a New Post
          </h1>
          <p className="text-slate-400 text-sm mt-1">Share your thoughts and ideas with the world.</p>
        </div>
        <PostForm />
      </Container>
    </div>
  )
}

export default AddPost