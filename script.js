const apiKey = '031ae912836a4b16be67f622e65f1e9c';
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

async function fetchNews(query = 'tesla') {
    if (!query.trim()) {
        alert("Please enter a search term!");
        return;
    }

    try {
        document.getElementById('latest-posts').innerHTML = '<p>Loading...</p>'; // Show loading message

        const response = await fetch(`https://newsapi.org/v2/everything?q=${query}&sortBy=publishedAt&apiKey=${apiKey}`);
        const data = await response.json();

        if (data.articles.length === 0) {
            document.getElementById('latest-posts').innerHTML = '<p>No results found.</p>';
            return;
        }

        displayNews(data.articles);
    } catch (error) {
        console.error('Error fetching news:', error);
        document.getElementById('latest-posts').innerHTML = '<p>Error fetching news. Please try again later.</p>';
    }
}

function displayNews(articles) {
    if (articles.length > 0) {
        const featuredArticle = articles[0];
        document.getElementById('featured-image').src = featuredArticle.urlToImage || 'https://placehold.co/1200x600';
        document.getElementById('featured-title').textContent = featuredArticle.title;
        document.getElementById('featured-description').textContent = featuredArticle.description;
        document.getElementById('featured-link').href = featuredArticle.url;

        const latestPostsContainer = document.getElementById('latest-posts');
        latestPostsContainer.innerHTML = '';

        articles.slice(1).forEach(article => {
            const postElement = document.createElement('div');
            postElement.className = 'bg-white shadow rounded-lg overflow-hidden';
            postElement.innerHTML = `
                <img class="w-full h-48 object-cover" src="${article.urlToImage || 'https://placehold.co/400x300'}" alt="Post image"/>
                <div class="p-6">
                    <h3 class="text-xl font-bold text-gray-800 mb-2">${article.title}</h3>
                    <p class="text-gray-600 mb-4">${article.description || 'No description available.'}</p>
                    <a class="text-blue-600 hover:underline" href="${article.url}" target="_blank">Read more</a>
                </div>
            `;
            latestPostsContainer.appendChild(postElement);
        });
    }
}

// Event Listeners
searchButton.addEventListener('click', () => fetchNews(searchInput.value));
searchInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        fetchNews(searchInput.value);
    }
});

// Fetch initial news
fetchNews();
