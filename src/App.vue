<script setup lang="ts">
import { LineChart } from "@/components/ui/chart-line"
import { ref, computed } from "vue"
import YearPicker from "@/components/YearPicker.vue"
import InterestPicker from "@/components/InterestPicker.vue"
import { Card } from "./components/ui/card";
import MoneyInput from "./components/MoneyInput.vue";
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText, InputGroupTextarea } from "@/components/ui/input-group";
import { Label } from "@/components/ui/label"

const years = ref(10);
const startValue = ref(250000);
const test = ref('awd');
const growthRate = ref(0.075);
const monthlyContribution = ref(5000);
const annualContribution = computed(() => monthlyContribution.value * 12);

const generateData = () => {
  const data = []
  // Check if years.value is defined, use default if not
  const yearsToUse = years.value || 0;
  let currentValue = startValue
  
  for (let i = 0; i < yearsToUse; i++) {
    data.push({
      year: i, // Simplified to use index instead of absolute year
      Base: Math.round(currentValue.value + annualContribution.value * (i + 1)),
      Compounded: Math.round(currentValue.value * Math.pow((growthRate.value + 1), i) + annualContribution.value * (((Math.pow((growthRate.value + 1), i) - 1) / ((growthRate.value + 1) - 1)))),
    })
  }
  
  return data
}

const data = computed(() => generateData())
</script>

<template>

  <LineChart
    :data="data"
    index="year"
    :categories="['Base', 'Compounded']"
    :colors="['var(--chart-1)', 'var(--chart-2)']"
    :y-formatter="(tick, i) => {
      return typeof tick === 'number'
        ? `${new Intl.NumberFormat('cs-CZ').format(tick).toString()} Kč`
        : ''
    }"
    :x-formatter="(tick, i) => {
      return typeof tick === 'number' && tick % 1 === 0
        ? `Rok ${tick + 1}`
        : ''
    }"
  />
  <Card class="grid w-full max-w-sm gap-6 p-6 mx-auto mt-6">
    <div class="flex gap-4">
      <InterestPicker v-model="growthRate" />
      <YearPicker v-model="years" />
    </div>
    <div class="grid gap-2">
      <Label for="startValue">Start value</Label>
      <InputGroup id="startValue">
        <InputGroupInput placeholder="250000" v-model="startValue" type="number" class="" />
        <InputGroupAddon align="inline-end">
          <InputGroupText>Kč</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
    </div>
    
    <div class="grid gap-2">
      <Label for="monthlyContribution">Monthly contribution</Label>
      <InputGroup id="monthlyContribution">
        <InputGroupInput placeholder="5000" v-model="monthlyContribution" />
        <InputGroupAddon align="inline-end">
          <InputGroupText>Kč</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
    </div>
    <p>Annual contribution: {{ annualContribution }}</p>
  </Card>
</template>