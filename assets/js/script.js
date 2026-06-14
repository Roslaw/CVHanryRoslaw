/* =================================================================
   CV Hanry Roslaw Saputra - JavaScript
   Mengatur interaksi halaman: smooth scroll, tombol kembali ke atas,
   perubahan tampilan navbar saat digulir, dan penanda menu yang sedang aktif.
   ================================================================= */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // Mengubah tampilan navbar ketika halaman digulir lebih dari 50px
  var navbar = document.getElementById('mainNavbar');

  function handleNavbarScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add('navbar-scrolled');
    } else {
      navbar.classList.remove('navbar-scrolled');
    }
  }

  // Memunculkan tombol kembali ke atas setelah halaman digulir cukup jauh
  var scrollTopBtn = document.getElementById('scrollTopBtn');

  function toggleScrollTopBtn() {
    if (window.scrollY > 350) {
      scrollTopBtn.classList.add('show');
    } else {
      scrollTopBtn.classList.remove('show');
    }
  }

  scrollTopBtn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Membuat perpindahan antar section menjadi mulus; menu mobile ditutup setelah salah satu dipilih
  var internalLinks = document.querySelectorAll('a[href^="#"]');
  var navCollapse = document.getElementById('navMenu');

  internalLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId.length > 1) {
        var target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });

          // Menutup menu apabila sedang terbuka pada tampilan ponsel
          if (navCollapse && navCollapse.classList.contains('show')) {
            var bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
            if (bsCollapse) {
              bsCollapse.hide();
            }
          }
        }
      }
    });
  });

  // Menyorot menu navbar sesuai section yang sedang ditampilkan
  var sections = document.querySelectorAll('main section[id]');
  var navLinks = document.querySelectorAll('.navbar-nav .nav-link');

  function setActiveLink(id) {
    navLinks.forEach(function (link) {
      if (link.getAttribute('href') === '#' + id) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  var sectionObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        setActiveLink(entry.target.id);
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });

  sections.forEach(function (section) {
    sectionObserver.observe(section);
  });

  // Menampilkan elemen dengan animasi lembut saat masuk ke viewport
  var animatedEls = document.querySelectorAll('[data-animate]');

  var animateObserver = new IntersectionObserver(function (entries, observer) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  animatedEls.forEach(function (el) {
    animateObserver.observe(el);
  });

  // Menampilkan gambar galeri berukuran besar di dalam popup ketika diklik
  var galleryModalEl = document.getElementById('galleryModal');
  if (galleryModalEl && window.bootstrap) {
    var galleryModal = new bootstrap.Modal(galleryModalEl);
    var modalImg = document.getElementById('galleryModalImg');
    var modalTitle = document.getElementById('galleryModalLabel');

    function openGallery(trigger) {
      modalImg.setAttribute('src', trigger.getAttribute('src'));
      modalImg.setAttribute('alt', trigger.getAttribute('alt'));
      modalTitle.textContent = trigger.dataset.title || 'Galeri Pendukung';
      galleryModal.show();
    }

    document.querySelectorAll('.gallery-trigger').forEach(function (img) {
      img.addEventListener('click', function () {
        openGallery(this);
      });
      // Mendukung pembukaan popup melalui tombol Enter atau Spasi
      img.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openGallery(this);
        }
      });
    });
  }

  // Mencatat ke console saat tautan WhatsApp diklik
  var waLink = document.querySelector('a[href^="https://wa.me"]');
  if (waLink) {
    waLink.addEventListener('click', function () {
      console.log('Membuka WhatsApp Hanry Roslaw Saputra...');
    });
  }

  // Memantau event scroll untuk navbar dan tombol ke atas, lalu menetapkan kondisi awalnya
  window.addEventListener('scroll', function () {
    handleNavbarScroll();
    toggleScrollTopBtn();
  });

  handleNavbarScroll();
  toggleScrollTopBtn();
});
