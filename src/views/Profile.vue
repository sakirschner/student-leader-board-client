 <template>
    <div>
        <v-container v-if="!edit">
            <v-row>
                <v-col cols="12" md="4">
                    <AccountInfo 
                        @clicked="onEditClick"
                        :account="account"
                    />
                </v-col>
                <v-col cols="12" md="8">
                    <GroupInfo 
                        :group="group[0]"
                        :groupWithPoints="groupWithPoints"
                    />
                </v-col>
            </v-row>
            <v-row>
                <GroupStats 
                    :group="group[0]"
                    :stats="achievements"
                    :totalPoints="totalPoints"
                />
            </v-row>
        </v-container>

        <v-container v-if="edit">
            <EditAccount
                :account="account"
                @clicked="onCancelClick"
                @submitted="onSaveClick"
            />
        </v-container>
    </div>
</template>

<script>
import axios from 'axios';

import GroupInfo from '../components/GroupInfo';
import AccountInfo from '../components/AccountInfo';
import EditAccount from '../components/EditAccount';
import GroupStats from '../components/GroupStats';

export default {
    components: {
        AccountInfo,
        GroupInfo,
        EditAccount,
        GroupStats
    },
    data: () => ({
        account: {},
        group: [],
        achievements: [],
        edit: false,
        totalPoints: 0,
        groupWithPoints: {},
        isFetching: true
    }),
    async created() {
        await this.getData();
    },
    methods: {
        async getData() {
            await this.getAccount();
        },
        async getAccount() {
            let token = this.$store.state.auth.token
            if (token) {
                await axios.get('http://127.0.0.1:8000/api/user/me/', {
                    headers: {
                        'Authorization': token
                    }
                })
                .then((response) => {
                    this.account = response.data   
                    this.getGroup();      
                })
            }
        },
        async getGroup() {
            let token = this.$store.state.auth.token
            if (token) {
                await axios.get(`http://127.0.0.1:8000/api/group/groups/?students=${this.account.id}`, {
                    headers: {
                        'Authorization': token
                    }
                })
                .then((response) => {
                    this.group = response.data 
                    this.getAchievements();          
                })
            }
        },
        async getAchievements() {
            let studentIds = []
            this.group[0].students.forEach((student) => {
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
            this.group[0].students.forEach((student) => { 
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
        onEditClick() {
            this.edit = !this.edit
        },
        onCancelClick() {
            this.edit = !this.edit
        },
        onSaveClick() {
            this.edit = !this.edit
            this.$router.go()
        }
    }
}
</script>

<style>

  .v-card {
    box-shadow: none !important;
    border-radius: 15px !important;
  }

</style>