// components/articles/ArticleContent.tsx

'use client'

import { Calendar, Clock, User, Share2, Bookmark } from 'lucide-react'
import { useState } from 'react'

interface Article {
  id: number
  title: string
  slug: string
  content: string
  excerpt: string
  category: string
  author: string
  read_time: number
  published_at: string
  created_at: string
  updated_at: string
}

interface ArticleContentProps {
  article: Article
}

export default function ArticleContent({ article }: ArticleContentProps) {
  const [isBookmarked, setIsBookmarked] = useState(false)

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.excerpt,
          url: window.location.href,
        })
      } catch (error) {
        console.log('Error sharing:', error)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
  }

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked)
    // TODO: Save to user's bookmarks via API
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <article className="max-w-4xl mx-auto px-4 py-12">
      {/* Category Badge */}
      <div className="mb-4">
        <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
          {article.category}
        </span>
      </div>

      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
        {article.title}
      </h1>

      {/* Metadata */}
      <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8 pb-8 border-b">
        <div className="flex items-center gap-2">
          <User className="w-4 h-4" />
          <span className="text-sm">{article.author}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          <span className="text-sm">{formatDate(article.published_at)}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          <span className="text-sm">{article.read_time} min read</span>
        </div>

        <div className="ml-auto flex items-center gap-4">
          <button
            onClick={handleShare}
            className="flex items-center gap-2 text-gray-600 hover:text-emerald-600 transition-colors"
            aria-label="Share article"
          >
            <Share2 className="w-5 h-5" />
          </button>
          
          <button
            onClick={handleBookmark}
            className={`flex items-center gap-2 transition-colors ${
              isBookmarked ? 'text-emerald-600' : 'text-gray-600 hover:text-emerald-600'
            }`}
            aria-label="Bookmark article"
          >
            <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>

      {/* Excerpt */}
      <div className="mb-8">
        <p className="text-xl text-gray-700 leading-relaxed italic border-l-4 border-emerald-500 pl-4">
          {article.excerpt}
        </p>
      </div>

      {/* Content */}
      <div 
        className="prose prose-lg prose-emerald max-w-none
          prose-headings:text-gray-900 
          prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
          prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
          prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6
          prose-a:text-emerald-600 prose-a:no-underline hover:prose-a:underline
          prose-strong:text-gray-900 prose-strong:font-semibold
          prose-ul:my-6 prose-ul:list-disc prose-ul:pl-6
          prose-ol:my-6 prose-ol:list-decimal prose-ol:pl-6
          prose-li:text-gray-700 prose-li:mb-2
          prose-blockquote:border-l-4 prose-blockquote:border-emerald-500 
          prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-700
          prose-code:text-emerald-600 prose-code:bg-emerald-50 prose-code:px-1 prose-code:rounded"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />

      {/* Tags/Topics (if needed later) */}
      <div className="mt-12 pt-8 border-t">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600 font-medium">Topics:</span>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
              {article.category}
            </span>
            {/* Add more tags if available */}
          </div>
        </div>
      </div>
    </article>
  )
}
