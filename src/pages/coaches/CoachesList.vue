<template>
    <article>
    <base-dialog :show="!!error" title="An error ocurred!" @close="handleError"><!-- when you use double exclamation marks it coerses the string to a boolean based on its trithiness -->
        <p>{{ error }}</p>
    </base-dialog>
    <section>
        <coach-filter @change-filter="setFilters" ></coach-filter>
    </section>
    <section>
        <base-card>
            <div class="controls">
                <base-button mode="outline" @click="loadCoaches_1">Refresh</base-button>

                <base-button link to="/auth?redirect=register" v-if="!isAuthenticated">Login to register as coach</base-button>
                <base-button v-if="isAuthenticated && !isCoach && !isLoading " link to="/register" @click="loadCoaches_1">Register as Coach</base-button>
            </div>
            <div v-if="isLoading">
                <base-spinner></base-spinner>
            </div>
            <ul v-else-if="hasCoaches_1">
                <coach-item v-for="coach in filteredCoaches" :key="coach.id" :id="coach.id" :firstName="coach.firstName" :lastName="coach.lastName" :rate="coach.hourlyRate" :areas="coach.areas"></coach-item>
            </ul>
            <h3 v-else>No Coaches Found</h3>
        </base-card>
    </section>
</article>
</template>

<script>
import BaseSpinner from '@/components/ui/BaseSpinner.vue';
import CoachFilter from '@/components/coaches/CoachFilter.vue';
import { mapGetters, mapActions } from 'vuex';
import CoachItem from '@/components/coaches/CoachItem.vue';
export default {
    name: 'CoachesList',
    data() {
        return {
            error: null,
            isLoading: false,
            activeFilters: {
                frontend: true,
                backend: true,
                career: true
            }
        }
    },
    components: { CoachItem, CoachFilter, BaseSpinner },
    computed: {
        ...mapGetters(['coaches', 'hasCoaches', 'isCoach', 'isAuthenticated']),
        filteredCoaches() {
            return this.coaches.filter(coach => {
                if (this.activeFilters.frontend && coach.areas.includes('frontend')) {
                    return true
                }
                if (this.activeFilters.backend && coach.areas.includes('backend')) {
                    return true
                }
                if (this.activeFilters.career && coach.areas.includes('career')) {
                    return true
                }
                return false
            })
            
        },
        hasCoaches_1() {
            return !this.isLoading && this.hasCoaches
        }
    },
    methods: {
        ...mapActions(['loadCoaches']),
        setFilters(updatedFilters) {
            this.activeFilters = updatedFilters
        },
        async loadCoaches_1() {
        this.isLoading = true
        try {
            await this.loadCoaches()
        } catch (error) {
            this.error = error.message || 'something went wrong'
        }
        this.isLoading = false
        },
        handleError() {
            this.error = null
        }
    },
    created() {
        this.loadCoaches_1()
    }

}
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>