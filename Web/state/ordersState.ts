import { ref, computed, reactive } from 'vue'
import { getOrders, createOrder, updateOrder, deleteOrder } from '../src/api'
import type { Order } from '../src/api'

export interface OrderField {
  fieldName: string
  fieldDisplayName: string
  fieldValues: string[]
  fieldType: string
  filterType: string
}

export interface SelectedFilters {
  [key: string]: string
}

//CRUD logic

const orders = ref<Order[]>([])

const editOrderData = ref<Order | null>(null)

const loadOrders = async () => {
  try {
    orders.value = await getOrders()
    orderFields.value
      .filter((orderField) => orderField.fieldType === 'select')
      .forEach((orderField) => {
        const existingValues = new Set(orderField.fieldValues)
        orders.value.forEach((order) => {
          const value = order[orderField.fieldName as keyof Order] as string
          if (value && !existingValues.has(value)) {
            existingValues.add(value)
          }
        })
        orderField.fieldValues = Array.from(existingValues)
      })
  } catch (error) {
    console.error('Error loading orders:', error)
  }
}

const addOrder = async (orderData: Omit<Order, 'id' | 'created_at'>) => {
  try {
    const order = await createOrder(orderData)
    orders.value.push(order)
  } catch (error) {
    console.error('Error creating order:', error)
  }
}

const updateOrderData = async (orderData: Order) => {
  try {
    const updatedOrder = await updateOrder(orderData)
    const index = orders.value.findIndex((o) => o.id === updatedOrder.id)
    if (index !== -1) {
      orders.value[index] = updatedOrder
    }
  } catch (error) {
    console.error('Error updating order:', error)
  }
}

const deleteOrderById = async (id: number) => {
  try {
    await deleteOrder(id)
    orders.value = orders.value.filter((order) => order.id !== id)
  } catch (error) {
    console.error('Error deleting order:', error)
  }
}

// Order inputs and filters

const orderFields = ref<OrderField[]>([
  {
    fieldName: 'category',
    fieldDisplayName: 'Kategória vozidla',
    fieldValues: ['LKW', 'PKW'],
    fieldType: 'select',
    filterType: 'select',
  },
  {
    fieldName: 'brand',
    fieldDisplayName: 'Značka vozidla',
    fieldValues: [
      'Audi',
      'BMW',
      'Citroen',
      'Dacia',
      'Fiat',
      'Ford',
      'Honda',
      'Hyundai',
      'Jaguar',
      'Jeep',
      'Kia',
      'Lada',
      'Lancia',
      'Land Rover',
      'Lexus',
      'Mazda',
      'Mercedes',
      'Mini',
      'Mitsubishi',
      'Nissan',
      'Opel',
      'Peugeot',
      'Porsche',
      'Renault',
      'Rover',
      'Saab',
      'Seat',
      'Skoda',
      'Smart',
      'Subaru',
      'Suzuki',
      'Toyota',
      'Volkswagen',
      'Volvo',
    ],
    fieldType: 'select',
    filterType: 'select',
  },
  {
    fieldName: 'status',
    fieldDisplayName: 'Stav',
    fieldValues: ['Vytvorená', 'Vybavuje sa', 'Vybavená', 'Stornovaná'],
    fieldType: 'select',
    filterType: 'select',
  },
  {
    fieldName: 'price',
    fieldDisplayName: 'Cena',
    fieldValues: [],
    fieldType: 'numberInput',
    filterType: 'numberInput',
  },
  {
    fieldName: 'created_at',
    fieldDisplayName: 'Dátum vytvorenia',
    fieldValues: [],
    fieldType: 'datePicker',
    filterType: 'datePicker',
  },
])

const selectedFilters = reactive<SelectedFilters>({
  category: '',
  brand: '',
  status: '',
})

const filteredOrders = computed(() => {
  return orders.value.filter((order) => {
    const isCategoryMatch = selectedFilters.category
      ? order.category.includes(selectedFilters.category)
      : true
    const isBrandMatch = selectedFilters.brand ? order.brand.includes(selectedFilters.brand) : true
    const isStatusMatch = selectedFilters.status
      ? order.status.includes(selectedFilters.status)
      : true
    return isCategoryMatch && isBrandMatch && isStatusMatch
  })
})

// Sorting logic

const sortedColumn = ref<string | null>(null)
const sortDirection = ref<'asc' | 'desc' | null>(null)

const ordersPerPage = 10
const currentPage = ref(1)

const toggleSort = (column: string) => {
  if (sortedColumn.value === column) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortedColumn.value = column
    sortDirection.value = 'asc'
  }
}

const isSortedBy = (column: string) => {
  return sortedColumn.value === column
}

const sortedOrders = computed(() => {
  const sorted = [...filteredOrders.value]
  if (sortedColumn.value) {
    sorted.sort((a, b) => {
      const aValue = a[sortedColumn.value as keyof Order]
      const bValue = b[sortedColumn.value as keyof Order]

      if (aValue > bValue) return sortDirection.value === 'asc' ? 1 : -1
      if (aValue < bValue) return sortDirection.value === 'asc' ? -1 : 1
      return 0
    })
  }
  return sorted
})

//Pagination logic

const totalPages = computed(() => Math.ceil(filteredOrders.value.length / ordersPerPage))

const paginatedOrders = computed(() => {
  const start = (currentPage.value - 1) * ordersPerPage
  const end = start + ordersPerPage
  return sortedOrders.value.slice(start, end)
})

const goToPage = (page: number) => {
  if (page < 1 || page > totalPages.value) return
  currentPage.value = page
}

export const useOrdersState = () => {
  return {
    orders,
    editOrderData,
    orderFields,
    selectedFilters,
    sortedColumn,
    sortDirection,
    currentPage,
    ordersPerPage,
    filteredOrders,
    sortedOrders,
    paginatedOrders,
    totalPages,
    loadOrders,
    addOrder,
    updateOrderData,
    deleteOrderById,
    toggleSort,
    isSortedBy,
    goToPage,
  }
}
