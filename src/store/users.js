import { defineStore } from 'pinia'
import api from '@/api/axios'
import { ref } from 'vue'

export const useUsersStore = defineStore('users', () => {
    const users = ref([])
    const followers = ref([])
    const following = ref([])

    const fetchUser = async (id) => {
        const res = await api.get(`/users/${id}`)
        return res.data
    }

    const fetchFollowers = async (userId) => {
        const res = await api.get(`/users/${userId}/followers`)
        followers.value = res.data.member || []
    }

    const fetchFollowing = async (userId) => {
        const res = await api.get(`/users/${userId}/follows`)
        following.value = res.data.member || []
    }

    const followUser = async (userId) => await api.post(`/users/${userId}/follows`)
    const unfollowUser = async (userId) => await api.delete(`/users/${userId}/follows`)

    return { users, followers, following, fetchUser, fetchFollowers, fetchFollowing, followUser, unfollowUser }
})