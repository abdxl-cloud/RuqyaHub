import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, ShoppingBag, Headphones, Calendar, Heart, Shield } from "lucide-react"

export default function HomePage() {
  const quickLinks = [
    {
      icon: Calendar,
      title: "Book Appointment",
      description: "Schedule a personal Ruqya session",
      href: "/services",
    },
    {
      icon: ShoppingBag,
      title: "Shop",
      description: "Spiritual healing products",
      href: "/shop",
    },
    {
      icon: Headphones,
      title: "Listen to Ruqya",
      description: "Authentic recitations",
      href: "/ruqya-audio",
    },
  ]

  const features = [
    {
      icon: Shield,
      title: "Authentic Islamic Healing",
      description: "All our services are based on authentic Qur'an and Sunnah teachings",
    },
    {
      icon: Heart,
      title: "Compassionate Care",
      description: "We provide spiritual support with empathy and understanding",
    },
    {
      icon: BookOpen,
      title: "Educational Resources",
      description: "Learn about Islamic spiritual healing through our articles and courses",
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative islamic-pattern py-20 md:py-32 lg:py-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-semibold text-foreground leading-tight text-balance">
              Healing through Qur'an and Sunnah
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto text-pretty">
              Find peace and spiritual wellness through authentic Islamic Ruqya. We offer compassionate guidance rooted
              in the teachings of the Qur'an and Sunnah.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button asChild size="lg" className="text-base">
                <Link href="/services">Book Appointment</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-base bg-transparent">
                <Link href="/articles">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16 md:py-20 bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {quickLinks.map((item) => (
              <Link key={item.href} href={item.href}>
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                  <CardContent className="p-8 space-y-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <item.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-serif font-semibold text-foreground">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-foreground text-balance">
              Why Choose Ruqya Healing Hub
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed text-pretty">
              We are committed to providing authentic, compassionate Islamic spiritual healing services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {features.map((feature) => (
              <div key={feature.title} className="text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-serif font-semibold text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-semibold text-balance">
              Begin Your Healing Journey Today
            </h2>
            <p className="text-lg text-primary-foreground/90 leading-relaxed text-pretty">
              Take the first step towards spiritual wellness. Our experienced practitioners are here to guide you with
              authentic Islamic healing.
            </p>
            <Button asChild size="lg" variant="secondary" className="text-base mt-4">
              <Link href="/services">Schedule Consultation</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
