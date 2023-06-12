<template>
    <article>
     <base-dialog :show="!!error" title="An error ocurred!" @close="handleError"><!-- when you use double exclamation marks it coerses the string to a boolean based on its trithiness -->
        <p>{{ error }}</p>
    </base-dialog>
    <section>
        <base-card>
        
        <header>
            <h2>Request Received</h2>
        </header>
        <base-spinner v-if="isLoading"></base-spinner>
        <ul v-else-if="hasRequests && !isLoading">
            <request-item v-for="request in requests" :key="request.id" :id="request.id" :email="request.userEmail" :message="request.message"></request-item>
        </ul>
        <h3 v-else>You Haven't recieved any requests yet!</h3>
        </base-card>
    </section>
</article>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import RequestItem from '@/components/requests/RequestItem.vue';
export default {
    data() {
        return {
            isLoading: false,
            error: null
        }
    },
    components: {
        RequestItem
    },
    computed: {
        ...mapGetters(['requests', 'hasRequests']),
    },
    methods: {
        ...mapActions(['fetchRequests']),
       async loadRequests() {
            this.isLoading = true
            try {    
              await  this.fetchRequests()
            } catch (error) {
                this.error = error.message || 'something Failed'
            }
            this.isLoading = false
        },
        handleError() {
            this.error = null
        }
    },
    created() {
       this.loadRequests() 
    }
}
</script>

<style scoped>
    header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>