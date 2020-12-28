<template>
  <v-app>
    <v-app-bar app color="cyan" dark class="navbar">
      <div class="d-flex align-center">
        <router-link to="/" class="nav-link">
          <h2>Student Leader Board</h2>
        </router-link>
      </div>
      <v-spacer></v-spacer>
      <div v-if="isAuthenticated">
        <router-link :to="{ name: 'profile' }" class="nav-link center-align">
          <div :style="{ 'background-image': 'url(' + account.image + ')'}" class="avatar"></div>
          <span class="mr-2">{{account.user_name}}</span>
        </router-link>
      </div>
    </v-app-bar>

    <v-main>
      <LogIn v-if="!isAuthenticated" @submitted="onRegister"/>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import LogIn from "../components/LogIn";

export default {
  name: "App",

  components: {
    LogIn,
  },

  data: () => ({
    isAuthenticated: false,
    account: {},
    token: " "
  }),
  async created() {
    await this.$store.dispatch('auth/getToken', null);
    await this.$store.dispatch('account/getAccount');
    this.token = this.$store.state.auth.token;
    this.isAuthenticated = this.$store.state.auth.isAuthenticated;
    this.account = this.$store.state.account.account;
  },
  // beforeMount() {
  //   this.token = this.$store.state.auth.token;
  //   this.isAuthenticated = this.$store.state.auth.isAuthenticated;
  // },
  // Mounted() {
  //   this.account = this.$store.state.account.account;
  // },
  methods: {
    onRegister() {
      this.isAuthenticated = this.$store.state.auth.isAuthenticated;
      this.account = this.$store.state.account.account;      
      this.token = this.$store.state.auth.token;
    }
  }
};
</script>

<style scoped>
  .nav-link {
    text-decoration: none;
    color: #ffffff
  }

  main {
    padding-top: 80px !important;
    background-color: #fafafa
  }

  .navbar {
    height: 80px !important;
    padding-top: 5px !important;
  }

  .center-align {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .avatar {
    width: 50px;
    height: 50px;
    border-radius: 50px;
    background-clip: padding-box;
    box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 
      0px 4px 5px 0px rgba(0, 0, 0, 0.14), 
      0px 1px 10px 0px rgba(0, 0, 0, 0.12); 
    -webkit-border-radius: 50px;
    -webkit-background-clip: padding-box;
    -moz-border-radius: 50px;
    -moz-background-clip: padding;
    background-size: cover;
    background-position: center center;
    margin-right: 10px;
  }
</style>
