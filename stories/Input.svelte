<script>
  import './input.css';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  const sanitizeProps = (props = {}) => {
    const nextProps = { ...props };

    delete nextProps.class;
    delete nextProps.className;
    delete nextProps.style;
    delete nextProps.value;
    delete nextProps.id;

    return nextProps;
  };

  export let color = 'black';
  export let props = {};
  export let style = '';
  export let labelPosition = 'before';
  export let label = '';
  export let bindFn = undefined;

  let inputElement;

  $: resolvedColor = color || 'black';
  $: wrapperClassName = ['storybook-input', props.class, props.className].filter(Boolean).join(' ');
  $: wrapperStyle = [`--input-color: ${resolvedColor}`, style].filter(Boolean).join('; ');
  $: inputProps = sanitizeProps(props);
  $: inputId = props.id || `storybook-input-${labelPosition}`;
  $: inputValue = props.value ?? '';
  $: if (inputElement && typeof bindFn === 'function') {
    bindFn(inputElement);
  }

  const forward = (type, event) => {
    dispatch(type, event.currentTarget);
  };
</script>

<div class={wrapperClassName} style={wrapperStyle}>
  {#if label && labelPosition === 'before'}
    <label class="storybook-input__label" for={inputId}>{label}</label>
  {/if}

  <input
    bind:this={inputElement}
    {...inputProps}
    id={inputId}
    class="storybook-input__field"
    value={inputValue}
    on:input={(event) => forward('input', event)}
    on:change={(event) => forward('change', event)}
    on:focus={(event) => forward('focus', event)}
    on:blur={(event) => forward('blur', event)}
  />

  {#if label && labelPosition === 'after'}
    <label class="storybook-input__label" for={inputId}>{label}</label>
  {/if}
</div>
