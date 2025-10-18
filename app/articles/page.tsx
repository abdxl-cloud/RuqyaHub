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
    return response.items.filter((article) => article.is_published)
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
    <div className="min-h-screen py-20 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-5 mb-16 md:mb-20">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-semibold text-foreground text-balance tracking-tight">
            Articles & Resources
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed text-pretty">
            Educational content about Islamic spiritual healing, Ruqya practices, and protection from spiritual harm.
          </p>
        </div>

        {/* Categories */}
        <div className="mb-16 md:mb-20">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-foreground mb-8">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-5">
            {categories.map((category) => (
              <Link key={category.name} href={`#${category.name.toLowerCase().replace(/\s+/g, "-")}`}>
                <Card className="h-full card-hover border-border/50 hover:border-primary/30 bg-card/50 backdrop-blur-sm">
                  <CardContent className="p-6 flex flex-col items-center text-center space-y-3">
                    <div
                      className={`w-14 h-14 rounded-full ${category.color} flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm`}
                    >
                      <category.icon className="h-7 w-7" />
                    </div>
                    <span className="text-sm font-medium text-foreground leading-tight">{category.name}</span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Articles */}
        <div className="space-y-8">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-foreground">Latest Articles</h2>
          {articles.length === 0 ? (
            <Card>
              <CardContent className="p-16 text-center">
                <p className="text-muted-foreground text-lg">No articles available at the moment.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {articles.map((article) => (
                <Link key={article.id} href={`/articles/${article.slug}`}>
                  <Card className="h-full card-hover border-border/50 hover:border-primary/30 overflow-hidden bg-card/50 backdrop-blur-sm">
                    <div className="article-image">
                      <img
                        src={`/.jpg?key=pjwyp&height=300&width=500&query=${encodeURIComponent(article.title)}`}
                        alt={article.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardHeader className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="font-medium">
                          {article.category}
                        </Badge>
                      </div>
                      <CardTitle className="text-xl font-serif group-hover:text-primary transition-colors leading-tight">
                        {article.title}
                      </CardTitle>
                      <CardDescription className="text-base leading-relaxed line-clamp-2">
                        {article.excerpt}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>{new Date(article.created_at).toLocaleDateString()}</span>
                        <span className="font-medium">{article.read_time} min read</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Newsletter */}
        <section className="mt-20 md:mt-24 bg-primary text-primary-foreground rounded-2xl p-10 md:p-14 shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 islamic-pattern"></div>
          </div>
          <div className="max-w-2xl mx-auto text-center space-y-7 relative z-10">
            <h2 className="text-4xl md:text-5xl font-serif font-semibold tracking-tight">Stay Updated</h2>
            <p className="text-xl text-primary-foreground/90 leading-relaxed text-pretty">
              Subscribe to our newsletter for the latest articles, Ruqya tips, and Islamic spiritual wellness guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto pt-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-5 py-4 rounded-lg text-foreground bg-background border-0 focus:ring-2 focus:ring-accent shadow-md"
              />
              <button className="px-7 py-4 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold rounded-lg transition-all shadow-md hover:shadow-lg">
                Subscribe
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
