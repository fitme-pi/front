<template>
  <v-container fluid>
    <v-container>
      <v-form class="d-flex align-center flex-column">
        <h1 class="h1 py-8 pl-5">Calculadora de IMC</h1>
        <v-col cols="12" sm="6" md="3">
          <v-text-field
            outlined
            v-model="evolucao.massa"
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
            v-model="evolucao.altura"
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
            <v-btn :disabled="!formCompleto" @click="calcularIMC">
              <h3>Calcular</h3>
            </v-btn>
            <h2 v-if="evolucao.imc" class="h2 pl-2 pt-8" style="color: white">
              Seu imc é de
              {{ this.evolucao.imc }}, significa que você está
              {{ this.imcSignificado }}
            </h2>
          </div>
        </v-col>
        <v-simple-table dark>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">IMC</th>
                <th class="text-left">Classificação</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(classificacao, index) in classificacoes" :key="index">
                <td>{{ classificacao.imc }}</td>
                <td>{{ classificacao.classificacao }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-form>
    </v-container>
    <v-snackbar
      color="red darken-2"
      v-model="errorPost"
      multline
      :timeout="2000"
      >{{ errorMessage }}</v-snackbar
    >
    <v-snackbar
      color="blue darken-2"
      v-model="successPost"
      multline
      :timeout="2000"
      >Informação salva com sucesso!</v-snackbar
    >
  </v-container>
</template>

<script>
import axios from "axios";
import { mapState, mapMutations } from "vuex";

export default {
  data() {
    return {
      evolucao: {},
      errorMessage: "",
      errorPost: false,
      successPost: false,
      imcSignificado: null,
      classificacoes: [
        {
          imc: "Abaixo de 18,5",
          classificacao: "Abaixo do peso",
        },
        {
          imc: "Entre 18,6 e 24,9",
          classificacao: "Peso ideal",
        },
        {
          imc: "Entre 25,0 e 29,9",
          classificacao: "Levemente acima do peso",
        },
        {
          imc: "Entre 30,0 e 34,9",
          classificacao: "Obesidade grau 1",
        },
        {
          imc: "Entre 35,0 e 39,9",
          classificacao: "Obesidade grau 2 (severa)",
        },
        {
          imc: "Acima de 40",
          classificacao: "Obesidade grau 3 (mórbida)",
        },
      ],
    };
  },
  computed: {
    ...mapState("auth", ["loggedIn", "user"]),

    formCompleto() {
      return this.evolucao.peso !== null &&
        this.evolucao.altura !== null &&
        this.evolucao.idade !== null
        ? true
        : false;
    },
  },
  methods: {
    ...mapMutations("auth", ["setLogout"]),

    async salvarEvolucao() {
      try {
        await axios.post("api/evolucoes/", this.evolucao);
        this.successPost = true;
      } catch (e) {
        let firstDataError = JSON.stringify(
          Object.keys(e.response.data)[0]
        ).replace(/[\]["]/g, "");
        this.errorMessage = `${firstDataError.toUpperCase()}, ${JSON.stringify(
          e.response.data[firstDataError]
        )
          .replace(/[\]["]/g, "")
          .toLowerCase()}`;
        this.errorPost = true;

        console.log(e);
      }
    },
    calcularIMC() {
      this.evolucao.imc = Math.round(
        Number(this.evolucao.massa) / (Number(this.evolucao.altura) / 100) ** 2
      );

      if (this.evolucao.imc < 20) {
        this.imcSignificado = "abaixo do peso!";
      } else if (this.evolucao.imc > 20 && this.evolucao.imc <= 25) {
        this.imcSignificado = "no peso ideal";
      } else if (this.evolucao.imc > 25 && this.evolucao.imc <= 30) {
        this.imcSignificado = "com sobrepeso";
      } else if (this.evolucao.imc > 30 && this.evolucao.imc <= 35) {
        this.imcSignificado = "com obesidade moderada";
      } else if (this.evolucao.imc > 35 && this.evolucao.imc <= 40) {
        this.imcSignificado = "com obesidade severa";
      } else if (this.evolucao.imc > 40) {
        this.imcSignificado = "com obesidade morbida";
      }
      this.salvarEvolucao();
    },
  },
};
</script>

<style></style>
