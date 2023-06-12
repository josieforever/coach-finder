const coaches = {
    state() {
        return  {
            coaches: []
        }
    },
    getters: {
        coaches: state => state.coaches,
        hasCoaches: state => state.coaches && state.coaches.length > 0,
        isCoach( state, rootGetters) {
            const coaches = state.coaches
            const userId = rootGetters.userId
            return coaches.some(coach => coach.id === userId)
            /* some is an array method that returns true if some coach fulfills a criteria */
            /* here we run a function on every coach in coaches and return true if coach.id is equal to userId */
            /* so this will return true if we find at least one coach that has our UserId as an id meaning we are already a coach*/
        } 
    },
    mutations: {
      registerCoach(state,payload) {
        state.coaches.push(payload)
      },
      setCoaches(state, payload) {
        state.coaches = payload
      }
    },
    actions: {
      async registerCoach(context, payload) {
        const userId = context.rootGetters.userId
        const coachData = {
          firstName: payload.first,
          lastName: payload.last,
          description: payload.desc,
          hourlyRate: payload.rate,
          areas: payload.areas
        }
        const token = context.getters.token
        const response = await fetch(`https://coach-finder-a3def-default-rtdb.firebaseio.com/coaches/${userId}.json?auth=` + token, {
          method: 'PUT',/*  */
          body: JSON.stringify(coachData)
        })
        response
        context.commit('registerCoach', {...coachData,
        id: userId})
      },
      async loadCoaches(context) {
        const response = await fetch(`https://coach-finder-a3def-default-rtdb.firebaseio.com/coaches.json`)
        const responseData = await response.json()
        /* please remember that the respponse data from firebase is always one big object */
        /* Hence we have to use a for in loop to destructure it and then store them in an array data structure */
      
        if (!response.ok) {
          /* this is an error constructor Function */
          const error = new Error(response.message || 'Failed to fetch')
          throw error
        }


        const coaches = []
        for ( const key in responseData) {
          const coach = {
            id: key,
            firstName: responseData[key].firstName,
            lastName: responseData[key].lastName,
            description: responseData[key].description,
            hourlyRate: responseData[key].hourlyRate,
            areas: responseData[key].areas
          }
          coaches.push(coach)
        }
    

        context.commit('setCoaches', coaches)
    }
}
}

export default coaches