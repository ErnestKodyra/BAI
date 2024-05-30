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
  flex-direction: column;
  align-items: center;
  gap: 20px;
}
</style>
