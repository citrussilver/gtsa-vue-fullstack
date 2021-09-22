<template>
<div id="flex-container">
    <div id="main-form">
        <div class="card border-primary">
            <div class="card-header white">Sign Up</div>
            <div class="card-body">
                <form @submit.prevent="handleSubmit">
                    <div class="wrapper">
                        <div class="field-group">
                            <input type="text" placeholder="Username" v-model="username" required>
                            <div class="line"></div>
                        </div>
                        <div class="field-group">
                            <input type="password" placeholder="Password" v-model="password" required>
                            <div class="line"></div>
                        </div>
                        <div class="field-group">
                            <input type="password" placeholder="Confirm Password" v-model="conf_password" required>
                            <div class="line"></div>
                        </div>
                    </div>
                    <div v-if="error" class="error">{{ error }}</div>
                    <button type="submit" class="btn btn-outline-success styled-button">Sign Up</button>
                    <!-- <button disabled>Loading</button> -->
                </form>
            </div>
        </div>
        
    </div>
</div>
</template>

<script>
import { ref } from 'vue'
import config from '../../config'

export default {
    setup() {

        let username = ref('')
        let password = ref('')
        let conf_password = ref('')

        const handleSubmit = async () => {
            console.log('Sign Up clicked.')
            console.log(password.value, conf_password.value)
            await fetch(`${config.apiUrl}/signup`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: username.value,
                    password: password.value,
                    conf_password: conf_password.value
                }),
            });
        }

        return { username, password, handleSubmit }
    }
}
</script>

<style scoped>

#main-form {
    width: 30%;
}

</style>