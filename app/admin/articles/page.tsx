"use client"

import type React from "react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { AdminAuthGuard } from "@/components/admin-auth-guard"
import { AdminLayout } from "@/components/admin-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RichTextEditor } from "@/components/rich-text-editor"
import { Plus, Edit, Trash2, Eye } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { apiClient } from "@/lib/api-client"
import type { Article, PaginatedResponse } from "@/lib/api-types"

const categories = ["Evil Eye & Envy", "Black Magic", "Jinn Possession", "Jinn 'Aashiq", "Taweez", "Ruqya for Children"]

export default function AdminArticlesPage() {
  const { toast } = useToast()
  const [articles, setArticles] = useState<Article[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    content: "",
    excerpt: "",
    read_time: "",
    author: "",
    published: true,
  })

  useEffect(() => {
    fetchArticles()
  }, [])

  const fetchArticles = async () => {
    try {
      const response = await apiClient.get<PaginatedResponse<Article>>("/articles?skip=0&limit=100", true)
      setArticles(response.items)
    } catch (error) {
      console.error("Failed to fetch articles:", error)
      toast({ title: "Failed to load articles", variant: "destructive" })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      if (editingId) {
        const updated = await apiClient.put<Article>(`/articles/${editingId}`, formData, true)
        setArticles(articles.map((a) => (a.id === editingId ? updated : a)))
        toast({ title: "Article updated successfully" })
      } else {
        const newArticle = await apiClient.post<Article>("/articles", formData, true)
        setArticles([newArticle, ...articles])
        toast({ title: "Article published successfully" })
      }

      setFormData({ title: "", category: "", content: "", excerpt: "", read_time: "", author: "", published: true })
      setIsEditing(false)
      setEditingId(null)
    } catch (error) {
      console.error("Failed to save article:", error)
      toast({ title: "Failed to save article", variant: "destructive" })
    }
  }

  const handleEdit = (article: Article) => {
    setFormData({
      title: article.title,
      category: article.category,
      content: article.content,
      excerpt: article.excerpt,
      read_time: article.read_time || "",
      author: article.author || "",
      published: article.published,
    })
    setEditingId(article.id)
    setIsEditing(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this article?")) return

    try {
      await apiClient.delete(`/articles/${id}`, true)
      setArticles(articles.filter((a) => a.id !== id))
      toast({ title: "Article deleted successfully" })
    } catch (error) {
      console.error("Failed to delete article:", error)
      toast({ title: "Failed to delete article", variant: "destructive" })
    }
  }

  if (isLoading) {
    return (
      <AdminAuthGuard>
        <AdminLayout>
          <div className="flex items-center justify-center h-64">
            <p className="text-muted-foreground">Loading articles...</p>
          </div>
        </AdminLayout>
      </AdminAuthGuard>
    )
  }

  return (
    <AdminAuthGuard>
      <AdminLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-serif font-semibold">Articles Management</h1>
              <p className="text-muted-foreground mt-2">Create and manage your articles</p>
            </div>
            <Button onClick={() => setIsEditing(!isEditing)}>
              <Plus className="h-4 w-4 mr-2" />
              New Article
            </Button>
          </div>

          {isEditing && (
            <Card>
              <CardHeader>
                <CardTitle>{editingId ? "Edit Article" : "Create New Article"}</CardTitle>
                <CardDescription>Write your article content below</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="title">Article Title</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="Enter article title"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) => setFormData({ ...formData, category: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((cat) => (
                            <SelectItem key={cat} value={cat}>
                              {cat}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="author">Author</Label>
                      <Input
                        id="author"
                        value={formData.author}
                        onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                        placeholder="Author name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="read_time">Read Time</Label>
                      <Input
                        id="read_time"
                        value={formData.read_time}
                        onChange={(e) => setFormData({ ...formData, read_time: e.target.value })}
                        placeholder="e.g., 8 min read"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="excerpt">Excerpt</Label>
                    <Input
                      id="excerpt"
                      value={formData.excerpt}
                      onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                      placeholder="Brief summary of the article"
                      required
                    />
                  </div>
                  <RichTextEditor
                    label="Article Content"
                    value={formData.content}
                    onChange={(value) => setFormData({ ...formData, content: value })}
                  />
                  <div className="flex gap-2">
                    <Button type="submit">{editingId ? "Update" : "Publish"} Article</Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setIsEditing(false)
                        setEditingId(null)
                        setFormData({
                          title: "",
                          category: "",
                          content: "",
                          excerpt: "",
                          read_time: "",
                          author: "",
                          published: true,
                        })
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          <div className="space-y-4">
            {articles.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <p className="text-muted-foreground">No articles yet. Create your first article!</p>
                </CardContent>
              </Card>
            ) : (
              articles.map((article) => (
                <Card key={article.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                            {article.category}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {new Date(article.created_at).toLocaleDateString()}
                          </span>
                          {!article.published && (
                            <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">Draft</span>
                          )}
                        </div>
                        <CardTitle>{article.title}</CardTitle>
                        <CardDescription className="mt-2">{article.excerpt}</CardDescription>
                      </div>
                      <div className="flex gap-1">
                        <Link href={`/articles/${article.slug}`} target="_blank">
                          <Button variant="ghost" size="icon" title="Preview">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button variant="ghost" size="icon" onClick={() => handleEdit(article)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(article.id)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))
            )}
          </div>
        </div>
      </AdminLayout>
    </AdminAuthGuard>
  )
}
