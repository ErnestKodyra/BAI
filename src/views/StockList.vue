<template>
  <div class="stock-list">
    <StockItem v-for="symbol in stockSymbols" :key="symbol" :symbol="symbol" />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import StockItem from '@/components/StockItem.vue';
import { fetchStockSymbols } from '@/api';

export default {
  components: {
    StockItem
  },
  setup() {
    const stockSymbols = ref([]);

    const fetchSymbols = async () => {
      try {
        const response = await fetchStockSymbols();
        stockSymbols.value = response.data;
      } catch (error) {
        console.error('Failed to fetch stock symbols:', error);
      }
    };

    onMounted(() => {
      fetchSymbols();
    });

    return {
      stockSymbols
    };
  }
};
</script>

<style scoped>
.stock-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.stock-list > * {
  flex: 1 1 calc(50% - 20px);
  max-width: calc(50% - 20px);
}

@media (max-width: 600px) {
  .stock-list > * {
    flex: 1 1 100%;
    max-width: 100%;
  }
}
</style>
