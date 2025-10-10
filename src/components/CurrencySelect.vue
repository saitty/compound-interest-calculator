<script setup lang="ts">
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { currencyCodes, type CurrencyCode } from "@/types";

const props = defineProps({
  modelValue: String
})
const emit = defineEmits(['update:modelValue'])
</script>

<template>
    <Select
        :model-value="props.modelValue"
        @update:model-value="emit('update:modelValue', $event)"
    >
    
        <SelectTrigger class="w-full">
            <Label for="currency">{{ $t('app.currency') }}</Label>
            <SelectValue :placeholder="$t('select.selectCurrency')" />
        </SelectTrigger>
        <SelectContent>
            <SelectItem 
                v-for="code in currencyCodes"
                :key="`currency-${code}`" 
                :value="code"
            >
                {{ code }}
            </SelectItem>
        </SelectContent>
    </Select>
</template>