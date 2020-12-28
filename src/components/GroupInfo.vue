<template>
  <v-card>
    <v-card-title>Group Info</v-card-title>
    <v-card-subtitle><v-icon>mdi-account-multiple</v-icon> {{groups[0].name}}</v-card-subtitle>
    <v-card-text class="pl-0 pr-0">
        <div v-for="group in groups" :key="group.id" class="group-list">
            <div v-for="student in group.students" :key="student.id" class="student">
                <v-row class="avatar-row">
                <v-img
                    :src=student.image
                    class="group-avatar"
                />
                </v-row>
                <v-icon small>mdi-account</v-icon>
                 {{student.first_name}} {{student.last_name}}
                <v-spacer />
                <v-icon>mdi-account-box-outline</v-icon>
                 {{student.user_name}}
                <v-spacer />
                <v-icon>mdi-trophy-outline</v-icon>
                Level: {{student.level}}
            </div>
        </div>
    </v-card-text>
    </v-card>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    data: () => ({

    }),
    async created() {
        await this.$store.dispatch('group/getAllGroups');
    },
    computed: {
        ...mapGetters('group', {
            groups: 'studentGroup'
        })
    }
}
</script>

<style>
 .group-avatar {
        max-width: 100px;
        width: 100px;
        height: 100px;
        border-radius: 50px;
        background-clip: padding-box;
        box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 
        0px 4px 5px 0px rgba(0, 0, 0, 0.14), 
        0px 1px 10px 0px rgba(0, 0, 0, 0.12); 
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
        margin: 10px;
        text-align: center;
    }
</style>