<script setup lang="ts">
import { ref } from 'vue';
import Select from 'primevue/select';
import RadioButton from 'primevue/radiobutton';
import DatePicker from 'primevue/datepicker';
import InputNumber from 'primevue/inputnumber';
import Checkbox from 'primevue/checkbox';
import Panel from 'primevue/panel';
import Button from 'primevue/button';

interface liquidacion {
    liquidacion: number;
    mes: number;
}

const region = ref("1");
const firstDate = ref();
const lastDate = ref();
const lastPay = ref();
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
    <div class="flex flex-col items-center gap-4 py-4">
        <div>
            <h1 class="text-2xl font-semibold">Calculadora de Liquidaciones</h1>
        </div>
        <Panel header="Tipo de contrato" class="min-w-[300px] w-3/5">
            <div class="flex flex-col w-full gap-4">
                <Select v-model="contractType" :options="contracts" optionLabel="name" placeholder="Tipo de contrato" />
                <div class="flex justify-end w-full gap-4">
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
        </Panel>
        <Panel header="Fechas de contrato" class="min-w-[300px] w-3/5">
            <div class="flex flex-col w-full gap-4">
                <DatePicker v-model="firstDate" showIcon fluid :showOnFocus="true" placeholder="Fecha de inicio" />
                <DatePicker v-model="lastDate" showIcon fluid :showOnFocus="true" placeholder="Fecha de fin" />
            </div>
        </Panel>
        <Panel header="Detalles de cobros" class="min-w-[300px] w-3/5">
            <div class="flex flex-col w-full gap-4">
                <InputNumber v-model="lastPay" inputId="stacked-buttons" mode="currency" currency="USD"
                    placeholder="Ultima remuneracion recibida ($)" />
            </div>
            <div class="flex flex-col w-full mt-3">
                <InputNumber v-model="vacations" inputId="withoutgrouping" :useGrouping="false"
                    placeholder="Vacaciones sin Gozar" />
            </div>
            <div class="flex gap-4 mt-3">
                <div class="flex items-center">
                    <Checkbox v-model="decimoTercero" :binary="true" />
                    <label for="ingredient1" class="ml-2"> Mensualiza Decimotercera </label>
                </div>
                <div class="flex items-center">
                    <Checkbox v-model="decimoCuarto" :binary="true" />
                    <label for="ingredient1" class="ml-2"> Mensualiza Decimocuarto </label>
                </div>
            </div>

        </Panel>
        <div class="flex justify-end min-w-[300px] w-3/5">
            <Button label="Submit" @click="calc" />
        </div>
    </div>
</template>


<style scoped></style>