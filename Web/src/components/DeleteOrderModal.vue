<template>
  <div
    id="delete-modal"
    tabindex="-1"
    style="background-color: rgba(0, 0, 0, 0.5)"
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
  >
    <div class="relative w-full h-auto max-w-md max-h-full">
      <div class="relative bg-white rounded-lg shadow">
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
        <div class="py-20 px-10 text-center">
          <h3 class="mb-5 text-lg font-normal text-gray-500">
            Naozaj chcete zmazať túto objednávku?
          </h3>
          <button
            @click="handleSubmit"
            type="button"
            class="text-white cursor-pointer bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
          >
            Áno, zmazať
          </button>
          <button
            @click="$emit('close')"
            type="button"
            class="text-gray-500 cursor-pointer bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
          >
            Nie, zrušiť
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const emits = defineEmits<{
  (e: 'close'): void
  (e: 'deleteOrder'): void
}>()

const handleSubmit = () => {
  console.log('Delete Order')
  emits('deleteOrder')
  emits('close')
}
</script>
