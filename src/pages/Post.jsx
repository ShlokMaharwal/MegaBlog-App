import React, { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import appwriteService from "../appwrite/config"
import { Button, Container } from "../components"
import parse from "html-react-parser"
import { useSelector } from "react-redux"

export default function Post() {
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const { slug } = useParams()
  const navigate = useNavigate()
  const userData = useSelector((state) => state.auth.userData)
  const isAuthor = post && userData ? post.userId === userData.$id : false

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) setPost(post)
        else navigate("/")
      }).finally(() => setLoading(false))
    } else navigate("/")
  }, [slug, navigate])

  const deletePost = () => {
    if (!window.confirm('Are you sure you want to delete this post?')) return
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage)
        navigate("/")
      }
    })
  }

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-slate-50">
        <div className="w-8 h-8 border-2 border-indigo-200 border-t-indigo-500 rounded-full animate-spin" />
      </div>
    )
  }

  return post ? (
    <div className="py-10 min-h-screen bg-slate-50">
      <Container>
        <div className="max-w-3xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-slate-500 hover:text-slate-700 text-sm mb-6 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Posts
          </Link>

          <div className="rounded-2xl overflow-hidden mb-6 bg-slate-200 relative aspect-[16/7]">
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="w-full h-full object-cover"
              onError={(e) => { e.target.style.display = 'none' }}
            />
            {isAuthor && (
              <div className="absolute top-4 right-4 flex gap-2">
                <Link to={`/edit-post/${post.$id}`}>
                  <Button variant="secondary" className="text-sm shadow-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a2 2 0 01-1.414.586H9v-2a2 2 0 01.586-1.414z" />
                    </svg>
                    Edit
                  </Button>
                </Link>
                <Button variant="danger" className="text-sm shadow-sm" onClick={deletePost}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Delete
                </Button>
              </div>
            )}
          </div>

          <article className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
            <h1 className="text-3xl font-extrabold text-slate-900 mb-4 leading-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>
              {post.title}
            </h1>
            <div className="h-px bg-slate-100 mb-6" />
            <div className="prose max-w-none text-slate-600 leading-relaxed [&_h1]:text-slate-900 [&_h2]:text-slate-800 [&_h3]:text-slate-800 [&_p]:text-slate-600 [&_a]:text-indigo-600 [&_strong]:text-slate-800 [&_img]:rounded-xl [&_blockquote]:border-l-indigo-400 [&_blockquote]:text-slate-500 [&_code]:bg-indigo-50 [&_code]:text-indigo-700 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_pre]:bg-slate-50 [&_pre]:border [&_pre]:border-slate-200">
              {parse(post.content)}
            </div>
          </article>
        </div>
      </Container>
    </div>
  ) : null
}