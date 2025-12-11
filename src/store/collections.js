import { defineStore } from 'pinia'
import api from '@/api/axios'
import { ref } from 'vue'

export const useCollectionsStore = defineStore('collections', () => {
    const collections = ref([])

    const fetchUserCollections = async (userId) => {
        const res = await api.get(`/users/${userId}/collections`)
        collections.value = res.data.member || []
    }

    const createCollection = async (data) => {
        const res = await api.post('/custom_lists', data)
        collections.value.push(res.data)
    }

    const deleteCollection = async (id) => {
        await api.delete(`/custom_lists/${id}`)
        collections.value = collections.value.filter(c => c.id !== id)
    }

    return { collections, fetchUserCollections, createCollection, deleteCollection }
})