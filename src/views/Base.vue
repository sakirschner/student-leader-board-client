<template>
  <v-container>
    <v-card style="text-align: center; max-width:350px; margin: auto" class="pa-10 mt-10">
      <h2>
        <v-icon color="rgb(0, 174, 255)">mdi-trophy</v-icon>
        <router-link :to="{ name: 'home' }" class="link ml-2">Leaderboard</router-link>
      </h2>
      <h2 class="mt-4">
        <v-icon color="rgb(0, 174, 255)">mdi-chart-bar</v-icon>
        <router-link :to="{ name: 'stats' }" class="link ml-2">Stats</router-link>
      </h2>
      <h2 class="mt-4">
        <v-icon color="rgb(0, 174, 255)">mdi-account</v-icon>
        <router-link :to="{ name: 'profile' }" class="link ml-2">Profile</router-link>
      </h2>
    </v-card>
  </v-container>
</template>

<script>
export default {};
</script>

<style scoped="">
    .link {
        text-decoration: none;
        color: rgb(0, 174, 255);
    }
</style>
