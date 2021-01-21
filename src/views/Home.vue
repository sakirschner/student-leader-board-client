<template>
  <div>
    <v-conatiner v-if="loading">
      <v-layout row justify-center class="pt-10 pb-10">
        <v-progress-circular
          :size="70"
          :width="7"
          color="rgb(0, 174, 255)"
          indeterminate
          v-if="loading"
        ></v-progress-circular>
      </v-layout>
    </v-conatiner>
    <v-container v-else-if="!loading">
      <v-row>
        <v-col cols="12" md="8">
          <LeaderBoard
            :groups="groups"
            :key="groups.changes"
            v-if="groups.groups"
          />
        </v-col>
        <v-col>
          <LeaderBoardList
            :groups="groups"
            :key="groups.changes"
            v-if="groups.groups"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="12">
          <AchievementList :groups="groups" :key="groups.changes" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";

import LeaderBoard from "../components/LeaderBoard";
import LeaderBoardList from "../components/LeaderBoardList";
import AchievementList from "../components/AchievementList";

export default {
  components: {
    LeaderBoard,
    LeaderBoardList,
    AchievementList,
  },
  data: () => ({
    groups: {},
    achievements: [],
    stats: [],
    completed: false,
    loading: true,
  }),
  async created() {
    await this.getAllGroups();
  },
  mounted() {
    window.setInterval(() => {
      this.getAllGroups();
    }, 60000);
  },
  methods: {
    async getAllGroups() {
      let token = this.$store.state.auth.token;
      if (token) {
        await axios
          .get("http://127.0.0.1:8000/api/group/groups/", {
            headers: {
              Authorization: token,
            },
          })
          .then((response) => {
            if (!response.data.length) {
              this.loading = false;
            }
            let groups = {
              changes: 0,
              groups: response.data,
            };
            this.groups = groups;
            this.getAchievements();
          });
      }
    },
    getAchievements() {
      const token = this.$store.state.auth.token;
      let updatedAchievements = [];
      let itemsProcessed = 0;
      this.groups.groups.forEach((group) => {
        let studentIds = [];
        group.students.forEach((student) => {
          studentIds.push(student.id);
        });
        if (token) {
          axios
            .get(
              `http://127.0.0.1:8000/api/achievement/studentachievements/?student_in=${studentIds}`,
              {
                headers: {
                  Authorization: token,
                },
              }
            )
            .then((response) => {
              let points = 0;
              response.data.forEach((achievement) => {
                if (achievement.achievement) {
                  points += achievement.achievement.points;
                }
              });
              const groupAchievements = JSON.parse(
                JSON.stringify({
                  groupId: group.id,
                  groupName: group.name,
                  totalPoints: points,
                  achievements: response.data,
                })
              );
              updatedAchievements.push(groupAchievements);
              itemsProcessed++;
              if (itemsProcessed === this.groups.groups.length) {
                this.achievements = JSON.parse(
                  JSON.stringify(updatedAchievements)
                );
                this.completed = true;
                this.loading = false;
                this.compareGroupPoints();
              }
            });
        }
      });
    },
    async compareGroupPoints() {
      this.groups.groups.forEach((group) => {
          this.achievements.forEach((achievement) => {
            if (
              group.id === achievement.groupId &&
              group.points !== achievement.totalPoints
            ) {
              this.updateGroupPoints(group.id, achievement.totalPoints);
            }
        });
      });
      this.loading = false;
    },
    async updateGroupPoints(groupId, points) {
      const token = this.$store.state.auth.token;
      const payload = {
        points: `${points}`,
      };
      if (token) {
        axios
          .patch(
            `http://127.0.0.1:8000/api/group/groups/${groupId}/`,
            payload,
            {
              headers: {
                Authorization: token,
              },
            }
          )
          .then((response) => {
            this.groups.groups.forEach((group, index) => {
              if (response.data.id === group.id) {
                this.groups.groups[index] = response.data;
                this.groups.changes++;
                this.loading = false;
              }
            });
          });
      }
    },
  },
};
</script>

<style>
@media (min-width: 960px) {
  .container {
    max-width: 1050px !important;
  }
}
</style>
