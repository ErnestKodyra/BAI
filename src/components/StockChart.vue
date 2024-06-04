<template>
  <div id="chartContainer"></div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { fetchStock } from '../api.js'
import anychart from 'anychart';
import { useRoute } from 'vue-router';

let route = useRoute();
let stockSymbol = route.params.symbol;
let fetchedData = ref([]);

onMounted(async () => {
  const response = await fetchStock(stockSymbol)
  fetchedData.value = response.data.map( (price) => {
      const date = new Date(price.date);
      date.setTime(date.getTime() + 2 * 60 * 60 * 1000);

      return [date, price.open, price.high, price.low, price.close];
  });

  var dataTable = anychart.data.table();
  dataTable.addData(fetchedData.value);

  var mapping = dataTable.mapAs();
  mapping.addField('open', 1);
  mapping.addField('high', 2);
  mapping.addField('low', 3);
  mapping.addField('close', 4);

  var chart = anychart.stock();
  var series = chart.plot(0).candlestick(mapping);

  series.name(`${ stockSymbol }` + ' stock prices');
  chart.crosshair().xStroke("#00bfa5", 0.5, "10 5", "round");
  chart.crosshair().yStroke("#00bfa5", 0.5);
  chart.plot(0).priceIndicator({value: "last-visible"});
  chart.selectRange('minute', 2, 'last-date', false);
  chart.container('chartContainer');

  chart.draw();

  setInterval(async () => {
    const response = await fetchStock(stockSymbol);
    fetchedData.value = response.data.map((price) => {
      const date = new Date(price.date);
      date.setTime(date.getTime() + 2 * 60 * 60 * 1000);

      return [date, price.open, price.high, price.low, price.close];
    });
    dataTable.addData(fetchedData.value);
    dataTable.mapAs();
    chart.draw();
  }, 1000);
  });
</script>