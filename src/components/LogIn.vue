<template>
<div id="app">
    <v-app>
        <v-dialog v-model="dialog" persistent max-width="600px" min-width="360px">
            <div>
                <v-tabs v-model="tab" show-arrows background-color="cyan" icons-and-text dark grow slider-color="yellow">
                    <v-tab v-for="i in tabs" :key="i">
                        <v-icon large>{{ i.icon }}</v-icon>
                        <div class="caption">{{ i.name }}</div>
                    </v-tab>
                    <v-tab-item>
                        <v-card class="px-4">
                            <v-card-text>
                                <v-form ref="loginForm" v-model="valid" lazy-validation>
                                    <v-row>
                                        <v-col cols="12">
                                            <v-text-field 
                                                v-model="loginEmail" 
                                                :rules="loginEmailRules" 
                                                label="E-mail" 
                                                required
                                                >
                                            </v-text-field>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-text-field 
                                                v-model="loginPassword" 
                                                :append-icon="showEye ? 'mdi-eye' : 'mdi-eye-off'" 
                                                :rules="[rules.required]" 
                                                :type="showEye ? 'text' : 'password'" 
                                                name="password" 
                                                label="Password" 
                                                counter 
                                                @click:append="showEye = !showEye"
                                                >
                                            </v-text-field>
                                        </v-col>
                                        <v-col class="d-flex" cols="12" sm="7" xsm="12" width="100%"> 
                                            <v-alert type="error" outlined width="100%" v-if="logInError">Email or Password is incorrect</v-alert>
                                        </v-col>
                                        <v-spacer />
                                        <v-col class="d-flex" cols="12" sm="3" xsm="12" align-end>
                                            <v-btn x-large block :disabled="!valid" color="success" @click="validate">
                                                Login
                                            </v-btn>
                                        </v-col>
                                    </v-row>
                                </v-form>
                            </v-card-text>
                        </v-card>
                    </v-tab-item>
                    <v-tab-item>
                        <v-card class="px-4">
                            <v-card-text>
                                <v-form ref="registerForm" v-model="valid" lazy-validation>
                                    <v-row>
                                        <v-col cols="12" sm="6" md="6">
                                            <v-text-field 
                                                v-model="firstName" 
                                                :rules="[rules.required]" 
                                                label="First Name" 
                                                maxlength="20" 
                                                required
                                                >
                                            </v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="6">
                                            <v-text-field 
                                                v-model="lastName" 
                                                :rules="[rules.required]" 
                                                label="Last Name" 
                                                maxlength="20" 
                                                required>
                                            </v-text-field>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-text-field 
                                                v-model="email" 
                                                :rules="emailRules" 
                                                label="E-mail"
                                                name="email" 
                                                required>
                                            </v-text-field>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-text-field 
                                                v-model="password" 
                                                :append-icon="showEye ? 'mdi-eye' : 'mdi-eye-off'" 
                                                :rules="[rules.required, rules.password]" 
                                                :type="showEye ? 'text' : 'password'" 
                                                name="password" 
                                                label="Password" 
                                                hint="Min. 8 characters with at least one capital letter, a number and a special character." 
                                                counter 
                                                @click:append="showEye = !showEye"
                                                >
                                            </v-text-field>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-text-field
                                                block 
                                                v-model="verify" 
                                                :append-icon="showEye ? 'mdi-eye' : 'mdi-eye-off'" 
                                                :rules="[rules.required, passwordMatch]" 
                                                :type="showEye ? 'text' : 'password'" 
                                                name="verify" 
                                                label="Confirm Password" 
                                                counter 
                                                @click:append="showEye = !showEye"
                                                >
                                            </v-text-field>
                                        </v-col>
                                        <v-col class="d-flex" cols="12" sm="7" xsm="12" width="100%"> 
                                            <v-alert type="error" outlined width="100%" v-if="registerError">Email already exists</v-alert>
                                        </v-col>
                                        <v-spacer></v-spacer>
                                        <v-col class="d-flex ml-auto" cols="12" sm="3" xsm="12">
                                            <v-btn x-large block :disabled="!valid" color="success" @click="validate">Register</v-btn>
                                        </v-col>
                                    </v-row>
                                </v-form>
                            </v-card-text>
                        </v-card>
                    </v-tab-item>
                </v-tabs>
            </div>
        </v-dialog>
    </v-app>
</div>
</template>

<script>
import axios from 'axios';
export default {
    data: () => ({
        dialog: true,
        logInError: false,
        registerError: false,
        tab: 0,
        tabs: [
            {
                name: "Login",
                icon: "mdi-account"
            },
            {
                name: "Register",
                icon: "mdi-account-plus-outline"
            }
        ],
        valid: true,
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        verify: "",
        loginPassword: "",
        loginEmail: "",
        loginEmailRules: [
            v => !!v || "Required",
            v => /.+@.+\..+/.test(v) || "E-mail must be valid"
        ],
        emailRules: [
            v => !!v || "Required",
            v => /.+@.+\..+/.test(v) || "E-mail must be valid"
        ],

        showEye: false,
        rules: {
            required: value => !!value || "Required.",
            min: v => (v && v.length >= 8) || "Min 8 characters",
            password: value => {
                //eslint-disable-next-line
                const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
                return (
                    pattern.test(value) ||
                    "Min. 8 characters with at least one capital letter, a number and a special character."
                );
            }
        }
    }),
    computed: {
        passwordMatch() {
            return () => this.password === this.verify || "Password must match";
        }
    },
    methods: {
        onRegister(fromRegister) {
            console.log("onRegister")
            console.log(fromRegister)
            this.$emit('submitted', fromRegister)
        },
        async validate() {
            this.logInError = false;
            this.registerError = false;
            this.$store.commit('auth/setError', null)
            if (this.$refs.loginForm.validate()) {
                const payload ={
                    email: this.loginEmail, 
                    password: this.loginPassword
                }
                const fromRegister = false;
                await this.logIn(payload, fromRegister);
            } else if (this.$refs.registerForm.validate()) {
                await this.registerAccount();
            }
        },
        async logIn(payload, fromRegister) {
            console.log("in login")
            console.log(fromRegister)
            await this.$store.dispatch('auth/getToken', payload);
            if (this.$store.state.auth.error) {
                if (this.$store.state.auth.error.message == "Network Error") {
                    window.alert(this.$store.state.auth.error.message + " - Please contact support")
                } else {
                    this.logInError = true;
                }
            }
            await this.onRegister(fromRegister);
        },
        async registerAccount() {
            let payload = {
                    email: this.email,
                    password: this.password,
                    first_name: this.firstName.substring(0,1).toUpperCase() + this.firstName.substring(1).toLowerCase(),
                    last_name: this.lastName.substring(0,1).toUpperCase() + this.lastName.substring(1).toLowerCase(),
                }
            await axios.post('http://127.0.0.1:8000/api/user/create/', payload)
                .then(() => {
                    payload = {
                        email: this.email,
                        password: this.password
                    }
                    const fromRegister = true
                    this.logIn(payload, fromRegister)                
                })
                .catch(() => {
                    this.registerError = true
                }
            )
        },
        reset() {
            this.$refs.form.reset();
        },
        resetValidation() {
            this.$refs.form.resetValidation();
        }
    }
}
</script>
