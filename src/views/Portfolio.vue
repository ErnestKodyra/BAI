<template>
  <div>
    <h1>Your Portfolio</h1>
    <p>Total Portfolio Value: ${{ totalPortfolioValue }}</p>
    <p>Wallet Balance (Free Funds): ${{ userProfile.wallet }}</p>
    <p>Total Investment (Funds Invested+Gain/Loss): ${{ amountInvested }}</p>
    <ul>
      <li v-for="stock in userProfile.stocks" :key="stock.symbol">
        {{ stock.symbol }} - Shares: {{ stock.quantity }}
        - Current Price: ${{ getPrice(stock.symbol) }}
        - Value: ${{ stock.quantity * getPrice(stock.symbol) }}
      </li>
    </ul>
    <h2>Transaction History</h2>
    <ul>
      <li v-for="transaction in userProfile.transactions" :key="transaction.timestamp.seconds">
        {{ transaction.type }} - {{ transaction.stockSymbol }}
        - Shares: {{ transaction.quantity }}
        - Price Per Share: ${{ transaction.pricePerShare }}
        - Date & Time: {{ formatTimestamp(transaction.timestamp) }}
      </li>
    </ul>
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
      setInterval(fetchPrices, 1000);  // Consider optimizing this interval
      });

    const formatTimestamp = (timestamp) => {
      if (!timestamp || !timestamp.seconds) {
    return 'Unknown Date';
  }
  // Create a new Date object using the seconds from the timestamp
  const date = new Date(timestamp.seconds * 1000);
  // Use toLocaleString() to include both date and time
  // You can customize the locale and options to suit your needs
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
/* Add your styles here */
</style>
