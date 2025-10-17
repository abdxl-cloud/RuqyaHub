import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Video, Users, BookOpen, GraduationCap, MessageCircle } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"
import { apiClient } from "@/lib/api-client"
import type { Service, PaginatedResponse } from "@/lib/api-types"

export const metadata: Metadata = {
  title: "Ruqya Services - Islamic Spiritual Healing",
  description:
    "Comprehensive Islamic Ruqya services including in-person appointments, online consultations, group sessions, and educational workshops. Authentic healing through Qur'an and Sunnah.",
  keywords: [
    "Ruqya services",
    "Islamic healing",
    "spiritual consultation",
    "Ruqya appointment",
    "online Ruqya",
    "group Ruqya",
    "Ruqya workshop",
  ],
  openGraph: {
    title: "Ruqya Services - Islamic Spiritual Healing",
    description:
      "Comprehensive Islamic Ruqya services including in-person appointments, online consultations, group sessions, and educational workshops.",
    url: "/services",
  },
}

async function getServices(): Promise<Service[]> {
  try {
    const response = await apiClient.get<PaginatedResponse<Service>>("/services?skip=0&limit=100")
    return response.items.filter((service) => service.is_active)
  } catch (error) {
    console.error("Failed to fetch services:", error)
    return []
  }
}

const iconMap: Record<string, any> = {
  Calendar,
  Video,
  Users,
  BookOpen,
  GraduationCap,
  MessageCircle,
}

export default async function ServicesPage() {
  const services = await getServices()

  return (
    <div className="min-h-screen py-16 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-semibold text-foreground text-balance">
            Our Services
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed text-pretty">
            Comprehensive Islamic spiritual healing services tailored to your needs. All services are conducted
            according to authentic Qur'an and Sunnah.
          </p>
        </div>

        {/* Services Grid */}
        {services.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <p className="text-muted-foreground">No services available at the moment.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {services.map((service) => {
              const IconComponent = iconMap[service.name.split(" ")[0]] || Calendar
              return (
                <Card key={service.id} className="flex flex-col h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl font-serif">{service.name}</CardTitle>
                    <CardDescription className="text-base leading-relaxed">{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="mt-auto space-y-4">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">{service.duration}</span>
                      <span className="font-semibold text-primary text-lg">${service.price}</span>
                    </div>
                    <Button className="w-full" asChild>
                      <Link href="#book">Book Now</Link>
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}

        {/* Booking Section */}
        <section id="book" className="mt-16 md:mt-20 bg-card rounded-lg p-8 md:p-12 border border-border">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-semibold text-foreground">Ready to Begin?</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Contact us to schedule your appointment or ask any questions about our services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" asChild>
                <Link href="mailto:info@ruqyahealinghub.com">Email Us</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="tel:+15551234567">Call Us</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
