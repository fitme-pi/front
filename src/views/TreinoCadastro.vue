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
        <v-row v-for="(exercicio, index) in exerciciosTreino" :key="index">
          <v-col cols="12" sm="6" md="3">
            <v-text-field
              outlined
              v-model="exerciciosTreino[index].num_reps"
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
              v-model="exerciciosTreino[index].num_series"
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
              v-model="exerciciosTreino[index].tempo_descanso"
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
              v-model="exerciciosTreino[index].exercicio"
              :items="exercicios"
              item-text="nome"
              item-value="id"
              label="Exercícios"
              outlined
            ></v-select>
          </v-col>
        </v-row>
        <v-col cols="12" sm="6" md="3">
          <div class="ma-3 mt-3">
            <v-btn @click="adicionarExercicioTreino">
              <h3>Adicionar Exercício</h3>
            </v-btn>
          </div>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <div class="ma-3 mt-3">
            <v-btn @click="adicionarTreino">
              <h3>Concluir</h3>
            </v-btn>
          </div>
        </v-col>
      </v-form>
    </v-container>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";

export default {
  created() {
    this.pegarExercicios();
  },
  data() {
    return {
      treino: {},
      exercicios: [],
      exerciciosTreino: [],
    };
  },
  computed: {
    ...mapState("auth", ["user"]),
  },
  methods: {
    async pegarExercicios() {
      const { data } = await axios.get("api/exercicios/");
      this.exercicios = data;
    },
    adicionarExercicioTreino() {
      this.exerciciosTreino.push({});
    },
    async adicionarTreino() {
      try {
        this.treino.exercicios = this.exerciciosTreino;
        await axios.post("api/treinos/", this.treino);
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style></style>
