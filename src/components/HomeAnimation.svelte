<script>
  import { onMount } from 'svelte';
  import Linkedin from 'svelte-bootstrap-icons/lib/Linkedin.svelte';
  import Github from 'svelte-bootstrap-icons/lib/Github.svelte';
  import EnvelopeFill from 'svelte-bootstrap-icons/lib/EnvelopeFill.svelte';

  const socials = [
    {
      name: 'LinkedIn',
      icn: Linkedin,
      href: 'https://www.linkedin.com/in/joshua--davis/'
    },
    {
      name: 'GitHub',
      icn: Github,
      href: 'https://github.com/JershDervis'
    },
    {
      name: 'Email',
      icn: EnvelopeFill,
      href: 'mailto:me@joshdavis.codes'
    }
  ];

  let ready = false;
  onMount(() => (ready = true));
</script>

<div
  class={`absolute duration-700 transform ease-in transition-all ${
    ready ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
  }`}
>
  <h1
    class="text-5xl md:text-[5rem] leading-normal font-extrabold text-gray-200 text-center"
  >
    Josh <span class="text-blue-400">Davis</span> Codes
  </h1>
  <p class="text-2xl text-gray-300 text-center">
    A portfolio of my developer experience
  </p>
  <div class="flex justify-center">
    {#each socials as social, i}
      <a
        key={i}
        href={social.href}
        target="_blank"
        rel="noopener noreferrer"
        class="p-4 md:m-2 m-4 rounded-md hover:bg-gray-800 transform duration-200 hover:bg-opacity-100 transition-all hover:scale-110"
      >
        <svelte:component this={social.icn} class="w-6 h-6 text-gray-300" />
      </a>
    {/each}
  </div>
</div>
