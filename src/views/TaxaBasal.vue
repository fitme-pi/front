<template>
  <v-container fluid>
    <v-container>
      <v-form class="d-flex align-center flex-column">
        <h1 class="h1 py-8 pl-5">Calculadora de Taxa de Metabolismo Basal</h1>
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
          <v-text-field
            outlined
            v-model="idade"
            cols="12"
            sm="6"
            md="3"
            dark
            label="Idade"
            type="number"
          ></v-text-field>
        </v-col>
        <v-col class="d-flex" cols="12" sm="6" md="3">
          <v-select
            dark
            cols="12"
            sm="6"
            md="3"
            v-model="sexo"
            :items="sexos"
            item-text="titulo"
            item-value="valor"
            return-object
            label="Seu sexo"
            outlined
          ></v-select>
        </v-col>
        <v-col class="d-flex" cols="12" sm="6" md="3">
          <v-select
            dark
            cols="12"
            sm="6"
            md="3"
            v-model="exercicio"
            :items="exercicios"
            item-text="titulo"
            item-value="valor"
            return-object
            label="Nível de atividade física"
            outlined
          ></v-select>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <div class="ma-3 mt-3">
            <v-btn :disabled="!formCompleto" @click="calcularTaxa">
              <h3>Calcular</h3>
            </v-btn>
            <h2 class="h2 pl-2 pt-8" style="color: white">{{ suaTaxa }}</h2>
          </div>
        </v-col>
      </v-form>
    </v-container>
  </v-container>
</template>

<script>
import axios from "axios";
import { mapState, mapMutations } from "vuex";

export default {
  data() {
    return {
      taxa: null,
      evolucao: {},
      peso: null,
      altura: null,
      idade: null,
      sexo: { titulo: "Homem", valor: 5 },
      exercicio: { titulo: "Sedentário (Exercício mínimo)", valor: 1.2 },
      sexos: [
        {
          titulo: "Homem",
          valor: 5,
        },
        {
          titulo: "Mulher",
          valor: -161,
        },
      ],
      exercicios: [
        {
          titulo: "Sedentário (Exercício mínimo)",
          valor: 1.2,
        },
        {
          titulo: "Levemente Ativo (1-3 dias por semana)",
          valor: 1.375,
        },
        {
          titulo: "Moderadamente Ativo (3-5 dias por semana)",
          valor: 1.55,
        },
        {
          titulo: "Muito Ativo (6-7 dias por semana)",
          valor: 1.725,
        },
        {
          titulo: "Extremamente Ativo (Atleta, 2x por dia)",
          valor: 1.9,
        },
      ],
    };
  },
  computed: {
    ...mapState("auth", ["loggedIn", "user"]),

    suaTaxa() {
      return this.taxa
        ? `Sua taxa de metabolismo basal é de ${this.taxa} calorias`
        : "";
    },
    formCompleto() {
      return this.peso !== null && this.altura !== null && this.idade !== null
        ? true
        : false;
    },
  },
  methods: {
    ...mapMutations("auth", ["setLogout"]),

    async calcularTaxa() {
      this.taxa = Math.round(
        (10 * Number(this.peso) +
          6.25 * Number(this.altura) -
          5 * Number(this.idade) +
          this.sexo.valor) *
          this.exercicio.valor
      );

      this.evolucao.massa = this.peso;
      this.evolucao.altura = this.altura;
      this.evolucao.taxa_metabolica_basal = this.taxa;
      await axios.post("api/evolucoes/", this.evolucao);
    },
  },
};
</script>

<style></style>
