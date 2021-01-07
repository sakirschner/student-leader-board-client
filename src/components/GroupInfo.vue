<template>
  <v-card>
    <v-card-title>Group Info</v-card-title>
    <v-card-subtitle style="margin-bottom: -10px">
        <v-icon>mdi-account-multiple</v-icon> 
        <span class="subtitle-1"> {{group.name}}</span>
    </v-card-subtitle>
    <v-card-text class="group-list">
        <div v-for="student in groupWithPoints" :key="student.id" class="student">
            <div class="mb-1">
            <v-icon small>mdi-account</v-icon>
                {{student.first_name}} {{student.last_name}}
            </div>
            <v-row class="avatar-row">
            <v-img
                :src=student.image
                class="group-avatar"
                v-if="student.image"
            />
            <v-avatar color="rgb(0, 174, 255)" size="100" v-if="!student.image">
                <v-icon dark size="75">mdi-account-circle</v-icon>
            </v-avatar>
            </v-row>
            
            <v-icon small>mdi-account-box-outline</v-icon>
                {{student.user_name}}
            <v-spacer />
            <v-chip class="ma-1" color="#00aeff" text-color="white">
            <v-icon small>mdi-trophy-outline</v-icon>
             <span class="pl-1">{{student.points}} Points</span>
            </v-chip>
        </div>
    </v-card-text>
    </v-card>
</template>

<script>
export default {
    props: {
        group: Object,
        groupWithPoints: Array
    },
}
</script>

<style>
 .group-avatar {
        max-width: 100px;
        width: 100px;
        height: 100px;
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
        margin-bottom: 10px;
    }

    .group-list {
        display: flex; 
        justify-content: space-around;
        flex-wrap: wrap;
    }

    .student {
        margin: 10px 0px;
        text-align:center
    }
</style>