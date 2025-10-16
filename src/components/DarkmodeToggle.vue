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
import { onMounted, onUnmounted, watch, ref, computed } from "vue";
import { useI18n } from "vue-i18n";

const themeStored = useStorage('theme', 'system');

// Keep track of system theme change listener
let systemThemeMediaQuery: MediaQueryList | null = null;

const getSystemTheme = () => {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const applyTheme = (theme: string) => {
    let actualTheme = theme;
    if (theme === 'system') {
        actualTheme = getSystemTheme();
    }
    
    if (actualTheme === 'dark') {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
};

const handleSystemThemeChange = (e: MediaQueryListEvent) => {
    // Only apply if current theme is 'system'
    if (themeStored.value === 'system') {
        applyTheme('system');
    }
};

watch(themeStored, (newTheme) => {
    applyTheme(newTheme);
    
    // Manage system theme listener based on current theme
    if (window.matchMedia) {
        if (newTheme === 'system') {
            if (!systemThemeMediaQuery) {
                systemThemeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
                systemThemeMediaQuery.addEventListener('change', handleSystemThemeChange);
            }
        } else {
            if (systemThemeMediaQuery) {
                systemThemeMediaQuery.removeEventListener('change', handleSystemThemeChange);
                systemThemeMediaQuery = null;
            }
        }
    }
});

onMounted(() => {
    // Apply initial theme
    applyTheme(themeStored.value);

    // Set up system theme change listener if theme is 'system'
    if (window.matchMedia && themeStored.value === 'system') {
        systemThemeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        systemThemeMediaQuery.addEventListener('change', handleSystemThemeChange);
    }
});

onUnmounted(() => {
    // Clean up the listener when component is unmounted
    if (systemThemeMediaQuery) {
        systemThemeMediaQuery.removeEventListener('change', handleSystemThemeChange);
    }
});

const { t, locale } = useI18n();

const selectedThemeLabel = computed(() => {
    switch (themeStored.value) {
        case 'light':
            return t('app.light');
        case 'dark':
            return t('app.dark');
        default:
            return t('app.system');
    }
});
</script>

<template>
    <Select v-model="themeStored">
        <div>
            <Label for="theme" class="mb-1.5">{{ $t('app.theme') }}</Label>
            <SelectTrigger class="w-full">
                <SelectValue :placeholder="$t('select.selectTheme')">
                    {{ selectedThemeLabel }}
                </SelectValue>
            </SelectTrigger>
        </div>
        <SelectContent>
            <SelectItem v-for="theme in ['system', 'light', 'dark']" :key="`theme-${theme}`" :value="theme">
                {{ $t('app.' + theme) }}
            </SelectItem>
        </SelectContent>
    </Select>
</template>