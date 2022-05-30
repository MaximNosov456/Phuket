document.addEventListener("DOMContentLoaded", () => {
  // Swiper slider
  const swiper1 = new Swiper(".swiper-top", {
    loop: true,
    slidesPerView: 1,
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },
    autoplay: {
      delay: 7000,
    },
  });

  const swiper2 = new Swiper(".swiper-program", {
    allowTouchMove: false,
    loop: true,
    slidesPerView: 1,
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },
  });

  const swiper3 = new Swiper(".swiper-program-gallery", {
    loop: true,
    slidesPerView: 1,
    thumbs: {
      swiper: swiper2,
    },
    navigation: {
      prevEl: ".swiper-program-prev",
      nextEl: ".swiper-program-next",
    },
  });

  //Webp
  const testWebP = (elem) => {
    const webP = new Image();
    webP.src =
      "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
    webP.onload = webP.onerror = function () {
      webP.height === 2
        ? elem.classList.add("webp")
        : elem.classList.add("no-webp");
    };
  };

  testWebP(document.body);

  // Burger and smooth scroll

  const burger = document.querySelector(".hamburger");
  const menuLinks = document.querySelectorAll(".menu__list-link");
  const menu = document.querySelector(".menu");

  const toggleMenu = () => {
    menu.classList.toggle("active");
    burger.classList.toggle("active");
  };

  burger.addEventListener("click", toggleMenu);

  if (window.innerWidth <= 768) {
    menuLinks.forEach((menuLink) =>
      menuLink.addEventListener("click", toggleMenu)
    );
  }

  document.addEventListener("click", (e) => {
    if (
      menu.classList.contains("active") &&
      e.target !== burger &&
      !e.target.closest(".hamburger") &&
      e.target !== document.querySelector(".menu") &&
      e.target !== document.querySelector(".menu__list")
    ) {
      toggleMenu();
    }
  });

  // MoveTo
  const moveTo = new MoveTo();
  menuLinks.forEach((menuLink) => moveTo.registerTrigger(menuLink));

  // Mask

  Inputmask({ mask: "+7 (999) 999-9999" }).mask('input[type="tel"]');

  // Modal
  const modalOverlay = document.querySelector(".modal-overlay");
  const modalPhuket = document.querySelector(".modal-phuket");
  const modalClose = document.querySelectorAll(".modal-close");
  const phuketBtn = document.querySelector(".header__link");

  phuketBtn.addEventListener("click", () => {
    modalOverlay.classList.add("active");
    modalPhuket.classList.add("active");
  });

  modalClose.forEach((close) =>
    close.addEventListener("click", () => {
      modalOverlay.classList.remove("active");
      close.closest(".modal").classList.remove("active");
    })
  );
});
