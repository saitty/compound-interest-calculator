<script setup lang="ts">
import { ref, computed } from "vue";
import { compoundInterest, formatCurrency } from "@/lib/utils";
import type { CurrencyCode } from "@/types";
import { AreaChart } from "@/components/ui/chart-area";
import { Card } from "./components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { ButtonGroup } from "@/components/ui/button-group";
import { Toggle } from '@/components/ui/toggle';
import YearPicker from "@/components/YearPicker.vue";
import InterestPicker from "@/components/InterestPicker.vue";
import MoneyPicker from "@/components/MoneyPicker.vue";
import CustomChartTooltip from "@/components/CustomChartTooltip.vue";
import LocaleSelect from "./components/LocaleSelect.vue";
import CurrencySelect from "./components/CurrencySelect.vue";


const years = ref<number>(10);
const growthRate = ref<number>(0.1);
const initialDeposit = ref<number[]>([255000]);
const contribution = ref<number[]>([20000]);
const annualContribution = computed(() => (contribution.value[0] || 0) * (isContributionMonthly.value ? 12 : 1));
const isContributionMonthly = ref(true);
const currency = ref<CurrencyCode>('CZK');

const generateData = () => {
  const data = []
  let currentValue = initialDeposit.value[0] || 0;
  
  for (let i = 0; i <= years.value || 0; i++) {
    data.push({
      year: i, // Simplified to use index instead of absolute year
      "totalContributions": Math.round(currentValue + annualContribution.value * (i)),
      "totalBalance": compoundInterest(currentValue + annualContribution.value * (i), growthRate.value, 1, i),
    })
  }

  return data
}

const data = computed(() => generateData())
</script>

<template>
  <main class="lg:px-12 md:px-6 sm:px-4 px-2 grid md:grid-cols-2 md:gap-6 sm:gap-4 gap-2 md:mt-6 sm:mt-4 mt-2 max-w-5xl mx-auto">
    <div class="flex md:col-span-2 sm:items-end items-center sm:text-start text-center">
      <h1 class="text-xl font-bold flex-1 max-w-52">{{ $t('app.title') }}</h1>
      <Card class="grid gap-y-1.5 gap-x-4 grid-cols-2 max-w-sm p-6 ml-auto">
        <Label class="col-span-2">{{ $t('app.settings') }}</Label>
        <LocaleSelect />
        <CurrencySelect v-model="currency" />
      </Card>
    </div>
    <Card class="grid w-full gap-6 px-1 mx-auto md:col-span-2">
      <AreaChart
        :data="data"
        index="year"
        :categories="['totalContributions', 'totalBalance']"
        :category-labels="{
          'totalContributions': $t('app.totalContributions'),
          'totalBalance': $t('app.totalBalance')
        }"
        :colors="['var(--chart-1)', 'var(--chart-4)']"
        :y-formatter="(tick, i) => { return typeof tick === 'number' ? formatCurrency(tick, $i18n.locale, currency) : '' }"
        :x-formatter="(tick, i) => { return typeof tick === 'number' && tick % 1 === 0 && tick > 0 ? $t('chart.yearLabel', { year: tick }) : '' }"
        :locale="$i18n.locale"
        :currency="currency"
        :custom-tooltip="CustomChartTooltip"
      />
    </Card>
    <Card class="grid w-full gap-6 p-6 mx-auto">
      <div class="flex gap-4">
        <InterestPicker v-model="growthRate" />
        <YearPicker v-model="years" />
      </div>
      <div class="grid gap-2">
        <MoneyPicker 
          :label="$t('form.initialDeposit')" v-model="initialDeposit[0]"
          :min="0" :max="10000000"
          :currency="currency"
          :locale="$i18n.locale"
          :step="10000"
          :step-snapping="false"
        />
        <Slider v-model="initialDeposit" :min="0" :max="1000000" :step="10000" class="mt-2" />
      </div>
      
      <div class="grid gap-2">
        <MoneyPicker
          :label="$t('form.contribution')" v-model="contribution[0]"
          :min="0" :max="1000000"
          :currency="currency"
          :locale="$i18n.locale"
          :step="10000"
          :step-snapping="false"
        />
        <Slider v-model="contribution" :min="0" :max="100000" :step="10000" class="mt-2" />
      </div>
  
      <div class="grid gap-1.5">
        <Label>{{ $t('app.contributionFrequency') }}</Label>
        <ButtonGroup
          aria-label="Media controls"
          class="h-fit"
        >
          <Toggle :model-value="!isContributionMonthly" @click="isContributionMonthly = false" variant="outline" aria-label="Toggle annual contribution">
            {{ $t('app.annual') }}
          </Toggle>
          <Toggle :model-value="isContributionMonthly" @click="isContributionMonthly = true" variant="outline" aria-label="Toggle monthly contribution">
            {{ $t('app.monthly') }}
          </Toggle>
        </ButtonGroup>
      </div>
    </Card>
    <Card class="grid w-full gap-6 p-6 mx-auto content-baseline">
      <p class="text-lg font-semibold">
        <Label class="mb-2 text-chart-4">{{ $t('app.totalBalance') }}</Label>
        {{ formatCurrency(data[data.length - 1]?.['totalBalance'],$i18n.locale, currency) }}
      </p>
      <p class="text-lg font-semibold">
        <Label class="mb-2 text-primary">{{ $t('app.totalContributions') }}</Label>
        {{ formatCurrency(data[data.length - 1]?.['totalContributions'],$i18n.locale, currency) }}
      </p>
      <p class="text-lg font-semibold">
        <Label class="mb-2">{{ $t('app.totalInterestEarned') }}</Label>
        {{ formatCurrency((data[data.length - 1]?.['totalBalance'] || 0) - (data[data.length - 1]?.['totalContributions'] || 0),$i18n.locale, currency) }}
      </p>
    </Card>
  </main>
</template>