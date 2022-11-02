<template>
  <v-container class="fundo d-flex" fluid>
    <v-app>
      <v-app-bar app color="#0C0B30" dark elevation="3">
        <v-list-item>
          <h1>Fitme</h1>
        </v-list-item>
        <v-list-item-group class="menu d-flex">
          <!-- <v-divider vertical></v-divider>
            <v-list-item>
              <label for="usuario" class="cursor-pointer"> Treino </label>
            </v-list-item>
            <v-divider vertical></v-divider>
            <v-list-item>
              <label for="usuario" class="cursor-pointer">Exercício</label>
            </v-list-item>
            <v-divider vertical></v-divider>
            <v-list-item>
              <label for="usuario" class="cursor-pointer">Alimentação</label>
            </v-list-item>
            <v-divider vertical></v-divider> -->
          <v-list-item link :to="{ path: '/home' }">
            <label for="usuario" class="cursor-pointer">Home</label>
          </v-list-item>
          <v-divider vertical></v-divider>
          <v-list-item link :to="{ path: '/imc' }">
            <label for="usuario" class="cursor-pointer text-center"
              >Calcular IMC</label
            >
          </v-list-item>
          <v-divider vertical></v-divider>
          <v-list-item link :to="{ path: '/perfil' }">
            <v-icon size="35" class="mr-4" name="usuario"
              >mdi-account-circle</v-icon
            >
            <label for="usuario">{{ user ? user.first_name : "Perfil" }}</label>
          </v-list-item>
          <v-list-item @click="sair()">Sair</v-list-item>
        </v-list-item-group>
      </v-app-bar>

      <!-- <v-navigation-drawer color="#052d69" class="mt-14 accent-4" permanent>
        <v-list-item-content>
          <v-list-item-title
            class="text-h4 font-weight-black mt-3 ml-4"
            style="color: white"
          >
            Início
          </v-list-item-title>
          <v-divider></v-divider>
        </v-list-item-content>
        <template>
          <v-list-item-content>
            <v-toolbar dense floating elevation="3" class="ml-3 mr-3">
              <v-text-field
                hide-details
                prepend-icon="mdi-magnify"
                single-line
                class="ml-1 mr-1"
                label="Procurar"
              ></v-text-field>
            </v-toolbar>
          </v-list-item-content>
        </template>
        <v-list>
          <v-list-item v-for="item in items" :key="item.title" link>
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <template #append>
          <div class="pa-2">
            <v-btn block> Logout </v-btn>
          </div>
        </template>
      </v-navigation-drawer> -->
      <v-main class="fundo">
        <router-view></router-view>
      </v-main>
    </v-app>
  </v-container>
</template>

<script>
import { mapMutations, mapState } from "vuex";

export default {
  data() {
    return {
      sidebar: true,
      mini: false,
      // items: [
      //   {
      //     title: "Home",
      //     icon: "mdi-account",
      //     to: "/home",
      //   },
      //   {
      //     title: "Perfil",
      //     icon: "mdi-account-cog",
      //     to: "/perfil",
      //   },
      //   {
      //     title: "Sair",
      //     icon: "mdi-exit-to-app",
      //     to: "/",
      //   },
      // ],
    };
  },
  computed: {
    ...mapState("auth", ["user"]),
  },
  methods: {
    ...mapMutations("auth", ["setLogout"]),
    sair() {
      this.setLogout();
    },
  },
};
</script>

<style></style>
