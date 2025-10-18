"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { useToast } from "@/hooks/use-toast"
import { apiClient } from "@/lib/api-client"
import type { Product, PaginatedResponse } from "@/lib/api-types"

export default function ShopPage() {
  const { addItem } = useCart()
  const { toast } = useToast()
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await apiClient.get<PaginatedResponse<Product>>("/products?skip=0&limit=100")
      setProducts(response.items.filter((p) => p.is_active && p.stock_quantity > 0))
    } catch (error) {
      console.error("Failed to fetch products:", error)
      toast({ title: "Failed to load products", variant: "destructive" })
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddToCart = (product: Product) => {
    addItem({
      id: Number.parseInt(product.id),
      name: product.name,
      price: product.price,
      image: product.image,
    })
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-64">
            <p className="text-muted-foreground">Loading products...</p>
          </div>
        </div>
      </div>
    )
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
        {products.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <p className="text-muted-foreground">No products available at the moment.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {products.map((product) => (
              <Card key={product.id} className="flex flex-col h-full hover:shadow-lg transition-shadow">
                <CardHeader className="p-0">
                  <div className="aspect-square overflow-hidden rounded-t-lg bg-muted">
                    <img
                      src={product.image_url || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </CardHeader>
                <CardContent className="flex-1 p-6 space-y-2">
                  <CardTitle className="text-xl font-serif">{product.name}</CardTitle>
                  <CardDescription className="text-base leading-relaxed">{product.description}</CardDescription>
                  {product.stock_quantity < 10 && product.stock_quantity > 0 && (
                    <p className="text-sm text-amber-600">Only {product.stock_quantity} left in stock</p>
                  )}
                </CardContent>
                <CardFooter className="p-6 pt-0 flex items-center justify-between">
                  <span className="text-2xl font-semibold text-primary">${product.price}</span>
                  <Button onClick={() => handleAddToCart(product)} disabled={product.stock_quantity === 0}>
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    {product.stock_quantity === 0 ? "Out of Stock" : "Add to Cart"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

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
