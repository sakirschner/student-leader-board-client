<template>
  <v-app class="mx-auto overflow-hidden" width="344">
    <v-app-bar app color="#e5f7ff" dark flat>
      <v-app-bar-nav-icon
        @click.stop="drawer = !drawer"
        v-if="isAuthenticated"
        color="#00aeff"
      ></v-app-bar-nav-icon>
      <v-toolbar-title class="d-flex align-center logo" style="margin: auto">
        <router-link to="/" class="nav-link" style="display: contents">
          <v-icon x-large color="#00aeff">mdi-school</v-icon>
          <h2 class="ml-1" style="color:#00aeff">LeaderBoard</h2>
        </router-link>
      </v-toolbar-title>
      <div>
        <router-link :to="{ name: 'profile' }" class="nav-link center-align">
        </router-link>
      </div>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app temporary>
      <template v-slot:prepend>
        <v-list-item>
          <v-list-item-avatar>
            <router-link :to="{ name: 'profile' }" class="generic-avatar">
              <div
                :style="{ 'background-image': 'url(' + account.image + ')' }"
                class="avatar"
                v-if="account.image"
              ></div>
              <v-avatar color="rgb(0, 174, 255)" v-else-if="!account.image">
                <v-icon dark size="30">mdi-account-circle</v-icon>
              </v-avatar>
            </router-link>
          </v-list-item-avatar>
          <v-list-item-content>
            <router-link
              :to="{ name: 'profile' }"
              style="text-decoration: none"
            >
              <v-list-item-title style="color: rgba(0, 0, 0, 0.87) !important"
                >{{ account.first_name }}
                {{ account.last_name }}</v-list-item-title
              >
              <v-list-item-subtitle>{{
                account.user_name
              }}</v-list-item-subtitle>
            </router-link>
          </v-list-item-content>
        </v-list-item>
      </template>

      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <router-link :to="{ name: 'home' }" style="text-decoration: none">
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-trophy</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Leaderboard</v-list-item-title>
            </v-list-item>
          </router-link>

          <router-link :to="{ name: 'stats' }" style="text-decoration: none">
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-chart-bar</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Stats</v-list-item-title>
            </v-list-item>
          </router-link>

          <router-link :to="{ name: 'profile' }" style="text-decoration: none">
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-account</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Profile</v-list-item-title>
            </v-list-item>
          </router-link>
          <v-list-item @click="signOut">
            <v-list-item-icon>
              <v-icon>mdi-door-open</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Sign out</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <LogIn v-if="!isAuthenticated && !hasToken" @submitted="onRegister" />
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import LogIn from "../components/LogIn";

import axios from "axios";

export default {
  name: "App",

  components: {
    LogIn,
  },

  data: () => ({
    isAuthenticated: false,
    account: {},
    token: " ",
    drawer: false,
    group: null,
    hasToken: false,
  }),
  async created() {
    let tokenExists = sessionStorage.getItem("token");
    if (tokenExists) {
      this.hasToken = true;
    }
    await this.$store.dispatch("auth/getToken", null);
    this.token = this.$store.state.auth.token;
    await this.getAccount();
    this.isAuthenticated = this.$store.state.auth.isAuthenticated;
  },
  watch: {
    group() {
      this.drawer = false;
    },
  },
  methods: {
    async onRegister(fromRegister) {
      this.token = this.$store.state.auth.token;
      await this.getAccount();
      this.isAuthenticated = this.$store.state.auth.isAuthenticated;
      if (fromRegister === true) {
        this.$router.push({ name: "profile" });
        this.$router.go();
      }
      if (!fromRegister && this.isAuthenticated) {
        this.$router.go();
      }
    },
    async getAccount() {
      if (this.token) {
        await axios
          .get("http://127.0.0.1:8000/api/user/me/", {
            headers: {
              Authorization: this.token,
            },
          })
          .then((response) => {
            this.account = response.data;
          });
      }
    },
    signOut() {
      this.$store.commit("auth/setAuthenticationFalse");
      sessionStorage.removeItem("token");
      this.$router.push({ name: "home" });
      this.$router.go();
    },
  },
};
</script>

<style scoped>
.nav-link {
  text-decoration: none;
  color: #ffffff;
}

main {
  background-color: #e5f7ff;
}

a {
  text-decoration: none;
}

.logo {
  padding-left: -20px !important;
  padding-right: 50px !important;
}

.generic-avatar {
  margin: -4px;
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
  /* box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 
      0px 4px 5px 0px rgba(0, 0, 0, 0.14), 
      0px 1px 10px 0px rgba(0, 0, 0, 0.12);  */
  -webkit-border-radius: 50px;
  -webkit-background-clip: padding-box;
  -moz-border-radius: 50px;
  -moz-background-clip: padding;
  background-size: cover;
  background-position: center center;
  margin-right: 10px;
}
</style>
