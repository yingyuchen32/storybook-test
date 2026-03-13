<script>
  import './input.css';
  import './select.css';
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

  export let color = 'var(--base-text-color, #272727)';
  export let props = {};
  export let style = '';
  export let labelPosition = 'before';
  export let label = '';
  export let bindFn = undefined;
  export let options = [];

  let selectElement;

  $: resolvedColor = color || 'var(--base-text-color, #272727)';
  $: wrapperClassName = ['storybook-select', props.class, props.className].filter(Boolean).join(' ');
  $: wrapperStyle = [`--input-color: ${resolvedColor}`, style].filter(Boolean).join('; ');
  $: selectProps = sanitizeProps(props);
  $: selectId = props.id || `storybook-select-${labelPosition}`;
  $: selectValue = props.value ?? options[0]?.value ?? '';
  $: if (selectElement && typeof bindFn === 'function') {
    bindFn(selectElement);
  }

  const forward = (type, event) => {
    dispatch(type, event.currentTarget);
  };
</script>

<div class={wrapperClassName} style={wrapperStyle}>
  {#if label && labelPosition === 'before'}
    <label class="storybook-select__label" for={selectId}>{label}</label>
  {/if}

  <div class="storybook-select__control">
    <select
      bind:this={selectElement}
      {...selectProps}
      id={selectId}
      class="storybook-select__field"
      value={selectValue}
      on:change={(event) => forward('change', event)}
      on:focus={(event) => forward('focus', event)}
      on:blur={(event) => forward('blur', event)}
    >
      {#each options as option}
        <option value={option.value}>{option.label}</option>
      {/each}
    </select>
    <span class="storybook-select__caret" aria-hidden="true">▼</span>
  </div>

  {#if label && labelPosition === 'after'}
    <label class="storybook-select__label" for={selectId}>{label}</label>
  {/if}
</div>
