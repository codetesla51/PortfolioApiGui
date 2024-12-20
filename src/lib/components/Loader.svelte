<script>
  export let isLoading = true;
</script>

{#if isLoading}
  <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div class="loader"></div>
  </div>
{/if}

<style>
  .loader {
    border: 4px solid #f3f3f3; /* Light gray */
    border-top: 4px solid #2563eb; /* Tailwind blue-600 */
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>