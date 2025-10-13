import { Card, CardDescription, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Download } from "lucide-react"

export default function PodcastsPage() {
  const podcasts = [
    {
      id: 1,
      title: "Understanding Spiritual Wellness in Islam",
      description:
        "An introduction to Islamic spiritual health and the importance of maintaining a strong connection with Allah.",
      duration: "45:32",
      date: "March 18, 2024",
      image: "/islamic-podcast-microphone.jpg",
    },
    {
      id: 2,
      title: "The Power of Ruqya: Stories of Healing",
      description:
        "Real stories of people who found healing through authentic Islamic Ruqya and their journey to spiritual wellness.",
      duration: "52:18",
      date: "March 11, 2024",
      image: "/healing-light.jpg",
    },
    {
      id: 3,
      title: "Protecting Your Home and Family",
      description:
        "Practical guidance on creating a spiritually protected environment for your family according to the Sunnah.",
      duration: "38:45",
      date: "March 4, 2024",
      image: "/islamic-home-protection.jpg",
    },
    {
      id: 4,
      title: "Dealing with Anxiety Through Islamic Practices",
      description: "How to manage anxiety and stress using authentic Islamic supplications and spiritual practices.",
      duration: "41:20",
      date: "February 26, 2024",
      image: "/peaceful-meditation.png",
    },
    {
      id: 5,
      title: "The Science Behind Ruqya",
      description: "Exploring the spiritual and psychological aspects of Ruqya and how it brings healing.",
      duration: "48:15",
      date: "February 19, 2024",
      image: "/quran-and-science.jpg",
    },
    {
      id: 6,
      title: "Common Misconceptions About Jinn",
      description: "Clarifying myths and misconceptions about jinn based on authentic Islamic sources.",
      duration: "43:50",
      date: "February 12, 2024",
      image: "/islamic-knowledge.jpg",
    },
  ]

  return (
    <div className="min-h-screen py-16 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-semibold text-foreground text-balance">
            Spiritual Wellness Podcasts
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed text-pretty">
            Listen to insightful discussions about Islamic spiritual healing, Ruqya practices, and maintaining spiritual
            wellness in daily life.
          </p>
        </div>

        {/* Podcasts List */}
        <div className="space-y-6 max-w-4xl mx-auto">
          {podcasts.map((podcast) => (
            <Card key={podcast.id} className="hover:shadow-lg transition-shadow">
              <div className="flex flex-col md:flex-row gap-6 p-6">
                {/* Podcast Image */}
                <div className="w-full md:w-48 h-48 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
                  <img
                    src={podcast.image || "/placeholder.svg"}
                    alt={podcast.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Podcast Info */}
                <div className="flex-1 space-y-4">
                  <div>
                    <CardTitle className="text-2xl font-serif mb-2">{podcast.title}</CardTitle>
                    <CardDescription className="text-base leading-relaxed">{podcast.description}</CardDescription>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{podcast.date}</span>
                    <span>•</span>
                    <span>{podcast.duration}</span>
                  </div>

                  <div className="flex gap-3">
                    <Button>
                      <Play className="h-4 w-4 mr-2" />
                      Play Episode
                    </Button>
                    <Button variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Subscribe Section */}
        <section className="mt-16 md:mt-20 bg-card rounded-lg p-8 md:p-12 border border-border">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-semibold text-foreground">Subscribe to Our Podcast</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Never miss an episode. Subscribe on your favorite podcast platform.
            </p>
            <div className="flex flex-wrap gap-4 justify-center pt-4">
              <Button variant="outline" size="lg">
                Apple Podcasts
              </Button>
              <Button variant="outline" size="lg">
                Spotify
              </Button>
              <Button variant="outline" size="lg">
                Google Podcasts
              </Button>
              <Button variant="outline" size="lg">
                RSS Feed
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
