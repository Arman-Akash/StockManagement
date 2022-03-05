import React from 'react';
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
const Branch = React.lazy(() => import('./views/Configuration/Branch'));
const Customer = React.lazy(() => import('./views/Configuration/Customer'));
const ProductSubType = React.lazy(() => import('./views/Configuration/ProductSubType'));
const ProductType = React.lazy(() => import('./views/Configuration/ProductType'));
const Unit = React.lazy(() => import('./views/Configuration/Unit'));
const PurchaseReport = React.lazy(() => import('./views/WarehouseReceive/PurchaseReport'));
const WarehouseReceive = React.lazy(() => import('./views/WarehouseReceive/WarehouseReceive'));
const Sale = React.lazy(() => import('./views/Sale/Sale'));
const Transfer = React.lazy(() => import('./views/Transfer/Transfer'));
const Receive = React.lazy(() => import('./views/Transfer/Receive'));
const Product = React.lazy(() => import('./views/Configuration/Product'));
const OpeningStockEntry = React.lazy(() => import('./views/Configuration/OpeningStockEntry'));
const ChangePassword = React.lazy(() => import('./views/users/ChangePassword'));
const Users = React.lazy(() => import('./views/users/Users'));
const CustomerDueContainer = React.lazy(() => import('./views/CustomerDue/CustomerDueContainer'));
const StockShow = React.lazy(() => import('./views/Stock/StockShow'));
const StockAdjustment = React.lazy(() => import('./views/Stock/StockAdjustment'));

export const outlet = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/sale', name: 'Sale', component: Sale },
  { path: '/transfer', name: 'Transfer', component: Transfer },
  { path: '/receive', name: 'Product Receive', component: Receive },
  { path: '/customer', name: 'Customer', component: Customer },
  { path: '/opening-stock-entry', name: 'Opening Stock Entry', component: OpeningStockEntry },
  { path: '/stock-list', name: 'Stock List', component: StockShow },
  { path: '/stock-adjustment', name: 'Stock Adjustment', component: StockAdjustment },
  { path: '/customer-dues', name: 'Customer Dues', component: CustomerDueContainer }
]

export const warehouse = [
  ...outlet,
  { path: '/warehouse-receive', name: 'Warehouse Receive', component: WarehouseReceive },
  
  { path: '/product-type', name: 'Product Type', component: ProductType },
  { path: '/product-sub-type', name: 'Product Sub Type', component: ProductSubType },
  { path: '/product', name: 'Product', component: Product },
  { path: '/unit', name: 'Unit', component: Unit },
]

const routes = [
  ...warehouse,
  { path: '/branch', name: 'Branch Information', component: Branch },
  { path: '/purchase-report', name: 'Report', component: PurchaseReport },
  { path: '/users/create-user', exact: true, name: 'Users', component: Users },
  { path: '/user/change-password', exact: true, name: 'Access Control', component: ChangePassword },
];

export default routes;
