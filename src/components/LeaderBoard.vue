<template>
  <v-card>
    <v-card-title>Top Groups</v-card-title>
    <v-card-text v-if="groups.groups.length === 0">
      No groups available
    </v-card-text>
    <v-card-text v-else>
      <v-row v-for="(group, index) in organizedGroups" :key="group.id">
        <div v-if="index === 0" class="first-place-container">
          <v-row>
            <span class="title mr-4">{{ group.name }}</span>
            <v-chip color="#00aeff" class="subtitle-2" dark
              >{{ group.points }} Points</v-chip
            >
          </v-row>
          <v-row>
            <v-col
              cols="12"
              md="2"
              class="text-center mr-2"
              style="margin-left: -20px"
            >
              <v-icon
                size="100px"
                color="#FFD700"
                class="mt-2 ml-1"
                style="position:relative; margin-right:-60px"
                >mdi-trophy</v-icon
              >
              <span class="subtitle-1 white--text" style="position:relative">
                {{ index + 1 }}<sup>{{ group.suffix }}</sup>
              </span>
            </v-col>
            <v-col
              cols="12"
              md="10"
              class="d-flex flex-wrap justify-space-around text-center"
            >
              <div v-for="student in group.students" :key="student.id">
                <v-row class="avatar-row">
                  <v-img :src="student.image" class="group-avatar" v-if="student.image"/>
                  <v-avatar
                    color="rgb(0, 174, 255)"
                    size="100"
                    v-if="!student.image"
                  >
                    <v-icon dark size="75">mdi-account-circle</v-icon>
                  </v-avatar>
                </v-row>
                <v-icon small>mdi-account-box-outline</v-icon>
                {{ student.user_name }}
              </div>
            </v-col>
          </v-row>
        </div>
      </v-row>

      <v-row class="justify-center">
        <div
          v-for="(group, index) in organizedGroups.slice(1)"
          :key="group.id"
          style="width:275px"
        >
          <v-card
            dark
            elevation="0"
            :color="leaderBoardColor(index)"
            v-if="index >= 0 && index <= 1"
            class="ma-4"
          >
            <v-card-title>{{ group.name }}</v-card-title>
            <v-card-text>
              <h2 class="white--text">
                <v-icon>mdi-medal</v-icon> {{ index + 2
                }}<sup>{{ group.suffix }}</sup>
              </h2>
              <p class="mt-4 white--text subtitle-1">
                {{ group.points }} Points
              </p>
            </v-card-text>
          </v-card>
        </div>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    groups: Object,
  },
  data: () => ({
    organizedGroups: [],
  }),
  created() {
    this.organizeGroups();
  },
  methods: {
    organizeGroups() {
      this.organizedGroups = this.$props.groups.groups.sort((a, b) => {
        if (a.points < b.points) {
          return 1;
        } else {
          return -1;
        }
      });
      this.organizedGroups.forEach((group, i) => {
        this.organizedGroups[i].suffix = this.nth(i);
      });
    },
    nth(n) {
      return ["st", "nd", "rd"][(n / 10) % 10 ^ 1 && n % 10] || "th";
    },
    leaderBoardColor(index) {
      let color = index === 1 ? "#B08D57" : "#BEC2CB";
      return color;
    },
  },
};
</script>

<style>
.first-place-container {
  width: 100%;
}

.row {
  margin-right: 0 !important;
  margin-left: 0 !important;
}
</style>
