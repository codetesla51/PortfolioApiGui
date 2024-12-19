<script lang="ts">
  import { goto } from '$app/navigation';

  let isLogin = true;
  let email = '';
  let password = '';
  let username = '';
  let error = '';
  let passwordVisible = false;

  // Toggle password visibility
  function togglePassword() {
    passwordVisible = !passwordVisible;
  }

  // Handle form submission
  async function handleSubmit() {
    // Client-side validation
    if (!email || !password || (!isLogin && !username)) {
      error = "All fields are required";
      return;
    }

    const endpoint = isLogin ? 'http://localhost:8000/login' : 'http://localhost:8000/register';
    const body = isLogin ? { email, password } : { email, password, name: username };

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      const data = await response.json();

      if (response.ok) {
        sessionStorage.setItem('username', data.username);
        sessionStorage.setItem('apiKey', data.api_key);
        sessionStorage.setItem('email', data.email);
        goto('/dashboard');
      } else {
        error = data.message || 'An error occurred';
      }
    } catch (err) {
      error = 'An error occurred. Please try again.';
    }
  }
</script>

<svelte:head>
  <title>{isLogin ? 'Login' : 'Register'} - PortfolioAPI</title>
</svelte:head>

<div class="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
  <div class="max-w-md w-full space-y-8">
    <div>
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
        {isLogin ? 'Sign in to your account' : 'Create a new account'}
      </h2>
    </div>
    <form class="mt-8 space-y-6" on:submit|preventDefault={handleSubmit}>
      <input type="hidden" name="remember" value="true">
      <div class="rounded-md shadow-sm -space-y-px">
        <div>
          <label for="email-address" class="sr-only">Email address</label>
          <input id="email-address" name="email" type="email" required bind:value={email}
                 class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                 placeholder="Email address">
        </div>
        <div class="relative">
          <label for="password" class="sr-only">Password</label>
          <input id="password" name="password" type={passwordVisible ? 'text' : 'password'} required bind:value={password}
                 class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                 placeholder="Password">
          <button type="button" on:click={togglePassword} class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
            <i class={passwordVisible ? 'fas fa-eye-slash' : 'fas fa-eye'}></i>
          </button>
        </div>
        {#if !isLogin}
          <div>
            <label for="username" class="sr-only">Username</label>
            <input id="username" name="username" type="text" required bind:value={username}
                   class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                   placeholder="Username">
          </div>
        {/if}
      </div>

      {#if error}
        <div class="text-red-500 text-sm mt-2">{error}</div>
      {/if}

      <div>
        <button type="submit"
                class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300">
          {isLogin ? 'Sign in' : 'Register'}
        </button>
      </div>
    </form>
    <div class="text-center">
      <button on:click={() => isLogin = !isLogin} class="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">
        {isLogin ? 'Need an account? Register' : 'Already have an account? Sign in'}
      </button>
    </div>
  </div>
</div>