// destinations.js
document.addEventListener('DOMContentLoaded', function () {
  const grid = document.getElementById('dest-grid');
  const searchInput = document.getElementById('dest-search');
  const preview = document.getElementById('preview-panel');
  const previewImg = document.getElementById('preview-img');
  const previewTitle = document.getElementById('preview-title');
  const previewSub = document.getElementById('preview-sub');

  // Live search filter
  searchInput.addEventListener('input', function () {
    const q = this.value.trim().toLowerCase();
    const cards = grid.querySelectorAll('.dest-card');

    cards.forEach(card => {
      const title = card.querySelector('h3').textContent.toLowerCase();
      const desc = card.querySelector('p').textContent.toLowerCase();
      if (title.includes(q) || desc.includes(q)) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  });

  // Hover preview (dynamic position)
  let activeTimer = null;

  function showPreview(card) {
    const img = card.dataset.image || '';
    const title = card.querySelector('h3').innerText || '';
    const sub = card.querySelector('p').innerText || '';

    previewImg.src = img;
    previewTitle.innerText = title;
    previewSub.innerText = sub;

    const rect = card.getBoundingClientRect();
    preview.style.position = (window.innerWidth > 980) ? 'fixed' : 'relative';

    if (preview.style.position === 'fixed') {
      preview.style.display = 'block'; // temporarily show to get size
      const previewRect = preview.getBoundingClientRect();
      const spacing = 12; // space between card and preview
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      // Available space around card
      const spaceTop = rect.top;
      const spaceBottom = viewportHeight - rect.bottom;
      const spaceLeft = rect.left;
      const spaceRight = viewportWidth - rect.right;

      let top = 0, left = 0;

      // Choose best side
      if (spaceRight >= previewRect.width + spacing) {
        left = rect.right + spacing;
        top = rect.top;
      } else if (spaceLeft >= previewRect.width + spacing) {
        left = rect.left - previewRect.width - spacing;
        top = rect.top;
      } else if (spaceBottom >= previewRect.height + spacing) {
        top = rect.bottom + spacing;
        left = rect.left;
      } else {
        top = rect.top - previewRect.height - spacing;
        left = rect.left;
      }

      // Clamp inside viewport
      top = Math.max(10, Math.min(top, viewportHeight - previewRect.height - 10));
      left = Math.max(10, Math.min(left, viewportWidth - previewRect.width - 10));

      preview.style.top = top + 'px';
      preview.style.left = left + 'px';
    } else {
      // Mobile relative
      preview.style.top = '';
      preview.style.left = '';
    }

    preview.classList.add('show');
    preview.setAttribute('aria-hidden', 'false');
  }

  function hidePreview() {
    preview.classList.remove('show');
    preview.setAttribute('aria-hidden', 'true');
    if (activeTimer) { clearTimeout(activeTimer); activeTimer = null; }
  }

  // Attach events to cards
  grid.querySelectorAll('.dest-card').forEach(card => {
    // Desktop hover
    card.addEventListener('mouseenter', () => {
      if (window.innerWidth <= 980) return;
      if (activeTimer) clearTimeout(activeTimer);
      showPreview(card);
    });

    card.addEventListener('mousemove', () => {
      if (window.innerWidth <= 980) return;
      showPreview(card); // update position dynamically as mouse moves
    });

    card.addEventListener('mouseleave', () => {
      activeTimer = setTimeout(hidePreview, 120);
    });

    // Mobile touch: tap once to show preview, second tap to navigate
    let tapped = false;
    card.addEventListener('touchstart', function (ev) {
      if (window.innerWidth > 980) return;
      if (!tapped) {
        ev.preventDefault();
        if (preview.classList.contains('show') && previewTitle.innerText === card.querySelector('h3').innerText) {
          window.location = card.href;
        } else {
          showPreview(card);
          tapped = true;
          setTimeout(() => tapped = false, 800);
        }
      } else {
        window.location = card.href;
      }
    });

    // Keyboard accessibility
    card.addEventListener('focus', () => { showPreview(card); });
    card.addEventListener('blur', () => { hidePreview(); });
  });

  // Hide preview when clicking elsewhere
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.dest-card') && !e.target.closest('#preview-panel')) {
      hidePreview();
    }
  });

  // Reposition on resize
  window.addEventListener('resize', () => {
    if (window.innerWidth <= 980) {
      preview.style.position = 'relative';
      preview.style.left = '';
      preview.style.top = '';
    } else {
      preview.style.position = 'fixed';
    }
  });
});
