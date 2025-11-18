<script setup lang="ts">
</script>

<template>
  <div class="welcome">
    <h1>Welcome 🎉</h1>
    <p class="tagline">You're building something new — and that's always exciting.</p>

    <div class="card">
      <h2>Vue + Laravel API</h2>
      <p>
        This page is the start of your journey.
        You're now connecting Vue with your Laravel project and learning by doing — the best way to grow.
      </p>
      <p>
        Explore the Vue documentation here:<br />
        <a href="https://vuejs.org/" target="_blank" rel="noopener">vuejs.org</a>
      </p>
    </div>

    <footer>
      <small>Keep going. Small steps turn into real skill ✨</small>
    </footer>
  </div>
</template>

<style scoped>
.welcome {
  max-width: 700px;
  margin: 4rem auto;
  padding: 2rem;
  text-align: center;
  font-family: "Inter", sans-serif;
  color: #333;
}

h1 {
  font-size: 2.6rem;
  margin-bottom: 0.5rem;
}

.tagline {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.8;
}

.card {
  background: #f5f8ff;
  padding: 1.8rem;
  border-radius: 12px;
  border: 1px solid #dbe3ff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  margin-bottom: 2rem;
}

.card h2 {
  margin-bottom: 0.5rem;
  font-size: 1.6rem;
}

.card a {
  color: #3e7bff;
  text-decoration: none;
  font-weight: 600;
}

.card a:hover {
  text-decoration: underline;
}

footer {
  margin-top: 2rem;
  opacity: 0.7;
}
</style>
