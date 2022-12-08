<template>
  <v-container fluid>
    <v-row class="d-flex justify-center" dense>
      <v-col v-for="(treino, index) in treinos" :key="index" cols="12" sm="3">
        <v-card class="mx-auto my-12" max-width="374">
          <v-card-title>{{ treino.nome }}</v-card-title>

          <v-card-text>
            <div class="my-4">
              <h2>Número de Séries</h2>
              {{ treino.num_series }}
            </div>
          </v-card-text>
          <v-card-text>
            <div class="my-4">
              <h2>Número de Repetições</h2>
              {{ treino.num_reps }}
            </div>
          </v-card-text>

          <v-card-title
            >Tempo de descanço:
            {{ treino.tempo_descanso }} segundos</v-card-title
          >

          <v-divider class="mx-4"></v-divider>
          <v-card-actions>
            <v-btn color="blue" text @click="irPraTreino(treino)"
              >Ver informações</v-btn
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
    // this.pegarTreinos();
  },
  data: () => ({
    treinos: [
      {
        id: 0,
        nome: "Treino de A",
        num_reps: 10,
        num_series: 3,
        tempo_descanso: "45",
      },
      {
        id: 1,
        nome: "Treino de B",
        num_reps: 10,
        num_series: 4,
        tempo_descanso: "60",
      },
      {
        id: 2,
        nome: "Treino de C",
        num_reps: 12,
        num_series: 3,
        tempo_descanso: "60",
      },
      {
        id: 3,
        nome: "Treino de D",
        num_reps: 12,
        num_series: 3,
        tempo_descanso: "60",
      },
      {
        id: 4,
        nome: "Treino de E",
        num_reps: 12,
        num_series: 3,
        tempo_descanso: "60",
      },
      {
        id: 5,
        nome: "Treino de F",
        num_reps: 12,
        num_series: 3,
        tempo_descanso: "60",
      },
    ],
  }),

  methods: {
    async pegarTreinos() {
      const { data } = await axios.get("api/treinos/");
      this.treinos = data;
    },

    irPraTreino({ id }) {
      this.$router.push(`/treino/${id}`);
    },
  },
};
</script>

<style></style>
