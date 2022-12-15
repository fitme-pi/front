<template>
  <v-container fluid>
    <v-btn class="ma-3" @click="$router.push('/treinocadastro')">
      Crie seu Próprio Treino
    </v-btn>
    <TreinoCard />
  </v-container>
</template>

<script>
import TreinoCard from "@/components/TreinoCard.vue";

export default {
  components: { TreinoCard },
};
</script>

<style></style>
