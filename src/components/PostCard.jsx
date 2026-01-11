import React from 'react'
import appwriteService from '../appwrite/config'
import { Link } from 'react-router-dom'

function PostCard({$id, title,featuredImage}) {
    const imageUrl = appwriteService.getFilePreview(featuredImage);
    
    return (
        <Link to={`/post/${$id}`}>
            <div className='w-full bg-white rounded-2xl p-4 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border border-gray-100'>
                <div className='w-full overflow-hidden rounded-xl mb-4 bg-gray-200 min-h-48'>
                    <img 
                        src={imageUrl} 
                        alt={title}
                        onError={(e) => {
                            console.error('Image failed to load for post:', $id);
                            console.error('Attempted URL:', imageUrl);
                            console.error('Featured Image ID:', featuredImage);
                        }}
                        className='w-full h-48 object-cover rounded-xl hover:scale-110 transition-transform duration-300' 
                    />
                </div>
                <h2 className='text-lg font-bold text-gray-800 line-clamp-2 hover:text-blue-600 transition-colors'>
                    {title}
                </h2>
            </div>
        </Link>
    )
}

export default PostCard
