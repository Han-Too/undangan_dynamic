import { onBeforeUnmount, watch } from 'vue';
import { shapes } from '../components/invitation/fx/shapes';

const reducedMotion = () => typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;
const SHAPES = ['sparkle', 'sparkle', 'dot', 'star5'];
const MAX_ALIVE = 28;

/**
 * Jejak kilau: butiran emas kecil muncul mengikuti kursor / jari, dan memercik saat diketuk.
 * Elemen dibuat langsung di DOM (bukan reaktif) agar ringan; tiap butir menghapus dirinya setelah animasi.
 */
export function usePointerTrail(root, enabled) {
  let last = 0;
  let alive = 0;

  function spawn(x, y, burst = false) {
    if (alive >= MAX_ALIVE) return;
    const el = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    el.setAttribute('viewBox', '0 0 24 24');
    el.setAttribute('fill', 'currentColor');
    el.setAttribute('class', 'inv-trail');
    el.innerHTML = shapes[SHAPES[Math.floor(Math.random() * SHAPES.length)]];
    const dist = burst ? 30 + Math.random() * 30 : 10 + Math.random() * 16;
    const ang = burst ? Math.random() * Math.PI * 2 : Math.PI / 2 + (Math.random() - 0.5) * 1.6;
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    el.style.setProperty('--s', `${(burst ? 8 : 6) + Math.random() * 8}px`);
    el.style.setProperty('--dx', `${Math.cos(ang) * dist}px`);
    el.style.setProperty('--dy', `${Math.sin(ang) * dist}px`);
    if (Math.random() < 0.35) el.style.color = 'var(--c-secondary)';
    alive++;
    el.addEventListener('animationend', () => {
      el.remove();
      alive--;
    });
    root.value.appendChild(el);
  }

  const point = (e) => {
    const box = root.value.getBoundingClientRect();
    return [e.clientX - box.left, e.clientY - box.top];
  };
  function onMove(e) {
    const now = performance.now();
    if (now - last < 45) return;
    last = now;
    spawn(...point(e));
  }
  function onDown(e) {
    const [x, y] = point(e);
    for (let i = 0; i < 7; i++) spawn(x, y, true);
  }

  function detach() {
    root.value?.removeEventListener('pointermove', onMove);
    root.value?.removeEventListener('pointerdown', onDown);
  }
  watch(
    [root, enabled],
    ([el, on]) => {
      detach();
      if (el && on && !reducedMotion()) {
        el.addEventListener('pointermove', onMove, { passive: true });
        el.addEventListener('pointerdown', onDown, { passive: true });
      }
    },
    { immediate: true },
  );
  onBeforeUnmount(detach);
}
