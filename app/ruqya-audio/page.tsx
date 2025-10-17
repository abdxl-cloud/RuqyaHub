import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Download, Volume2 } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Ruqya Audio Library - Authentic Islamic Recitations",
  description:
    "Authentic Ruqya recitations by renowned scholars. Listen to Quranic verses for protection against evil eye, black magic, and jinn possession. Download for personal use.",
  keywords: [
    "Ruqya audio",
    "Islamic recitation",
    "Quran healing",
    "Ruqya MP3",
    "Islamic protection audio",
    "Ayat Al-Kursi",
    "Surah Al-Baqarah",
  ],
  openGraph: {
    title: "Ruqya Audio Library - Authentic Islamic Recitations",
    description: "Authentic Ruqya recitations by renowned scholars. Listen online or download for personal use.",
    url: "/ruqya-audio",
  },
}

export default function RuqyaAudioPage() {
  const audioCategories = [
    {
      title: "Complete Ruqya Recitation",
      description: "Full Ruqya session with all essential verses and supplications",
      duration: "1:45:30",
      reciter: "Sheikh Ahmad Al-Ajmi",
    },
    {
      title: "Ayat Al-Kursi (100x)",
      description: "The Throne Verse repeated 100 times for powerful protection",
      duration: "45:20",
      reciter: "Sheikh Mishary Rashid",
    },
    {
      title: "Surah Al-Baqarah",
      description: "Complete recitation of Surah Al-Baqarah for home protection",
      duration: "2:15:45",
      reciter: "Sheikh Maher Al-Muaiqly",
    },
    {
      title: "Last Three Surahs (100x)",
      description: "Al-Ikhlas, Al-Falaq, and An-Nas repeated for protection",
      duration: "52:10",
      reciter: "Sheikh Saad Al-Ghamdi",
    },
    {
      title: "Ruqya for Evil Eye",
      description: "Specific verses and duas for treating the evil eye",
      duration: "38:25",
      reciter: "Sheikh Yasser Al-Dosari",
    },
    {
      title: "Ruqya for Black Magic",
      description: "Powerful recitation targeting sihr and black magic",
      duration: "1:12:30",
      reciter: "Sheikh Ahmad Al-Ajmi",
    },
    {
      title: "Ruqya for Jinn Possession",
      description: "Verses specifically for treating jinn possession",
      duration: "58:40",
      reciter: "Sheikh Mishary Rashid",
    },
    {
      title: "Morning Adhkar",
      description: "Morning remembrance and protection supplications",
      duration: "25:15",
      reciter: "Sheikh Maher Al-Muaiqly",
    },
    {
      title: "Evening Adhkar",
      description: "Evening remembrance and protection supplications",
      duration: "28:30",
      reciter: "Sheikh Saad Al-Ghamdi",
    },
    {
      title: "Ruqya for Children",
      description: "Gentle Ruqya recitation suitable for children",
      duration: "35:20",
      reciter: "Sheikh Yasser Al-Dosari",
    },
    {
      title: "Ruqya for Sleep",
      description: "Calming recitation to help with sleep and nightmares",
      duration: "42:15",
      reciter: "Sheikh Ahmad Al-Ajmi",
    },
    {
      title: "Prophetic Supplications",
      description: "Authentic duas from the Prophet ﷺ for healing",
      duration: "31:45",
      reciter: "Sheikh Mishary Rashid",
    },
  ]

  return (
    <div className="min-h-screen py-16 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-semibold text-foreground text-balance">
            Ruqya Audio Library
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed text-pretty">
            Authentic Ruqya recitations by renowned scholars. Listen online or download for personal use. All
            recitations are based on Qur'an and authentic Sunnah.
          </p>
        </div>

        {/* Info Banner */}
        <div className="bg-primary/10 border border-primary/20 rounded-lg p-6 mb-12 max-w-4xl mx-auto">
          <div className="flex gap-4">
            <Volume2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
            <div className="space-y-2">
              <h3 className="font-semibold text-foreground">How to Use Ruqya Audio</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Listen with intention and focus. You can play these recitations in your home for protection, listen
                while sleeping, or use them during personal Ruqya sessions. It's recommended to be in a state of wudu
                (ablution) when listening.
              </p>
            </div>
          </div>
        </div>

        {/* Audio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {audioCategories.map((audio, index) => (
            <Card key={index} className="flex flex-col h-full hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Volume2 className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl font-serif">{audio.title}</CardTitle>
                <CardDescription className="text-base leading-relaxed">{audio.description}</CardDescription>
              </CardHeader>
              <CardContent className="mt-auto space-y-4">
                <div className="space-y-1 text-sm text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Reciter:</span>
                    <span className="font-medium text-foreground">{audio.reciter}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Duration:</span>
                    <span className="font-medium text-foreground">{audio.duration}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button className="flex-1">
                    <Play className="h-4 w-4 mr-2" />
                    Play
                  </Button>
                  <Button variant="outline" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Guidelines Section */}
        <section className="mt-16 md:mt-20 bg-card rounded-lg p-8 md:p-12 border border-border">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-2xl md:text-3xl font-serif font-semibold text-foreground text-center">
              Guidelines for Listening
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                <strong className="text-foreground">Intention:</strong> Make the intention to seek healing and
                protection through the words of Allah. Ruqya is a means, and Allah is the ultimate Healer.
              </p>
              <p>
                <strong className="text-foreground">Consistency:</strong> Listen regularly, especially Surah Al-Baqarah
                in your home. The Prophet ﷺ said that Shaytan flees from a house where Surah Al-Baqarah is recited.
              </p>
              <p>
                <strong className="text-foreground">Environment:</strong> Ensure your environment is clean and free from
                prohibited items. Remove images, music instruments, and anything that may prevent angels from entering.
              </p>
              <p>
                <strong className="text-foreground">Belief:</strong> Have firm belief in the power of Allah's words. The
                Qur'an is a healing and mercy for the believers.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
