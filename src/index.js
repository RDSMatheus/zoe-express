import FixedContainer from './modules/FixedContainer';
import NavFixed from './modules/NavFixed';
import SlideIn from './modules/SlideIn';
import SimularValor from './modules/SimularValor';
import Formulario from './modules/Formulario';
import FormCarousel from './modules/Carousel';
import Accordion from './modules/Accordion';
import fetchDados from './modules/fetchDados';
import calcularBairro from './modules/calcularBairro';

import './style.css';
import Tracking from './modules/Tracking';

const menuMobile = new FixedContainer(
  '#btn-menu-mobile',
  '.menu-mobile',
  '#btn-mobile-fechar',
);
menuMobile.init();

const proximo = new FormCarousel(
  '.cadastro-form form',
  '.btn.proximo',
  '.btn.anterior',
  '.cadastro-nav-item',
);
proximo.init();

// container de rastreio
// const containerRastreio = new FixedContainer(
//   '#btn-rastreio',
//   '[data-rastreio]',
//   '#btn-rastreio-fechar',
// );
// containerRastreio.init();
new Tracking().init();

const containerTermos = new FixedContainer(
  '#abrir-termos',
  '[data-termos]',
  '#btn-termos-fechar',
);
containerTermos.init();

const simularValor = new SimularValor(
  '#btn-consultar-valor',
  "[data-form='simular-valor']",
  "[data-form='simular-valor']",
);
simularValor.init();

const headersContato = { 'Content-Type': 'application/json' };
const enviarContato = new Formulario(
  '#enviar-contato',
  "[data-form='contato']",
  'https://zoe-production-4a9e.up.railway.app/contact',
  'POST',
  headersContato,
);
enviarContato.init();

const navFixed = new NavFixed('.navegacao-bg');
navFixed.init();

const anime = new SlideIn('[data-anime]');
anime.init();

const accordion = new Accordion('[data-accordion] dt');
accordion.init();

// async function fetchTracking(rastreio) {
//   const url = 'https://zoe-production-06b7.up.railway.app/tracker';
//   const track = await fetchDados(`${url}/ZOE7280875777`);
//   const trackJson = await track.json()
//   console.log(trackJson.status)
// }
// fetchTracking();
