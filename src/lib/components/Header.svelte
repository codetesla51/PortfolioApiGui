<script lang="ts">
  import { page } from '$app/stores'; 
  import { goto } from '$app/navigation'; 
  import Logo from "../../assets/server-path-svgrepo-com.svg"
  export let toggleTheme: () => void;

  let isLoggedIn = false;

  $: {
    isLoggedIn = $page.url.pathname.startsWith('/dashboard');
  }

  function logout() {
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('apiKey');
    goto('/login'); 
  }
</script>

<header class="bg-white dark:bg-gray-800 shadow-md fixed w-full z-10 transition-colors duration-300">
  <nav class="container mx-auto px-6 py-4">
    <div class="flex justify-between items-center">
      <!-- Logo and Title -->
      <a href="/" class="flex items-center text-2xl sm:text-xl md:text-2xl lg:text-3xl font-bold text-blue-600 dark:text-blue-400 space-x-2">
        <img src={Logo} alt="PortfolioAPI Logo" class="h-8 w-8" /> <!-- Adjust height and width -->
        <span>PortfolioAPI</span>
      </a>

      <!-- Navigation and Actions -->
      <div class="flex items-center space-x-6">
        <a href="https://github.com/codetesla51/PortFolioAPI" class="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition duration-300 text-sm sm:text-base">
          Docs
        </a>
        {#if isLoggedIn}
          <button on:click={logout} class="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 text-sm sm:text-base">
            Logout
          </button>
        {:else}
          <a href="/login" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 text-sm sm:text-base">
            Login
          </a>
        {/if}
        <button on:click={toggleTheme} class="focus:outline-none" aria-label="Toggle theme">
          <i class="fas fa-adjust text-gray-700 dark:text-gray-300 text-sm sm:text-base"></i>
        </button>
      </div>
    </div>
  </nav>
</header>