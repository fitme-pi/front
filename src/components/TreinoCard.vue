<template>
  <v-container fluid>
    <v-row class="d-flex justify-center" dense>
      <v-col v-for="(treino, index) in treinos" :key="index" cols="12" sm="3">
        <v-card
          link
          :to="`/treino/${treino.id}/`"
          class="mx-auto my-12"
          max-width="374"
        >
          <v-card-title>{{ treino.titulo }}</v-card-title>

          <v-divider class="mx-4"></v-divider>
          <v-card-actions>
            <v-btn color="red" text @click="deletarTreino(treino)"
              >Deletar Treino</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  created() {
    this.pegarTreinos();
  },
  data: () => ({
    treinos: [],
  }),
  methods: {
    async pegarTreinos() {
      const { data } = await axios.get("api/treinos/");
      this.treinos = data;
    },
    async deletarTreino({ id }) {
      await axios.delete(`api/treinos/${id}/`);
      this.$router.push({ path: "/treinos" });
    },
  },
};
</script>

<style></style>
