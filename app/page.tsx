import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-900">
      <div className="space-y-4">
        <Link
          href="/countries"
          className="block w-64 text-center bg-blue-500 text-white py-3 rounded-lg shadow-md hover:bg-blue-600 transition"
        >
        Browse Country List
        </Link>

        <Link
          href="/wishlist"
          className="block w-64 text-center bg-red-500 text-white py-3 rounded-lg shadow-md hover:bg-red-600 transition"
        >
        View Your Wishlist
        </Link>
      </div>
    </div>
  )
}
