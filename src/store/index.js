import { createStore } from 'vuex'
import coaches from './modules/coaches'
import requests from './modules/requests'

const store = createStore({
  modules: {
    coaches, requests
  },
  state() {
    return {
      userId: null,
      API_KEY: 'AIzaSyAUQKAEIUetCSZsbjid5cGc_pf2z9hl174',
      token: null,
      tokenExpiration: null,
    }
  },
  getters: {
    userId: state => state.userId,
    token: state => state.token,
    isAuthenticated(state) {
      return !!state.token
    }
  },
  mutations: {
    setUser(state, payload) {
      state.userId = payload.userId
      state.token = payload.token
      state.tokenExpiration = payload.tokenExpiration
    }
  },
  actions: {
    async login(context, payload) {
      const authPayload = {email: payload.email, password: payload.password, returnSecureToken: true, url: `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAUQKAEIUetCSZsbjid5cGc_pf2z9hl174` }
      return context.dispatch('auth', authPayload)
    },
    async signup(context, payload) {
      const authPayload = {email: payload.email, password: payload.password, returnSecureToken: true, url: `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAUQKAEIUetCSZsbjid5cGc_pf2z9hl174`}
      return context.dispatch('auth', authPayload)
    },
    async auth(context, payload) {
      const url = payload.url
      const actionPayload = {email: payload.email, password: payload.password, returnSecureToken: true}
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(actionPayload)
      })
      const responseData = await response.json()
      if (!response.ok) {
        const error = new Error(responseData.message || 'Failed to authenticate. Check your login data')
        throw error
      }
      const newPayload ={token: responseData.idToken, userId: responseData.localId, tokenExpiration: responseData.expiresIn}

      /*we have to store the newPayload that holds the user login data in local storage before we commit*/
      localStorage.setItem('token', responseData.idToken)
      localStorage.setItem('userId', responseData.localId)
      /* now we add an action that checks for the availabilty of these credentials in the local storage when the app starts and 
      automatically log the user in */


      context.commit('setUser', newPayload)
    },
    tryLogin(context) {/* local storage tryLogin function  */
    /*this function must be the first thing to run before login so we will call it in the app.vue file*/
      const token = localStorage.getItem('token')
      const userId = localStorage.getItem('userId')

      if (token && userId) {
        context.commit('setUser', {token: token, userId: userId , tokenExpiration: null})
      }
    },
    logout(context) {
      const newPayload = {token :  null, userId :  null, tokenExpiration : null}
      localStorage.clear()
      context.commit('setUser', newPayload)
    }
  }
})

export default store
