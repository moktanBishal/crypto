async function fetchBitcoinPrice() {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
        const data = await response.json();
        const price = data.bitcoin.usd;
        document.getElementById('btc-price').textContent = `$${price.toLocaleString()}`;
        document.getElementById('last-updated').textContent = `Last updated: ${new Date().toLocaleString()}`;
    } catch (error) {
        document.getElementById('btc-price').textContent = 'Error fetching price';
        console.error('Error:', error);
    }
}

fetchBitcoinPrice();
setInterval(fetchBitcoinPrice, 60000);
