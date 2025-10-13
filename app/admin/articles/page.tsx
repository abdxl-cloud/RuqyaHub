"use client"

import type React from "react"
import Link from "next/link"
import { useState } from "react"
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
import { articlesData as initialArticles, generateSlug, type Article } from "@/lib/articles-data"

const categories = ["Evil Eye & Envy", "Black Magic", "Jinn Possession", "Jinn 'Aashiq", "Taweez", "Ruqya for Children"]

export default function AdminArticlesPage() {
  const { toast } = useToast()
  const [articles, setArticles] = useState<Article[]>(initialArticles)
  const [isEditing, setIsEditing] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    content: "",
    excerpt: "",
    readTime: "",
    author: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (editingId) {
      setArticles(
        articles.map((a) =>
          a.id === editingId
            ? {
                ...a,
                ...formData,
                date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
              }
            : a,
        ),
      )
      toast({ title: "Article updated successfully" })
    } else {
      const newArticle: Article = {
        id: Date.now().toString(),
        ...formData,
        date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
      }
      setArticles([...articles, newArticle])
      toast({ title: "Article published successfully" })
    }

    setFormData({ title: "", category: "", content: "", excerpt: "", readTime: "", author: "" })
    setIsEditing(false)
    setEditingId(null)
  }

  const handleEdit = (article: Article) => {
    setFormData({
      title: article.title,
      category: article.category,
      content: article.content,
      excerpt: article.excerpt,
      readTime: article.readTime || "",
      author: article.author || "",
    })
    setEditingId(article.id)
    setIsEditing(true)
  }

  const handleDelete = (id: string) => {
    setArticles(articles.filter((a) => a.id !== id))
    toast({ title: "Article deleted successfully" })
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
                      <Label htmlFor="readTime">Read Time</Label>
                      <Input
                        id="readTime"
                        value={formData.readTime}
                        onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
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
                        setFormData({ title: "", category: "", content: "", excerpt: "", readTime: "", author: "" })
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
            {articles.map((article) => (
              <Card key={article.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                          {article.category}
                        </span>
                        <span className="text-xs text-muted-foreground">{article.date}</span>
                      </div>
                      <CardTitle>{article.title}</CardTitle>
                      <CardDescription className="mt-2">{article.excerpt}</CardDescription>
                    </div>
                    <div className="flex gap-1">
                      <Link href={`/articles/${generateSlug(article.title)}`} target="_blank">
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
            ))}
          </div>
        </div>
      </AdminLayout>
    </AdminAuthGuard>
  )
}
