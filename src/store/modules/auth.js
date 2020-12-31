import axios from 'axios'

const state = () => ({
    token: "",
    isAuthenticated: false,
    error: null
})

const actions = {
    async getToken({ commit }, payload) {
        const sessionToken = sessionStorage.getItem('token');
        if (sessionToken) {
            await commit('setTokenFromSession', sessionToken);
            await commit('setAuthentication')

        } else {
            await axios.post('http://127.0.0.1:8000/api/user/token/', payload)
                .then((response) => {
                    commit('setToken', response);
                    commit('setAuthentication');
                }
            )
                .catch((error) => {
                    commit('setError', error);
                }
            )
        }
    }
}

const mutations = {
    setToken(state, response) {
        state.token = 'Token ' + response.data.token;
        sessionStorage.setItem('token', 'Token ' + response.data.token)
    },
    setTokenFromSession(state, sessionToken) {
        state.token = sessionToken;
    },
    setAuthentication(state) {
        if (!state.error) {
            state.isAuthenticated = true;
        }
    },
    setError(state, error) {
        state.error = error;
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}