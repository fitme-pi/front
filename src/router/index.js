import store from "@/store";
import Vue from "vue";
import VueRouter from "vue-router";

import CadastroView from "@/views/CadastroView.vue";
import LoginView from "@/views/LoginView.vue";
import HomeView from "@/views/HomeView.vue";
import PerfilView from "@/views/PerfilView.vue";
import FichasTreino from "@/views/FichasTreino.vue";
import TreinoCadastro from "@/views/TreinoCadastro.vue";
import TreinoDetail from "@/views/TreinoDetail.vue";
import ExerciciosView from "@/views/ExerciciosView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: () => import("@/layouts/DefaultView.vue"),
    meta: {
      auth: true,
    },
    children: [
      {
        path: "",
        name: "HomeView",
        component: HomeView,
      },
      {
        path: "/perfil",
        name: "PerfilView",
        component: PerfilView,
      },
      {
        path: "/treinos",
        name: "FichasTreino",
        component: FichasTreino,
      },
      {
        path: "/treino/:id",
        name: "TreinoDetail",
        component: TreinoDetail,
      },
      {
        path: "/treinocadastro",
        name: "TreinoCadastro",
        component: TreinoCadastro,
      },
      {
        path: "/exercicios",
        name: "Exercicios",
        component: ExerciciosView,
      },
      {
        path: "/imc",
        name: "CalculoImc",
        component: () => import("@/views/CalculoImc.vue"),
      },
      {
        path: "/basal",
        name: "TaxaBasal",
        component: () => import("@/views/TaxaBasal.vue"),
      },
    ],
  },
  {
    path: "/",
    component: () => import("@/layouts/BlankView.vue"),
    meta: {
      auth: false,
    },
    children: [
      {
        path: "/login",
        name: "LoginView",
        component: LoginView,
      },
      {
        path: "/cadastro",
        name: "CadastroView",
        component: CadastroView,
      },
    ],
  },
];
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.auth)) {
    if (!store.state.auth.loggedIn) {
      next({
        path: "/login",
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
