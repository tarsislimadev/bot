const getToday = () => {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const day = String(today.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

module.exports = {
  v2: {
    everything: async ({ q, from = getToday(), sortBy = 'popularity' } = {}) => {
      const url = `https://newsapi.org/v2/everything?q=${q}&from=${from}&sortBy=${sortBy}&apiKey=${process.env.NEWS_API_KEY}`
      const res = await fetch(url)
      const data = await res.json()
      return data.articles?.map(article => article.title).join('\n')
    }
  }
}