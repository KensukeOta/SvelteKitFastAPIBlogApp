<script lang="ts">
	import Input from "../atoms/Input.svelte";
	import Label from "../atoms/Label.svelte";

  export let type: string;
  export let name: string;
  export let id: string;
  export let value: string | number;
  export let placeholder: string;
  export let className: string;

  const nameProps = {
    type,
    name,
    id,
    value,
    placeholder,
    className,
  };
</script>

<Label For="name">Username</Label>
<Input {...nameProps} />