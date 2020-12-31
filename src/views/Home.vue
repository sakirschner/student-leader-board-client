<template>
    <v-container>
        <LeaderBoard :groups=groups :key="groups.changes" />
    </v-container>
</template>

<script>
import axios from 'axios'

import LeaderBoard from '../components/LeaderBoard'

export default {
    components: {
        LeaderBoard
    },
    data: () => ({
        groups: {},
        achievements: []
    }),
    async created() {
        await this.getData();
        await this.getAchievements();
        
    },
    methods: {
       async getData() {
            await this.getAllGroups()
        },
        async getAllGroups() {
            let token = this.$store.state.auth.token
            if (token) {
                await axios.get('http://127.0.0.1:8000/api/group/groups/', {
                    headers: {
                        'Authorization': token
                    }
                })
                .then((response) => {
                    let groups = {
                        changes: 0,
                        groups: response.data
                    }
                    this.groups = groups    
                })
            }
        },
        async getAchievements() {
            const token = this.$store.state.auth.token
            this.groups.groups.forEach((group) => {
                let studentIds = []
                group.students.forEach((student) => {
                    studentIds.push(student.id)
                })
                if (token) {
                    axios.get(`http://127.0.0.1:8000/api/achievement/studentachievements/?student_in=${studentIds}`, {
                        headers: {
                        'Authorization': token
                    }
                })
                .then ((response) => {
                    let points = 0
                    response.data.forEach((achievement) => {
                        if (achievement.achievement) {
                                points += achievement.achievement.points
                            }
                        })
                    let groupAchievements = {
                        groupId: group.id,
                        totalPoints: points,
                        achievements: response.data
                    }
                    this.achievements.push(groupAchievements)
                    this.compareGroupPoints()
                })}
            })
        },
        async compareGroupPoints() {
            this.groups.groups.forEach((group) => {
                this.achievements.forEach((achievement) => {
                    if (group.id === achievement.groupId && 
                        group.points !== achievement.totalPoints) {
                            this.updateGroupPoints(group.id, achievement.totalPoints)
                        }
                    }
                )
            })
        },
        async updateGroupPoints(groupId, points) {
            const token = this.$store.state.auth.token
            const payload = {
                "points": `${points}`
            } 
            if (token) {
                    axios.patch(`http://127.0.0.1:8000/api/group/groups/${groupId}/`, payload, {
                        headers: {
                        'Authorization': token
                    }
                })
                .then((response) => {
                     this.groups.groups.forEach((group, index) => {
                        if (response.data.id === group.id) {
                            this.groups.groups[index] = response.data
                            this.groups.changes ++
                            // this.$forceUpdate();
                        }
                     })
                })
            }
        }
    }
}
</script>

<style>

</style>