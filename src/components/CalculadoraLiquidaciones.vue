<script setup lang="ts">
import { ref } from "vue";
import Select from "primevue/select";
import RadioButton from "primevue/radiobutton";
import DatePicker from "primevue/datepicker";
import InputNumber from "primevue/inputnumber";
import Checkbox from "primevue/checkbox";
import Drawer from "primevue/drawer";
import Panel from "primevue/panel";
import Button from "primevue/button";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import type { CalculateResult, Contract, ContractsType } from "@/models/models";
import { required } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import { Calculator } from "@/service/Calculator";

const rule = {
  region: { required },
  firstDate: { required },
  lastDate: { required },
  contractType: { required },
  lastPay: { required },
  vacations: { required },
};

const contrac = ref<Contract>({
  region: "1",
  contractType: {
    code: "1",
    name: "Por acuerdo de las partes",
    rate: 1,
  },
} as Contract);

const validator = useVuelidate(rule, contrac);
const visible = ref(false);
const contractsType = ref<ContractsType[]>([
  {
    code: "1",
    name: "Por acuerdo de las partes",
    rate: 1,
  },
  {
    code: "2",
    name: "Por la conclusion de la obra, periodo de labor o servicios objeto del contrato",
    rate: 1,
  },
  {
    code: "3",
    name: "Por muerte o incapacidad del empleador o extinción de la persona jurídica contratante",
    rate: 1,
  },
  {
    code: "4",
    name: "Por muerte del trabajador o incapacidad permanente y total para el trabajo",
    rate: 1,
  },
  {
    code: "5",
    name: "Por caso fortuito o fuerza mayor que imposibiliten el trabajo, como incendio, terremoto, etc.",
    rate: 1,
  },
  {
    code: "6",
    name: "Por voluntad del empleador previo visto bueno. ",
    rate: 1,
  },
  {
    code: "7",
    name: "Por voluntad del trabajador previo visto bueno",
    rate: 1,
  },
  {
    code: "8",
    name: "Por desahucio",
    rate: 1,
  },
  {
    code: "9",
    name: "Por despido intempestivo",
    rate: 1,
  },
  {
    code: "10",
    name: "Por Terminación dentro del periodo de prueba",
    rate: 1,
  },
]);

const result = ref<CalculateResult[]>([]);

const onCalculate = () => {
  validator.value.$validate();
  if (!validator.value.$error) {
    result.value = new Calculator(contrac.value).getResult();
    visible.value = true;
  }
};

const onClear = () => {
  validator.value.$reset();
  visible.value = false;
  result.value = [];
  contrac.value = {
    region: "1",
    contractType: {
      code: "1",
      name: "Por acuerdo de las partes",
      rate: 1,
    },
  } as Contract;
};
</script>
<template>
  <div class="flex flex-col items-center gap-4 py-4">
    <div>
      <h1 class="text-2xl font-semibold">Calculadora de Liquidaciones</h1>
    </div>
    <Panel header="Tipo de contrato" class="min-w-[300px] w-3/5">
      <div class="flex flex-col w-full gap-4">
        <Select
          v-model="contrac.contractType"
          :options="contractsType"
          optionLabel="name"
          placeholder="Tipo de contrato"
          :invalid="validator.contractType.$error"
        />
        <div class="flex justify-end w-full gap-4">
          <div class="flex items-center">
            <RadioButton
              v-model="contrac.region"
              inputId="ingredient1"
              name="pizza"
              value="1"
            />
            <label for="ingredient1" class="ml-2">Sierra</label>
          </div>
          <div class="flex items-center">
            <RadioButton
              v-model="contrac.region"
              inputId="ingredient2"
              name="pizza"
              value="2"
            />
            <label for="ingredient2" class="ml-2">Costa</label>
          </div>
          <div class="flex items-center">
            <RadioButton
              v-model="contrac.region"
              inputId="ingredient3"
              name="pizza"
              value="3"
            />
            <label for="ingredient3" class="ml-2">Oriente</label>
          </div>
          <div class="flex items-center">
            <RadioButton
              v-model="contrac.region"
              inputId="ingredient4"
              name="pizza"
              value="4"
            />
            <label for="ingredient4" class="ml-2">Insular</label>
          </div>
        </div>
      </div>
    </Panel>
    <Panel header="Fechas de contrato" class="min-w-[300px] w-3/5">
      <div class="flex flex-col w-full gap-4">
        <DatePicker
          v-model="contrac.firstDate"
          showIcon
          fluid
          :showOnFocus="true"
          placeholder="Fecha de inicio"
          :invalid="validator.firstDate.$error"
        />
        <DatePicker
          v-model="contrac.lastDate"
          showIcon
          fluid
          :showOnFocus="true"
          placeholder="Fecha de fin"
          :invalid="validator.lastDate.$error"
        />
      </div>
    </Panel>
    <Panel header="Detalles de cobros" class="min-w-[300px] w-3/5">
      <div class="flex flex-col w-full gap-4">
        <InputNumber
          v-model="contrac.lastPay"
          inputId="stacked-buttons"
          mode="currency"
          currency="USD"
          placeholder="Ultima remuneracion recibida ($)"
          :invalid="validator.lastPay.$error"
        />
      </div>
      <div class="flex flex-col w-full mt-3">
        <InputNumber
          v-model="contrac.vacations"
          inputId="withoutgrouping"
          :useGrouping="false"
          placeholder="Vacaciones sin Gozar"
          :max="15"
          :invalid="validator.vacations.$error"
        />
      </div>
      <div class="flex gap-4 mt-3">
        <div class="flex items-center">
          <Checkbox v-model="contrac.decimoTercero" :binary="true" />
          <label for="ingredient1" class="ml-2">
            Mensualiza Decimotercera
          </label>
        </div>
        <div class="flex items-center">
          <Checkbox v-model="contrac.decimoCuarto" :binary="true" />
          <label for="ingredient1" class="ml-2">
            Mensualiza Decimocuarto
          </label>
        </div>
      </div>
    </Panel>
    <div class="flex justify-end min-w-[300px] w-3/5 gap-4">
      <Button label="limpiar" @click="onClear" />
      <Button label="Calcular" @click="onCalculate" />
    </div>
    <Drawer v-model:visible="visible" header="Liquidacion" position="full">
      <DataTable :value="result">
        <Column field="label" header="Nombre">
          <template #body="slotProps">
            <p
              :class="
                slotProps.index == result.length - 1
                  ? 'font-semibold text-lg'
                  : ''
              "
            >
              {{ slotProps.data.label }}
            </p>
          </template>
        </Column>
        <Column field="value" header="Valor">
          <template #body="slotProps">
            <p
              class="font-semibold text-green-600"
              :class="
                slotProps.index == result.length - 1
                  ? 'font-semibold text-lg'
                  : ''
              "
            >
              ${{ slotProps.data.value.toFixed(2) }}
            </p>
          </template>
        </Column>
      </DataTable>
    </Drawer>
  </div>
</template>

<style scoped></style>
