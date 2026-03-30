import React, { useState, useEffect } from 'react'
import { Container, PostCard } from '../components'
import appwriteService from "../appwrite/config"

function AllPosts() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    setLoading(true)
    appwriteService.getPosts([]).then((posts) => {
      if (posts && posts.documents) setPosts(posts.documents)
      else setPosts([])
    }).catch(() => setPosts([])).finally(() => setLoading(false))
  }, [])

  const filtered = posts.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  )

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-indigo-200 border-t-indigo-500 rounded-full animate-spin" />
          <p className="text-slate-400 text-sm">Loading posts…</p>
        </div>
      </div>
    )
  }

  return (
    <div className='w-full py-10 min-h-screen bg-slate-50'>
      <Container>
        <div className="mb-8">
          <p className="text-indigo-600 text-xs font-semibold uppercase tracking-widest mb-1">Explore</p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
                All Posts
              </h1>
              <p className="text-slate-400 text-sm mt-0.5">
                {posts.length} {posts.length === 1 ? 'post' : 'posts'} published
              </p>
            </div>
            <div className="relative w-full sm:w-64">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search posts…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-lg text-sm bg-white border border-slate-300 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-colors"
              />
            </div>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-2xl">🔍</div>
            <p className="text-slate-500 font-medium">No posts found for "{search}"</p>
            <button onClick={() => setSearch('')} className="text-indigo-600 text-sm hover:underline">
              Clear search
            </button>
          </div>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'>
            {filtered.map((post) => (
              <PostCard key={post.$id} {...post} />
            ))}
          </div>
        )}
      </Container>
    </div>
  )
}

export default AllPosts