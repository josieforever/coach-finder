<template>
    <section>
        <base-card>
        <h2>Page not Found</h2>
        <p>This page could not be found - maybe check out all our <router-link to="/coaches">coaches</router-link> </p>
        <div v-for="data in data" :key="data" ></div>
        </base-card>
    </section>
</template>

<script>
export default {
    data() {
        return {
            data: []
        }
    },
    created() {
        this.displayJson()
    }
    ,
    methods: {
        async displayJson() {
            const response = await fetch('http://localhost/demo/mySQL/login_read.php')
            const responseData = await response.json()
            console.log(responseData)
            this.data = responseData
        }
    }
}
</script>