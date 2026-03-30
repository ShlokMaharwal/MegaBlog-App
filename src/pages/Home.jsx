import React, { useEffect, useState } from 'react'
import appwriteService from "../appwrite/config"
import { Container, PostCard } from '../components'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

function Home() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const authStatus = useSelector((state) => state.auth.status)

  useEffect(() => {
    setLoading(true)
    appwriteService.getPosts().then((posts) => {
      if (posts && posts.documents) setPosts(posts.documents)
      else setPosts([])
    }).catch(() => setPosts([])).finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-indigo-200 border-t-indigo-500 rounded-full animate-spin" />
          <p className="text-slate-400 text-sm">Fetching posts…</p>
        </div>
      </div>
    )
  }

  if (posts.length === 0) {
    return (
      <div className="min-h-[85vh] flex flex-col">
        <section className="flex-1 flex items-center justify-center px-4 py-20 bg-slate-50">
          <div className="text-center max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-600 text-xs font-semibold tracking-widest uppercase border border-indigo-100 mb-8">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a2 2 0 01-1.414.586H9v-2a2 2 0 01.586-1.414z" />
              </svg>
              The Modern Blogging Platform
            </span>

            <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-5 leading-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Share Your{' '}
              <span className="text-indigo-600">Ideas</span>{' '}
              With the World
            </h1>

            <p className="text-slate-500 text-lg leading-relaxed mb-10 max-w-lg mx-auto">
              {authStatus
                ? "You're all set. Start writing your first post and share your unique perspective."
                : "Join thousands of writers. Create beautiful posts, grow your audience, and make an impact."}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              {authStatus ? (
                <Link
                  to="/add-post"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Write Your First Post
                </Link>
              ) : (
                <>
                  <Link
                    to="/signup"
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors"
                  >
                    Get Started Free
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                  <Link
                    to="/login"
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white text-slate-700 font-semibold border border-slate-200 hover:bg-slate-50 transition-colors"
                  >
                    Sign In
                  </Link>
                </>
              )}
            </div>

            <div className="mt-12 flex flex-wrap justify-center gap-2">
              {['Rich Text Editor', 'Media Uploads', 'Instant Publish', 'Secure Auth'].map((f) => (
                <span key={f} className="text-xs px-3 py-1.5 rounded-full bg-white border border-slate-200 text-slate-500">
                  ✓ {f}
                </span>
              ))}
            </div>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className='w-full py-10 min-h-screen bg-slate-50'>
      <Container>
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-indigo-600 text-xs font-semibold uppercase tracking-widest mb-1">Latest</p>
            <h1 className="text-3xl font-extrabold text-slate-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Recent Posts
            </h1>
          </div>
          {authStatus && (
            <Link
              to="/add-post"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-600 text-sm font-semibold hover:bg-indigo-100 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              New Post
            </Link>
          )}
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'>
          {posts.map((post) => (
            <PostCard key={post.$id} {...post} />
          ))}
        </div>
      </Container>
    </div>
  )
}

export default Home