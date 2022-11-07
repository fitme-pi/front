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
    <v-form>
      <!-- <v-row> -->
      <v-container>
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
            for="kilos"
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
            for="centimetros"
            type="number"
          ></v-text-field>
          <div class="ma-3 mt-3">
            <v-btn @click="calcularIMC">
              <h3>Calcular</h3>
            </v-btn>
            <h2 class="h2 pl-2 pt-8" style="color: white">
              Resultado: {{ imc }} {{ imcSignificado }}
            </h2>
          </div>
        </v-col>
        <!-- <h3 class="h3 pl-2" style="color: white"></h3> -->
      </v-container>
      <!-- </v-row> -->
    </v-form>
  </v-container>
</template>

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
  },
  methods: {
    ...mapMutations("auth", ["setLogout"]),

    calcularIMC() {
      this.imc = Math.round(
        Number(this.peso) / (Number(this.altura) / 100) ** 2
      );

      if (this.imc < 20) {
        this.imcSignificado = "Você esta abaixo do peso!";
      } else if (this.imc > 20 && this.imc <= 25) {
        this.imcSignificado = "Peso Ideal";
      } else if (this.imc > 25 && this.imc <= 30) {
        this.imcSignificado = "Sobrepeso";
      } else if (this.imc > 30 && this.imc <= 35) {
        this.imcSignificado = "Obesidade Moderada";
      } else if (this.imc > 35 && this.imc <= 40) {
        this.imcSignificado = "Obesidade Severa";
      } else if (this.imc > 40) {
        this.imcSignificado = "Obesidade Morbida";
      }
    },
  },
};
</script>

<style></style>
