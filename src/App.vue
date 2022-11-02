<template>
  <router-view></router-view>
</template>

<script>
import { mapMutations, mapState } from "vuex";

export default {
  created() {
    this.loggedIn ? this.setHeaders() : this.unsetHeaders();
  },
  computed: {
    ...mapState("auth", ["loggedIn"]),
  },
  methods: {
    ...mapMutations("auth", ["setHeaders", "unsetHeaders"]),
  },
};
</script>

<style>
html {
  overflow-y: hidden;
}

.fundo {
  background-color: #083c89;
}

h1 {
  color: white;
}

.menu {
  font-size: 20px;
}

#corzinha {
  background-color: lightcyan;
}

.login {
  color: #4a3ca5;
}

.cursor-pointer {
  cursor: pointer;
}

body::-webkit-scrollbar {
  width: 5px;
}

body::-webkit-scrollbar-track {
  background: rgb(163, 206, 209);
}

body::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.473);
  border-radius: 200px;
  border: 1px solid rgb(163, 206, 209);
}
</style>
