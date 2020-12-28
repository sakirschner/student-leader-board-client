<template>
  <div>
        <v-card class="pa-4">
        <v-row>
            <v-spacer />
                <v-col cols="12" md="4">
                    <v-row class="avatar-row">
                        <v-img 
                            :src="account.image"
                            width="250px"
                            height="250px"
                            class="rounded-circle avatar"
                            style="position: relative"
                            v-if="!avatar"
                        />
                        <v-img 
                            :src="url"
                            width="250px"
                            height="250px"
                            class="rounded-circle avatar"
                            style="position: relative"
                            v-if="avatar"
                        />
                        <v-btn
                        color="primary"
                        dark
                        absolute
                        fab
                        class="img-button"
                        @click="dialog = !dialog"
                        >
                        <v-icon>mdi-pencil</v-icon>
                        </v-btn>
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
                <v-row>
                    <v-col cols="12" md="12">
                        <v-text-field
                            v-model="account.email"
                            label="Email"
                        />
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" md="12">
                        <v-text-field
                            v-model="account.user_name"
                            label="Username"
                        />
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" md="12">
                        <v-btn x-large color="error" class="mr-4" @click="onCancel">Cancel</v-btn>
                        <v-btn x-large color="success">Save</v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </v-form>
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <v-card>
            <v-card-title>Choose an Avatar</v-card-title>
            <v-card-text>
                <v-file-input
                    accept="image/png, image/jpeg, image/gif"
                    placeholder="Click Here"
                    prepend-icon="mdi-camera"
                    label="Avatar"
                    v-model="avatar"
                    @change="onFileChange"
                ></v-file-input>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn
                    text
                    color="error"
                    @click="onAvatarCancel"
                >
                    Cancel
                </v-btn>
                <v-btn
                    text
                    color="primary"
                    @click="dialog = false"
                >
                    Submit
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        </v-card>
    </div>
</template>

<script>
export default {
    props: {
        account: Object
    },
    data: () => ({
        dialog: false,
        avatar: null,
        url: null,
    }),
    methods: {
        onFileChange(e) {
            this.url = URL.createObjectURL(e);
        },
        onAvatarCancel() {
            this.dialog = false;
            this.avatar = null;
            this.url = null;
        },
        onCancel() {
            this.$emit('clicked')
        }
    }

}
</script>

<style>
    .avatar-row {
        justify-content: center;
    }

    .img-button {
        margin-left: 160px;
        margin-top: 200px;;
    }

    .middle {
        align-self: center;
    }
</style>