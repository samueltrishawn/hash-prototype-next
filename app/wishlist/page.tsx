import Link from "next/link"
import Wishlist from "../components/Wishlist"

interface Country {
  code: string
  name: string
  continent: { name: string }
  currency: string
  phone: string
}

async function fetchWishlist(): Promise<Country[]> {
  const wishlist = JSON.parse(await getWishlist()) || []
  return wishlist
}

async function getWishlist() {
  return JSON.stringify([])
}

export default async function WishlistPage() {
  const wishlist = await fetchWishlist()

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Your Wishlist</h1>

      <div className="mb-4 flex gap-4">
        <Link href="/" className="bg-gray-600 text-white px-3 py-2 rounded hover:bg-gray-700">
          Back to Home
        </Link>
        <Link href="/countries" className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700">
          Go to Country List
        </Link>
      </div>

      <Wishlist initialWishlist={wishlist} />
    </div>
  )
}
