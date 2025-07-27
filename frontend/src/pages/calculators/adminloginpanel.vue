<template>
    <!-- <BaseHeader /> -->
    <div class="container mx-auto flex justify-center items-center w-full min-h-screen">
        <div class="login-box">
            <h2>Admin belépés</h2>
            <form @submit.prevent="onLogin" class="text-black">
                <input v-model="username" placeholder="Felhasználónév" required autocomplete="username" />
                <input v-model="password" type="password" placeholder="Jelszó" required
                    autocomplete="current-password" />
                <button type="submit">Bejelentkezés</button>
            </form>
            <div v-if="feedback" :class="{ 'success': loginSuccess, 'error': !loginSuccess }">
                {{ feedback }}
            </div>
        </div>
    </div>
    <BaseFooter />
</template>

<script setup>
import { ref } from 'vue'
import BaseFooter from '@components/layout/BaseFooter.vue'
import { http } from '@utils/http.mjs'

const username = ref('')
const password = ref('')
const feedback = ref('')
const loginSuccess = ref(false)

const onLogin = async () => {
    feedback.value = ''
    loginSuccess.value = false
    try {
        const response = await http.post('/admin/login', {
            username: username.value,
            password: password.value
        });
        if (response.data.success && response.data.token) {
            feedback.value = 'Sikeres bejelentkezés!';
            loginSuccess.value = true;
            sessionStorage.setItem('adminToken', response.data.token);
        } else {
            feedback.value = 'Bejelentkezés sikertelen!';
            loginSuccess.value = false;
        }
    } catch (e) {
        feedback.value = 'Bejelentkezés sikertelen!'
        loginSuccess.value = false
    }
}
</script>

<style scoped>
.login-box {
    max-width: 320px;
    background: #232936;
    color: #fff;
    padding: 1.3rem 1.6rem;
    border-radius: 8px;
    margin: 40px auto;
    box-shadow: 0 2px 12px #23293644;
}

input,
button {
    margin-top: 0.6rem;
    width: 100%;
    padding: 0.55rem;
    border-radius: 4px;
    border: none;
}

button {
    background: #2ca5a9;
    color: #fff;
    font-weight: bold;
    cursor: pointer;
    margin-top: 1.1rem;
}

.success {
    color: #43ef5e;
    margin-top: 12px;
}

.error {
    color: #fa6060;
    margin-top: 12px;
}
</style>