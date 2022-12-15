<template>
  <v-container fluid>
    <v-container>
      <v-form class="d-flex align-center flex-column">
        <h1 class="h1 py-8 pl-5">Monte seu treino aqui</h1>
        <v-col cols="12" sm="6" md="3">
          <v-text-field
            outlined
            v-model="treino.titulo"
            cols="12"
            sm="6"
            md="3"
            dark
            label="Titulo"
            type="text"
          >
          </v-text-field>
        </v-col>
        <v-row v-for="(exercicio, index) in treino['exercicios']" :key="index">
          <v-col cols="12" sm="6" md="3">
            <v-text-field
              outlined
              v-model="exercicio.num_reps"
              cols="12"
              sm="6"
              md="3"
              dark
              label="Número de repetições"
              type="number"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-text-field
              outlined
              v-model="exercicio.num_series"
              cols="12"
              sm="6"
              md="3"
              dark
              label="Número de séries"
              type="number"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-text-field
              outlined
              v-model="exercicio.tempo_descanso"
              cols="12"
              sm="6"
              md="3"
              dark
              label="Tempo e descanso"
              type="number"
            ></v-text-field>
          </v-col>
          <v-col class="d-flex" cols="12" sm="6" md="3">
            <v-select
              dark
              cols="12"
              sm="6"
              md="3"
              v-model="exerciciosTreino[index]"
              :items="exercicios"
              item-text="nome"
              item-value="id"
              label="Exercícios"
              outlined
            ></v-select>
          </v-col>
        </v-row>
      </v-form>
    </v-container>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  created() {
    this.buscarExercicios();
    this.buscarTreinoPorId();
  },
  data: () => ({
    treino: {},
    exercicios: [],
    exerciciosTreino: [],
  }),
  methods: {
    async buscarExercicios() {
      const { data } = await axios.get("api/exercicios/");
      this.exercicios = data;
    },
    async buscarTreinoPorId() {
      const { data } = await axios.get(`api/treinos/${this.$route.params.id}/`);
      this.treino = data;
      for (let exercicio of this.treino["exercicios"]) {
        this.exerciciosTreino.push(exercicio.exercicio);
      }
    },
  },
};
</script>
