<template>
  <v-card>
    <v-card-title>
      Achievements
      <v-spacer />
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-card-text>
      <v-data-table
        :items="stats"
        :headers="headers"
        sort-by="created_at"
        :sort-desc="true"
        :search="search"
        :single-expand="singleExpand"
        :expanded.sync="expanded"
        item-key="id"
        :loading="loading"
        show-expand
      >
        <template v-slot:[`item.groupName`]="{ item }">
          <router-link
            :to="{ name: 'groupInfo', params: { id: item.groupId } }"
            style="text-decoration: none; color:rgb(0, 174, 255)"
          >
            {{ item.groupName }}
          </router-link>
        </template>

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
</template>

<script>
// import axios from "axios";

export default {
  props: {
    achievements: Array,
    groups: Array
  },
  mounted() {
    this.organizeAchievements();
  },
  data: () => ({
    stats: [],
    loading: false,
    search: "",
    expanded: [],
    singleExpand: false,
    headers: [
      { text: "", value: "student.image", sortable: false },
      { text: "Student", value: "student.user_name" },
      { text: "Group", value: "groupName" },
      { text: "Achievement", value: "achievement.achievement" },
      { text: "Points", value: "achievement.points" },
      { text: "Time", value: "created_at" },
      { text: "", value: "data-table-expand" },
    ],
  }),
  watch: {
    options: {
      handler() {
        this.organizeAchievements();
      },
      deep: true,
    },
  },
  methods: {
    async organizeAchievements() {
    this.stats = this.$props.achievements
      this.stats.forEach((stat, index) => {
        this.stats[index].created_at =
          new Date(stat.created_at).toLocaleDateString() +
          " " +
          new Date(stat.created_at).toLocaleTimeString();
        this.$props.groups.groups.forEach((group) => {
          group.students.forEach((student) => {
            if (student.id === stat.student.id) {
              this.stats[index].groupName = group.name;
              this.stats[index].groupId = group.id;
            }
          });
        });
      });
      this.loading = false;
    },
  },
};
</script>

<style></style>
