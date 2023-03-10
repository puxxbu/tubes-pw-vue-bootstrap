//import vue router
import { createRouter, createWebHistory } from "vue-router";
//define a routes
const routes = [
  {
    path: "/",
    name: "beranda",
    component: () => import("@/components/DashboardLayout.vue"),
    children: [
      // {
      //   path: "/departemen",
      //   name: "departemen.index",
      //   component: () => import("@/views/Departemen/indexPage.vue"),
      // },
      // {
      //   path: "/departemen/create",
      //   name: "departemen.create",
      //   component: () => import("@/views/Departemen/createPage.vue"),
      // },
      // // {
      // //     path: "/departemen/delete",
      // //     name: "departemen.delete",
      // //     component: () =>
      // //     import('@/views/Departemen/createPage.vue'),
      // // },
      // {
      //   path: "/departemen/edit/:id",
      //   name: "departemen.edit",
      //   component: () => import("@/views/Departemen/editPage.vue"),
      // },
      // {
      //   path: "/pegawai",
      //   name: "pegawai.index",
      //   component: () => import("@/views/Pegawai/indexPage.vue"),
      // },
      // {
      //   path: "/pegawai/create",
      //   name: "pegawai.create",
      //   component: () => import("@/views/Pegawai/createPage.vue"),
      // },
      // {
      //   path: "/pegawai/edit/:id",
      //   name: "pegawai.edit",
      //   component: () => import("@/views/Pegawai/editPage.vue"),
      // },
      // {
      //   path: "/proyek",
      //   name: "proyek.index",
      //   component: () => import("@/views/Proyek/indexPage.vue"),
      // },
      // {
      //   path: "/proyek/create",
      //   name: "proyek.create",
      //   component: () => import("@/views/Proyek/createPage.vue"),
      // },
      // {
      //   path: "/proyek/edit/:id",
      //   name: "proyek.edit",
      //   component: () => import("@/views/Proyek/editPage.vue"),
      // },
      {
        path: "/pesanan_makanan",
        name: "pesanan_makanan.index",
        component: () => import("@/views/Pesanan_Makanan/indexPage.vue"),
      },
      {
        path: "/pesanan_makanan/create",
        name: "pesanan_makanan.create",
        component: () => import("@/views/Pesanan_Makanan/createPage.vue"),
      },
      {
        path: "/pesanan_makanan/edit/:id",
        name: "pesanan_makanan.edit",
        component: () => import("@/views/Pesanan_Makanan/editPage.vue"),
      },
      {
        path: "/reservasi/create",
        name: "reservasi.create",
        component: () => import("@/views/Reservasi/createPage.vue"),
      },
      {
        path: "/reservasi",
        name: "reservasi.index",
        component: () => import("@/views/Reservasi/indexPage.vue"),
      },
      {
        path: "/reservasi/edit/:id",
        name: "reservasi.edit",
        component: () => import("@/views/Reservasi/editPage.vue"),
      },
      {
        path: "/data_penginap",
        name: "data_penginap.index",
        component: () => import("@/views/Data_Penginap/indexPage.vue"),
      },
      {
        path: "/data_penginap/create",
        name: "data_penginap.create",
        component: () => import("@/views/Data_Penginap/createPage.vue"),
      },
      {
        path: "/data_penginap/edit",
        name: "data_penginap.edit",
        component: () => import("@/views/Data_Penginap/editPage.vue"),
      },
      {
        path: "/user",
        name: "user.index",
        component: () => import("@/views/User/indexPage.vue"),
      },
      {
        path: "/user",
        name: "user.edit",
        component: () => import("@/views/User/editPage.vue"),
      },
    ],
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/views/registerPage.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/loginPage.vue"),
  },
  // {
  //   path: "/logout",
  //   name: "logout",
  //   component: () => import("@/views/logoutPage.vue"),
  // },
];
//create router
const router = createRouter({
  history: createWebHistory(),
  routes, // config routes
});
export default router;
