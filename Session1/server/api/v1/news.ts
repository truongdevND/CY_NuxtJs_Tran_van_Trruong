export default defineEventHandler(async (event) => {
    try {
        const query = getQuery(event)
        const currentPage = parseInt(query.page) || 1
        
        const today = new Date()
        const formattedDate = today.toISOString().split('T')[0]
        
        const url = new URL('https://newsapi.org/v2/everything')
        const params = new URLSearchParams({
            'q': 'tesla',
            'from': `'${formattedDate}'`,
            'sortBy': 'publishedAt',
            'pageSize': '6',
            'page': currentPage.toString(),
            'apiKey': '0b1127b957f0466cab330ad0cb4bab57'
        })
        
        url.search = params.toString()

        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0',
                'X-Api-Key': '0b1127b957f0330ad0cb4bab57',
                'Accept': 'application/json'
            },
        })
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => null)
            throw new Error(
                `HTTP error! status: ${response.status}, message: ${errorData?.message || 'Unknown error'}`
            )
        }
        
        const data = await response.json()
        
        const totalResults = data.totalResults
        const totalPages = Math.ceil(totalResults / 8)
        const hasNextPage = currentPage < totalPages

        return {
            statusCode: 200,
            data: {
                articles: data.articles,
                pagination: {
                    currentPage,
                    totalPages,
                    totalResults,
                    hasNextPage
                }
            }
        }
        
    }

    catch (error) {
        console.error('Error fetching news:', error)
        
        return {
            statusCode: error.response?.status || 500,
            error: 'Failed to fetch news data',
            message: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        }
    }
})