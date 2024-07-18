<script setup lang="ts">
import { ref } from 'vue';
import Select from 'primevue/select';
import RadioButton from 'primevue/radiobutton';
import DatePicker from 'primevue/datepicker';
import InputNumber from 'primevue/inputnumber';

interface liquidacion {
    liquidacion: number;
    mes: number;
}

const region = ref();
const firstDate = ref();
const lastDate = ref();
const lastPay= ref();
const decimoTercero = ref();
const decimoCuarto = ref();
const vacations = ref();
const contractType = ref();
const contracts = ref([
    { code: '1', name: 'Por acuerdo de las partes' },
    { code: '2', name: 'Por la conclusion de la obra, periodo de labor o servicios objeto del contrato' },
    { code: '3', name: 'Por muerte o incapacidad del empleador o extinción de la persona jurídica contratante' },
    { code: '4', name: 'Por muerte del trabajador o incapacidad permanente y total para el trabajo' },
    { code: '5', name: 'Por caso fortuito o fuerza mayor que imposibiliten el trabajo, como incendio, terremoto, tempestad, explosión, plagas del campo, guerra y, en general, cualquier otro acontecimiento extraordinario que los contratantes no pudieron prever o que previsto no lo pudieron evitar.' },
    { code: '6', name: 'Por voluntad del empleador previo visto bueno. ' }
]);

const liquidaciones = ref<liquidacion[]>([])

const calc = () => {
    liquidaciones.value.map(x => {
        

    })
}
</script>
<template>
    <div>
        <h1 class="title">Calculadora de Liquidaciones</h1>
    </div>
    <div class="">
        <Select v-model="contractType" :options="contracts" optionLabel="name" placeholder="Tipo de contrato" />
    </div>
    <div>
        <div class="flex flex-wrap gap-4">
            <div class="flex items-center">
                <RadioButton v-model="region" inputId="ingredient1" name="pizza" value="1" />
                <label for="ingredient1" class="ml-2">Sierra</label>
            </div>
            <div class="flex items-center">
                <RadioButton v-model="region" inputId="ingredient2" name="pizza" value="2" />
                <label for="ingredient2" class="ml-2">Costa</label>
            </div>
            <div class="flex items-center">
                <RadioButton v-model="region" inputId="ingredient3" name="pizza" value="3" />
                <label for="ingredient3" class="ml-2">Oriente</label>
            </div>
            <div class="flex items-center">
                <RadioButton v-model="region" inputId="ingredient4" name="pizza" value="4" />
                <label for="ingredient4" class="ml-2">Insular</label>
            </div>
        </div>
    </div>
    <div>
        <div class="">
            <label>Fecha de inicio de relacion laboral</label>
            <DatePicker v-model="firstDate" showIcon iconDisplay="input" />
        </div>
        <div>
            <label>Fecha de inicio de relacion laboral</label>
            <DatePicker v-model="lastDate" showIcon iconDisplay="input" />
        </div>
        <div>
            <label>Ultima remuneracion recibida ($) <span class="text-red-100">*</span></label>
            <InputNumber v-model="lastPay" inputId="stacked-buttons" showButtons mode="currency" currency="USD" />
        </div>
        <div>
            <label>Mensualiza Decimotercera Remuneración:</label>
            <Checkbox v-model="decimoTercero" :binary="true" />
        </div>
        <div>
            <label>Mensualiza Decimocuarta Remuneración:</label>
            <Checkbox v-model="decimoCuarto" :binary="true" />
        </div>
        <div>
            <label>Número de Días de Vacaciones sin Gozar en el Último Periodo:*</label>
            <InputNumber v-model="vacations" inputId="withoutgrouping" :useGrouping="false" />
        </div>
    </div>
    <div>
        <div>
            <button @click="calc">Calcular Liquidaciones</button>
        </div>
    </div>
</template>


<style scoped></style>