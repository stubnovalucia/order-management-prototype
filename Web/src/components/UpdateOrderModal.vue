<template>
  <div
    id="updateOrderModal"
    tabindex="-1"
    style="background-color: rgba(0, 0, 0, 0.5)"
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 overflow-y-auto overflow-x-hidden w-full md:inset-0 h-[calc(100%-1rem)] md:h-full"
  >
    <div class="relative p-4 w-full max-w-3xl h-full md:h-auto">
      <!-- Modal content -->
      <div class="relative p-4 bg-white rounded-lg shadow sm:p-5">
        <!-- Modal header -->
        <div class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5">
          <h3 class="text-lg font-semibold text-gray-900">Upraviť objednávku</h3>
          <button
            type="button"
            class="absolute cursor-pointer top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
            @click="$emit('close')"
          >
            <svg
              aria-hidden="true"
              class="w-5 h-5"
              fill="currentColor"
              viewbox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>
        <!-- Modal body -->
        <form @submit.prevent="handleSubmit">
          <div class="grid gap-4 mb-4 sm:grid-cols-2">
            <div>
              <label for="category" class="block mb-2 text-sm font-medium text-gray-900"
                >Kategória vozidla</label
              >
              <select
                id="category"
                v-model="updatedOrder.category"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
              >
                <option value="" disabled>Vybrať kategóriu</option>
                <option v-for="value in getFieldValues('category')" :key="value" :value="value">
                  {{ value }}
                </option>
              </select>
            </div>
            <div>
              <label for="brand" class="block mb-2 text-sm font-medium text-gray-900"
                >Značka vozidla</label
              >
              <select
                id="brand"
                v-model="updatedOrder.brand"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
              >
                <option value="" disabled>Vybrať značku</option>
                <option v-for="value in getFieldValues('brand')" :key="value" :value="value">
                  {{ value }}
                </option>
              </select>
            </div>
            <div>
              <label for="status" class="block mb-2 text-sm font-medium text-gray-900">Stav</label>
              <select
                id="status"
                v-model="updatedOrder.status"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
              >
                <option value="" disabled>Vybrať stav</option>
                <option v-for="value in getFieldValues('status')" :key="value" :value="value">
                  {{ value }}
                </option>
              </select>
            </div>
            <div>
              <label for="price" class="block mb-2 text-sm font-medium text-gray-900">Cena</label>
              <input
                type="number"
                name="price"
                id="price"
                v-model="updatedOrder.price"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="0"
                required
              />
              <span v-if="priceError" class="text-red-500 text-sm">Cena musí byť väčšia ako 0</span>
            </div>
          </div>
          <div class="items-center justify-end space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
            <button
              type="submit"
              :disabled="!isFormValid"
              class="w-full cursor-pointer sm:w-auto justify-center text-white inline-flex bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Upraviť objednávku
            </button>
            <button
              @click="$emit('close')"
              type="button"
              class="w-full cursor-pointer justify-center sm:w-auto text-gray-500 inline-flex items-center bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
            >
              <svg
                class="mr-1 -ml-1 w-5 h-5"
                fill="currentColor"
                viewbox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
              Zrušiť
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { OrderField } from '../../state/ordersState'
import type { Order } from '../api'

const props = defineProps<{
  order: Order
  orderFields: OrderField[]
}>()

const updatedOrder = ref({ ...props.order })

const getFieldValues = (fieldName: string) => {
  const field = props.orderFields.find((field) => field.fieldName === fieldName)
  return field ? field.fieldValues : []
}

const priceError = computed(() => updatedOrder.value.price <= 0)

const isFormValid = computed(() => {
  return (
    updatedOrder.value.category &&
    updatedOrder.value.brand &&
    updatedOrder.value.status &&
    !priceError.value
  )
})

const emits = defineEmits<{
  (e: 'close'): void
  (e: 'updateOrder', order: Order): void
}>()

const handleSubmit = () => {
  if (!isFormValid.value) return

  console.log('Updated Order:', updatedOrder.value)
  emits('updateOrder', updatedOrder.value)
  emits('close')
}
</script>
