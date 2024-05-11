<template>
    <div>
        <canvas ref="chartCanvas"></canvas>
    </div>
</template>

<script setup>
import { ref, onMounted, shallowRef } from 'vue';
import Chart from 'chart.js/auto';

const chartCanvas = ref(null);
const temporaryData = shallowRef(Array.from({length: 10}, () => Math.floor(Math.random() * (80 - 50 + 1)) + 50));

onMounted(() => {
    initializeChart(chartCanvas.value);
});

const initializeChart = (canvas) => {
    const chart = new Chart(canvas.getContext('2d'), {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Tymczasowe dane',
                data: temporaryData.value,
                borderColor: 'blue',
                backgroundColor: 'transparent',
            }]
        },
        options: {
            // Konfiguruj opcje wykresu
        }
    });

    setInterval(updateChart, 1000, chart);
};

const updateChart = (chart) => {
    // Dodaj nową wartość do temporaryData
    temporaryData.value.push(Math.floor(Math.random() * (80 - 50 + 1)) + 50);

    // Usuń pierwszą wartość z temporaryData
    temporaryData.value.shift();

    // Odśwież wykres
    chart.update();
};
</script>