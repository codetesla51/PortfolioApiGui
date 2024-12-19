<script lang="ts">
  import { goto } from '$app/navigation';
  import Hero from '$lib/components/Hero.svelte';
  import WhyUseSection from '$lib/components/WhyUseSection.svelte';

  function handleGetStarted() {
    goto('/login');
  }
</script>

<svelte:head>
  <title>PortfolioAPI - Showcase Your Projects</title>
</svelte:head>

<Hero {handleGetStarted} />
<WhyUseSection />

