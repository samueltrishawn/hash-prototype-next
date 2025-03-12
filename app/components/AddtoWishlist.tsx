"use client"

import { useEffect } from "react"
import Swal from "sweetalert2"

interface Country {
  code: string
  name: string
  continent: { name: string }
  currency: string
  phone: string
}

export default function AddToWishlist({ country }: { country: Country }) {
  useEffect(() => {
    if (!localStorage.getItem("wishlist")) {
      localStorage.setItem("wishlist", JSON.stringify([]))
    }
  }, [])
  const addToWishlist = () => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]")

    if (storedWishlist.some((item: Country) => item.code === country.code)) {
      Swal.fire({
        title: "Already Added!",
        text: `${country.name} is already in your wishlist.`,
        icon: "info",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      })
      return
    }

    const updatedWishlist = [...storedWishlist, country]

    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist))

    Swal.fire({
      title: "Added!",
      text: `${country.name} has been added to your wishlist.`,
      icon: "success",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "OK",
    })
  }

  return (
    <button
      onClick={addToWishlist}
      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
    >
      Add to Wishlist
    </button>
  )
}