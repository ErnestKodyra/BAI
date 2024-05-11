<template>
  <div class="exchange">
    <h2>Exchange</h2>
    <form @submit.prevent="exchange">
      <label for="item">Item:</label>
      <input type="text" id="item" v-model="item" required>

      <label for="quantity">Quantity:</label>
      <input type="number" id="quantity" v-model="quantity" required>

      <button type="submit">Exchange</button>
    </form>
    <ul>
      <li v-for="(transaction, index) in transactions" :key="index">
        <p>{{ transaction.item }}: {{ transaction.quantity }}</p>
      </li>
    </ul>
  </div>
</template>

<script setup>
import axios from 'axios'
import { mapGetters, useStore } from 'vuex'

const item = ref('')
const quantity = ref(0)
const store = useStore()

const transactions = computed(() => {
  return mapGetters(['transactions'])
})

const exchange = async () => {
  try {
    const response = await axios.post('/api/exchange', { item: item.value, quantity: quantity.value })
    store.commit('addTransaction', response.data.transaction)
  } catch (error) {
    console.error('An error occurred:', error)
  }
}
</script>

<style scoped>
.exchange {
}
</style>
