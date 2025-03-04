import axios from 'axios'

export interface Order {
  id: number
  category: string
  brand: string
  price: number
  created_at: string
  status: string
}

const API_URL = 'http://localhost:8000/orders'

// Create an instance of Axios
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Fetch all orders
export const getOrders = async (): Promise<Order[]> => {
  try {
    const response = await axiosInstance.get('/')
    return response.data
  } catch (error) {
    throw new Error(`Failed to fetch orders: ${error}`)
  }
}

// Create a new order
export const createOrder = async (order: Omit<Order, 'id' | 'created_at'>): Promise<Order> => {
  try {
    const response = await axiosInstance.post('/', order)
    return response.data
  } catch (error) {
    throw new Error(`Failed to create order: ${error}`)
  }
}

// Update an order
export const updateOrder = async (order: Order): Promise<Order> => {
  try {
    const response = await axiosInstance.put(`/${order.id}`, order)
    return response.data
  } catch (error) {
    throw new Error(`Failed to update order: ${error}`)
  }
}

// Delete an order
export const deleteOrder = async (id: number): Promise<void> => {
  try {
    await axiosInstance.delete(`/${id}`)
  } catch (error) {
    throw new Error(`Failed to delete order: ${error}`)
  }
}
