import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Video, Users, BookOpen, GraduationCap, MessageCircle } from "lucide-react"
import Link from "next/link"

export default function ServicesPage() {
  const services = [
    {
      icon: Calendar,
      title: "Ruqya Appointment",
      description:
        "One-on-one in-person Ruqya session with our experienced practitioners. Personalized spiritual healing in a peaceful environment.",
      duration: "60-90 minutes",
      price: "$80",
    },
    {
      icon: Video,
      title: "Online Ruqya Appointment",
      description: "Receive authentic Ruqya healing from the comfort of your home through secure video consultation.",
      duration: "60 minutes",
      price: "$60",
    },
    {
      icon: MessageCircle,
      title: "Consultations",
      description: "Discuss your spiritual concerns and receive guidance on Islamic healing practices and next steps.",
      duration: "30 minutes",
      price: "$40",
    },
    {
      icon: BookOpen,
      title: "Advice & Counselling",
      description:
        "Ongoing spiritual counselling and support for dealing with spiritual afflictions according to Islamic teachings.",
      duration: "45 minutes",
      price: "$50",
    },
    {
      icon: Users,
      title: "Group Ruqya Sessions",
      description:
        "Join others in a collective Ruqya session. Experience the power of community healing in a supportive environment.",
      duration: "90 minutes",
      price: "$30 per person",
    },
    {
      icon: GraduationCap,
      title: "Online Ruqya Workshop",
      description:
        "Learn the fundamentals of Ruqya, how to protect yourself, and perform self-Ruqya according to authentic Islamic sources.",
      duration: "3 hours",
      price: "$120",
    },
    {
      icon: GraduationCap,
      title: "Self-Awareness Ruqya Course",
      description:
        "Comprehensive course on understanding spiritual afflictions, self-diagnosis, and maintaining spiritual wellness.",
      duration: "6 weeks",
      price: "$250",
    },
  ]

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service) => (
            <Card key={service.title} className="flex flex-col h-full hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <service.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl font-serif">{service.title}</CardTitle>
                <CardDescription className="text-base leading-relaxed">{service.description}</CardDescription>
              </CardHeader>
              <CardContent className="mt-auto space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">{service.duration}</span>
                  <span className="font-semibold text-primary text-lg">{service.price}</span>
                </div>
                <Button className="w-full" asChild>
                  <Link href="#book">Book Now</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

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
