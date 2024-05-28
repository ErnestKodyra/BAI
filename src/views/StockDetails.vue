<template>
  <div>
    <StockChart :stock="stock" class="stock-chart" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { fetchStock } from '../api'
import { useRoute } from 'vue-router'
import StockChart from '@/components/StockChart.vue';

const route = useRoute()
const stock = ref({})

</script>

<style scoped>
.stock-chart{
  width: 100%;
  height: 600px;
}
</style>
