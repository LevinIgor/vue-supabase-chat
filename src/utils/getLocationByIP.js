export default async function getLocationByIP() {
  try {
    const response = await fetch(
      'https://api.geoapify.com/v1/ipinfo?&apiKey=e26a2a39990041edb428c7275ea661cc',
      {
        method: 'GET'
      }
    )
    const data = await response.json()

    return data.country.name
  } catch (error) {
    console.error('Error getting location by IP:', error)
  }
}
