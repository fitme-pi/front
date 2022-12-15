<template>
  <v-container fluid>
    <v-btn class="ma-3" v-if="user && user.is_staff" @click="modal = true">
      Adicione um exercício
    </v-btn>
    <AdicionarExercicio />
    <ExercicioCard />
  </v-container>
</template>

<script>
import ExercicioCard from "@/components/ExercicioCard.vue";
import AdicionarExercicio from "@/components/AdicionarExercicio.vue";
import { mapState } from "vuex";

export default {
  components: { AdicionarExercicio, ExercicioCard },
  data() {
    return {
      modal: false,
    };
  },
  computed: {
    ...mapState("auth", ["user"]),
  },
};
</script>

<style></style>
