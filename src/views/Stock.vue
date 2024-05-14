<template>
  <div class="stock">
    <h2>Stock component</h2>
    <h2>{{ stock.symbol }}</h2>
    <p>Ask: {{ stock.ask }}</p>
    <p>Bid: {{ stock.bid }}</p>
    <p>Asize: {{ stock.asize }}</p>
    <p>Bsize: {{ stock.bsize }}</p>
    <p>Timestamp: {{ stock.timestamp }}</p>
  </div>
</template>

<script>
export default {
  props: {
    stock: {
      type: Object,
      required: true
    }
  },
  created() {
    console.log('Stock data:', this.stock) // Dodaj tę linię
  }
}
</script>

<style scoped>
/* Dodaj tutaj swoje style */
</style>