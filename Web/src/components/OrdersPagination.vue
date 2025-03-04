<template>
  <nav
    class="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
    aria-label="Table pagination"
  >
    <span class="text-sm font-normal text-gray-500 mr-2">
      Zobrazuje sa
      <span class="font-semibold text-gray-900 ml-1 mr-1">{{ firstOrder }}-{{ lastOrder }}</span>
      z
      <span class="font-semibold text-gray-900 ml-1">{{ orders.length }}</span>
    </span>
    <ul class="inline-flex items-stretch -space-x-px">
      <li>
        <button
          :disabled="currentPage === 1"
          class="flex items-center justify-center cursor-pointer h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 disabled:cursor-not-allowed disabled:text-gray-300 disabled:bg-gray-100 disabled:border-gray-200 transition duration-200"
          @click="goToPage(currentPage - 1)"
        >
          <svg
            class="w-5 h-5"
            aria-hidden="true"
            fill="currentColor"
            viewbox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clip-rule="evenodd"
            />
          </svg>
          <span>Predchádzajúca</span>
        </button>
      </li>

      <li>
        <button
          :disabled="currentPage === totalPages"
          @click="goToPage(currentPage + 1)"
          class="flex items-center justify-center cursor-pointer h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 disabled:cursor-not-allowed disabled:text-gray-300 disabled:bg-gray-100 disabled:border-gray-200 transition duration-200"
        >
          <span>Ďalšia</span>
          <svg
            class="w-5 h-5"
            aria-hidden="true"
            fill="currentColor"
            viewbox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed } from 'vue'
import type { Order } from '../api'

const props = defineProps<{
  orders: Order[]
  totalPages: number
  currentPage: number
  ordersPerPage: number
}>()

const emits = defineEmits<{
  (e: 'goToPage', page: number): void
}>()

const goToPage = (page: number) => {
  emits('goToPage', page)
}

const firstOrder = computed(() => {
  return (props.currentPage - 1) * props.ordersPerPage + 1
})

const lastOrder = computed(() => {
  return Math.min(props.currentPage * props.ordersPerPage, props.orders.length)
})
</script>
