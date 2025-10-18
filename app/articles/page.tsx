// app/articles/[slug]/page.tsx

import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import ArticleContent from '@/components/articles/ArticleContent'
import RelatedArticles from '@/components/articles/RelatedArticles'

async function getArticle(slug: string) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
    const response = await fetch(`${apiUrl}/api/v1/articles/slug/${slug}`, {
      cache: 'no-store'
    })
    
    if (!response.ok) {
      if (response.status === 404) return null
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }
    
    return response.json()
  } catch (error) {
    console.error('Failed to fetch article:', error)
    return null
  }
}

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticle(slug)
  
  if (!article) {
    return {
      title: 'Article Not Found | Ruqya Healing Hub'
    }
  }

  return {
    title: `${article.title} | Ruqya Healing Hub`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      publishedTime: article.published_at,
      authors: [article.author],
    }
  }
}

export default async function ArticlePage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
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
