<template>
  <div>
    <div class="header">
      <img src="../assets/money.png" class="money-logo">
      <h1>Witaj w FinManager</h1>
      <img src="../assets/money.png" class="money-logo">
    </div>
    <div>
      <h2>Najlepsze akcje</h2>
      <ul>
        <li v-for="stock in bestStocks" :key="stock.id">
          {{ stock.name }}: {{ stock.price }}
        </li>
      </ul>
    </div>

    <div>
      <h2>Najgorsze akcje</h2>
      <ul>
        <li v-for="stock in worstStocks" :key="stock.id">
          {{ stock.name }}: {{ stock.price }}
        </li>
      </ul>
    </div>


  </div>
</template>
<script>
import { ref, onMounted } from 'vue';

export default {
  name: 'HomePage',
  setup() {
    const bestStocks = ref([]);
    const worstStocks = ref([]);

    onMounted(async () => {
      bestStocks.value = await getBestStocks();
      worstStocks.value = await getWorstStocks();
    });

    return {
      bestStocks,
      worstStocks
    };
  }
}
</script>

<style scoped>
body {
  background-color: #f4f4f4;
  font-family: Arial, sans-serif;
}

h1 {
  color: #333;
  text-align: center;
  padding: 20px 0;
}

h2 {
  color: #666;
  text-align: center;
  padding: 10px 0;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

li {
  background-color: #fff;
  border: 1px solid #ddd;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
}

li:hover {
  box-shadow: 0 0 10px rgba(0,0,0,0.2);
}
.header {
  display: flex;
  justify-content: center;
  align-items: center;


}

.money-logo {
  height: 50px;
}
</style>