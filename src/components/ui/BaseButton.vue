<template>
    <button v-if="!link" :class="mode">
        <slot></slot>
    </button>
    <router-link v-else :to="to" :class="mode">
        <slot></slot>
    </router-link>
</template>

<script>
export default {
//here we want to use the object form of receiving props so we can be more explicit on the props we receive
/* we are going to receive a link prop which should signal to us whether we want to render a button or if 
we want to render a link and will depend on the truthiness of the link prop default value*/
props: {
    link: {
        type: Boolean,
        required: false,
        default: false
    }, /* by setting the link.default to false we render a button until link.default === true */
    to: {
        type: String,
        required: false,
        default: '/'
    },/* the to prop becomes useful when we do render a router link so we can dynamically bind the to attribute on the 
        router-link tag to the value of the to prop */
    mode: {
        type: String,
        required: false,
        default: null
    }/* the mode prop allows us to the styling / the look of the button from outside */
}

}
</script>

<style scoped>
button,
a {
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  font: inherit;
  background-color: #3a0061;
  border: 1px solid #3a0061;
  color: white;
  cursor: pointer;
  border-radius: 30px;
  margin-right: 0.5rem;
  display: inline-block;
}

a:hover,
a:active,
button:hover,
button:active {
  background-color: #270041;
  border-color: #270041;
}

.flat {
  background-color: transparent;
  color: #3a0061;
  border: none;
}

.outline {
  background-color: transparent;
  border-color: #270041;
  color: #270041;
}

.flat:hover,
.flat:active,
.outline:hover,
.outline:active {
  background-color: #edd2ff;
}
</style>