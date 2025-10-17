import { notFound } from "next/navigation"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, Clock, User, Share2 } from "lucide-react"
import { apiClient } from "@/lib/api-client"
import type { Article, PaginatedResponse } from "@/lib/api-types"

async function getArticle(slug: string): Promise<Article | null> {
  try {
    const article = await apiClient.get<Article>(`/articles/${slug}`)
    return article.published ? article : null
  } catch (error) {
    console.error("Failed to fetch article:", error)
    return null
  }
}

async function getRelatedArticles(category: string, currentId: string): Promise<Article[]> {
  try {
    const response = await apiClient.get<PaginatedResponse<Article>>(`/articles?category=${category}&skip=0&limit=4`)
    return response.items.filter((article) => article.id !== currentId && article.published).slice(0, 3)
  } catch (error) {
    console.error("Failed to fetch related articles:", error)
    return []
  }
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const article = await getArticle(params.slug)

  if (!article) {
    notFound()
  }

  const relatedArticles = await getRelatedArticles(article.category, article.id)

  return (
    <div className="min-h-screen py-8 md:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/articles" className="hover:text-foreground transition-colors">
            Articles
          </Link>
          <span>/</span>
          <span className="text-foreground">{article.title}</span>
        </nav>

        {/* Back Button */}
        <Link href="/articles">
          <Button variant="ghost" className="mb-6 -ml-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Articles
          </Button>
        </Link>

        {/* Article Header */}
        <article className="space-y-8">
          <header className="space-y-4">
            <Badge variant="secondary" className="mb-2">
              {article.category}
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-semibold text-foreground text-balance leading-tight">
              {article.title}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed text-pretty">{article.excerpt}</p>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-4 pt-4 text-sm text-muted-foreground border-t border-border">
              {article.author && (
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{article.author}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{new Date(article.created_at).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{article.read_time}</span>
              </div>
              <Button variant="ghost" size="sm" className="ml-auto">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </header>

          {/* Article Content */}
          <div
            className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-foreground prose-p:text-muted-foreground prose-p:leading-relaxed prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-foreground prose-ul:text-muted-foreground prose-ol:text-muted-foreground prose-li:marker:text-primary"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Article Footer */}
          <footer className="pt-8 border-t border-border">
            <div className="bg-muted/50 rounded-lg p-6 space-y-3">
              <h3 className="font-serif font-semibold text-lg">About the Author</h3>
              <p className="text-muted-foreground leading-relaxed">
                {article.author || "Sheikh Ahmad"} is a certified Ruqya practitioner with over 15 years of experience in
                Islamic spiritual healing. He specializes in treating spiritual ailments according to the Quran and
                Sunnah.
              </p>
            </div>
          </footer>
        </article>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="mt-16 pt-16 border-t border-border">
            <h2 className="text-3xl font-serif font-semibold text-foreground mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((relatedArticle) => (
                <Link key={relatedArticle.id} href={`/articles/${relatedArticle.slug}`}>
                  <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                    <CardHeader>
                      <Badge variant="secondary" className="w-fit mb-2">
                        {relatedArticle.category}
                      </Badge>
                      <CardTitle className="text-lg font-serif group-hover:text-primary transition-colors">
                        {relatedArticle.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-2">{relatedArticle.excerpt}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>{new Date(relatedArticle.created_at).toLocaleDateString()}</span>
                        <span>{relatedArticle.read_time}</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="mt-16 bg-primary text-primary-foreground rounded-lg p-8 md:p-12 text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold">Need Spiritual Healing?</h2>
          <p className="text-lg text-primary-foreground/90 leading-relaxed max-w-2xl mx-auto">
            Book a consultation with our certified Ruqya practitioners for personalized guidance and treatment.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
            <Link href="/services">
              <Button size="lg" variant="secondary">
                View Services
              </Button>
            </Link>
            <Link href="/services">
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              >
                Book Appointment
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
