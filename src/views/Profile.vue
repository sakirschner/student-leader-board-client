 <template>
    <div>
        <v-container v-if="!edit">
            <v-row>
                <v-col cols="12" md="4">
                    <AccountInfo 
                        :account="account"
                        @clicked="onEditClick"
                    />
                </v-col>
                <v-col cols="12" md="8">
                    <GroupInfo />
                </v-col>
            </v-row>
            <v-row>
                <GroupStats 
                    :stats="groupDetails"
                />
            </v-row>
        </v-container>

        <v-container v-if="edit">
            <EditAccount
                :account="account"
                @clicked="onCancelClick"
            />
        </v-container>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

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
        edit: false,
    }),
    async created() {
        await this.$store.dispatch('account/getAccount');
        this.account = this.$store.state.account.account;
        await this.$store.dispatch('group/getAllAchievements');
    },
    computed: {
        ...mapGetters('group', {
            groupDetails: 'groupDetails'
        })
    },
    methods: {
        onEditClick() {
            this.edit = !this.edit
        },
        onCancelClick() {
            this.edit = !this.edit
        }
    }
}
</script>

<style>

</style>