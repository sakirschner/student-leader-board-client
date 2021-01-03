<template>
    <v-container>
        <v-card>
            <v-card-title>Leaderboard</v-card-title>
            <v-card-text>
                <v-row v-for="(group, index) in organizedGroups" :key="group.id">
                            
                            <!-- 1st place -->
                    <div v-if="index === 0" class="first-place-container">
                        <v-row>
                            <span class="title mr-4">{{group.name}}</span>                            
                            <v-chip color="#00aeff" dark>{{group.points}} Points</v-chip> 
                        </v-row>
                        <v-row>
                            <v-col cols="12" md="2" class="text-center" style="margin-left: -20px">
                                <v-icon 
                                    size="100px" 
                                    color="#FFD700"
                                    class="mt-2 ml-1"
                                    style="position:relative; margin-right:-60px"
                                >mdi-trophy</v-icon>
                                <span class="subtitle-1 white--text" style="position:relative">
                                    {{index + 1}}<sup>{{group.suffix}}</sup>
                                </span>
                            </v-col>
                            <v-col cols="12" md="10" class="d-flex flex-wrap justify-space-around text-center">
                                <div v-for="student in group.students" :key="student.id">
                                    <v-row class="avatar-row">
                                        <v-img
                                            :src=student.image
                                            class="group-avatar"
                                        />
                                    </v-row>
                                    <v-icon small>mdi-account-box-outline</v-icon>
                                        {{student.user_name}}
                                </div>
                            </v-col>
                        </v-row>
                    </div>
                    
                    <!-- Everyone else -->
                    <div v-if="index > 0" style="display:flex">
                        <v-col cols="12" md="2" >
                            <v-avatar color="success" dark size="75">
                                <span class="white--text">
                                    {{index + 1}}<sup>{{group.suffix}}</sup>
                                </span>
                            </v-avatar>
                        </v-col>
                        <v-col cols="12" md="10">
                            <v-row>
                            <span class="title mr-4">{{group.name}}</span>
                            <v-chip color="primary">{{group.points}} Points</v-chip> 
                            </v-row>
                        </v-col>
                    </div>
                </v-row>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
export default {
    props: {
        groups: Object
    },
    data: () => ({
        organizedGroups: [],
    }),
    created() {
        this.organizeGroups();
    },
    methods: {
        organizeGroups() {
            this.organizedGroups = this.$props.groups.groups.sort(
                (a, b) => {
                   if (a.points < b.points) {
                       return 1
                   } else {
                       return -1
                   }
                }
            )
            this.organizedGroups.forEach((group, i) => {
               this.organizedGroups[i].suffix = this.nth(i); 
            })
        },
        nth(n) {
            return ['st','nd','rd'][n/10%10^1&&n%10]||'th';
        }
    }
}
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