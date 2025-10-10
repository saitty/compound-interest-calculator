<script setup lang="ts">
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
</script>

<template>
    <Select v-model="$i18n.locale">
    <SelectTrigger class="w-full">
        <Label for="locale">{{ $t('app.language') }}</Label>
        <SelectValue :placeholder="$t('select.selectLocale')" />
    </SelectTrigger>
    <SelectContent>
        <SelectItem v-for="locale in $i18n.availableLocales" :key="`locale-${locale}`" :value="locale">{{ locale.toUpperCase() }}</SelectItem>
    </SelectContent>
    </Select>
</template>