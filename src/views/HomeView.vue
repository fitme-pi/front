<template>
  <v-container fluid>
    <v-row class="mt-16" justify="center">
      <v-col cols="12" lg="5" md="3">
        <h1 class="h1 mb-5 text-center">Sua evolução</h1>
        <template>
          <v-data-table
            :headers="headers"
            :items="dados"
            :items-per-page="5"
            class="elevation-1 mt-16"
          ></v-data-table>
        </template>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";

export default {
  async created() {
    const { data } = await axios.get("api/evolucoes/");
    this.dados = data;
    console.log(this.dados);
  },
  data() {
    return {
      headers: [
        {
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "Altura", value: "altura" },
        { text: "Massa", value: "massa" },
        { text: "IMC", value: "imc" },
        { text: "Taxa de Metabolismo Basal", value: "taxa_metabolica_basal" },
        { text: "Data (YYYY/MM/DD)", value: "data" },
      ],
      dados: [],
    };
  },
  computed: {
    ...mapState("auth", ["user"]),
  },
};
</script>

<style></style>
