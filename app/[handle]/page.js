
import Link from "next/link"
import clientPromise from "@/lib/mongodb"
import { notFound } from "next/navigation"
import Image from "next/image"

export default async function Page({ params }) {
  const handle = (await params).handle
  const client = await clientPromise
  const db = client.db("linktree")
  const collection = db.collection("links")

  const item = await collection.findOne({ handle: handle })
  if (!item) {
    return notFound()
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-purple-600 via-purple-500 to-pink-500 justify-center items-start py-8 px-3 sm:py-12 sm:px-4">
      {item && (
        <div className="photo flex flex-col items-center gap-4 sm:gap-5 bg-white/20 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-2xl w-full max-w-md">
          
          {/* Profile Image */}
          <Image
            src={item.pic}
            alt="Profile"
            width={128}
            height={128}
            className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-white shadow-lg"
          />

          {/* Handle */}
          <span className="font-bold text-xl sm:text-2xl text-white break-all">
            @{item.handle}
          </span>

          {/* Description */}
          {item.desc && (
            <span className="desc text-white/90 text-center text-sm sm:text-base leading-snug">
              {item.desc}
            </span>
          )}

          {/* Links */}
          <div className="links w-full mt-4 flex flex-col gap-3 sm:gap-4">
            {item.links.map((linkItem, index) => (
              <Link key={index} href={linkItem.link} target="_blank">
                <div className="bg-white text-purple-700 text-sm sm:text-base font-semibold py-3 px-4 w-full flex justify-center items-center rounded-xl shadow-md hover:bg-purple-700 hover:text-white transition-all duration-300 cursor-pointer">
                  {linkItem.linktext}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
