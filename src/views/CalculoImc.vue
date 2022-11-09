<template>
  <v-container fluid>
    <v-app-bar app color="#0C0B30" dark elevation="3">
      <v-list-item>
        <h1>Fitme</h1>
      </v-list-item>
      <v-list-item-group v-if="loggedIn" class="menu d-flex">
        <v-list-item link :to="{ path: '/' }">
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
        <v-list-item @click="setLogout">Sair</v-list-item>
      </v-list-item-group>
    </v-app-bar>
    <v-container>
      <v-form>
        <h1 class="h1 py-8 pl-5">Calculadora de IMC</h1>
        <v-col cols="12" sm="6" md="3">
          <v-text-field
            outlined
            v-model="peso"
            cols="12"
            sm="6"
            md="3"
            dark
            label="Peso(kg)"
            type="number"
          >
          </v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-text-field
            outlined
            v-model="altura"
            cols="12"
            sm="6"
            md="3"
            dark
            label="Altura(centímetros)"
            type="number"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <div class="ma-3 mt-3">
            <v-btn @click="calcularIMC">
              <h3>Calcular</h3>
            </v-btn>
            <h2 class="h2 pl-2 pt-8" style="color: white">{{ seuIMC }}</h2>
          </div>
        </v-col>
        <!-- <h3 class="h3 pl-2" style="color: white"></h3> -->
      </v-form>
      <v-img
        max-height="350"
        max-width="550"
        src="http://www.clinicaplena.com.br/fertile/uploads/1598363053_312.jpg"
      ></v-img>
    </v-container>
  </v-container>
</template>

<!-- <v-img
  max-height="350"
  max-width="550"
  src="http://www.clinicaplena.com.br/fertile/uploads/1598363053_312.jpg"
></v-img> -->

<script>
import { mapState, mapMutations } from "vuex";

export default {
  data() {
    return {
      imc: null,
      peso: null,
      altura: null,
      imcSignificado: null,
    };
  },
  computed: {
    ...mapState("auth", ["loggedIn", "user"]),

    seuIMC() {
      return this.imc
        ? `Seu imc é de ${this.imc}, significa que você está ${this.imcSignificado}`
        : "";
    },
  },
  methods: {
    ...mapMutations("auth", ["setLogout"]),

    calcularIMC() {
      this.imc = Math.round(
        Number(this.peso) / (Number(this.altura) / 100) ** 2
      );

      if (this.imc < 20) {
        this.imcSignificado = "abaixo do peso!";
      } else if (this.imc > 20 && this.imc <= 25) {
        this.imcSignificado = "no peso ideal";
      } else if (this.imc > 25 && this.imc <= 30) {
        this.imcSignificado = "com sobrepeso";
      } else if (this.imc > 30 && this.imc <= 35) {
        this.imcSignificado = "com obesidade moderada";
      } else if (this.imc > 35 && this.imc <= 40) {
        this.imcSignificado = "com obesidade severa";
      } else if (this.imc > 40) {
        this.imcSignificado = "com obesidade morbida";
      }
    },
  },
};
</script>

<style></style>
