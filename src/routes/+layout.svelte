<script lang="ts">
import "../app.css";
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import { browser } from '$app/environment';
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';

  // Store to manage the theme
  const theme = writable(browser ? localStorage.getItem('theme') || 'dark' : 'dark');

  // Initialize the theme based on localStorage or system preference
  onMount(() => {
    const unsubscribe = theme.subscribe(value => {
      if (browser) {
        localStorage.setItem('theme', value);
        if (value === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
    });

    // Cleanup when component is unmounted
    return unsubscribe;
  });

  // Function to toggle the theme
  function toggleTheme() {
    theme.update(currentTheme => currentTheme === 'dark' ? 'light' : 'dark');
  }
</script>

<div class="min-h-screen flex flex-col bg-white dark:bg-black text-gray-900 dark:text-white transition-colors duration-300">
  <!-- Pass toggleTheme as prop to Header -->
  <Header {toggleTheme} />
  <main class="flex-grow">
    <slot />
  </main>
  <Footer />
</div>

<style>
  :global(html) {
    transition: background-color 0.3s ease, color 0.3s ease;
  }
  :global(body) {
    @apply bg-white dark:bg-black text-gray-900 dark:text-white;
  }
</style>?