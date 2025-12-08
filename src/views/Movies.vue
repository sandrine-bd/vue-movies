<script setup>
    import { ref, onMounted, watch } from 'vue'
    import api from '@/api/axios'
    import Pagination from '@/components/Pagination.vue'

    const movies = ref([])
    const page = ref(1)
    const itemsPerPage = 12
    const totalItems = ref(0)
    const title = ref("")

    const fetchMovies = async () => {
        const response = await api.get("/movies", {
            params: {
                page: page.value,
                itemsPerPage,
                title: title.value || undefined,
            },
        });

        movies.value = response.data["hydra:member"];
        totalItems.value = response.data["hydra:totalItems"];
    };

    watch([page, title], fetchMovies);
    onMounted(fetchMovies);
</script>