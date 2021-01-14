<template>
  <v-container>
    <v-card>
      <v-card-title>Trophy Case</v-card-title>
      <v-card-text v-if="loading">
        <v-layout row justify-center class="pt-10 mb-10">
          <v-progress-circular
            :size="70"
            :width="7"
            color="rgb(0, 174, 255)"
            indeterminate
            v-if="loading"
          ></v-progress-circular>
        </v-layout>
      </v-card-text>
      <v-card-text v-else-if="!loading && !stats.length">
        <v-row v-if="!stats.length">
          No achievements yet
        </v-row>
        </v-card-text>
        <v-card-text v-else>
        <v-row>
          <v-col cols="12" md="3">
            <v-card color="#EA6400" dark elevation="0">
              <v-card-title>
                Place
              </v-card-title>
              <v-card-text>
                <span class="headline"
                  >{{ foundGroup.index + 1 }}{{ foundGroup.group.suffix }}</span
                >
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" md="3">
            <v-card color="#00aeff" dark elevation="0">
              <v-card-title>
                Total Points
              </v-card-title>
              <v-card-text>
                <span class="headline">{{ totalPoints }}</span>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" md="6" class="trophies-column" v-if="stats.length">
            <div
              v-for="reward in group.rewards"
              :key="reward.id"
              class="trophies"
            >
              <v-icon size="90px" color="#FFD700">mdi-trophy</v-icon>
              <span>{{ reward.reward }}</span>
            </div>
          </v-col>
        </v-row>
        <v-card-title>
          Group Stats
          <v-spacer />
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table
          :items="stats"
          :headers="headers"
          sort-by="created_at"
          :sort-desc="true"
          :search="search"
          :single-expand="singleExpand"
          :expanded.sync="expanded"
          :loading="loading"
          item-key="id"
          show-expand
        >
          <template v-slot:[`item.student.image`]="{ item }">
            <div class="pt-2 pb-2">
              <v-avatar v-if="item.student.image">
                <v-img :src="item.student.image" class="avatar"> </v-img>
              </v-avatar>
              <v-avatar color="rgb(0, 174, 255)" v-else>
                <v-icon dark size="30">mdi-account-circle</v-icon>
              </v-avatar>
            </div>
          </template>
          <template v-slot:expanded-item="{ headers, item }">
            <td :colspan="headers.length">
              {{ item.notes }}
            </td>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  props: {
    group: Object,
    stats: Array,
    totalPoints: Number,
  },
  data: () => ({
    search: "",
    groups: [],
    organizedGroups: [],
    foundGroup: {},
    expanded: [],
    singleExpand: false,
    loading: true,
    headers: [
      { text: "", value: "student.image", sortable: false },
      { text: "Student", value: "student.user_name" },
      { text: "Achievement", value: "achievement.achievement" },
      { text: "Points", value: "achievement.points" },
      { text: "Time", value: "created_at" },
      { text: "", value: "data-table-expand" },
    ],
  }),
  async created() {
    if (this.$props.group !== undefined) {
      await this.getGroups();
    } else {
      this.loading = false;
    }
  },
  methods: {
    async getGroups() {
      let token = this.$store.state.auth.token;
      if (token) {
        await axios
          .get("http://127.0.0.1:8000/api/group/groups/", {
            headers: {
              Authorization: token,
            },
          })
          .then((response) => {
            this.groups = response.data;
            this.organizeGroups();
          });
      }
    },
    async organizeGroups() {
      this.organizedGroups = this.groups.sort((a, b) => {
        if (a.points < b.points) {
          return 1;
        } else {
          return -1;
        }
      });
      await this.organizedGroups.forEach((group, i) => {
        this.organizedGroups[i].suffix = this.nth(i);
      });
      await this.setPlace();
    },
    nth(n) {
      return ["st", "nd", "rd"][(n / 10) % 10 ^ 1 && n % 10] || "th";
    },
    async setPlace() {
      this.foundGroup = {
        index: 0,
        group: {},
      };
      await this.organizedGroups.forEach((group, index) => {
        if (group.id === this.$props.group.id) {
          this.foundGroup.group = group;
          this.foundGroup.index = index;
        }
      });
      this.loading = false;
    },
  },
};
</script>

<style>
.trophies {
  display: flex;
  text-align: center;
  flex-flow: column;
}
.trophies-column {
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
}
</style>
