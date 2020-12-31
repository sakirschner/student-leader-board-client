<template>
    <v-container>
        <v-card>
            <v-card-title>Trophy Case</v-card-title>
            <v-card-text>
                <v-row>
                    <v-col cols="12" md="3">
                        <v-card
                            color="#EA6400"
                            dark
                            elevation="0"
                        >
                            <v-card-title>
                                Place
                            </v-card-title>
                            <v-card-text>
                                <span class="headline">1st</span>
                            </v-card-text>
                        </v-card>
                    </v-col>
                    <v-col cols="12" md="3">
                        <v-card
                            color="#00B6EC"
                            dark
                            elevation="0"
                        >
                            <v-card-title>
                                Total Points
                            </v-card-title>
                            <v-card-text>
                                <span class="headline">{{totalPoints}}</span>
                            </v-card-text>
                        </v-card>
                    </v-col>
                    <v-col cols="12" md="6" class="trophies-column">
                        <div v-for="reward in group.rewards" :key="reward.id" class="trophies">
                            <v-icon 
                                size="90px" 
                                color="#FFD700"
                            >mdi-trophy</v-icon>
                            <span>{{reward.reward}}</span>
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
                item-key="id"
                show-expand
                >
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
export default {
    props: {
        group: Object,
        stats: Array,
        totalPoints: Number
    },
    data: () => ({
        search: '',
        expanded: [],
        singleExpand: false,
        headers: [
            { text: 'Student', value: 'student.user_name'},
            { text: 'Achievement', value: 'achievement.achievement'},
            { text: 'Points', value: 'achievement.points'},
            { text: 'Time', value: 'created_at'},
            { text: '', value: 'data-table-expand' }
        ]
    })
}
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