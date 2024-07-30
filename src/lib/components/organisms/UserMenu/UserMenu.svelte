<script lang="ts">
  import type { User } from "$lib/types/User";
  import { page } from "$app/stores";
  import { onMount, onDestroy } from "svelte";
  import UserIcon from "$lib/components/atoms/UserIcon/UserIcon.svelte";
  import DropdownMenu from "$lib/components/molecules/DropdownMenu/DropdownMenu.svelte";

  let isOpen = $state(false);
  let handleClickOutside: ((event: MouseEvent) => void) | undefined =  $state();

  const handleToggle = () => {
    isOpen = !isOpen;
  };

  if (typeof document !== 'undefined') {
    handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const userIconButton = document.querySelector('.user-icon-button');
      const dropdownMenu = document.querySelector('.dropdown-menu');

      if (userIconButton && !userIconButton.contains(target) && dropdownMenu && !dropdownMenu.contains(target)) {
        isOpen = false;
      }
    };
    
    onMount(() => {
      document.addEventListener('click', handleClickOutside!);
    });
  
    onDestroy(() => {
      document.removeEventListener('click', handleClickOutside!);
    });
  }

</script>

<div class="relative inline-block">
  <button class="user-icon-button" onclick={handleToggle}>
    <UserIcon user={$page.data.session?.user as User} />
  </button>

  {#if isOpen}
    <div class="dropdown-menu">
      <DropdownMenu />
    </div>
  {/if}
</div>
