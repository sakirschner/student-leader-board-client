<template>
    <div>
        <v-card>
            <v-card-title>Account Info</v-card-title>
            <v-card-text>
                <v-row class="avatar-row">
                    <v-img 
                        :src="account.image"
                        width="200px"
                        height="200px"
                        class="rounded-circle avatar"
                        style="position: relative"
                        v-if="account.image"
                    />
                    <v-avatar color="cyan" size="200" v-if="!account.image" class="avatar">
                        <v-icon dark size="200">mdi-account-circle</v-icon>
                    </v-avatar>
                </v-row>
                <br>
                    <v-icon>mdi-account</v-icon>
                    <span class="subtitle-1"> {{account.first_name}} {{account.last_name}}</span>
                    <v-spacer/>
                    <v-icon>mdi-account-box-outline</v-icon>
                    <span class="subtitle-1"> {{account.user_name}}</span>
                    <v-spacer />
                    <v-icon>mdi-email-outline</v-icon>
                    <span class="subtitle-1"> {{account.email}}</span>
                    <v-spacer/>
                    <v-btn outlined sm class="mt-4" color="primary" @click="onEdit">
                        <v-icon left>mdi-pencil</v-icon>
                        Edit
                    </v-btn>
            </v-card-text>
        </v-card>
    </div>        
</template>

<script>
export default {
    props: {
        account: Object
    },
    // data: () => ({
    //     account: {}
    // }),
    // async created() {
    //     console.log("Info is created")
    //     await this.getAccount();
    // },
    methods: {
        onEdit() {
            this.$emit('clicked')
        }
    }
}
</script>

<style>
    .avatar-row {
        justify-content: center;
    }

    .avatar {
        flex: 0 0 auto !important;
        box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 
            0px 4px 5px 0px rgba(0, 0, 0, 0.14), 
            0px 1px 10px 0px rgba(0, 0, 0, 0.12); 
    }
</style>