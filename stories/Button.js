import './button.css';

export const createButton = ({
  tone = 'neutral',
  disabled = false,
  hovered = false,
  label = '展開更多',
  onClick,
}) => {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.innerText = label;
  btn.disabled = disabled;
  btn.dataset.hovered = hovered ? 'true' : 'false';

  if (typeof onClick === 'function') {
    btn.addEventListener('click', onClick);
  }

  btn.className = [
    'storybook-button',
    `storybook-button--${tone}`,
    'storybook-button--outline',
  ].join(' ');

  return btn;
};
