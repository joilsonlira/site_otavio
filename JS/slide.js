// slide.js
['/assets/imgs/bg1.png','/assets/imgs/bg2.png','/assets/imgs/bg3.png','/assets/imgs/bg4.png']
  .forEach(src => { const img = new Image(); img.src = src; });
const slides = [
  {
    image: '/assets/imgs/bg1.png',
    title: 'Excelência Técnica',
    desc:  'Rigor jurídico que se traduz em resultados concretos.'
  },
  {
    image: '/assets/imgs/bg2.png',
    title: 'Visão Estratégica',
    desc:  'Antecipamos riscos, potencializamos oportunidades.'
  },
  {
    image: '/assets/imgs/bg3.png',
    title: 'Clareza e Ética',
    desc:  'Transparência que inspira confiança.'
  },
  {
    image: '/assets/imgs/bg4.png',
    title: 'Inovação e valor sustentável',
    desc:  'Inovar para gerar valor que permanece.'
  },
];

let current = 0;
let isAnimating = false;
let autoSlide;

document.addEventListener("DOMContentLoaded", () => {
  const main  = document.querySelector('.main_content');
  const bg1   = main.querySelector('.bg_slider');
  const bg2   = main.querySelector('.bg_slider.next');
  const txtBox = main.querySelector('.txt_box');
  const h2El   = txtBox.querySelector('h2');
  const pEl    = txtBox.querySelector('p');

  function setText(index) {
    h2El.textContent = slides[index].title;
    pEl.textContent  = slides[index].desc;
  }

  function fadeTo(nextIndex) {
    if (isAnimating) return;
    isAnimating = true;

    // aplica a nova imagem no bg2 e mostra
    bg2.style.backgroundImage = 
      `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${slides[nextIndex].image})`;
    bg2.style.opacity = 1;

    // faz o fade do texto também
    txtBox.classList.add('fade-out');
    setTimeout(() => {
      setText(nextIndex);
      txtBox.classList.remove('fade-out');
    }, 300);

    // depois da transição, troca o conteúdo do bg1 e reseta bg2
    setTimeout(() => {
      bg1.style.backgroundImage = bg2.style.backgroundImage;
      bg2.style.opacity = 0;
      current = nextIndex;
      isAnimating = false;
    }, 1200);
  }

  function nextSlide() {
    const next = (current + 1) % slides.length;
    fadeTo(next);
  }

  function prevSlide() {
    const prev = (current - 1 + slides.length) % slides.length;
    fadeTo(prev);
  }

  // botões
  main.querySelector('.next_btn').addEventListener('click', () => {
    nextSlide(); resetAutoSlide();
  });
  main.querySelector('.prev').addEventListener('click', () => {
    prevSlide(); resetAutoSlide();
  });

  // autoplay
  function startAutoSlide() {
    autoSlide = setInterval(nextSlide, 7000); // tempo entre slides
  }
  function resetAutoSlide() {
    clearInterval(autoSlide);
    startAutoSlide();
  }

  startAutoSlide();

  // inicializa primeiro texto
  setText(current);
});
