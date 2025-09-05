import clientPromise from "@/lib/mongodb"

export async function POST(request) {
  try {
    const body = await request.json()
    const client = await clientPromise
    const db = client.db("linktree")
    const collection = db.collection("links")

    const doc = await collection.findOne({ handle: body.handle })
    if (doc) {
      return Response.json({
        message: "This Username already exists",
        success: false,
        result: null,
        error: true,
      })
    }

    const result = await collection.insertOne(body)

    return Response.json({
      message: "Your Linktree has been generated",
      success: true,
      result,
      error: false,
    })
  } catch (err) {
    return Response.json({
      message: "Server error",
      success: false,
      result: null,
      error: true,
    })
  }
}
