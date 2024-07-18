<template>
    <div>
        <h1 class="title">Calculadora de Liquidaciones</h1>
    </div>
    <div>
        <table class="table">
            <thead>
                <th>Calculadora</th>
            </thead>
        </table>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';


interface liquidacion {
    liquidacion: number;
    mes: number;
}

const liquidaciones = ref([])

const calc = () => {

}
</script>

<style scoped></style>