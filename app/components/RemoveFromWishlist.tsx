"use client"

import Swal from "sweetalert2"

interface Country {
    code: string
    name: string
    continent: {name : string}
    currency: string
    phone: string
}

interface RemoveFromWishlistProps {
  countryCode: string
}

export default function RemoveFromWishlist({ countryCode }: RemoveFromWishlistProps) {
  const removeFromWishlist = () => {
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
        const storedWishlist: Country[] = JSON.parse(localStorage.getItem("wishlist") || "[]")
        const updatedWishlist = storedWishlist.filter((country: Country) => country.code !== countryCode)
        localStorage.setItem("wishlist", JSON.stringify(updatedWishlist))

        Swal.fire({
          title: "Removed!",
          text: "The country has been removed from your wishlist.",
          icon: "success",
        }).then(() => {
          window.location.reload()
        })
      }
    })
  }

  return (
    <button
      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      onClick={removeFromWishlist}
    >
      Remove
    </button>
  )
}
