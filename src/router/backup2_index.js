import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/pages/index.vue';
import UpsalePage from '@pages/upsale.vue';
import SaleOrderEditPage from '@pages/edit_sale_order.vue';
import SaleComissionPage from '@pages/sale_com.vue';
import Customer from '@pages/customers.vue';


const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
   {
    path: '/customers',
    name: 'customers',
    component: Customer,
  },
   {
    path: '/sale_com',
    name: 'Commission',
    component: SaleComissionPage,
  },
   {
    path: '/upsale',
    name: 'Upsale',
    component: UpsalePage,
  },
 {
    path: '/edit_sale_order/:id',
    name: 'edit_sale_order',
    component: SaleOrderEditPage,
    props: true, // เพื่อให้รับ id เป็น prop
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
