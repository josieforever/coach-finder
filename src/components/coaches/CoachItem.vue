<template>
    <li>
        <h3>{{ fullName }}</h3>
        <h4>${{ rate }}/hour</h4>
        <div>
            <base-badge v-for="area in areas" :key="area" :type="area" :title="area"></base-badge>
        </div>
        <div class="actions">
            <base-button mode="outline" link :to="coachContactLink">Contact</base-button>
            <base-button link :to="coachDetailsLink">view Details</base-button>
        </div>
    </li>
</template>

<script>
export default {
    name: 'coachItem',
    props: ['id', 'firstName', 'lastName', 'rate', 'areas'],
    computed: {
        fullName() { 
            return this.firstName + ' ' + this.lastName
        },
        // to prevent the id from being hard coded into the link we have to use a computed property to get accees to the dynamic value in this.id
        coachDetailsLink() {
            return '/coaches/' + this.id
        },
        coachContactLink() {
            return '/coaches/' + this.id + '/contact' 
        } 
    }


}
</script>

<style scoped>
li {
  margin: 1rem 0;
  border: 1px solid #424242;
  border-radius: 12px;
  padding: 1rem;
}

h3 {
  font-size: 1.5rem;
}

h3,
h4 {
  margin: 0.5rem 0;
}

div {
  margin: 0.5rem 0;
}

.actions {
  display: flex;
  justify-content: flex-end;
}

</style>