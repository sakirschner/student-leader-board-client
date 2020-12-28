import axios from "axios"

const state = () => ({
    account: {},
    error: {},
    class: []
})

const actions = {
    async registerAccount({commit}, payload) {
        await axios.post('http://127.0.0.1:8000/api/user/create/', payload)
            .then((response) => {
                commit('setAccount', response)
                commit('auth/setAuthentication', null, {root: true})
            }
        )
            .catch((error) => {
                console.log("here")
                commit('setError', error)
            }
        )
    },
    async getAccount({commit, rootState}) {
        let token = rootState.auth.token
        if (token) {
            await axios.get('http://127.0.0.1:8000/api/user/me/', {
                headers: {
                    'Authorization': token
                }
            })
            .then((response) => {
                commit('setAccount', response);           
            })
        }
    },
    async getClass({commit, rootState}) {
        let token = rootState.auth.token
        if (token) {
            await axios.get('http://127.0.0.1:8000/api/user/', {
                headers: {
                    'Authorization': token
                }
            })
            .then((response) => {
                commit('setClass', response);           
            })
        }
    }
}

const mutations = {
    setAccount(state, response) {
        state.account = response.data
    },
    setError(state, error) {
        state.error = error
    },
    setClass(state, response) {
        state.class = response.data
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}