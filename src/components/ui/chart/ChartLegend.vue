<script setup lang="ts">
import type { BulletLegendItemInterface } from "@unovis/ts"
import { BulletLegend } from "@unovis/ts"
import { VisBulletLegend } from "@unovis/vue"
import { nextTick, onMounted, ref } from "vue"
import { buttonVariants } from '@/components/ui/button'

const props = withDefaults(defineProps<{ items: BulletLegendItemInterface[] }>(), {
  items: () => [],
})

const emits = defineEmits<{
  "legendItemClick": [d: BulletLegendItemInterface, i: number]
  "update:items": [payload: BulletLegendItemInterface[]]
}>()

const elRef = ref<HTMLElement>()


function onLegendItemClick(d: BulletLegendItemInterface, i: number) {
  emits("legendItemClick", d, i)
  const isBulletActive = !props.items[i]?.inactive
  const isFilterApplied = props.items.some(i => i.inactive)
  if (isFilterApplied && isBulletActive) {
    // reset filter
    emits("update:items", props.items.map(item => ({ ...item, inactive: false })))
  }
  else {
    // apply selection, set other item as inactive
    emits("update:items", props.items.map(item => item.name === d.name ? ({ ...d, inactive: false }) : { ...item, inactive: true }))
  }
}
</script>

<template>
  <div
    ref="elRef" class="w-max flex gap-2 mr-6 mt-2" :style="{
      '--vis-legend-bullet-size': '16px',
    }"
  >
    <div v-for="item in items.slice().reverse()" :key="item.name">
      <button
        type="button"
        :class="[
          buttonVariants({
            variant: item.inactive ? 'ghost' : 'outline',
            size: 'sm',
          }),
          'cursor-pointer',
        ]"
        @click="onLegendItemClick(item, items.indexOf(item))"
      >
        <span 
          class="inline-block w-3 h-3 mr-1 rounded-sm"
          :style="{ backgroundColor: typeof item.color === 'string' ? item.color : Array.isArray(item.color) ? item.color[0] : '' }"
        ></span>
        {{ item.label }}
      </button>
    </div>
    
  </div>
</template>
