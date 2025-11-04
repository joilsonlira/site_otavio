const slides = [
  {
    image: '/assets/imgs/bg1.png',
    title: 'Excelência Técnica',
    desc:  'Rigor jurídico que se traduz em resultados concretos.'
  },
  {
    image: '/assets/imgs/bg1.png',
    title: 'Visão Estratégica',
    desc:  'Antecipamos riscos, potencializamos oportunidades.'
  },
  {
    image: '/assets/imgs/bg1.png',
    title: 'Clareza e Ética',
    desc:  'Transparência que inspira confiança.'
  },
  {
    image: '/assets/imgs/bg1.png',
    title: 'Inovação e valor sustentável',
    desc:  'Inovar para gerar valor que permanece.'
  },
];

let current = 0;
let isAnimating = false;
let autoSlide;

/* pega elementos */
const main  = document.querySelector('.main_content');
let bg1     = main.querySelector('.bg_slider');
let bg2     = main.querySelector('.bg_slider.next');
const nextBtn = main.querySelector('.next_btn');
const prevBtn = main.querySelector('.prev');

const txtBox = main.querySelector('.txt_box');
const h2El   = txtBox.querySelector('h2');
const pEl    = txtBox.querySelector('p');

/* seta o texto inicial (garantia) */
function setText(index) {
  h2El.textContent = slides[index].title;
  pEl.textContent  = slides[index].desc;
}
setText(current);

/* atualiza texto com fade suave */
function updateText(nextIndex) {
  txtBox.classList.add('fade-out');
  // troca o texto um pouco depois para dar sensação de saída/entrada
  setTimeout(() => {
    setText(nextIndex);
    txtBox.classList.remove('fade-out');
  }, 250);
}

/* troca com deslizamento: direction = 1 (da direita), -1 (da esquerda) */
function slideTo(nextIndex, direction = 1) {
  if (isAnimating) return;
  isAnimating = true;

  const nextImg = slides[nextIndex].image;
  bg2.style.backgroundImage = 
    `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${nextImg})`;

  // posiciona a próxima de acordo com a direção
  bg2.style.transform = `translateX(${direction * 100}%)`;
  void bg2.offsetWidth; // força reflow antes de animar

  // anima
  bg1.style.transform = `translateX(${-direction * 100}%)`;
  bg2.style.transform = `translateX(0)`;

  // sincroniza o texto (começa trocar um tiquinho depois do início)
  updateText(nextIndex);

  // ao fim da animação (mesmo tempo do transition)
  setTimeout(() => {
    // recicla a camada antiga para a lateral oposta e copia a imagem
    bg1.style.transform = `translateX(${direction * 100}%)`;
    bg1.style.backgroundImage = bg2.style.backgroundImage;

    // troca referências
    [bg1, bg2] = [bg2, bg1];

    current = nextIndex;
    isAnimating = false;
  }, 1000);
}

function nextSlide() {
  const next = (current + 1) % slides.length;
  slideTo(next, 1);
}

function prevSlide() {
  const prev = (current - 1 + slides.length) % slides.length;
  slideTo(prev, -1);
}

/* eventos dos botões */
nextBtn.addEventListener('click', () => {
  nextSlide();
  resetAutoSlide();
});
prevBtn.addEventListener('click', () => {
  prevSlide();
  resetAutoSlide();
});

/* autoplay */
function startAutoSlide() {
  autoSlide = setInterval(nextSlide, 5000); // 5s por slide
}
function resetAutoSlide() {
  clearInterval(autoSlide);
  startAutoSlide();
}
startAutoSlide();

/* acessibilidade: setas via teclado */
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') { nextBtn.click(); }
  if (e.key === 'ArrowLeft')  { prevBtn.click(); }
});