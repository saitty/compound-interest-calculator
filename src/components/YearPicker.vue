<script setup lang="ts">
import { Label } from "@/components/ui/label";
import {
  NumberField,
  NumberFieldContent,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
} from "@/components/ui/number-field";
</script>

<template>
  <NumberField id="year" :default-value="10" :min="1" >
    <Label for="year">{{ $t('form.year') }}</Label>
    <NumberFieldContent>
      <NumberFieldDecrement />
      <NumberFieldInput />
      <NumberFieldIncrement />
    </NumberFieldContent>
  </NumberField>
</template>