// An async function that connects to the dashboard app and fetches its collections api to show collections on this app
export const getCollections = async () => {
  const collections = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/collections`)
  return await collections.json();
}
