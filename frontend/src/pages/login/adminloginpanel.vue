<template>
    <div class="container mx-auto flex justify-center items-center w-full min-h-screen">
        <div class="login-box space-y-2">
            <h2 class="text-base lg:text-xl font-semibold">Admin belépés</h2>
            <form @submit.prevent="handleLogin()" class="text-black lg:space-y-4 font-semibold">
                <input v-model="username" placeholder="Felhasználónév" required autocomplete="username" />
                <input v-model="password" type="password" placeholder="Jelszó" required
                    autocomplete="current-password" />
                <button type="submit" :disabled="loading">
                    {{ loading ? 'Bejelentkezés...' : 'Bejelentkezés' }}
                </button>
            </form>
            
            <div v-if="feedback" class="feedback" :class="{
                'success': feedback.includes('Sikeres'),
                'error': !feedback.includes('Sikeres')
            }">
                {{ feedback }}
            </div>
        </div>
    </div>
    <BaseFooter />
</template>

<script setup>
import { ref } from 'vue'
import BaseFooter from '@components/layout/BaseFooter.vue'
import { useRouter } from "vue-router"
import { useAuthStore } from '@stores/AuthStore'

const router = useRouter()
const authStore = useAuthStore()

const username = ref('');
const password = ref('');
const feedback = ref('');
const loading = ref(false)
async function handleLogin() {
    if (!username.value || !password.value) {
        feedback.value = 'Minden mező kitöltése kötelező!'
        return
    }

    loading.value = true
    feedback.value = ''

    try {
        const result = await authStore.login(username.value, password.value)
        
        if (result.success) {
            feedback.value = 'Sikeres bejelentkezés!'
            
            setTimeout(() => {
                router.push('/admin-control-panel')
            }, 1000)
        }
    } catch (error) {
        console.error('Login error:', error)
        feedback.value = error.message || 'Bejelentkezés sikertelen!'
    } finally {
        loading.value = false
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

input, button {
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

button:hover:not(:disabled) {
    background: #228a8e;
    transition: all 150ms ease-in-out;
}

button:disabled {
    background: #6b7280;
    cursor: not-allowed;
}

.feedback {
    margin-top: 1rem;
    padding: 0.75rem;
    border-radius: 5px;
    text-align: center;
    font-weight: 500;
}

.feedback.success {
    background-color: #d4edda;
    color: #155724;
    border: 1px solid #c3e6cb;
}

.feedback.error {
    background-color: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
}
</style>