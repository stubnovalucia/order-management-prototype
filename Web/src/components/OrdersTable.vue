<template>
  <div class="overflow-x-auto">
    <div class="px-4">
      <table class="w-full text-sm text-left text-gray-500">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <!-- For future implementation - mass edit/delete <th scope="col" class="p-4">
              <div class="flex items-center">
                <input
                  id="checkbox-all"
                  type="checkbox"
                  class="w-4 h-4 bg-gray-100 rounded border-gray-300 focus:ring-1 focus:ring-blue-500"
                />
                <label for="checkbox-all" class="sr-only">checkbox</label>
              </div>
            </th> -->
            <th @click="toggleSort('category')" class="p-4 cursor-pointer">
              Kategória vozidla
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                class="h-5 w-5 inline-block ml-2"
                :class="{
                  'opacity-100': sortedColumn === 'category',
                  'opacity-50': sortedColumn !== 'category',
                }"
              >
                <path
                  v-if="
                    (sortedColumn === 'category' && sortDirection === 'asc') ||
                    sortedColumn !== 'category'
                  "
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 0 1 1.414 0L10 9.586l3.293-3.293a1 1 0 0 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414z"
                  clip-rule="evenodd"
                />
                <path
                  v-if="sortedColumn === 'category' && sortDirection === 'desc'"
                  fill-rule="evenodd"
                  d="M14.707 12.707a1 1 0 0 1-1.414 0L10 10.414l-3.293 3.293a1 1 0 0 1-1.414-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </th>
            <th scope="col" class="p-4 cursor-pointer" @click="toggleSort('brand')">
              Značka vozidla
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                class="h-5 w-5 inline-block ml-2"
                :class="{
                  'opacity-100': sortedColumn === 'brand',
                  'opacity-50': sortedColumn !== 'brand',
                }"
              >
                <path
                  v-if="
                    (sortedColumn === 'brand' && sortDirection === 'asc') ||
                    sortedColumn !== 'brand'
                  "
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 0 1 1.414 0L10 9.586l3.293-3.293a1 1 0 0 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414z"
                  clip-rule="evenodd"
                />
                <path
                  v-if="sortedColumn === 'brand' && sortDirection === 'desc'"
                  fill-rule="evenodd"
                  d="M14.707 12.707a1 1 0 0 1-1.414 0L10 10.414l-3.293 3.293a1 1 0 0 1-1.414-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </th>
            <th scope="col" class="p-4 cursor-pointer" @click="toggleSort('price')">
              Predajná cena
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                class="h-5 w-5 inline-block ml-2"
                :class="{
                  'opacity-100': sortedColumn === 'price',
                  'opacity-50': sortedColumn !== 'price',
                }"
              >
                <path
                  v-if="
                    (sortedColumn === 'price' && sortDirection === 'asc') ||
                    sortedColumn !== 'price'
                  "
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 0 1 1.414 0L10 9.586l3.293-3.293a1 1 0 0 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414z"
                  clip-rule="evenodd"
                />
                <path
                  v-if="sortedColumn === 'price' && sortDirection === 'desc'"
                  fill-rule="evenodd"
                  d="M14.707 12.707a1 1 0 0 1-1.414 0L10 10.414l-3.293 3.293a1 1 0 0 1-1.414-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </th>
            <th scope="col" class="p-4 cursor-pointer" @click="toggleSort('created_at')">
              Dátum vytvorenia
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                class="h-5 w-5 inline-block ml-2"
                :class="{
                  'opacity-100': sortedColumn === 'created_at',
                  'opacity-50': sortedColumn !== 'created_at',
                }"
              >
                <path
                  v-if="
                    (sortedColumn === 'created_at' && sortDirection === 'asc') ||
                    sortedColumn !== 'created_at'
                  "
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 0 1 1.414 0L10 9.586l3.293-3.293a1 1 0 0 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414z"
                  clip-rule="evenodd"
                />
                <path
                  v-if="sortedColumn === 'created_at' && sortDirection === 'desc'"
                  fill-rule="evenodd"
                  d="M14.707 12.707a1 1 0 0 1-1.414 0L10 10.414l-3.293 3.293a1 1 0 0 1-1.414-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </th>
            <th scope="col" class="p-4 cursor-pointer" @click="toggleSort('status')">
              Stav<svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                class="h-5 w-5 inline-block ml-2"
                :class="{
                  'opacity-100': sortedColumn === 'status',
                  'opacity-50': sortedColumn !== 'status',
                }"
              >
                <path
                  v-if="
                    (sortedColumn === 'status' && sortDirection === 'asc') ||
                    sortedColumn !== 'status'
                  "
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 0 1 1.414 0L10 9.586l3.293-3.293a1 1 0 0 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414z"
                  clip-rule="evenodd"
                />
                <path
                  v-if="sortedColumn === 'status' && sortDirection === 'desc'"
                  fill-rule="evenodd"
                  d="M14.707 12.707a1 1 0 0 1-1.414 0L10 10.414l-3.293 3.293a1 1 0 0 1-1.414-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </th>
            <th scope="col" class="p-4 cursor-pointer"></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="order in orders"
            :key="order.id"
            class="border-b border-gray-200 hover:bg-gray-100 cursor-pointer"
          >
            <!-- For future implementation - mass edit/delete
           <td class="p-4 w-4">
              <div class="flex items-center">
                <input
                  id="checkbox-table-search-1"
                  type="checkbox"
                  onclick="event.stopPropagation()"
                  class="w-4 h-4 bg-gray-100 rounded border-gray-300 focus:ring-1 focus:ring-blue-500"
                />
                <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
              </div>
            </td> -->
            <td class="px-4 py-1 whitespace-nowrap">
              {{ order.category }}
            </td>
            <td class="px-4 py-1 whitespace-nowrap">
              {{ order.brand }}
            </td>
            <td class="px-4 py-1 whitespace-nowrap">
              {{ order.price }}
            </td>
            <td class="px-4 py-1 whitespace-nowrap">
              {{ formatDate(order.created_at) }}
            </td>
            <td class="px-4 py-1 whitespace-nowrap">
              {{ order.status }}
            </td>
            <td class="px-4 py-1 font-medium text-gray-900 whitespace-nowrap">
              <div class="flex items-center justify-end space-x-4">
                <button
                  type="button"
                  @click="emitOpenUpdateModal(order)"
                  class="py-1 px-3 flex items-center text-sm font-medium cursor-pointer text-center hover:text-white text-blue-700 border border-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 mr-0.5 -ml-0.5"
                    viewbox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"
                    />
                    <path
                      fill-rule="evenodd"
                      d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <!-- Upraviť -->
                </button>

                <button
                  type="button"
                  @click="emitOpenDeleteModal(order)"
                  class="flex items-center text-red-700 hover:text-white cursor-pointer border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm py-1 px-3 text-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 mr-0.5 -ml-0.5"
                    viewbox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <!-- Zmazať -->
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import { formatDate } from '../utils'
import type { Order } from '../api'

const props = defineProps<{
  orders: Order[]
  sortedColumn: string | null
  sortDirection: 'asc' | 'desc' | null
}>()

const emits = defineEmits<{
  (e: 'toggleSort', column: string): void
  (e: 'openDeleteModal', order: Order): void
  (e: 'openUpdateModal', order: Order): void
}>()

const toggleSort = (column: string) => {
  emits('toggleSort', column)
}

const emitOpenDeleteModal = (order: Order) => {
  emits('openDeleteModal', order)
}

const emitOpenUpdateModal = (order: Order) => {
  emits('openUpdateModal', order)
}
</script>
