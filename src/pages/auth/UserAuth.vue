<template>
    <div>
        <base-dialog :show="!!error" title="An error occurred"  @close="handleError">
            <p>{{ error }}</p>
        </base-dialog>
        <base-dialog fixed :show="isLoading" title="Authenticating..." @close="handleError">
            <base-spinner></base-spinner>
        </base-dialog>
        <base-card>
            <form @submit.prevent="submitForm">
                <div class="form-control">
                    <label for="email">E-Mail</label>
                    <input type="email" id="email" v-model.trim="email"/>
                </div>
                <div class="form-control">
                    <label for="password">Password</label>
                    <input type="password" id="password" v-model="password"/>
                </div>
                <article class="button-class">
                    <p v-if="!formIsValid">Please enter a valid Email and password</p>
                    <base-button >{{ submitButtonCaption }}</base-button>
                    <base-button type="button" mode="flat" @click="switchAuthMode">{{ switchModeButtonCaption }}</base-button>
                </article>
            </form>
        </base-card>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    data() {
        return {
            email: '',
            password: '',
            formIsValid: true,
            mode: 'login',
            isLoading: false,
            error: null
        }
    },
    computed: {
        ...mapGetters(['isCoach']),
            submitButtonCaption() {
                if (this.mode === 'login') {
                    return   'Login'    
                } else {
                    return 'SignUp'
                }
            },
            switchModeButtonCaption() {
                if (this.mode === 'login') {
                    return   'SignUp Instead'    
                } else {
                    return 'Login instead'
                }
            }
        },
    methods: {
        ...mapActions(['login', 'signup']),
        async submitForm() {
            this.formIsValid = true
            if (this.email === '' || !this.email.includes('@') || this.password.length < 6) {
                this.formIsValid = false
                return
            }
            const actionPayload = {
                    email: this.email,
                    password: this.password
                }
            this.isLoading = true
            try {
                if (this.mode === 'login') {
                    await this.login(actionPayload)
                } else {
                    await this.signup(actionPayload)
                }
            if (this.isCoach) {
                this.$router.replace('/coaches')
                return
            } 
            const redirectUrl = '/' + (this.$route.query.redirect || 'coaches')
            this.$router.replace(redirectUrl)
            } catch (err) {
                this.error = err.message || 'Failed to auhtnticate, try later'
            }
            
            this.isLoading = false

        },
        switchAuthMode() {
            if (this.mode === 'login') {
                this.mode = 'signup'
            } else {
                this.mode = 'login'
            }
        },
        handleError() {
            this.error = null
        }
    }
}
</script>

<style scoped>
form {
  margin: 1rem;
  border-radius: 12px;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}

.button-class {
    height: 7rem;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;

}
</style>