<template>
  <div class="p-10 mx-auto h-screen bg-gray-50">
    <section class="bg-gray-50 p-3 sm:p-5 antialiased">
      <div class="mx-auto max-w-screen-2xl px-4 lg:px-12">
        <div class="bg-white relative shadow-md sm:rounded-lg overflow-hidden">
          <div
            class="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0 md:space-x-4 p-4"
          >
            <div class="w-full md:w-1/2 pt-4 pb-2">
              <h1>
                <span class="text-gray-600 font-bold text-2xl pl-4">Objednávky</span>
              </h1>
            </div>
          </div>

          <OrdersToolbar :orderFields="orderFields" @openCreateModal="openCreateModal" />
          <OrdersTable
            :orders="paginatedOrders"
            :sortedColumn="sortedColumn"
            :sortDirection="sortDirection"
            @toggleSort="toggleSort"
            @openDeleteModal="handleOpenDeleteModal"
            @openUpdateModal="handleOpenUpdateModal"
          />
          <OrdersPagination
            :orders="filteredOrders"
            :totalPages="totalPages"
            :currentPage="currentPage"
            :ordersPerPage="ordersPerPage"
            @goToPage="goToPage"
            @deleteOrder="handleDeleteOrder"
          />
        </div>
      </div>
    </section>

    <DeleteOrderModal
      v-if="isDeleteModalOpen"
      @close="closeDeleteModal"
      @deleteOrder="handleDeleteOrder"
    />

    <UpdateOrderModal
      v-if="isUpdateModalOpen"
      :order="selectedOrder"
      :orderFields="orderFields"
      @close="closeUpdateModal"
      @updateOrder="handleUpdateOrder"
    />
    <CreateOrderModal
      v-if="isCreateModalOpen"
      :orderFields="orderFields"
      @close="closeCreateModal"
      @createOrder="handleCreateOrder"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, provide } from 'vue'
import { useOrdersState } from '../state/ordersState'
import { useModalsState } from '../state/modalsState'
import type { Order } from './api'

const ordersState = useOrdersState()
const modalState = useModalsState()

const {
  orders,
  orderFields,
  sortedColumn,
  sortDirection,
  currentPage,
  ordersPerPage,
  filteredOrders,
  sortedOrders,
  paginatedOrders,
  totalPages,
  loadOrders,
  toggleSort,
  goToPage,
  selectedFilters,
  addOrder,
  updateOrderData,
  deleteOrderById,
} = ordersState

const {
  isDeleteModalOpen,
  isUpdateModalOpen,
  isCreateModalOpen,
  openDeleteModal,
  closeDeleteModal,
  openUpdateModal,
  closeUpdateModal,
  openCreateModal,
  closeCreateModal,
} = modalState

provide('selectedFilters', selectedFilters)
provide('currentPage', currentPage)

const selectedOrder = ref<Order | null>(null)

const handleOpenUpdateModal = (order: Order) => {
  selectedOrder.value = order
  openUpdateModal()
}

const handleOpenDeleteModal = (order: Order) => {
  selectedOrder.value = order
  openDeleteModal()
}

const handleCreateOrder = async (order: Order) => {
  await addOrder(order)
  closeCreateModal()
}

const handleUpdateOrder = async (order: Order) => {
  await updateOrderData(order)
  selectedOrder.value = null
  closeUpdateModal()
}

const handleDeleteOrder = async () => {
  if (selectedOrder.value) {
    await deleteOrderById(selectedOrder.value.id)
    selectedOrder.value = null
    closeDeleteModal()
  }
}

onMounted(async () => {
  await loadOrders()
})
</script>
