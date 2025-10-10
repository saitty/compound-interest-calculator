<script setup lang="ts">
import { Label } from "@/components/ui/label"
import {
  NumberField,
  NumberFieldContent,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
} from "@/components/ui/number-field"
import type { NumberFieldRootEmits, NumberFieldRootProps } from "reka-ui"
import { useForwardPropsEmits } from "reka-ui"

const props = defineProps<NumberFieldRootProps>()
const emits = defineEmits<NumberFieldRootEmits>()

const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <NumberField
    v-bind="forwarded"
    id="percent"
    :default-value="0.05"
    :step="0.01"
    :format-options="{
      style: 'percent',
    }"
  >
  <Label for="percent">{{ $t('form.percent') }}</Label>
  <NumberFieldContent>
    <NumberFieldDecrement />
      <NumberFieldInput />
      <NumberFieldIncrement />
    </NumberFieldContent>
  </NumberField>
</template>