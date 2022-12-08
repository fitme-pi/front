<template>
  <v-container fluid>
    <v-row class="d-flex justify-center" dense>
      <v-col v-for="(treino, index) in treinos" :key="index" cols="12" sm="3">
        <v-card class="mx-auto my-12" max-width="374">
          <v-card-title>{{ treino.titulo }}</v-card-title>

          <v-card-text>
            <div class="my-4">
              <h2>Número de Séries</h2>
              <h3>{{ treino.num_series }}</h3>
            </div>
          </v-card-text>
          <v-card-text>
            <div class="my-4">
              <h2>Número de Repetições</h2>
              <h3>{{ treino.num_reps }}</h3>
            </div>
          </v-card-text>

          <v-card-title
            >Tempo de descanço:
            {{ treino.tempo_descanso }} segundos</v-card-title
          >

          <v-card-title
            >Exercício selecionado: <br />{{
              treino.exercicio.nome
            }}</v-card-title
          >

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
    treinos: [
      // {
      //   id: 0,
      //   titulo: "Treino de A",
      //   num_reps: 10,
      //   num_series: 3,
      //   tempo_descanso: "45",
      // },
      // {
      //   id: 1,
      //   titulo: "Treino de B",
      //   num_reps: 10,
      //   num_series: 4,
      //   tempo_descanso: "60",
      // },
      // {
      //   id: 2,
      //   titulo: "Treino de C",
      //   num_reps: 12,
      //   num_series: 3,
      //   tempo_descanso: "60",
      // },
      // {
      //   id: 3,
      //   titulo: "Treino de D",
      //   num_reps: 12,
      //   num_series: 3,
      //   tempo_descanso: "60",
      // },
      // {
      //   id: 4,
      //   titulo: "Treino de E",
      //   num_reps: 12,
      //   num_series: 3,
      //   tempo_descanso: "60",
      // },
      // {
      //   id: 5,
      //   titulo: "Treino de F",
      //   num_reps: 12,
      //   num_series: 3,
      //   tempo_descanso: "60",
      // },
    ],
  }),

  methods: {
    async pegarTreinos() {
      const { data } = await axios.get("api/treinos/");
      this.treinos = data;
    },
    async deletarTreino({ id }) {
      await axios.delete(`api/treinos/${id}/`);
      this.pegarTreinos();
    },
  },
};
</script>

<style></style>
