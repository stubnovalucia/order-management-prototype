import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import OrdersTable from './components/OrdersTable.vue'
import OrdersPagination from './components/OrdersPagination.vue'
import OrdersToolbar from './components/OrdersToolbar.vue'
import OrdersFilter from './components/OrdersFilter.vue'
import CreateOrderModal from './components/CreateOrderModal.vue'
import UpdateOrderModal from './components/UpdateOrderModal.vue'
import DeleteOrderModal from './components/DeleteOrderModal.vue'
import { PlusIcon } from '@heroicons/vue/20/solid'
import 'flowbite'

const app = createApp(App)
app.component('OrdersTable', OrdersTable)
app.component('OrdersPagination', OrdersPagination)
app.component('OrdersToolbar', OrdersToolbar)
app.component('OrdersFilter', OrdersFilter)
app.component('CreateOrderModal', CreateOrderModal)
app.component('UpdateOrderModal', UpdateOrderModal)
app.component('DeleteOrderModal', DeleteOrderModal)
app.component('PlusIcon', PlusIcon)

app.mount('#app')
