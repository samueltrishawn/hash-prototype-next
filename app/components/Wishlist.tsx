'use client'

import { useState, useEffect } from "react"
import Swal from "sweetalert2"

interface Country {
  code: string
  name: string
  continent: { name: string }
  currency: string
  phone: string
}

interface Props {
  initialWishlist: Country[]
}

export default function Wishlist({ initialWishlist }: Props) {
  const [wishlist, setWishlist] = useState<Country[]>(initialWishlist)

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]")
    setWishlist(storedWishlist)
  }, [])

  const removeFromWishlist = (code: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedWishlist = wishlist.filter((country) => country.code !== code)
        setWishlist(updatedWishlist)
        localStorage.setItem("wishlist", JSON.stringify(updatedWishlist))

        Swal.fire({
          title: "Removed!",
          text: "The country has been removed from your wishlist.",
          icon: "success",
        })
      }
    })
  }

  const removeAllWishlist = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will remove all countries from your wishlist.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, clear all!",
    }).then((result) => {
      if (result.isConfirmed) {
        setWishlist([])
        localStorage.setItem("wishlist", JSON.stringify([]))

        Swal.fire({
          title: "Cleared!",
          text: "Your wishlist is now empty.",
          icon: "success",
        })
      }
    })
  }

  return (
    <div className="p-6">
      {wishlist.length === 0 ? (
        <p className="text-gray-500">Your wishlist is empty.</p>
      ) : (
        <>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded mb-4 hover:bg-red-600"
            onClick={removeAllWishlist}
          >
            Clear Wishlist
          </button>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {wishlist.map((country) => (
              <div key={country.code} className="border border-gray-300 p-4 rounded-lg shadow-md bg-white">
                <h2 className="text-lg font-bold">{country.name}</h2>
                <p className="text-gray-600">Continent: {country.continent.name}</p>
                <p className="text-gray-600">Currency: {country.currency || "N/A"}</p>
                <p className="text-gray-600">Phone: +{country.phone}</p>
                <button
                  className="mt-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  onClick={() => removeFromWishlist(country.code)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}