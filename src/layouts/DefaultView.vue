<template>
  <v-app class="fundo d-flex">
    <v-app-bar app color="#0C0B30" dark elevation="3">
      <v-list-item>
        <h1>Fitme</h1>
      </v-list-item>
      <v-list-item-group class="menu d-flex">
        <v-divider vertical></v-divider>
        <v-list-item link :to="{ path: '/' }">
          <label for="usuario" class="cursor-pointer">Home</label>
        </v-list-item>
        <v-divider vertical></v-divider>
        <v-list-item link :to="{ path: '/exercicios' }">
          <label for="usuario" class="cursor-pointer">Exercicios</label>
        </v-list-item>
        <v-divider vertical></v-divider>
        <v-list-item link :to="{ path: '/treinos' }">
          <label for="usuario" class="cursor-pointer">Treino</label>
        </v-list-item>
        <v-divider vertical></v-divider>
        <v-list-item link :to="{ path: '/imc' }">
          <label for="usuario" class="cursor-pointer text-center">IMC</label>
        </v-list-item>
        <v-divider vertical></v-divider>
        <v-list-item link :to="{ path: '/basal' }">
          <label for="usuario" class="cursor-pointer text-center">TMB</label>
        </v-list-item>
        <v-divider vertical></v-divider>
        <v-list-item link :to="{ path: '/perfil' }">
          <v-icon size="35" class="mr-4" name="usuario"
            >mdi-account-circle</v-icon
          >
          <label for="usuario">{{ user ? user.first_name : "Perfil" }}</label>
        </v-list-item>
        <v-list-item @click="setLogout">Sair</v-list-item>
      </v-list-item-group>
    </v-app-bar>

    <v-main class="fundo">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import { mapMutations, mapState } from "vuex";

export default {
  data() {
    return {
      sidebar: true,
      mini: false,
    };
  },
  computed: {
    ...mapState("auth", ["user"]),
  },
  methods: {
    ...mapMutations("auth", ["setLogout"]),
  },
};
</script>

<style></style>
