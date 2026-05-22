/**
 * STUDIO. - Core UI Engine
 * Estetika: Earthy Tone & Cinematic Velocity
 */

document.addEventListener("DOMContentLoaded", () => {
  // ==========================================
  // 1. FORCE SCROLL TO TOP ON RELOAD
  // ==========================================
  if (history.scrollRestoration) {
    history.scrollRestoration = "manual"; // Memaksa browser melupakan posisi scroll terakhir
  }
  window.scrollTo(0, 0); // Pastikan layar berada di koordinat (0,0) sebelum opening dimulai

  // Ambil elemen penting untuk interaksi global
  const openingScreen = document.getElementById("opening-screen");
  const openingBar = document.querySelector(".opening-bar");
  const openingSubtitle = document.querySelector(".opening-subtitle");
  const openingContent = document.querySelector(".opening-content");
  const topCurtain = document.querySelector(".top-curtain");
  const bottomCurtain = document.querySelector(".bottom-curtain");

  // ==========================================
  // 2. TIMELINE TIMING OPENING SCREEN (PRELOADER)
  // ==========================================

  // Langkah A: Rentangkan garis progress bar tengah
  setTimeout(() => {
    if (openingBar) openingBar.style.width = "180px";
  }, 300);

  // Langkah B: Munculkan subtitle dengan efek rise-up
  setTimeout(() => {
    if (openingSubtitle) {
      openingSubtitle.style.opacity = "1";
      openingSubtitle.style.transform = "translateY(0)";
    }
  }, 800);

  // Langkah C: Memudarkan logo & membelah tirai latar belakang secara dramatis
  setTimeout(() => {
    if (openingContent) {
      openingContent.style.opacity = "0";
      openingContent.style.transform = "scale(0.95) blur(5px)";
    }
    if (topCurtain && bottomCurtain) {
      topCurtain.style.transform = "translateY(-100%)";
      bottomCurtain.style.transform = "translateY(100%)";
    }
  }, 2200);

  // Langkah D: Hancurkan kontainer pembuka agar tidak mengganggu klik sistem, lalu picu isi web
  setTimeout(() => {
    if (openingScreen) openingScreen.style.display = "none";
    runHeroRevealAnimation();
  }, 3000);

  // ==========================================
  // 3. CINEMATIC HERO REVEAL ANIMATION
  // ==========================================
  const runHeroRevealAnimation = () => {
    const easeCurve = "cubic-bezier(0.16, 1, 0.3, 1)"; // Kurva akselerasi premium

    const logoTitle = document.querySelector(".hero-text .logo-title");
    const greeting = document.querySelector(".hero-text .greeting");
    const profileName = document.querySelector(".hero-text .profile-name");
    const bio = document.querySelector(".hero-text .bio");
    const tags = document.querySelectorAll(".hero-tags span");
    const profilePic = document.querySelector(".profile-pic");
    const softwareIcons = document.querySelector(".software-icons");

    // Efek transisi teks mengalir berurutan (Staggered Text Intro)
    const textElements = [logoTitle, greeting, profileName, bio];
    textElements.forEach((el, index) => {
      if (!el) return;
      el.style.transition = `opacity 0.8s ${easeCurve}, transform 0.8s ${easeCurve}`;
      el.style.transitionDelay = `${index * 120}ms`;
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    });

    // Label tag masuk menyusul di bawah teks
    tags.forEach((tag, index) => {
      if (!tag) return;
      tag.style.transition = `opacity 0.6s ${easeCurve}, transform 0.6s ${easeCurve}`;
      tag.style.transitionDelay = `${400 + index * 60}ms`;
      tag.style.opacity = "1";
      tag.style.transform = "translateY(0)";
    });

    // Foto utama mengunci tajam dari kondisi blur & miring
    if (profilePic) {
      profilePic.style.transition = `opacity 1.2s ${easeCurve}, transform 1.2s ${easeCurve}, filter 1s ease-out`;
      profilePic.style.transitionDelay = "300ms";
      profilePic.style.opacity = "1";
      profilePic.style.transform = "scale(1) rotate(0deg)";
      profilePic.style.filter = "blur(0px)";
    }

    // Blok ikon software yang menimpa foto muncul paling akhir dengan letupan halus
    if (softwareIcons) {
      softwareIcons.style.transition = `opacity 0.8s ${easeCurve}, transform 0.8s ${easeCurve}`;
      softwareIcons.style.transitionDelay = "800ms";
      softwareIcons.style.opacity = "1";
      softwareIcons.style.transform = "scale(1)";
    }
  };

  // ==========================================
  // 4. PORTFOLIO TAB SYSTEM (Cyberpunk Glitch Scan Effect)
  // ==========================================
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  const runTabStaggerAnimation = (contentBlock) => {
    // Menargetkan gambar atau tautan di dalam grid portofolio yang aktif
    const galleryItems = contentBlock.querySelectorAll(
      ".gallery-grid img, .gallery-grid a",
    );

    galleryItems.forEach((item, index) => {
      // Hard reset kondisi sebelum animasi dipicu
      item.style.transition = "none";
      item.style.opacity = "0";
      item.style.transform = "translateX(-25px) skewX(4deg) scaleX(1.05)";
      item.style.filter = "brightness(2) contrast(1.2) blur(5px)";

      // Setup engine transisi eksposur
      item.style.transition =
        "opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1), " +
        "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), " +
        "filter 0.5s cubic-bezier(0.16, 1, 0.3, 1)";

      // Trigger beruntun (ritme sekuensial)
      setTimeout(() => {
        item.style.opacity = "1";
        item.style.transform = "translateX(0) skewX(0deg) scaleX(1)";
        item.style.filter = "brightness(1) contrast(1) blur(0px)";
      }, index * 50); // Jeda tempo super rapat (50ms) agar terasa reaktif
    });
  };

  // Handler interaksi perpindahan tombol tab
  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const targetId = button.getAttribute("data-target");
      const targetContent = document.getElementById(targetId);

      // Proteksi jika tab yang di-klik statusnya sedang aktif
      if (button.classList.contains("active")) return;

      // Bersihkan seluruh status kelas aktif lama
      tabButtons.forEach((btn) => btn.classList.remove("active"));
      tabContents.forEach((content) => {
        content.classList.remove("active");

        // Matikan transisi item lama seketika agar tidak membayangi tab baru (Anti-Ghosting)
        const oldItems = content.querySelectorAll(
          ".gallery-grid img, .gallery-grid a",
        );
        oldItems.forEach((item) => {
          item.style.transition = "none";
          item.style.opacity = "0";
          item.style.filter = "none";
        });
      });

      // Kukuhkan status aktif ke elemen yang baru dipilih
      button.classList.add("active");
      if (targetContent) {
        targetContent.add
          ? targetContent.classList.add("active")
          : targetContent.classList.add("active");

        // Mainkan ketukan animasi glitch scan
        runTabStaggerAnimation(targetContent);
      }

      // 5. SMART SCROLL ADJUSTMENT (Optimalisasi Kenyamanan Layar HP)
      setTimeout(() => {
        const sectionNav = document.querySelector(".tab-navigation");
        if (sectionNav) {
          sectionNav.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 450);
    });
  });

  // Tunda eksekusi inisiasi grid default halaman pertama agar selaras setelah tirai membelah
  setTimeout(() => {
    const defaultActiveTab = document.querySelector(".tab-content.active");
    if (defaultActiveTab) {
      runTabStaggerAnimation(defaultActiveTab);
    }
  }, 2600);
});
