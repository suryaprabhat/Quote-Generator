const quoteElement = document.getElementById("quote");
const authorElement = document.getElementById("author");
const newQuoteButton = document.getElementById("new-quote");
const tweetButton = document.getElementById("tweet-quote");
const api_url = "https://66d01ae8181d059277dd3db1.mockapi.io/quotes/quotes";

// Function to get a random quote
async function getQuote() {
    try {
        const response = await fetch(api_url);
        const quotes = await response.json();

        if (quotes.length > 0) {
            const randomIndex = Math.floor(Math.random() * quotes.length);
            const randomQuote = quotes[randomIndex];

            quoteElement.textContent = `"${randomQuote.text}"`;
            authorElement.textContent = `— ${randomQuote.author}`;
        } else {
            quoteElement.textContent = 'No quotes available.';
            authorElement.textContent = '';
        }
    } catch (error) {
        console.error('Error fetching quote:', error);
        quoteElement.textContent = 'Error fetching quote.';
        authorElement.textContent = '';
    }
}

// Fetch a quote on page load
getQuote();

// Add event listener to the New Quote button
newQuoteButton.addEventListener('click', getQuote);

// Add event listener to the Tweet button
tweetButton.addEventListener('click', tweet);

// Function to tweet the current quote
function tweet() {
    const quoteText = quoteElement.textContent.trim();
    const authorText = authorElement.textContent.trim();
    const tweetContent = `${quoteText} ${authorText}`;
    const encodedTweetContent = encodeURIComponent(tweetContent);
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodedTweetContent}`;
    window.open(twitterUrl, "Tweet Window", "width=600,height=300");
}
