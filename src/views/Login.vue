<script setup>
import { ref } from "vue"
import api from '@/api/axios'
import { useRouter } from "vue-router"

const email = ref("")
const password = ref("")
const router = useRouter()
const error = ref("")

const login = async () => {
  try {
    const response = await api.post("/auth", {
      email: email.value,
      password: password.value
    })

    localStorage.setItem("token", response.data.token)
    router.push("/")
  } catch (e) {
    error.value = "Identifiants incorrects"
  }
}
</script>