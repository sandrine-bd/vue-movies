<template>
  <div id="app" class="app-container">

    <!-- HEADER / NAVBAR -->
     <header class="app-header">
      <Navbar />
     </header>

     <!-- MAIN CONTENT -->
      <main class="app-main">
        <router-view />
      </main>

      <!-- FOOTER -->
       <footer class="app-footer">
        <p>© {{ new Date().getFullYear() }} - MovieApp </p>
       </footer>

  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'

export default {
  components: {
    Navbar
  }
}
</script>

<style scoped>
  .app-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  .app-header {
    background: #111;
    color: white;
    padding: 1rem 2rem;
    box-shadow: 0 2px 4px rgba(0,0,0,0.3);
  }

  /* le contenu principal s'étent naturellement */
  .app-main {
    flex: 1;
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
  }

  .app-footer {
    text-align: center;
    padding: 1rem;
    background: #111;
    color: #aaa;
    font-size: 0.9rem;
  }
</style>
