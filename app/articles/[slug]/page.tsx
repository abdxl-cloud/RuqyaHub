// app/articles/[slug]/page.tsx

import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import ArticleContent from '@/components/articles/ArticleContent'
import RelatedArticles from '@/components/articles/RelatedArticles'

async function getArticle(slug: string) {
  try {
    // Use the /slug/ endpoint specifically
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/articles/slug/${slug}`,
      {
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
        }
      }
    )
    
    if (!response.ok) {
      if (response.status === 404) return null
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.detail || `HTTP ${response.status}`)
    }
    
    return response.json()
  } catch (error) {
    console.error('Failed to fetch article:', error)
    return null
  }
}


export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticle(slug)
  
  if (!article) {
    return {
      title: 'Article Not Found'
    }
  }

  return {
    title: `${article.title} | Ruqya Healing Hub`,
    description: article.excerpt,
  }
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = await getArticle(slug)

  if (!article) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      <ArticleContent article={article} />
      <RelatedArticles currentArticleId={article.id} category={article.category} />
    </div>
  )
}
