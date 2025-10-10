<script setup lang="ts">
import type { BulletLegendItemInterface } from "@unovis/ts"
import type { Component } from "vue"
import { omit } from "@unovis/ts"
import { VisCrosshair, VisTooltip } from "@unovis/vue"
import { createApp } from "vue"
import { ChartTooltip } from "."
import { useI18n } from "vue-i18n";
const { t: $t } = useI18n()

const props = withDefaults(defineProps<{
  colors: string[]
  index: string
  items: BulletLegendItemInterface[]
  customTooltip?: Component
  locale?: string
  currency?: string
}>(), {
  colors: () => [],
})

// Use weakmap to store reference to each datapoint for Tooltip
const wm = new WeakMap()
function template(d: any) {
  const cacheKey = JSON.stringify({ data: d, locale: props.locale, currency: props.currency });

  if (wm.has(d) && wm.get(d).locale === props.locale && wm.get(d).currency === props.currency) {
    return wm.get(d).html
  }
  else {
    const componentDiv = document.createElement("div")
    const omittedData = Object.entries(omit(d, [props.index])).map(([key, value]) => {
      const legendReference = props.items.find(i => i.name === key)
      return { ...legendReference, value }
    })
    const TooltipComponent = props.customTooltip ?? ChartTooltip
    createApp(TooltipComponent, { 
      title: $t(`chart.yearLabel`, { year: d[props.index] }),
      data: omittedData,
      locale: props.locale,
      currency: props.currency
    }).mount(componentDiv)
    const html = componentDiv.innerHTML
    wm.set(d, { html, locale: props.locale, currency: props.currency })
    return html
  }
}

function color(d: unknown, i: number) {
  return props.colors[i] ?? "transparent"
}
</script>

<template>
  <VisTooltip :horizontal-shift="20" :vertical-shift="20" />
  <VisCrosshair :template="template" :color="color" />
</template>
