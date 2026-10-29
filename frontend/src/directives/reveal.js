/** v-reveal: tambahkan class `is-visible` saat elemen masuk viewport (animasi muncul halus). */
const reduced = () => typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;

export const reveal = {
  mounted(el, { value }) {
    el.classList.add('reveal');
    if (value?.delay) el.style.setProperty('--reveal-delay', `${value.delay}ms`);
    if (reduced() || typeof IntersectionObserver === 'undefined') return el.classList.add('is-visible');
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          el.classList.add('is-visible');
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    el._revealIo = io;
  },
  unmounted(el) {
    el._revealIo?.disconnect();
  },
};
