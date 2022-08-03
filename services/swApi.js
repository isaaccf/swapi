export const getAll = async (pageNumber = 1) => {
  try {
    const response = await fetch(`${process.env.API_BASE_URL}/people?page=${pageNumber}`);
    return await response.json();
  } catch (e) {
    console.error('Imposible get data', e)
    throw new Error('Imposible get data')
  }
}