<script setup lang="ts">
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const languages = {
    en: "English",
    fr: "Français",
    de: "Deutsch",
    pl: "Polski",
    es: "Español",
    it: "Italiano",
    cs: "Čeština",
    ja: "日本語",
    zh: "中文"
};
</script>

<template>
    <Select v-model="$i18n.locale">
        <div>
            <Label for="locale" class="mb-1.5">{{ $t('app.language') }}</Label>
            <SelectTrigger class="w-full">
                <SelectValue :placeholder="$t('select.selectLocale')" />
            </SelectTrigger>
        </div>
        <SelectContent>
            <SelectItem v-for="locale in Object.keys(languages)" :key="`locale-${locale}`" :value="locale">
                {{ languages[locale as keyof typeof languages] }}
            </SelectItem>
        </SelectContent>
    </Select>
</template>