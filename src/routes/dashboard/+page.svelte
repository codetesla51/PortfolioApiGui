<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
import Loader from "$lib/components/Loader.svelte"
  let username = '';
  let email = '';
  let apiKey = '';
  let isLoading = false;

  onMount(() => {
    username = sessionStorage.getItem('username') || '';
    email = sessionStorage.getItem('email') || '';
    apiKey = sessionStorage.getItem('apiKey') || '';

    if (!username || !email || !apiKey) {
      goto('/login');
    }
  });

async function generateNewApiKey() {
      isLoading = true; 

    try {
      const response = await fetch('https://api-portfolio-v1.vercel.app/updateAPIKEY', {
        method: 'PUT', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, api_key: apiKey }),
      });

      const data = await response.json();

      if (response.ok) {
        const newApiKey = data.new_api_key;
        sessionStorage.setItem('apiKey', newApiKey);
        apiKey = newApiKey; 
      } else {
        console.error('Failed to regenerate API key:', data.message);
      }
    } catch (err) {
      console.error('An error occurred while regenerating the API key:', err);
    }
    finally{
      isLoading=false;
    }
  }
  function copyToClipboard() {
    navigator.clipboard.writeText(apiKey).then(() => {
      alert('API key copied to clipboard!');
    });
  }
</script>

<svelte:head>
  <title>Dashboard - PortfolioAPI</title>
</svelte:head>
<Loader {isLoading} />

<div class="min-h-screen mt-10 bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
  <div class="max-w-3xl mx-auto">
    <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-8">Welcome, {username}!</h1>
    
    <div class="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg mb-8">
      <div class="px-4 py-5 sm:px-6">
        <h2 class="text-lg leading-6 font-medium text-gray-900 dark:text-white">Your API Key</h2>
      </div>
      <div class="border-t border-gray-200 dark:border-gray-700 px-4 py-5 sm:p-0">
        <dl class="sm:divide-y sm:divide-gray-200 dark:sm:divide-gray-700">
          <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">API Key</dt>
            <dd class="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2 flex justify-between items-center">
              <span class="font-mono">{apiKey}</span>
              <button on:click={copyToClipboard} class="ml-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300">
                Copy
              </button>
            </dd>
          </div>
        </dl>
      </div>
    </div>
    
    <div class="flex justify-center">
      <button on:click={generateNewApiKey} class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-300">
        Generate New API Key
      </button>
    </div>
  </div>
</div>

