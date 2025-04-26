// List of cryptocurrency symbols to fetch (in USDT pairs)
const symbols = ['BTCUSDT', 'ETHUSDT', 'BNBUSDT', 'SOLUSDT', 'DOGEUSDT'];

// Function to fetch prices from Binance API
async function fetchCryptoPrices() {
    try {
        const response = await fetch('https://api.binance.com/api/v3/ticker/price');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        
        // Filter data for the selected symbols
        const filteredData = data.filter(item => symbols.includes(item.symbol));
        displayPrices(filteredData);
    } catch (error) {
        console.error('Error fetching data:', error);
        document.getElementById('crypto-prices').innerHTML = '<p>Error loading prices. Please try again later.</p>';
    }
}

// Function to display prices on the webpage
function displayPrices(prices) {
    const priceContainer = document.getElementById('crypto-prices');
    priceContainer.innerHTML = ''; // Clear previous content

    prices.forEach(price => {
        const cryptoName = price.symbol.replace('USDT', ''); // Remove 'USDT' for display
        const cryptoPrice = parseFloat(price.price).toFixed(2); // Format price to 2 decimal places

        const cryptoCard = document.createElement('div');
        cryptoCard.className = 'crypto-card';
        cryptoCard.innerHTML = `
            <h3>${cryptoName}</h3>
            <p>$${cryptoPrice} USDT</p>
        `;
        priceContainer.appendChild(cryptoCard);
    });
}

// Fetch prices immediately and refresh every 30 seconds
fetchCryptoPrices();
setInterval(fetchCryptoPrices, 30000); // Refresh every 30 seconds