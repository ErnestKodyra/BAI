<template>
    <div id="chartContainer"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { fetchStock } from './api.js'
import anychart from 'anychart';

let stockSymbol = $route.params.symbol;
let fetchedData = ref(null);

onMounted(() => {
    fetchedData.value = fetchStock(stockSymbol)

    var dataTable = anychart.data.table();
    dataTable.addData([fetchedData.value]);

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
    chart.container('chartContainer');
    chart.preserveSelectedRangeOnDataUpdate(true)

    chart.draw();
});
</script>