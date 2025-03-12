import Link from "next/link"
import CountryFilters from "../components/CountryFilters"

interface Country {
  code: string
  name: string
  continent: { name: string }
  currency: string
  phone: string
}

async function fetchCountries(): Promise<Country[]> {
  const res = await fetch("https://countries.trevorblades.com/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
        query {
          countries {
            code
            name
            continent { name }
            currency
            phone
          }
        }
      `,
    }),
  })

  const data = await res.json()
  return data?.data?.countries?.sort((a: Country, b: Country) =>
    a.name.localeCompare(b.name)
  ) || []
}

export default async function CountryList() {
  const countries = await fetchCountries()

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Country List</h1>
      
      <div className="mb-4 flex gap-4">
        <Link href="/" className="bg-gray-600 text-white px-3 py-2 rounded hover:bg-gray-700">
          Back to Home
        </Link>
        <Link href="/wishlist" className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700">
          Go to Wishlist
        </Link>
      </div>

      <CountryFilters countries={countries} />
    </div>
  )
}