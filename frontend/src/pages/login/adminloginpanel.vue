<template>
    <!-- <BaseHeader /> -->
    <div class="container mx-auto flex justify-center items-center w-full min-h-screen">
        <div class="login-box space-y-2">
            <h2 class="text-base lg:text-xl font-semibold">Admin belépés</h2>
            <form @submit.prevent="onLogin" class="text-black lg:space-y-4 font-semibold">
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
import { localdev } from '@utils/localdev.mjs'
import { useRouter } from "vue-router";
const router = useRouter();

const username = ref('')
const password = ref('')
const feedback = ref('')
const loginSuccess = ref(false)

const onLogin = async () => {
    feedback.value = ''
    loginSuccess.value = false
    try {
        console.log("Küldött token:", import.meta.env.VITE_ADMIN_API_TOKEN);
        const response = await http.post('/admin/login', {
            username: username.value,
            password: password.value
        },
            {
                headers: {
                    'Authorization': `Bearer ${import.meta.env.VITE_ADMIN_API_TOKEN}`
                }
            },
        );
        if (response.data.success) {
            feedback.value = 'Sikeres bejelentkezés!';
            loginSuccess.value = true;
            sessionStorage.setItem('adminToken', import.meta.env.VITE_ADMIN_API_TOKEN)
            router.push("/admin-control-panel");
        } else {
            feedback.value = 'Bejelentkezés sikertelen!';
            loginSuccess.value = false;
        }
    } catch (e) {
        feedback.value = 'Bejelentkezés sikertelen!'
        loginSuccess.value = false
        console.error(e);
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

button:hover {
    background: #228a8e;
    color: #fff;
    font-weight: bold;
    cursor: pointer;
    margin-top: 1.1rem;
    transition: all 150ms ease-in-out;
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