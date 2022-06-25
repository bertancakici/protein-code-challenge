<template>
  <v-app id="inspire">
    <v-app-bar app color="white" flat>
      <v-container class="py-0 fill-height">
        <v-avatar class="mr-10" color="grey darken-1" size="32"></v-avatar>

        <v-btn
          v-for="(route, index) in routes"
          :key="index"
          :to="route.path"
          text
          style="margin-right: 10px"
        >
          {{ route.name }}
        </v-btn>
      </v-container>
    </v-app-bar>

    <v-main class="grey lighten-3">
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { routes } from "./router";

export default {
  data: () => ({
    routes,
  }),
};
</script>
