"use client"

import { useState } from "react"
import AddToWishlist from "./AddtoWishlist"

interface Country {
  code: string
  name: string
  continent: { name: string }
  currency: string
  phone: string
}

interface Props {
  countries: Country[]
}

export default function CountryFilters({ countries }: Props) {
  const [continentFilter, setContinentFilter] = useState("")
  const [currencyFilter, setCurrencyFilter] = useState("")
  const [phoneFilter, setPhoneFilter] = useState("")

  const filteredCountries = countries.filter((country) =>
    (!continentFilter || country.continent.name.includes(continentFilter)) &&
    (!currencyFilter || (country.currency && country.currency.toLowerCase().includes(currencyFilter.toLowerCase()))) &&
    (!phoneFilter || country.phone.includes(phoneFilter))
  )

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-4">
        <select
          className="border p-2 rounded"
          value={continentFilter}
          onChange={(e) => setContinentFilter(e.target.value)}
        >
          <option value="">All Continents</option>
          {[...new Set(countries.map((c) => c.continent.name))].map((continent) => (
            <option key={continent} value={continent}>{continent}</option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Filter by Currency"
          className="border p-2 rounded"
          value={currencyFilter}
          onChange={(e) => setCurrencyFilter(e.target.value)}
        />

        <input
          type="text"
          placeholder="Filter by Phone"
          className="border p-2 rounded"
          value={phoneFilter}
          onChange={(e) => setPhoneFilter(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredCountries.map((country) => (
          <div key={country.code} className="border p-4 rounded shadow bg-white">
            <h2 className="text-lg font-bold">{country.name}</h2>
            <p><strong>Continent:</strong> {country.continent.name}</p>
            <p><strong>Currency:</strong> {country.currency || "N/A"}</p>
            <p><strong>Phone:</strong> +{country.phone}</p>
            <div className="mt-2">
              <AddToWishlist country={country} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
