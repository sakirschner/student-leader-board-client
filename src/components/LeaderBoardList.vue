<template>
  <v-card>
      <v-card-title>Leaderboard</v-card-title>
        <v-simple-table class="pb-4">
            <template v-slot:default>
                <thead>
                    <tr>
                        <th class="text-center">
                            Rank
                        </th>
                        <th class="text-left">
                            Group
                        </th>
                        <th class="text-center">
                            Points
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                    v-for="(group, index) in organizedGroups"
                    :key="group.id"
                    >
                        <td style="width:75px" class="text-center">{{index + 1}}<sup>{{group.suffix}}</sup></td>
                        <td>
                            <router-link :to="{ name: 'groupInfo', params: { id: group.id }}" style="text-decoration: none; color:rgb(0, 174, 255)">
                                {{ group.name }}
                            </router-link>
                        </td>
                        <td class="text-center">
                            <v-chip 
                                color="#00aeff" 
                                dark
                            >
                                {{ group.points }}
                            </v-chip>
                        </td>
                    </tr>
                </tbody>
            </template>
        </v-simple-table>
    </v-card>
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
        },
        leaderBoardColor(index) {
            let color = (index === 1) ? '#B08D57' : '#BEC2CB';
            return color;
        }
    }
}
</script>

<style>
    td, th {
        border: none !important;
    }
</style>