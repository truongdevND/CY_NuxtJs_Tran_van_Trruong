export default defineEventHandler(async (event) => {
    try {
        const url = new URL('https://newsapi.org/v2/everything');
        const params = new URLSearchParams({
            'q': 'tesla',
            'from': '2024-10-08',
            'sortBy': 'publishedAt',
            'apiKey': '49b8dd3bb9e64f7a94ff3b17211f46c1'
        });
        
        url.search = params.toString();

        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        return {
            statusCode: 200,
            data: data
        };
        
    } catch (error) {
        console.error('Error fetching news:', error);
        
        return {
            statusCode: 500,
            error: 'Failed to fetch news data',
            message: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        };
    }
});
