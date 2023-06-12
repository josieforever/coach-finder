<template>
  <the-header></the-header>
  <router-view v-slot="slotProps">
    <transition name="route" mode="out-in">
      <component :is="slotProps.Component"></component>
    </transition>
  </router-view>
</template>

<script>
import { mapActions } from 'vuex';
import TheHeader from './components/layout/TheHeader.vue'
export default {
  name: 'App',
  components: { TheHeader },
  methods: {
    ...mapActions(['tryLogin'])
  },
  created() {
    this.tryLogin()
  }
}
</script>

<style>
*{
  padding: 0;
  margin: 0;
  box-sizing: borderbox;
  font-family: 'Poppins', sans-serif;
}

body {
  margin: 0;
}

.route-enter-from {
  opacity: 0;
  transform: translateY(-30px)
}

.route-leave-to {
  opacity: 0;
  transform: translateY(30px)
}

.route-enter-active {
  transition: all 0.3s ease-out;
}

.route-leave-active {
  transition: all 0.3s ease-in;
}

.route-enter-to, .route-leave-from {
  opacity: 1;
  transform: translateY(0)
}

</style>
