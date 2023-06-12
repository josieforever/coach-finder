<template>
    <base-card>
        <h2>Find Your Coach</h2>
        <span class="filter-option">
            <input type="checkbox" id="frontend" checked @change="setFilter">
            <!-- we use @change so we can listen to the change event here on input -->
            <label for="frontend">Frontend</label>
        </span>
        <span class="filter-option">
            <input type="checkbox" id="backend" checked @change="setFilter">
            <!-- we use @change so we can listen to the change event here on input -->
            <label for="backend">Backend</label>
        </span>
        <span class="filter-option">
            <input type="checkbox" id="career" checked @change="setFilter">
            <!-- we use @change so we can listen to the change event here on input -->
            <label for="career">Career</label>
        </span>
    </base-card>
</template>

<script>
export default {
    /* We want to maanage the options the user chose or the filters the user chose */
    emits: ['change-filter'],
    data() {
        return {
            filters: {
                fontend: true,
                backend: true,
                career: true
            }/* As long as something is true coaches that have that area of expertise should  be shown*/
        }
    },
    methods: {
        /* setFilter receives the default event object since we have bound it to default DOM event*/
        /* now we can extract the id value of the event */
        /* we also get accesss to the value that shows if the element is checked */
        setFilter(event) {
            const inputId = event.target.id
            const isActive = event.target.checked
            const updatedFilters = {
                ...this.filters,
                [inputId]: isActive
            }
            this.filters = updatedFilters
            /* then we emit a custom event here to communicate with the parent component that there has been a change in the filters */
            this.$emit('change-filter', updatedFilters)
        }
    }
}
</script>

<style scoped>
h2 {
  margin: 0.5rem 0;
}

.filter-option {
  margin-right: 1rem;
}

.filter-option label,
.filter-option input {
  vertical-align: middle;
}

.filter-option label {
  margin-left: 0.25rem;
}

.filter-option.active label {
  font-weight: bold;
}
</style>