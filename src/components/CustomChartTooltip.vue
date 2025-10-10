<script setup lang="ts">
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { formatCurrency } from "@/lib/utils";
import { Separator } from '@/components/ui/separator';

const props = defineProps<{
  title?: string
  locale?: string
  currency?: string
  data: {
    name: string
    label: string
    color: string
    value: any
  }[]
}>()
</script>

<template>
  <Card class="px-10 flex flex-col gap-4">
    <h3>
      {{ title }}
    </h3>
    <Separator />
    <div v-for="item in data.slice().reverse()" :key="item.name">
      <Label :style="'color:'+item.color" class="mb-1.5">{{ item.label }}</Label>
      {{ formatCurrency(item.value || 0, props.locale || 'cs-CZ', props.currency) }}
    </div>
  </Card>
</template>