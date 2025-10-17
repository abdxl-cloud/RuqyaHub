import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Eye, Heart, Zap, Ghost, FileText, Baby } from "lucide-react"
import type { Metadata } from "next"
import { apiClient } from "@/lib/api-client"
import type { Article, PaginatedResponse } from "@/lib/api-types"

export const metadata: Metadata = {
  title: "Articles & Resources - Islamic Spiritual Healing",
  description:
    "Educational articles about Islamic spiritual healing, Ruqya practices, protection from evil eye, black magic, jinn possession, and spiritual wellness guidance.",
  keywords: [
    "Ruqya articles",
    "Islamic healing guide",
    "evil eye protection",
    "black magic cure",
    "jinn possession",
    "spiritual wellness",
    "Islamic resources",
  ],
  openGraph: {
    title: "Articles & Resources - Islamic Spiritual Healing",
    description:
      "Educational articles about Islamic spiritual healing, Ruqya practices, and protection from spiritual harm.",
    url: "/articles",
  },
}

async function getArticles(): Promise<Article[]> {
  try {
    const response = await apiClient.get<PaginatedResponse<Article>>("/articles?skip=0&limit=100")
    return response.items.filter((article) => article.published)
  } catch (error) {
    console.error("Failed to fetch articles:", error)
    return []
  }
}

export default async function ArticlesPage() {
  const categories = [
    { name: "Evil Eye & Envy", icon: Eye, color: "bg-primary/10 text-primary" },
    { name: "Black Magic", icon: Zap, color: "bg-primary/10 text-primary" },
    { name: "Jinn Possession", icon: Ghost, color: "bg-primary/10 text-primary" },
    { name: "Jinn 'Aashiq", icon: Heart, color: "bg-primary/10 text-primary" },
    { name: "Taweez", icon: FileText, color: "bg-primary/10 text-primary" },
    { name: "Ruqya for Children", icon: Baby, color: "bg-primary/10 text-primary" },
  ]

  const articles = await getArticles()

  return (
    <div className="min-h-screen py-16 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-semibold text-foreground text-balance">
            Articles & Resources
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed text-pretty">
            Educational content about Islamic spiritual healing, Ruqya practices, and protection from spiritual harm.
          </p>
        </div>

        {/* Categories */}
        <div className="mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl font-serif font-semibold text-foreground mb-6">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <Link key={category.name} href={`#${category.name.toLowerCase().replace(/\s+/g, "-")}`}>
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                  <CardContent className="p-6 flex flex-col items-center text-center space-y-3">
                    <div
                      className={`w-12 h-12 rounded-full ${category.color} flex items-center justify-center group-hover:scale-110 transition-transform`}
                    >
                      <category.icon className="h-6 w-6" />
                    </div>
                    <span className="text-sm font-medium text-foreground">{category.name}</span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Articles */}
        <div className="space-y-6">
          <h2 className="text-2xl md:text-3xl font-serif font-semibold text-foreground">Latest Articles</h2>
          {articles.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <p className="text-muted-foreground">No articles available at the moment.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {articles.map((article) => (
                <Link key={article.id} href={`/articles/${article.slug}`}>
                  <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                    <CardHeader>
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="secondary">{article.category}</Badge>
                      </div>
                      <CardTitle className="text-xl font-serif group-hover:text-primary transition-colors">
                        {article.title}
                      </CardTitle>
                      <CardDescription className="text-base leading-relaxed">{article.excerpt}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>{new Date(article.created_at).toLocaleDateString()}</span>
                        <span>{article.read_time}</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Newsletter */}
        <section className="mt-16 md:mt-20 bg-primary text-primary-foreground rounded-lg p-8 md:p-12">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-semibold">Stay Updated</h2>
            <p className="text-lg text-primary-foreground/90 leading-relaxed">
              Subscribe to our newsletter for the latest articles, Ruqya tips, and Islamic spiritual wellness guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto pt-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-md text-foreground bg-background border-0 focus:ring-2 focus:ring-accent"
              />
              <button className="px-6 py-3 bg-accent hover:bg-accent/90 text-accent-foreground font-medium rounded-md transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
