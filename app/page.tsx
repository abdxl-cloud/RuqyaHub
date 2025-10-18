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
      <section className="relative islamic-pattern py-24 md:py-32 lg:py-44">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-semibold text-foreground leading-[1.1] text-balance tracking-tight">
              Healing through Qur'an and Sunnah
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl mx-auto text-pretty">
              Find peace and spiritual wellness through authentic Islamic Ruqya. We offer compassionate guidance rooted
              in the teachings of the Qur'an and Sunnah.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Button asChild size="lg" className="text-base btn-primary-enhanced shadow-lg hover:shadow-xl">
                <Link href="/services">Book Appointment</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="text-base bg-background/80 backdrop-blur-sm hover:bg-background shadow-md"
              >
                <Link href="/articles">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-20 md:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {quickLinks.map((item) => (
              <Link key={item.href} href={item.href}>
                <Card className="h-full card-hover border-border/50 hover:border-primary/20 bg-card/50 backdrop-blur-sm">
                  <CardContent className="p-8 space-y-4">
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-all group-hover:scale-110">
                      <item.icon className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="text-xl font-serif font-semibold text-foreground">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed text-pretty">{item.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-5 mb-16 md:mb-20">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-semibold text-foreground text-balance tracking-tight">
              Why Choose Ruqya Healing Hub
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed text-pretty">
              We are committed to providing authentic, compassionate Islamic spiritual healing services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14">
            {features.map((feature) => (
              <div key={feature.title} className="text-center space-y-5 group">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto group-hover:bg-primary/20 transition-all group-hover:scale-110 shadow-sm">
                  <feature.icon className="h-9 w-9 text-primary" />
                </div>
                <h3 className="text-2xl font-serif font-semibold text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-lg text-pretty">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 islamic-pattern"></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-7">
            <h2 className="text-4xl md:text-5xl font-serif font-semibold text-balance tracking-tight">
              Begin Your Healing Journey Today
            </h2>
            <p className="text-xl text-primary-foreground/90 leading-relaxed text-pretty">
              Take the first step towards spiritual wellness. Our experienced practitioners are here to guide you with
              authentic Islamic healing.
            </p>
            <Button asChild size="lg" variant="secondary" className="text-base mt-6 shadow-lg hover:shadow-xl">
              <Link href="/services">Schedule Consultation</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
