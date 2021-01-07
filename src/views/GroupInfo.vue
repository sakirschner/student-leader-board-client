<template>
    <v-container>
        <v-row>
            <v-col cols="12" md="12">
                <GroupInfo
                    :group="group"
                    :groupWithPoints="groupWithPoints"
                />
            </v-col>
        </v-row>
        <v-row>
            <GroupStats
                :group="group"
                :stats="achievements"
                :totalPoints="totalPoints"
            />
        </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';

import GroupInfo from '../components/GroupInfo'
import GroupStats from '../components/GroupStats.vue';

export default {
    components: {
        GroupInfo,
        GroupStats
    },
    data: () => ({
        group: {},
        groupWithPoints: [],
        achievements: [],
        totalPoints: 0
    }),
    async created() {
        await this.getGroup();
    },
    methods: {
        async getGroup() {
            let token = this.$store.state.auth.token
            if (token) {
                await axios.get(`http://127.0.0.1:8000/api/group/groups/${this.$route.params.id}/`, {
                    headers: {
                        'Authorization': token
                    }
                })
                .then((response) => {
                    this.group = response.data;
                    this.getAchievements();
                })
            }
        },
        async getAchievements() {
            let studentIds = []
            this.group.students.forEach((student) => {
                studentIds.push(student.id)
            })
            let token = this.$store.state.auth.token
            if (token) {
                await axios.get(`http://127.0.0.1:8000/api/achievement/studentachievements/?student_in=${studentIds}`, {
                    headers: {
                        'Authorization': token
                    }
                })
                .then((response) => {
                    response.data.forEach((achievement) => {
                        achievement.created_at = new Date(achievement.created_at).toLocaleDateString() + " " + new Date(achievement.created_at).toLocaleTimeString();
                    })
                    this.achievements = response.data  
                    this.setGroupWithPoints();         
                })
            }
        },
        setGroupWithPoints() {
            let newGroup = []
            this.group.students.forEach((student) => { 
                let newStudent = {
                    first_name: student.first_name,
                    last_name: student.last_name,
                    email: student.email,
                    id: student.id,
                    image: student.image,
                    points: 0,
                    user_name: student.user_name
                }
                this.achievements.forEach((stat) => {       
                    if (stat.student.id === student.id) {
                        newStudent.points += stat.achievement.points
                    }
                })
                newGroup.push(newStudent)
            })
            this.groupWithPoints = newGroup;
            this.setTotalPoints();
        },
        setTotalPoints() {
            this.achievements.forEach((stat) => {
                this.totalPoints += stat.achievement.points
            })
        },
    }
}
</script>

<style>

</style>