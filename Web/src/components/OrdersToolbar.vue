<template>
  <div
    class="flex flex-col md:flex-row items-stretch md:items-center md:space-x-3 space-y-3 md:space-y-0 justify-between mx-4 py-4 border-t border-gray-200"
  >
    <div class="flex pr-5 gap-4">
      <OrdersFilter
        v-for="orderField in orderFields.filter(
          (orderField: OrderField) => orderField.filterType === 'select',
        )"
        :key="orderField.fieldName"
        :filterCategory="orderField.fieldName"
        :filterDisplayName="orderField.fieldDisplayName"
        :filterValues="orderField.fieldValues"
      />
    </div>

    <div
      class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0"
    >
      <button
        @click="emitOpenCreateModal"
        type="button"
        id="createProductButton"
        class="flex items-center justify-center text-white cursor-pointer bg-blue-700 hover:bg-blue-500 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 focus:outline-none"
      >
        <PlusIcon class="text-white w-5 h-5 mr-1" />
        Pridať objednávku
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import type { OrderField } from '../../state/ordersState'

const props = defineProps<{
  orderFields: OrderField[]
}>()

const emits = defineEmits<{
  (e: 'openCreateModal'): void
}>()

const emitOpenCreateModal = () => {
  emits('openCreateModal')
}
</script>
