<template>
    <div id="container" style="width: 900px; height: 600px;">   </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import anychart from 'anychart';
import file from './fetched data.json' with { type: "json" }

let fetchedData = ref(null);
// let currentData = ref(null);

const fetchData = async () => {
    try {
        const response = await fetch('https://example.com/api/data'); //zamienic na prawidlowy odnosnik
        const jsonData = await response.json();
        fetchedData.value = jsonData;
        
    } catch (error) {
        console.error('Błąd podczas pobierania danych z API:', error);
    }
};

/* const updateData = () => {
    currentData.value = fetchedData.value;
    dataTable.addData(currentData.value, true);
}; */

onMounted(() => {

/* fetchData();
setInterval(fetchData, 15000);
setInterval */

var dataTable = anychart.data.table();
dataTable.addData([file]);

var mapping = dataTable.mapAs();
mapping.addField('open', 1);
mapping.addField('high', 2);
mapping.addField('low', 3);
mapping.addField('close', 4);

var chart = anychart.stock();
var series = chart.plot(0).candlestick(mapping);

series.name("ACME Corp. stock prices");
chart.crosshair().xStroke("#00bfa5", 0.5, "10 5", "round");
chart.crosshair().yStroke("#00bfa5", 0.5);
chart.plot(0).priceIndicator({value: "last-visible"});
chart.container('container');
chart.preserveSelectedRangeOnDataUpdate(true)

chart.draw();
});
</script>