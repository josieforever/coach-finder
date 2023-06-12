<template>
    <article>
    <section>
        <base-card>
            <h2>Register as a coach now!</h2>
            <coach-form @save-data="saveData"></coach-form>
        </base-card>
    </section>
</article>
</template>

<script>
import CoachForm from '@/components/coaches/CoachForm.vue';
import { mapActions } from 'vuex'
export default {
    components: {
        CoachForm
    },
    methods: {
        ...mapActions(['registerCoach']),
        saveData(data) {
            this.registerCoach(data)
            this.$router.replace('/coaches')
            /* when you use replace you cannot go back to the page which is good for scenarios like this */
        }
    }

}
</script>