<script lang="ts">
  export let handleGetStarted: () => void;
  import IMG from "../../assets/e95474b7-c6db-482c-b661-261098dd9243.jpeg"
</script>

<section class="bg-gradient-to-br from-gray-100 to-white dark:from-gray-900 dark:to-black py-32 mt-16 transition-colors duration-300">
  <div class="container mx-auto px-6">
    <div class="flex flex-col lg:flex-row items-center justify-between">
      <div class="lg:w-1/2 text-center lg:text-left mb-10 lg:mb-0">
        <h1 class="leading-relaxed text-gradient text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-gray-900 dark:text-white leading-tight">
          Behind Every Great <span class="text-blue-600">Portfolio</span> is a Greater Backend
        </h1>
        <p class="leading-relaxed text-xl md:text-2xl mb-8 text-gray-700 dark:text-gray-300 max-w-2xl mx-auto lg:mx-0">
          Easily manage and display your projects with our powerful, developer-friendly API solution. Let our backend handle the heavy lifting while you focus on what matters.
        </p>
        <button
          on:click={handleGetStarted}
          class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition duration-300 text-lg"
        >
          Get Started
          <i class="fas fa-arrow-right ml-2"></i>
        </button>
      </div>
      <div class="lg:w-1/4 mt-10 lg:mt-0">
        <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-2xl">
          <img
            src={IMG}
            alt="PortfolioAPI Demo"
            class="w-[100%]  h-auto rounded-lg"
          />
        </div>
      </div>
    </div>
  </div>
</section>