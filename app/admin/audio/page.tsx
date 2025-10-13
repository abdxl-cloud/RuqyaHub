"use client"

import type React from "react"

import { useState } from "react"
import { AdminAuthGuard } from "@/components/admin-auth-guard"
import { AdminLayout } from "@/components/admin-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileUpload } from "@/components/file-upload"
import { Plus, Edit, Trash2, Play, Download } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Audio {
  id: string
  title: string
  reciter: string
  description: string
  category: string
  duration: string
  audioUrl: string
  downloads: number
}

const categories = [
  "Surah Recitation",
  "Ruqya for Evil Eye",
  "Ruqya for Black Magic",
  "Ruqya for Jinn",
  "General Ruqya",
]

export default function AdminAudioPage() {
  const { toast } = useToast()
  const [audioFiles, setAudioFiles] = useState<Audio[]>([
    {
      id: "1",
      title: "Ayat Al-Kursi",
      reciter: "Sheikh Mishary Rashid",
      description: "Powerful protection verse",
      category: "Surah Recitation",
      duration: "3:45",
      audioUrl: "/placeholder-audio.mp3",
      downloads: 1250,
    },
    {
      id: "2",
      title: "Ruqya for Protection",
      reciter: "Sheikh Yasser Al-Dosari",
      description: "Complete ruqya for daily protection",
      category: "General Ruqya",
      duration: "25:30",
      audioUrl: "/placeholder-audio.mp3",
      downloads: 890,
    },
  ])
  const [isEditing, setIsEditing] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    reciter: "",
    description: "",
    category: "",
    duration: "",
  })
  const [audioFile, setAudioFile] = useState<File | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!audioFile && !editingId) {
      toast({ title: "Please upload an audio file", variant: "destructive" })
      return
    }

    const audioUrl = audioFile ? URL.createObjectURL(audioFile) : ""

    if (editingId) {
      setAudioFiles(
        audioFiles.map((a) =>
          a.id === editingId
            ? {
                ...a,
                ...formData,
                audioUrl: audioUrl || a.audioUrl,
              }
            : a,
        ),
      )
      toast({ title: "Audio updated successfully" })
    } else {
      const newAudio = {
        id: Date.now().toString(),
        ...formData,
        audioUrl,
        downloads: 0,
      }
      setAudioFiles([...audioFiles, newAudio])
      toast({ title: "Audio uploaded successfully" })
    }

    setFormData({ title: "", reciter: "", description: "", category: "", duration: "" })
    setAudioFile(null)
    setIsEditing(false)
    setEditingId(null)
  }

  const handleEdit = (audio: Audio) => {
    setFormData({
      title: audio.title,
      reciter: audio.reciter,
      description: audio.description,
      category: audio.category,
      duration: audio.duration,
    })
    setEditingId(audio.id)
    setIsEditing(true)
  }

  const handleDelete = (id: string) => {
    setAudioFiles(audioFiles.filter((a) => a.id !== id))
    toast({ title: "Audio deleted successfully" })
  }

  return (
    <AdminAuthGuard>
      <AdminLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-serif font-semibold">Ruqya Audio Management</h1>
              <p className="text-muted-foreground mt-2">Upload and manage Ruqya audio recitations</p>
            </div>
            <Button onClick={() => setIsEditing(!isEditing)}>
              <Plus className="h-4 w-4 mr-2" />
              Upload Audio
            </Button>
          </div>

          {isEditing && (
            <Card>
              <CardHeader>
                <CardTitle>{editingId ? "Edit Audio" : "Upload New Audio"}</CardTitle>
                <CardDescription>Fill in the audio details and upload file</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="title">Audio Title</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="e.g., Ayat Al-Kursi"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="reciter">Reciter Name</Label>
                      <Input
                        id="reciter"
                        value={formData.reciter}
                        onChange={(e) => setFormData({ ...formData, reciter: e.target.value })}
                        placeholder="e.g., Sheikh Mishary Rashid"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
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
                    <div className="space-y-2">
                      <Label htmlFor="duration">Duration</Label>
                      <Input
                        id="duration"
                        value={formData.duration}
                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                        placeholder="e.g., 3:45"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Brief description of the audio"
                      rows={3}
                      required
                    />
                  </div>
                  <FileUpload label="Audio File (MP3)" accept="audio/*" onFileSelect={setAudioFile} value={audioFile} />
                  <div className="flex gap-2">
                    <Button type="submit">{editingId ? "Update" : "Upload"} Audio</Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setIsEditing(false)
                        setEditingId(null)
                        setFormData({ title: "", reciter: "", description: "", category: "", duration: "" })
                        setAudioFile(null)
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          <div className="grid gap-4 md:grid-cols-2">
            {audioFiles.map((audio) => (
              <Card key={audio.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                          {audio.category}
                        </span>
                        <span className="text-xs text-muted-foreground">{audio.duration}</span>
                      </div>
                      <CardTitle className="text-lg">{audio.title}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">by {audio.reciter}</p>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" title="Play">
                        <Play className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(audio)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(audio.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">{audio.description}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Download className="h-3 w-3" />
                      <span>{audio.downloads} downloads</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </AdminLayout>
    </AdminAuthGuard>
  )
}
