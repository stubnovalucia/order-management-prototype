<template>
  <form class="max-w-sm mx-auto">
    <label for="underline_select" class="sr-only">Underline select</label>
    <select
      class="block py-2.5 px-2 mr-6 w-full text-sm text-gray-500 bg-transparent border-0 border-b-1 border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-gray-200 peer"
      v-model="selectedValue"
      @change="updateFilter"
    >
      <option value="">{{ filterDisplayName }}</option>
      <option v-for="value in filterValues" :key="value" :value="value">{{ value }}</option>
    </select>
  </form>
</template>

<script setup lang="ts">
import { ref, inject, watch } from 'vue'
import type { SelectedFilters } from '../../state/ordersState'

const props = defineProps<{
  filterValues: string[]
  filterCategory: string
  filterDisplayName: string
}>()

const currentPage = inject<{ value: number }>('currentPage')

const selectedValue = ref('')

const selectedFilters = inject<SelectedFilters>('selectedFilters')

const updateFilter = () => {
  if (selectedFilters) {
    selectedFilters[props.filterCategory] = selectedValue.value
  }
  if (currentPage) {
    currentPage.value = 1
  }
}
</script>
