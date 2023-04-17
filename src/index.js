import ProximoItem from './modules/ProximoItem.js';
import FixedContainer from './modules/FixedContainer.js';
import NavFixed from './modules/NavFixed.js';
import SlideIn from './modules/SlideIn.js';
import SimularValor from './modules/SimularValor.js';
import fetchDados from './modules/fetchDados.js';

const menuMobile = new FixedContainer(
  '#btn-menu-mobile',
  '.menu-mobile',
  '#btn-mobile-fechar',
);
menuMobile.init();

//container de rastreio
const containerRastreio = new FixedContainer(
  '#btn-rastreio',
  '[data-rastreio]',
  '#btn-rastreio-fechar',
);
containerRastreio.init();

const simularValor = new SimularValor(
  '#btn-consultar-valor',
  "[data-form='simular-valor']",
  "[data-form='simular-valor']",
);
simularValor.init();

const proximoFormulario = new ProximoItem(
  '[data-fazer-pedido]',
  '.btn.proximo',
  '.btn.anterior',
);
proximoFormulario.init();

const navFixed = new NavFixed('.navegacao-bg');
navFixed.init();

const anime = new SlideIn('[data-anime]');
anime.init();
