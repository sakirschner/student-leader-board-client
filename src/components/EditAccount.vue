<template>
  <div>
    <v-card v-if="loading">
      <v-layout row justify-center class="pt-10 pb-10">
        <v-progress-circular
          :size="70"
          :width="7"
          color="rgb(0, 174, 255)"
          indeterminate
          v-if="loading"
        ></v-progress-circular>
      </v-layout>
    </v-card>
    <v-card class="pa-4" v-else-if="!loading">
      <v-row>
        <v-spacer />
        <v-col cols="12" md="4">
          <v-row class="avatar-row">
            <v-avatar
              v-if="!avatar && !account.image"
              color="rgb(0, 174, 255)"
              size="250"
            >
              <v-icon dark size="250">mdi-account-circle</v-icon>
            </v-avatar>
            <v-img
              :src="account.image"
              width="250px"
              height="250px"
              class="rounded-circle avatar"
              style="position: relative"
              v-if="!avatar && account.image"
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
              <v-text-field v-model="account.first_name" label="First Name" />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field v-model="account.last_name" label="Last Name" />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="12">
              <v-text-field v-model="account.user_name" label="Username" />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="12">
              <v-btn x-large color="error" class="mr-4" @click="onCancel"
                >Cancel</v-btn
              >
              <v-btn x-large color="success" @click="patchAccount">Save</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
      <v-dialog v-model="dialog" max-width="500px">
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
            <v-btn text color="error" @click="onAvatarCancel">
              Cancel
            </v-btn>
            <v-btn text color="primary" @click="dialog = false">
              Submit
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";
import FormData from "form-data";

export default {
  props: {
    account: Object,
  },
  data: () => ({
    dialog: false,
    avatar: null,
    url: null,
    loading: false,
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
      this.$emit("clicked");
    },
    async patchAccount() {
      this.loading = true;
      let token = this.$store.state.auth.token;
      let payload = {
        first_name: this.$props.account.first_name,
        last_name: this.$props.account.last_name,
        user_name: this.$props.account.user_name,
      };
      if (token) {
        await axios
          .patch(
            `http://127.0.0.1:8000/api/user/${this.$props.account.id}/`,
            payload,
            {
              headers: {
                Authorization: token,
              },
            }
          )
          .then(() => {
            if (this.avatar) {
              this.uploadImage();
            } else {
              this.$emit("submitted");
            }
          });
      }
    },
    async uploadImage() {
      console.log(this.avatar);
      let token = this.$store.state.auth.token;
      let data = new FormData();
      data.append("image", this.avatar, this.avatar.fileName);
      if (token) {
        await axios
          .post(
            `http://127.0.0.1:8000/api/user/user/${this.$props.account.id}/upload-image/`,
            data,
            {
              headers: {
                accept: "application/json",
                "Accept-Language": "en-US,en;q=0.8",
                "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
                Authorization: token,
              },
            }
          )
          .then(() => {
            this.$emit("submitted");
          });
      }
    },
  },
};
</script>

<style>
.avatar-row {
  justify-content: center;
}

.img-button {
  margin-left: 160px;
  margin-top: 200px;
}

.middle {
  align-self: center;
}
</style>
