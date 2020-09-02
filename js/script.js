// Declaring Variable for fair use in below code

const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// Show Loading Spinner
function showLoadingSpinner(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Remove Loading Spinner
function removeLoadingSpinner(){
    if(!loader.hidden){
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

// Get Quote from API
async function getQuote() {
    showLoadingSpinner();

    // Calling Api
    const proxyUrl = 'https://infinite-dusk-90084.herokuapp.com/'
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json'

    // Using try-catch to track real data and error
    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();

        // If author name is not given in quote
        if (data.quoteAuthor === '' ) {
            authorText.innerText = 'Unknown';
        }else{
            authorText.innerText = data.quoteAuthor;
        }

        // Reduce fontsize for longer quote (longer than > 200)
        if (data.quoteText.length > 120) {
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText = data.quoteText;
        removeLoadingSpinner(); 
    } catch (error) {
        getQuote();
    }
}

// Tweet Quote
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
  }
  
// Event Listeners
  newQuoteBtn.addEventListener('click', getQuote);
  twitterBtn.addEventListener('click', tweetQuote);

// on load
getQuote();