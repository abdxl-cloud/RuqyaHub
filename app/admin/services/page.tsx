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
import { Plus, Edit, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Service {
  id: string
  title: string
  description: string
  icon: string
}

export default function AdminServicesPage() {
  const { toast } = useToast()
  const [services, setServices] = useState<Service[]>([
    { id: "1", title: "Ruqya Appointment", description: "In-person spiritual healing sessions", icon: "🕌" },
    { id: "2", title: "Online Ruqya Appointment", description: "Remote healing via video call", icon: "💻" },
    { id: "3", title: "Consultations", description: "Spiritual guidance and advice", icon: "💬" },
  ])
  const [isEditing, setIsEditing] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({ title: "", description: "", icon: "" })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (editingId) {
      setServices(services.map((s) => (s.id === editingId ? { ...s, ...formData } : s)))
      toast({ title: "Service updated successfully" })
    } else {
      const newService = { id: Date.now().toString(), ...formData }
      setServices([...services, newService])
      toast({ title: "Service added successfully" })
    }

    setFormData({ title: "", description: "", icon: "" })
    setIsEditing(false)
    setEditingId(null)
  }

  const handleEdit = (service: Service) => {
    setFormData({ title: service.title, description: service.description, icon: service.icon })
    setEditingId(service.id)
    setIsEditing(true)
  }

  const handleDelete = (id: string) => {
    setServices(services.filter((s) => s.id !== id))
    toast({ title: "Service deleted successfully" })
  }

  return (
    <AdminAuthGuard>
      <AdminLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-serif font-semibold">Services Management</h1>
              <p className="text-muted-foreground mt-2">Manage your service offerings</p>
            </div>
            <Button onClick={() => setIsEditing(!isEditing)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Service
            </Button>
          </div>

          {isEditing && (
            <Card>
              <CardHeader>
                <CardTitle>{editingId ? "Edit Service" : "Add New Service"}</CardTitle>
                <CardDescription>Fill in the service details below</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Service Title</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="e.g., Ruqya Appointment"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Brief description of the service"
                      rows={3}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="icon">Icon (emoji or text)</Label>
                    <Input
                      id="icon"
                      value={formData.icon}
                      onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                      placeholder="🕌"
                      required
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button type="submit">{editingId ? "Update" : "Add"} Service</Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setIsEditing(false)
                        setEditingId(null)
                        setFormData({ title: "", description: "", icon: "" })
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <Card key={service.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="text-3xl mb-2">{service.icon}</div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(service)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(service.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                  <CardTitle>{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </AdminLayout>
    </AdminAuthGuard>
  )
}
