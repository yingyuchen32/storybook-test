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
    '#d60c18';
  const linkedHoverColor = normalizeHex(hoverColor) || linkedColor;
  const linkedBgColor = normalizedBgColor || '#ffffff';

  return {
    borderColor: linkedColor,
    textColor: linkedColor,
    hoverColor: linkedHoverColor,
    bgColor: linkedBgColor,
  };
};

const applyProps = (element, props = {}) => {
  Object.entries(props).forEach(([key, value]) => {
    if (value === undefined || value === null) {
      return;
    }

    if (key === 'class' || key === 'className') {
      element.classList.add(...String(value).split(/\s+/).filter(Boolean));
      return;
    }

    if (key === 'style' && typeof value === 'string') {
      element.style.cssText += value;
      return;
    }

    if (key in element && !key.startsWith('data-') && !key.startsWith('aria-')) {
      element[key] = value;
      return;
    }

    if (typeof value === 'boolean') {
      if (value) {
        element.setAttribute(key, '');
      }
      return;
    }

    element.setAttribute(key, String(value));
  });
};

export const createButton = ({
  color = '#d60c18',
  hoverColor,
  bgColor,
  props = {},
  style = '',
  hovered = false,
  label = '展開更多',
  onClick,
}) => {
  const btn = document.createElement('button');
  const resolvedColors = resolveButtonColors({ color, hoverColor, bgColor });
  const disabledTextColor =
    mix(resolvedColors.textColor, resolvedColors.bgColor, 0.58) || resolvedColors.textColor;
  const disabledBorderColor =
    mix(resolvedColors.borderColor, resolvedColors.bgColor, 0.58) || resolvedColors.borderColor;
  const disabledBgColor = mix(resolvedColors.bgColor, '#ffffff', 0.2) || resolvedColors.bgColor;

  btn.type = 'button';
  btn.innerText = label;
  btn.dataset.hovered = hovered ? 'true' : 'false';
  btn.className = 'storybook-button';

  btn.style.setProperty('--button-border-color', resolvedColors.borderColor);
  btn.style.setProperty('--button-text-color', resolvedColors.textColor);
  btn.style.setProperty('--button-background-color', resolvedColors.bgColor);
  btn.style.setProperty('--button-hover-background-color', resolvedColors.hoverColor);
  btn.style.setProperty('--button-hover-color', pickReadableText(resolvedColors.hoverColor));
  btn.style.setProperty('--button-disabled-color', disabledTextColor);
  btn.style.setProperty('--button-disabled-border-color', disabledBorderColor);
  btn.style.setProperty('--button-disabled-background-color', disabledBgColor);

  if (style) {
    btn.style.cssText += style;
  }

  applyProps(btn, props);

  if (typeof onClick === 'function') {
    btn.addEventListener('click', onClick);
  }

  return btn;
};
