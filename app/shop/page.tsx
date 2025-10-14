"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { useToast } from "@/hooks/use-toast"

// Note: Metadata cannot be exported from client components, handled in layout
export default function ShopPage() {
  const { addItem } = useCart()
  const { toast } = useToast()

  const products = [
    {
      id: 1,
      name: "Zamzam Water",
      description: "Authentic Zamzam water from Makkah. Blessed water for spiritual healing and general wellness.",
      price: 15,
      image: "/zamzam-water-bottle.jpg",
    },
    {
      id: 2,
      name: "Black Seed Oil",
      description:
        "Pure black seed oil (Nigella Sativa). The Prophet ﷺ said it is a cure for every disease except death.",
      price: 25,
      image: "/black-seed-oil-bottle.jpg",
    },
    {
      id: 3,
      name: "Sidr Leaves",
      description: "Organic Sidr leaves for Ruqya bathing. Used traditionally for spiritual cleansing and protection.",
      price: 18,
      image: "/sidr-leaves-in-bowl.jpg",
    },
    {
      id: 4,
      name: "Ruqya Water",
      description: "Water recited upon with authentic Ruqya verses. Ready to use for drinking or bathing.",
      price: 12,
      image: "/blessed-water-bottle.jpg",
    },
    {
      id: 5,
      name: "Olive Oil",
      description: "Premium olive oil recited upon with Qur'anic verses. For external application and healing.",
      price: 20,
      image: "/olive-oil-bottle.png",
    },
    {
      id: 6,
      name: "Honey",
      description: "Pure raw honey. A blessed food mentioned in the Qur'an with healing properties.",
      price: 30,
      image: "/golden-honey-jar.png",
    },
    {
      id: 7,
      name: "Miswak",
      description: "Natural teeth cleaning stick from the Arak tree. Sunnah of the Prophet ﷺ.",
      price: 8,
      image: "/miswak-stick.jpg",
    },
    {
      id: 8,
      name: "Henna Powder",
      description: "Pure henna powder for hair and skin. Natural and blessed by Islamic tradition.",
      price: 15,
      image: "/henna-powder.jpg",
    },
    {
      id: 9,
      name: "Ruqya Book Set",
      description: "Comprehensive guide to Ruqya with authentic supplications and Islamic healing practices.",
      price: 35,
      image: "/islamic-books.jpg",
    },
  ]

  const handleAddToCart = (product: (typeof products)[0]) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    })
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  return (
    <div className="min-h-screen py-16 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-semibold text-foreground text-balance">
            Spiritual Healing Shop
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed text-pretty">
            Authentic Islamic healing products to support your spiritual wellness journey. All products are prepared
            with care and blessed intentions.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {products.map((product) => (
            <Card key={product.id} className="flex flex-col h-full hover:shadow-lg transition-shadow">
              <CardHeader className="p-0">
                <div className="aspect-square overflow-hidden rounded-t-lg bg-muted">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </CardHeader>
              <CardContent className="flex-1 p-6 space-y-2">
                <CardTitle className="text-xl font-serif">{product.name}</CardTitle>
                <CardDescription className="text-base leading-relaxed">{product.description}</CardDescription>
              </CardContent>
              <CardFooter className="p-6 pt-0 flex items-center justify-between">
                <span className="text-2xl font-semibold text-primary">${product.price}</span>
                <Button onClick={() => handleAddToCart(product)}>
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Info Section */}
        <section className="mt-16 md:mt-20 bg-card rounded-lg p-8 md:p-12 border border-border">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-2xl md:text-3xl font-serif font-semibold text-foreground text-center">
              About Our Products
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                All our products are carefully selected and prepared according to Islamic guidelines. We ensure
                authenticity and quality in everything we offer.
              </p>
              <p>
                Many of our products are recited upon with authentic Qur'anic verses and supplications, following the
                Sunnah of the Prophet Muhammad ﷺ.
              </p>
              <p>
                We source our products from trusted suppliers and ensure they meet the highest standards of purity and
                authenticity.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
