export const getAll = async (pageNumber = 1) => {
  try {
    const response = await fetch(`${process.env.API_BASE_URL}/people?page=${pageNumber}`)
    return await response.json()
  } catch (e) {
    console.error('Imposible get data', e)
    throw new Error('Imposible get data')
  }
}

export const getCharacterDetail = async (characterId) => {
  try {
    if (!characterId) return
    
    const response = await fetch(`${process.env.API_BASE_URL}/people/${characterId}/`)
    const characterData = await response.json()

    return characterData
  } catch (e) {
    console.error('Imposible get data', e)
    throw new Error('Imposible get data')
  }
}

export const getFilmDetails = async (url) => {
  try {
    const response = await fetch(url)
    return await response.json()
  } catch (e) {
    console.error('Imposible get data', e)
    throw new Error('Imposible get data')
  }
}