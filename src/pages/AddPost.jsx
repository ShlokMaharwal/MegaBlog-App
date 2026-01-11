import React from 'react'
import { Container, PostForm } from '../components'

function AddPost() {
  return (
    <div className='py-12 bg-gradient-to-b from-gray-50 to-white min-h-screen'>
        <Container>
            <div className='max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8 border border-gray-100'>
                <h1 className='text-4xl font-bold text-gray-900 mb-8 text-center'>Create New Post</h1>
                <PostForm />
            </div>
        </Container>
    </div>
  )
}

export default AddPost