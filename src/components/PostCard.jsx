import React from 'react'
import appwriteService from '../appwrite/config'
import { Link } from 'react-router-dom'

function PostCard({ $id, title, featuredImage, content }) {
  const imageUrl = appwriteService.getFilePreview(featuredImage)
  const excerpt = content ? content.replace(/<[^>]+>/g, '').slice(0, 100) + '…' : ''

  return (
    <Link to={`/post/${$id}`} className="block group h-full">
      <div className="h-full bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col hover:shadow-md hover:border-indigo-200 transition-shadow duration-200">
        <div className="h-44 bg-slate-100 flex-shrink-0 overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
            onError={(e) => { e.target.style.display = 'none' }}
          />
        </div>
        <div className="flex flex-col gap-2 p-4 flex-1">
          <h2 className="text-sm font-semibold text-slate-800 line-clamp-2 group-hover:text-indigo-600 transition-colors leading-snug">
            {title}
          </h2>
          {excerpt && (
            <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{excerpt}</p>
          )}
          <div className="mt-auto pt-2">
            <span className="text-xs font-medium text-indigo-600 flex items-center gap-1">
              Read more
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default PostCard
