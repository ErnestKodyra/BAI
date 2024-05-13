<template>
    <div id="chartContainer"></div>
</template>

<script setup>
import { ref, onMounted, shallowRef } from 'vue';
import { fetchStock } from '../api.js'
import anychart from 'anychart';
import { useRoute } from 'vue-router';
import * as testjson from './testprices.json';

let route = useRoute();
let stockSymbol = route.params.symbol;
let fetchedData = shallowRef([]);

onMounted(() => {
    //fetchedData.value = fetchStock(stockSymbol)

    fetchedData.value = testjson.prices.map( (price) => {
        return [price.date, price.open, price.high, price.low, price.close]
    });
    console.log(fetchedData.value)

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
    chart.container('chartContainer');
    chart.preserveSelectedRangeOnDataUpdate(true)

    chart.draw();
});
</script>