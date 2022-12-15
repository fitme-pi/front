<template>
  <v-container fluid>
    <v-row class="d-flex justify-center" dense>
      <v-col
        v-for="(exercicio, index) in exercicios"
        :key="index"
        cols="12"
        sm="3"
      >
        <v-card :loading="loading" class="mx-auto my-12" max-width="374">
          <template slot="progress">
            <v-progress-linear
              color="deep-purple"
              height="10"
              indeterminate
            ></v-progress-linear>
          </template>

          <iframe
            height="250px"
            width="100%"
            frameborder="0"
            allowfullscreen
            :src="tratarURL(exercicio.video_explicativo)"
          ></iframe>

          <v-card-title>{{ exercicio.nome }}</v-card-title>

          <v-card-text>
            <div class="my-4">
              {{ exercicio.descricao }}
            </div>
          </v-card-text>

          <v-card-title>{{ exercicio.grupo_muscular.nome }}</v-card-title>

          <v-divider class="mx-4"></v-divider>

          <v-card-actions v-if="user && user.is_staff">
            <v-btn color="blue" text @click="popupEdicao(exercicio)">
              Editar
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn color="warning" text @click="deletarExercicio(exercicio)">
              Excluir
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <EditarExercicio
      @salvar="editarExercicio"
      :exercicio_prop.sync="exercicio"
    />
  </v-container>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import EditarExercicio from "@/components/EditarExercicio.vue";

export default {
  components: {
    EditarExercicio,
  },
  created() {
    this.pegarExercicios();
  },
  data: () => ({
    exercicios: [],
    exercicio: {},
    editar: false,
    loading: false,
  }),
  computed: {
    ...mapState("auth", ["user"]),
  },
  methods: {
    async pegarExercicios() {
      const { data } = await axios.get("api/exercicios/");
      this.exercicios = data;
    },
    async editarExercicio(exercicio) {
      try {
        await axios.patch(`api/exercicios/${exercicio.id}/`, exercicio);
        this.pegarExercicios();
      } catch (e) {
        console.log(e);
      }
    },
    async deletarExercicio({ id }) {
      try {
        await axios.delete(`api/exercicios/${id}/`);
        this.pegarExercicios();
      } catch (e) {
        console.log(e);
      }
    },

    popupEdicao(exercicio) {
      this.exercicio = exercicio;
      this.editar = true;
    },
    tratarURL(url) {
      return `${url.replace(".com/", ".com/embed/").replace("watch?v=", "")}`;
    },
    reserve() {
      this.loading = true;

      setTimeout(() => (this.loading = false), 1000);
    },
  },
};
</script>

<style></style>
