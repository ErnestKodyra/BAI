<template>
  <div class="portfolio-container">
    <h1 class="portfolio-title">Your Portfolio</h1>
    <div class="portfolio-details">
      <p class="portfolio-item">Total Portfolio Value: <span class="portfolio-value">{{ totalPortfolioValue.toFixed(2) }}</span></p>
      <p class="portfolio-item">Wallet Balance (Free Funds): <span class="portfolio-value">{{ userProfile.wallet.toFixed(2) }}</span></p>
      <p class="portfolio-item">Total Investment (Funds Invested+Gain/Loss): <span class="portfolio-value">{{ amountInvested.toFixed(2) }}</span></p>
      <p class="portfolio-item">Total Gain/Loss: <span :class="{'gain': totalGainLoss > 0, 'loss': totalGainLoss < 0}" class="portfolio-value">{{ totalGainLoss.toFixed(2) }}</span></p>
    </div>

    <h2 class="table-title">Stocks</h2>
    <table class="data-table">
      <thead>
        <tr>
          <th>Symbol</th>
          <th>Shares</th>
          <th>Buy Price Per Share</th>
          <th>Current Price Per Share</th>
          <th>Current Value</th>
          <th>Gain/Loss</th>
          <th>Sell</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="stock in userProfile.stocks" :key="stock.symbol">
          <td>{{ stock.symbol }}</td>
          <td>{{ stock.quantity }}</td>
          <td>${{ getBuyPrice(stock.symbol).toFixed(2) }}</td>
          <td>${{ getPrice(stock.symbol).toFixed(2) }}</td>
          <td>${{ (stock.quantity * getPrice(stock.symbol)).toFixed(2) }}</td>
          <td :class="{'gain': calculateStockGainLoss(stock.symbol) > 0, 'loss': calculateStockGainLoss(stock.symbol) < 0}">
            ${{ calculateStockGainLoss(stock.symbol).toFixed(2) }}
          </td>
          <td>
            <StockSellBuy :symbol="stock.symbol" :latestPrice="getPrice(stock.symbol)" />
          </td>
        </tr>
      </tbody>
    </table>

    <h2 class="table-title">Transaction History</h2>
    <p class="portfolio-item">Historical Gain/Loss: <span :class="{'gain': historicalGainLoss > 0, 'loss': historicalGainLoss < 0}" class="portfolio-value">{{ historicalGainLoss.toFixed(2) }}</span></p>
    <table class="data-table">
      <thead>
        <tr>
          <th>Type</th>
          <th>Symbol</th>
          <th>Shares</th>
          <th>Price Per Share</th>
          <th>Transaction Value</th>
          <th>Gain/Loss</th>
          <th>Date & Time</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="transaction in reversedTransactions" :key="transaction.timestamp.seconds">
          <td>{{ transaction.type }}</td>
          <td>{{ transaction.stockSymbol }}</td>
          <td>{{ transaction.quantity }}</td>
          <td>${{ transaction.pricePerShare.toFixed(2) }}</td>
          <td>${{ (transaction.quantity * transaction.pricePerShare).toFixed(2) }}</td>
          <td v-if="transaction.type === 'sell'"
              :class="{'gain': calculateGainLoss(transaction) > 0, 'loss': calculateGainLoss(transaction) < 0}">
            ${{ calculateGainLoss(transaction).toFixed(2) }}
          </td>
          <td v-else></td>
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
import StockSellBuy from '@/components/StockSellBuy.vue';

export default {
  components: {
    StockSellBuy
  },
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

    const getBuyPrice = (symbol) => {
      const relevantBuyTransactions = store.userProfile.transactions.filter(
        transaction => transaction.type === 'buy' && transaction.stockSymbol === symbol
      );

      if (relevantBuyTransactions.length === 0) return 0;

      const latestBuyTransaction = relevantBuyTransactions.reduce((latest, current) =>
        current.timestamp.seconds > latest.timestamp.seconds ? current : latest
      );

      return latestBuyTransaction.pricePerShare;
    };

    const calculateStockGainLoss = (symbol) => {
      const currentPrice = getPrice(symbol);
      const buyPrice = getBuyPrice(symbol);
      const stock = store.userProfile.stocks.find(stock => stock.symbol === symbol);
      if (!stock) return 0;

      const gainLoss = (currentPrice - buyPrice) * stock.quantity;
      return gainLoss;
    };

    const totalGainLoss = computed(() => {
      return store.userProfile.stocks.reduce((total, stock) => {
        return total + calculateStockGainLoss(stock.symbol);
      }, 0);
    });

    const totalPortfolioValue = computed(() => {
      let totalValue = store.userProfile.wallet;
      store.userProfile.stocks.forEach(stock => {
        totalValue += stock.quantity * getPrice(stock.symbol);
      });
      return totalValue;
    });

    const amountInvested = computed(() => totalPortfolioValue.value - store.userProfile.wallet);

    const calculateGainLoss = (sellTransaction) => {
      const relevantBuyTransactions = store.userProfile.transactions.filter(
        transaction => transaction.type === 'buy' && 
                       transaction.stockSymbol === sellTransaction.stockSymbol && 
                       transaction.timestamp.seconds < sellTransaction.timestamp.seconds
      );

      if (relevantBuyTransactions.length === 0) return 0;

      const latestRelevantBuyTransaction = relevantBuyTransactions.reduce((latest, current) =>
        current.timestamp.seconds > latest.timestamp.seconds ? current : latest
      );

      const buyValue = sellTransaction.quantity * latestRelevantBuyTransaction.pricePerShare;
      const sellValue = sellTransaction.quantity * sellTransaction.pricePerShare;
      return sellValue - buyValue;
    };

    const historicalGainLoss = computed(() => {
      return store.userProfile.transactions.reduce((total, transaction) => {
        if (transaction.type === 'sell') {
          total += calculateGainLoss(transaction);
        }
        return total;
      }, 0);
    });

    const reversedTransactions = computed(() => {
      return [...store.userProfile.transactions].reverse();
    });

    return {
      userProfile: computed(() => store.userProfile),
      getPrice,
      getBuyPrice,
      calculateStockGainLoss,
      totalGainLoss,
      totalPortfolioValue,
      amountInvested,
      formatTimestamp,
      calculateGainLoss,
      historicalGainLoss,
      reversedTransactions
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

.gain {
  color: green;
  font-weight: bold;
}

.loss {
  color: red;
  font-weight: bold;
}
</style>
