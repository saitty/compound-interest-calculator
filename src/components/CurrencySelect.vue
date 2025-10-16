<script setup lang="ts">
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { currencyCodes } from "@/types";
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const props = defineProps({
  modelValue: String
})
const emit = defineEmits(['update:modelValue'])

const { t, locale } = useI18n();

const selectedCurrencyLabel = computed(() => {
  if (!props.modelValue) return t('select.selectCurrency');
  return `${props.modelValue} - ${t('currencies.' + props.modelValue)}`;
});
</script>

<template>
    <Select
        :model-value="props.modelValue"
        @update:model-value="emit('update:modelValue', $event)"
    >
        <div>
            <Label for="currency" class="mb-1.5">{{ $t('app.currency') }}</Label>
            <SelectTrigger class="w-full">
                <SelectValue :placeholder="$t('select.selectCurrency')">
                    {{ selectedCurrencyLabel }}
                </SelectValue>
            </SelectTrigger>
        </div>
        <SelectContent>
            <SelectItem 
                v-for="code in currencyCodes"
                :key="`currency-${code}`" 
                :value="code"
            >
                {{ code + ' - ' + $t('currencies.' + code) }}
            </SelectItem>
        </SelectContent>
    </Select>
</template>