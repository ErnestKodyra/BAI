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

const item = ref('')
const quantity = ref(0)

const transactions = computed(() => {
  return mapGetters(['transactions'])
})

const exchange = async () => {

}
</script>

<style scoped>
</style>
