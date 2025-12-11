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
      <p>© {{ new Date().getFullYear() }} Passion Cinéma</p>
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
  position: sticky;
  top: 0;
  z-index: 1000;
  background: #1a1a1a;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.app-main {
  flex: 1;
  width: 100%;
  background: #f8f9fa;
}

.app-footer {
  text-align: center;
  padding: 2rem;
  background: #1a1a1a;
  color: #999;
  font-size: 0.9rem;
  margin-top: auto;
}
</style>