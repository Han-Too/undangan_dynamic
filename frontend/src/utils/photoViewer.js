import Viewer from 'viewerjs';
import 'viewerjs/dist/viewer.css';

let active = null;

/**
 * Buka foto galeri layar penuh dengan Viewer.js (zoom, putar, geser, thumbnail).
 * `photos` = [{ src }], `index` = foto yang dibuka pertama.
 */
export function openPhotoViewer(photos, index = 0) {
  closePhotoViewer();
  const list = document.createElement('ul');
  list.hidden = true;
  photos.forEach((p, i) => {
    const img = document.createElement('img');
    img.src = p.src;
    img.alt = `${i + 1} / ${photos.length}`;
    list.appendChild(img);
  });
  document.body.appendChild(list);

  const many = photos.length > 1;
  const viewer = new Viewer(list, {
    className: 'inv-viewer',
    initialViewIndex: index,
    title: [1, (image) => image.alt],
    navbar: many,
    loop: true,
    transition: true,
    zoomRatio: 0.25,
    minZoomRatio: 0.5,
    maxZoomRatio: 6,
    toolbar: {
      zoomOut: 1,
      zoomIn: 1,
      reset: 1,
      prev: many,
      next: many,
      rotateLeft: 1,
      rotateRight: 1,
    },
    hidden() {
      viewer.destroy();
      list.remove();
      if (active === viewer) active = null;
    },
  });
  active = viewer;
  viewer.show();
}

export function closePhotoViewer() {
  active?.hide(true);
}
