<template>
  <v-container>
      <v-card>
          <v-card-title>
              Group Stats
          <v-spacer></v-spacer>
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
        stats: Array
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

</style>