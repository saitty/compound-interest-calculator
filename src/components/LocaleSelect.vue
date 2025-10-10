<script setup lang="ts">
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useStorage } from "@/composables/useStorage";
import { onMounted, watch } from "vue";
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();

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

const localeStored = useStorage('locale', 'en');

watch(localeStored, (newLocale) => {
    locale.value = newLocale;
});

onMounted(() => {
    locale.value = localeStored.value;
});
</script>

<template>
    {{ locale }}
    {{ localeStored }}
    <Select v-model="localeStored">
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