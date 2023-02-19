<template>
<div id="flex-container">
    <div id="main-form">
        <div class="card border-primary">
            <div class="card-header white">Login</div>
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
                    </div>
                    <div v-if="error" class="error">{{ error }}</div>
                    <button type="submit" class="btn btn-outline-success styled-button">Log in</button>
                    <!-- <button disabled>Loading</button> -->
                </form>
            </div>
        </div>
        
    </div>
</div>
</template>

<script setup>
import config from '../../config'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useActions } from 'vuex-composition-helpers/dist'

const router = useRouter()

const { setUser } = useActions(['setUser'])
const { setToken } = useActions(['setToken'])

let username = ref('')
let password = ref('')

const handleSubmit = async () => {

    const response = await fetch(`${config.apiUrl}/auth/login`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: username.value,
            password: password.value,
        }),
    })

    if(response.status == 403) {
        console.log(response.status);
    } else {
        const { user, token } = await response.json()
    
        setUser(user)
        setToken(token)
        router.push('/')
    }


}

</script>

<style scoped>

#main-form {
    width: 30%;
}

</style>