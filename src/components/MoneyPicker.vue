<script setup lang="ts">
import { Label } from "@/components/ui/label"
import {
  NumberField,
  NumberFieldContent,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
} from "@/components/ui/number-field";
import type { NumberFieldRootEmits, NumberFieldRootProps } from "reka-ui";
import type { HTMLAttributes } from "vue";
import { reactiveOmit } from "@vueuse/core"
import { useForwardPropsEmits } from "reka-ui"

interface MoneyPickerProps extends NumberFieldRootProps {
  label?: string;
  currency?: string;
  locale?: string;
  id?: string;
}

const props = defineProps<MoneyPickerProps>()
const emits = defineEmits<NumberFieldRootEmits>()

const delegatedProps = reactiveOmit(props, "label", "id")
const forwarded = useForwardPropsEmits(delegatedProps, emits)

</script>

<template>
  <div>
    <Label v-if="props.label" class="mb-1.5" :for="props.id">{{ props.label }}</Label>
    <NumberField 
      v-bind="forwarded"
      :format-options="{
        style: 'currency',
        currency: props.currency || 'CZK',
        currencyDisplay: 'symbol',
        currencySign: 'standard',
        minimumFractionDigits: 0,
      }"
      >
      <NumberFieldContent>
        <NumberFieldDecrement />
        <NumberFieldInput :id="props.id" />
        <NumberFieldIncrement />
      </NumberFieldContent>
    </NumberField>
  </div>
</template>