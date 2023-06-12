<template>
    <article>
    <section>
        <base-card>
            <h2>{{ fullName }}</h2>
            <h3>${{ rate }}/hour</h3>
        </base-card>
    </section>
    <section>
        <base-card>
            <header>
                <h2>Interested? Reach out now!</h2>
                <base-button link :to="contactLink" @click="toggleClick">Contact</base-button>
            </header>
            <router-view v-slot="slotProps">
                <transition name="form" mode="out-in">
                    <component :is="slotProps.Component"></component>
                </transition>
            </router-view>
        </base-card>
    </section>
    <section>
        <base-card>
            <base-badge v-for="area in areas" :key="area" :type="area" :title="area"></base-badge>
            <p>{{ description }}</p>
        </base-card>
    </section>
</article>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    props: ['id'],
    computed : {
       ...mapGetters(['coaches']),
       fullName() {
        return this.selectedCoach.firstName + ' ' + this.selectedCoach.lastName
       },
       contactLink() {
        return '/coaches/' + this.id + '/contact'
       },
       areas() {
        return this.selectedCoach.areas
       },
       rate() {
        return this.selectedCoach.hourlyRate
       } ,
       description() {
        return this.selectedCoach.description
       }
    },
    data() {
        return {
            selectedCoach: {},
            isClicked: false
        }
    },
    created() {
        this.selectedCoach = this.coaches.find(coach => {
            return coach.id === this.id
        })
    },
    methods: {
        toggleClick() {
            this.isClicked = !this.isClicked
        }
    }
}
</script>

<style scoped>
.form-enter-from {
  opacity: 0;
  transform: translateY(-30px)
}

.form-leave-to {
  opacity: 0;
  transform: translateY(30px)
}

.form-enter-active {
  transition: all 0.3s ease-out;
}

.form-leave-active {
  transition: all 0.3s ease-in;
}

.form-enter-to, .route-leave-from {
  opacity: 1;
  transform: translateY(0)
}
</style>