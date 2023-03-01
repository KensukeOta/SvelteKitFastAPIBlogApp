<script lang="ts">
	import { enhance } from "$app/forms";
	import EmailArea from "../molecules/EmailArea.svelte";
  import NameArea from "../molecules/NameArea.svelte";
	import PasswordArea from "../molecules/PasswordArea.svelte";
	import PasswordConfirmArea from "../molecules/PasswordConfirmArea.svelte";

  export let name: FormDataEntryValue;
  export let email: FormDataEntryValue;
  export let errors: any;

  const nameProps = {
    type: "text",
    name: "name",
    id: "name",
    value: `${name}`,
    placeholder: "username",
    className: "block border mx-auto",
  };

  const emailProps = {
    type: "email",
    name: "email",
    id: "email",
    value: `${email}`,
    placeholder: "email",
    className: "block border mx-auto",
  };

  const passwordProps = {
    type: "password",
    name: "password",
    id: "password",
    value: "",
    placeholder: "password",
    className: "block border mx-auto",
  };

  const passwordConfirmProps = {
    type: "password",
    name: "password_confirmation",
    id: "password_confirmation",
    value: "",
    placeholder: "confirm password",
    className: "block border mx-auto",
  };
</script>

<form method="POST" class="h-full flex items-center justify-center text-center relative" use:enhance>
  <fieldset class="border-2 border-blue-400 p-4 pt-2 rounded-3xl">
    <legend class="font-bold px-2">
      <h1>Signup</h1>
    </legend>
    {#if errors}
      {#each errors.detail as error}
        <p class="text-red-500">{error.msg}</p>
      {/each}
    {/if}
      <NameArea {...nameProps} />
      <EmailArea {...emailProps} />
      <PasswordArea {...passwordProps} />
      <PasswordConfirmArea {...passwordConfirmProps} />
      <button type="submit" class="border bg-blue-400 rounded-3xl w-1/3 text-white py-2 mt-2 hover:bg-blue-300">Signup</button>
  </fieldset>
</form>