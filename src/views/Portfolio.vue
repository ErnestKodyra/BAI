<template>
  <div>
    <h1>Your Portfolio</h1>
    <p>Total Portfolio Value: ${{ totalPortfolioValue }}</p>
    <p>Wallet Balance(Free Funds): ${{ userProfile.wallet }}</p>
    <p>Total Investment(Funds Invested+Gain/Loss): ${{ amountInvested }}</p>
    <ul>
      <li v-for="stock in userProfile.stocks" :key="stock.symbol">
        {{ stock.symbol }} - Shares: {{ stock.quantity }}
        - Current Price: ${{ getPrice(stock.symbol) }}
        - Value: ${{ stock.quantity * getPrice(stock.symbol) }}
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
            prices.value[stock.symbol] = response.data[response.data.length - 1].close; // Accessing the latest price
          })
        );
        await Promise.all(pricePromises);
      }
    };

    const getPrice = (symbol) => {
      return prices.value[symbol] || 0;
    };

    const totalPortfolioValue = computed(() => {
      let totalValue = store.userProfile.wallet; // Start with wallet balance
      if (store.userProfile.stocks) {
        store.userProfile.stocks.forEach(stock => {
          const stockValue = getPrice(stock.symbol) * stock.quantity;
          totalValue += stockValue; // Add the value of each stock holding
        });
      }
      return totalValue;
    });

    const amountInvested = computed(() => {
      return totalPortfolioValue.value - store.userProfile.wallet; // Total portfolio value minus the wallet balance
    })

    onMounted(() => {
      fetchPrices();
      setInterval(fetchPrices, 1000); // Update prices every 5 seconds
    });

    return {
      userProfile: computed(() => store.userProfile),
      getPrice,
      totalPortfolioValue,
      amountInvested
    };
  }
};
</script>


<style scoped>
/* Add your styles here */
</style>

