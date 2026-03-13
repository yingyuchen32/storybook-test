<script>
  import './button.css';

  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

  const normalizeHex = (value) => {
    if (!value || typeof value !== 'string') {
      return null;
    }

    const hex = value.trim().replace('#', '');

    if (/^[0-9a-fA-F]{3}$/.test(hex)) {
      return `#${hex
        .split('')
        .map((char) => char + char)
        .join('')
        .toLowerCase()}`;
    }

    if (/^[0-9a-fA-F]{6}$/.test(hex)) {
      return `#${hex.toLowerCase()}`;
    }

    return null;
  };

  const hexToRgb = (hex) => {
    const normalized = normalizeHex(hex);

    if (!normalized) {
      return null;
    }

    return {
      r: Number.parseInt(normalized.slice(1, 3), 16),
      g: Number.parseInt(normalized.slice(3, 5), 16),
      b: Number.parseInt(normalized.slice(5, 7), 16),
    };
  };

  const rgbToHex = ({ r, g, b }) =>
    `#${[r, g, b]
      .map((channel) => clamp(Math.round(channel), 0, 255).toString(16).padStart(2, '0'))
      .join('')}`;

  const mix = (hex, targetHex, weight) => {
    const source = hexToRgb(hex);
    const target = hexToRgb(targetHex);

    if (!source || !target) {
      return '';
    }

    return rgbToHex({
      r: source.r * (1 - weight) + target.r * weight,
      g: source.g * (1 - weight) + target.g * weight,
      b: source.b * (1 - weight) + target.b * weight,
    });
  };

  const getRelativeLuminance = (hex) => {
    const rgb = hexToRgb(hex);

    if (!rgb) {
      return 0;
    }

    const transform = (channel) => {
      const value = channel / 255;
      return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
    };

    return 0.2126 * transform(rgb.r) + 0.7152 * transform(rgb.g) + 0.0722 * transform(rgb.b);
  };

  const getContrastRatio = (foreground, background) => {
    const foregroundLuminance = getRelativeLuminance(foreground);
    const backgroundLuminance = getRelativeLuminance(background);
    const lighter = Math.max(foregroundLuminance, backgroundLuminance);
    const darker = Math.min(foregroundLuminance, backgroundLuminance);

    return (lighter + 0.05) / (darker + 0.05);
  };

  const pickReadableText = (background) =>
    getContrastRatio('#000000', background) >= getContrastRatio('#ffffff', background)
      ? '#000000'
      : '#ffffff';

  const resolveButtonColors = ({ color, hoverColor, bgColor }) => {
    const normalizedBgColor = normalizeHex(bgColor);
    const linkedColor =
      normalizeHex(color) ||
      normalizeHex(hoverColor) ||
      (normalizedBgColor ? pickReadableText(normalizedBgColor) : null) ||
      '#272727';

    return {
      borderColor: linkedColor,
      textColor: linkedColor,
      hoverColor: normalizeHex(hoverColor) || linkedColor,
      bgColor: normalizedBgColor || '#ffffff',
    };
  };

  const sanitizeProps = (props = {}) => {
    const nextProps = { ...props };

    delete nextProps.class;
    delete nextProps.className;
    delete nextProps.style;
    delete nextProps.type;
    delete nextProps.disabled;

    return nextProps;
  };

  export let color = 'var(--base-text-color, #272727)';
  export let hoverColor = '';
  export let bgColor = '';
  export let disabled = false;
  export let props = {};
  export let style = '';
  export let hovered = false;
  export let label = '展開更多';
  export let onClick = undefined;

  $: resolvedColors = resolveButtonColors({ color, hoverColor, bgColor });
  $: resolvedDisabled = props.disabled ?? disabled;
  $: rootClassName = ['storybook-button', props.class, props.className].filter(Boolean).join(' ');
  $: rootStyle = [
    `--button-border-color: ${resolvedColors.borderColor}`,
    `--button-text-color: ${resolvedColors.textColor}`,
    `--button-background-color: ${resolvedColors.bgColor}`,
    `--button-hover-background-color: ${resolvedColors.hoverColor}`,
    `--button-hover-color: ${pickReadableText(resolvedColors.hoverColor)}`,
    `--button-disabled-color: ${
      mix(resolvedColors.textColor, resolvedColors.bgColor, 0.58) || resolvedColors.textColor
    }`,
    `--button-disabled-border-color: ${
      mix(resolvedColors.borderColor, resolvedColors.bgColor, 0.58) || resolvedColors.borderColor
    }`,
    `--button-disabled-background-color: ${
      mix(resolvedColors.bgColor, '#ffffff', 0.2) || resolvedColors.bgColor
    }`,
    props.style,
    style,
  ]
    .filter(Boolean)
    .join('; ');
  $: elementProps = sanitizeProps(props);

  const handleClick = (event) => {
    if (typeof onClick === 'function') {
      onClick(event);
    }
  };
</script>

<button
  type={props.type ?? 'button'}
  class={rootClassName}
  data-hovered={hovered ? 'true' : 'false'}
  disabled={resolvedDisabled}
  style={rootStyle}
  on:click={handleClick}
  {...elementProps}
>
  {label}
</button>
