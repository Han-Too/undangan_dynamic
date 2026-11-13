import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';
import { onBeforeUnmount, watch } from 'vue';

gsap.registerPlugin(ScrollTrigger, SplitText);

const reducedMotion = () => typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Lapisan animasi "mewah" untuk isi undangan (aktif setelah cover dibuka):
 *  - Lenis: scroll halus di dalam .inv-scroll (bukan window, agar tetap jalan di dalam bingkai HP builder)
 *  - GSAP ScrollTrigger: parallax lapisan scene, judul terkuak, ornamen tergambar, kartu & foto masuk berurutan
 *  - SplitText: judul terkuak per huruf. Hanya di halaman tamu, karena SplitText mengganti node teks
 *    yang dikelola Vue; di builder (teks bisa diedit langsung) judul memakai sapuan topeng sebagai gantinya.
 *
 * opts: { root, scroller, content, enabled: () => bool, opened: () => bool, splitText: () => bool, deps: () => any }
 */
export function useLuxuryMotion({ root, scroller, content, enabled, opened, splitText, deps }) {
  let lenis = null;
  let ctx = null;
  let resizeObs = null;
  let raf = null;

  function teardown() {
    ctx?.revert();
    ctx = null;
    resizeObs?.disconnect();
    resizeObs = null;
    if (raf) gsap.ticker.remove(raf);
    raf = null;
    lenis?.destroy();
    lenis = null;
  }

  function setup() {
    teardown();
    const wrapper = scroller.value;
    const inner = content.value;
    if (!wrapper || !inner || !enabled() || !opened() || reducedMotion()) return;

    lenis = new Lenis({ wrapper, content: inner, duration: 1.25, easing: (t) => 1 - Math.pow(1 - t, 4), smoothWheel: true, wheelMultiplier: 0.9 });
    lenis.on('scroll', ScrollTrigger.update);
    raf = (time) => lenis?.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const st = (trigger, extra = {}) => ({ trigger, scroller: wrapper, start: 'top 88%', once: true, ...extra });

    ctx = gsap.context(() => {
      /* Parallax ilustrasi latar: lapisan atas naik, bawah turun, pojok sedikit berputar. */
      root.value.querySelectorAll(':scope > .scene .scene__layer').forEach((layer) => {
        const depth = Number(layer.dataset.depth || 1);
        const at = layer.dataset.at;
        const up = ['tl', 'tr', 'top'].includes(at);
        const side = ['tl', 'bl', 'left'].includes(at) ? -1 : ['tr', 'br', 'right'].includes(at) ? 1 : 0;
        gsap.to(layer, {
          y: (up ? -70 : 50) * depth,
          x: side * 14 * depth,
          rotation: side * 3 * depth,
          ease: 'none',
          scrollTrigger: { scroller: wrapper, start: 0, end: 'max', scrub: 1.6 },
        });
      });

      /* Judul & eyebrow terkuak */
      inner.querySelectorAll('.inv-section .inv-title, .inv-section .inv-eyebrow').forEach((el) => {
        if (splitText()) {
          SplitText.create(el, {
            type: 'words,chars',
            mask: 'words',
            autoSplit: true,
            onSplit: (self) =>
              gsap.from(self.chars, { yPercent: 115, rotate: 6, opacity: 0, duration: 0.9, ease: 'power4.out', stagger: 0.022, scrollTrigger: st(el) }),
          });
        } else {
          gsap.from(el, { clipPath: 'inset(0 0 100% 0)', y: 26, opacity: 0, duration: 1.1, ease: 'power4.out', clearProps: 'clipPath,transform', scrollTrigger: st(el) });
        }
      });

      /* Ornamen pembatas tergambar dari tengah */
      inner.querySelectorAll('.inv-section .divider').forEach((el) => {
        gsap.from(el, { scaleX: 0, opacity: 0, duration: 1.4, ease: 'expo.out', transformOrigin: '50% 50%', clearProps: 'transform', scrollTrigger: st(el) });
      });

      /* Paragraf naik halus */
      inner.querySelectorAll('.inv-section .inv-text').forEach((el) => {
        gsap.from(el, { y: 30, opacity: 0, filter: 'blur(6px)', duration: 1.2, ease: 'power3.out', clearProps: 'filter,transform', scrollTrigger: st(el) });
      });

      /* Kartu & butir berurutan per section */
      inner.querySelectorAll('.inv-section__inner').forEach((sec) => {
        const items = sec.querySelectorAll(':scope > .inv-card, :scope > .inv-count, :scope > .gallery > *, :scope > .carousel, :scope > .inv-form, :scope > .rsvp__wishes, :scope > * > .profile__person');
        if (items.length) {
          gsap.from(items, { y: 46, opacity: 0, scale: 0.97, duration: 1, ease: 'power3.out', stagger: 0.12, clearProps: 'transform', scrollTrigger: st(sec, { start: 'top 80%' }) });
        }
      });

      /* Foto: zoom keluar perlahan di dalam bingkainya */
      inner.querySelectorAll('.inv-section .inv-photo img').forEach((img) => {
        gsap.from(img, { scale: 1.25, duration: 1.8, ease: 'power2.out', clearProps: 'transform', scrollTrigger: st(img, { start: 'top 92%' }) });
      });
    }, root.value);

    // Tinggi isi berubah (foto termuat, teks diedit) → hitung ulang titik picu.
    let pending = null;
    resizeObs = new ResizeObserver(() => {
      clearTimeout(pending);
      pending = setTimeout(() => ScrollTrigger.refresh(), 150);
    });
    resizeObs.observe(inner);
  }

  watch(
    () => [enabled(), opened(), splitText(), deps()],
    // tunggu satu frame agar DOM section baru sudah terpasang
    () => requestAnimationFrame(setup),
    { flush: 'post', immediate: true },
  );
  onBeforeUnmount(teardown);

  return {
    /** Gulir ke elemen; lewat Lenis bila aktif agar tidak "melompat". */
    scrollTo(target, { immediate = false } = {}) {
      if (lenis) return lenis.scrollTo(target ?? 0, { immediate, duration: 1.4 });
      if (typeof target === 'number' || target == null) scroller.value?.scrollTo({ top: target ?? 0, behavior: immediate ? 'auto' : 'smooth' });
      else scroller.value?.scrollTo({ top: target.offsetTop, behavior: immediate ? 'auto' : 'smooth' });
    },
  };
}
