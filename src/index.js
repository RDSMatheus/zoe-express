import FixedContainer from './modules/FixedContainer';
import NavFixed from './modules/NavFixed';
import SlideIn from './modules/SlideIn';
import SimularValor from './modules/SimularValor';
import EnviarFormulario from './modules/EnviarFormulario';
import FormWizard from './modules/FormWizard';

const menuMobile = new FixedContainer(
  '#btn-menu-mobile',
  '.menu-mobile',
  '#btn-mobile-fechar',
);
menuMobile.init();

// container de rastreio
const containerRastreio = new FixedContainer(
  '#btn-rastreio',
  '[data-rastreio]',
  '#btn-rastreio-fechar',
);
containerRastreio.init();

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
const enviarContato = new EnviarFormulario(
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

const formMultiStep = new FormWizard(
  '[data-fazer-pedido]',
  '.cadastro-nav-item',
);
formMultiStep.init();

