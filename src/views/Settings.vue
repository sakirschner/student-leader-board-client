<template>
    <v-container>
        <v-row>
            <v-spacer />
                <v-col cols="12" md="4">
                    <v-row class="avatar-row">
                        <v-img 
                            :src="account.image"
                            width="250px"
                            height="250px"
                            class="rounded-circle avatar"
                        />
                    </v-row>
                    <v-row>
                        <v-file-input
                            accept="image/png, image/jpeg, image/gif"
                            placeholder="Pick an avatar"
                            prepend-icon="mdi-camera"
                            label="Avatar"
                            v-model="newImage"
                        ></v-file-input>
                    </v-row>
                </v-col>
            <v-spacer />
        </v-row>
        <v-form>
            <v-container>
                <v-row>
                    <v-col cols="12" md="6">
                        <v-text-field
                            v-model="account.first_name"
                            label="First Name"
                        />
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field
                            v-model="account.last_name"
                            label="Last Name"
                        />
                    </v-col>
                </v-row>
                <v-text-field
                    v-model="account.email"
                    label="Email"
                />
                <v-text-field
                    v-model="account.user_name"
                    label="Username"
                />
            </v-container>
        </v-form>
    </v-container>
</template>

<script>
export default {
    data: () => ({
        account: {},
        newImage: null
    }),
    async created() {
        await this.$store.dispatch('account/getAccount');
        this.account = this.$store.state.account.account
    }

}
</script>

<style scoped>
    .avatar {
        flex: 0 0 auto !important;
    }

    .avatar-row {
        justify-content: center;
    }
</style>