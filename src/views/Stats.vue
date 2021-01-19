<template>
  <v-container class="pa-8">
    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-conatiner>
          <v-layout row justify-center class="pt-10 pb-10">
            <v-progress-circular
              :size="70"
              :width="7"
              color="rgb(0, 174, 255)"
              indeterminate
            ></v-progress-circular>
          </v-layout>
        </v-conatiner>
      </v-card>
    </v-dialog>
    <v-card class="mt-16 mx-auto pt-10">
      <v-sheet
        class="v-sheet--offset mx-auto"
        color="rgb(0, 174, 255)"
        elevation="8"
        max-width="calc(100% - 50px)"
        style="border-radius: 15px; padding: 15px; margin-top: -30px"
      >
        <div v-if="!datacollection" class="title white--text no-data">
          No Data To Display
        </div>

        <BarGraph :chart-data="datacollection" />
      </v-sheet>
      <v-card-text style="padding-top: 0px; margin-top: -50px">
        <v-row class="justify-center">
          <v-col cols="12" md="11">
            <div class="title">
              Total Points Per Week
            </div>
            <v-select
              :items="students"
              v-model="selectedStudent"
              name="student"
              item-text="user_name"
              return-object
              label="Select a student"
              v-if="!loadingStudents"
            />
            <v-select
              :items="noStudents"
              label="Select a student"
              v-else-if="loadingStudents"
            />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-card class="mt-8">
      <SingleAchievementList
        :achievements="achievements"
        :groups="groups"
        :key="datacollection"
      />
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";
import moment from "moment";
import BarGraph from "../components/BarGraph";
import SingleAchievementList from "../components/SingleAchievementList";

export default {
  components: {
    BarGraph,
    SingleAchievementList,
  },
  data: () => ({
    students: [],
    noStudents: ["Loading Data"],
    achievements: [],
    points: [],
    groups: [],
    selectedStudent: {},
    datacollection: null,
    dialog: false,
    loadingStudents: true,
  }),
  watch: {
    selectedStudent: function() {
      this.getAchievements();
    },
  },
  async created() {
    await this.getStudents();
    await this.getAllGroups();
  },
  methods: {
    async getStudents() {
      let token = this.$store.state.auth.token;
      if (token) {
        await axios
          .get("http://127.0.0.1:8000/api/group/groups/", {
            headers: {
              Authorization: token,
            },
          })
          .then((response) => {
            if (response.data.length) {
              response.data.forEach((group) => {
                group.students.forEach((student) => {
                  this.students.push(student);
                });
                this.loadingStudents = false;
              });
            } else {
              this.loadingStudents = false;
            }
          });
      }
    },
    async getAchievements() {
      this.dialog = true;
      let token = this.$store.state.auth.token;
      if (token) {
        await axios
          .get(
            `http://127.0.0.1:8000/api/achievement/studentachievements/?student_in=${this.selectedStudent.id}`,
            {
              headers: {
                Authorization: token,
              },
            }
          )
          .then((response) => {
            this.achievements = response.data;
            this.organizeStats();
          });
      }
    },
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
            let groups = {
              changes: 0,
              groups: response.data,
            };
            this.groups = groups;
          });
      }
    },
    organizeStats() {
      let stats = [[], [], [], [], [], []];
      let points = [];
      this.achievements.forEach((stat) => {
        switch (moment(stat.created_at).week()) {
          case 5:
            stats[0].push(stat);
            break;
          case 6:
            stats[1].push(stat);
            break;
          case 7:
            stats[2].push(stat);
            break;
          case 8:
            stats[3].push(stat);
            break;
          case 9:
            stats[4].push(stat);
            break;
          case 10:
            stats[5].push(stat);
            break;
        }
      });
      stats.forEach((stat) => {
        let totalPoints = 0;
        stat.forEach((item) => {
          if (item.achievement) {
            totalPoints += item.achievement.points;
          }
        });
        points.push(totalPoints);
      });
      this.datacollection = {
        labels: ["1/25", "2/1", "2/8", "2/12", "2/22", "3/1"],
        datasets: [
          {
            label: "Total Points Per Week",
            borderColor: "#fff",
            borderWidth: 3,
            data: points,
            pointBackgroundColor: "rgb(77 197 253)",
            pointHoverBackgroundColor: "fff",
            pointHoverBorderColor: "#fff",
            pointHoverBorderWidth: 2,
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointRadius: 3,
            backgroundColor: "rgb(77 197 253)",
          },
        ],
      };
      this.dialog = false;
    },
  },
};
</script>

<style>
.v-sheet--offset {
  top: -75px;
  position: relative;
}
.no-data {
  position: absolute;
  width: 100%;
  text-align: center;
  padding-top: 150px;
}
</style>
