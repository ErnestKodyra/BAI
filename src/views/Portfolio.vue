<template>
  <div class="portfolio-container">
    <h1 class="portfolio-title">Your Portfolio</h1>
    <div class="portfolio-details">
      <p class="portfolio-item">Total Portfolio Value: <span class="portfolio-value">{{ totalPortfolioValue.toFixed(2) }}</span></p>
      <p class="portfolio-item">Wallet Balance (Free Funds): <span class="portfolio-value">{{ userProfile.wallet.toFixed(2) }}</span></p>
      <p class="portfolio-item">Total Investment (Funds Invested+Gain/Loss): <span class="portfolio-value">{{ amountInvested.toFixed(2) }}</span></p>
    </div>

    <h2 class="table-title">Stocks</h2>
    <table class="data-table">
      <thead>
        <tr>
          <th>Symbol</th>
          <th>Shares</th>
          <th>Current Price</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="stock in userProfile.stocks" :key="stock.symbol">
          <td>{{ stock.symbol }}</td>
          <td>{{ stock.quantity }}</td>
          <td>${{ getPrice(stock.symbol).toFixed(2) }}</td>
          <td>${{ (stock.quantity * getPrice(stock.symbol)).toFixed(2) }}</td>
        </tr>
      </tbody>
    </table>

    <h2 class="table-title">Transaction History</h2>
    <table class="data-table">
      <thead>
        <tr>
          <th>Type</th>
          <th>Symbol</th>
          <th>Shares</th>
          <th>Price Per Share</th>
          <th>Transaction Value</th>
          <th>Date & Time</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="transaction in userProfile.transactions" :key="transaction.timestamp.seconds">
          <td>{{ transaction.type }}</td>
          <td>{{ transaction.stockSymbol }}</td>
          <td>{{ transaction.quantity }}</td>
          <td>${{ transaction.pricePerShare }}</td>
          <td>${{ (transaction.quantity * transaction.pricePerShare).toFixed(2) }}</td>
          <td>{{ formatTimestamp(transaction.timestamp) }}</td>
        </tr>
      </tbody>
    </table>
</div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useStore } from '@/store';
import { fetchStock } from '@/api';

export default {
  setup() {
    const store = useStore();
    const prices = ref({});

    const fetchPrices = async () => {
      if (store.userProfile.stocks && store.userProfile.stocks.length > 0) {
        const pricePromises = store.userProfile.stocks.map(stock =>
          fetchStock(stock.symbol).then(response => {
            prices.value[stock.symbol] = response.data[response.data.length - 1].close;
          })
        );
        await Promise.all(pricePromises);
      }
    };

    onMounted(async () => {
      await store.fetchUserProfile();
      fetchPrices();
      setInterval(fetchPrices, 1000);
    });

    const formatTimestamp = (timestamp) => {
      if (!timestamp || !timestamp.seconds) {
        return 'Unknown Date';
      }
      const date = new Date(timestamp.seconds * 1000);
      return date.toLocaleString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit', 
        hour12: true 
      });
    };

    const getPrice = (symbol) => prices.value[symbol] || 0;

    const totalPortfolioValue = computed(() => {
      let totalValue = store.userProfile.wallet;
      store.userProfile.stocks.forEach(stock => {
        totalValue += stock.quantity * getPrice(stock.symbol);
      });
      return totalValue;
    });

    const amountInvested = computed(() => totalPortfolioValue.value - store.userProfile.wallet);

    return {
      userProfile: computed(() => store.userProfile),
      getPrice,
      totalPortfolioValue,
      amountInvested,
      formatTimestamp
    };
  }
};
</script>

<style scoped>
.portfolio-container {
  padding: 20px;
  font-family: Arial, sans-serif;
  color: #333;
}

.portfolio-title {
  font-size: 2em;
  color: #4CAF50;
  margin-bottom: 20px;
  text-align: center;
}

.portfolio-details {
  margin-bottom: 20px;
}

.portfolio-item {
  font-size: 1.2em;
  margin: 10px 0;
}

.portfolio-value {
  font-weight: bold;
}

.table-title {
  font-size: 1.5em;
  margin: 20px 0;
  text-align: center;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.data-table th,
.data-table td {
  border: 1px solid #ccc;
  padding: 10px;
  text-align: center;
}

.data-table th {
  background-color: #f5f5f5;
  font-weight: bold;
}

.data-table tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}
</style>