/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/modules/FixedContainer.js
class FixedContainer {
  constructor(abrir, container, fechar) {
    this.abrir = document.querySelector(abrir);
    this.container = document.querySelector(container);
    this.fechar = document.querySelector(fechar);
    this.activeClass = 'ativo';

    this.toggleMenu = this.toggleMenu.bind(this);
  }

  toggleMenu(event) {
    event.preventDefault()
    this.container.classList.toggle(this.activeClass);
  }

  addEventListeners() {
    this.abrir.addEventListener('click', this.toggleMenu);
    this.fechar.addEventListener('click', this.toggleMenu);
  }

  init() {
    if (this.abrir) {
      this.addEventListeners();
    }
    return this;
  }
}

;// CONCATENATED MODULE: ./src/modules/NavFixed.js
class NavFixed {
  constructor(nav) {
    this.nav = document.querySelector(nav);
    this.handleScroll = this.handleScroll.bind(this);
  }

  handleScroll() {
    const windowHeight = window.scrollY - 25;
    const { height } = this.nav.getBoundingClientRect();
    if (windowHeight > height) {
      this.nav.classList.add("ativo")
    } else {
      this.nav.classList.remove("ativo")
    }
    
  }

  addEventListeners() {
    window.addEventListener('scroll', ()=>{
      this.handleScroll();
      window.removeEventListener("scroll", this.handleScroll)
    });
  }

  init() {
    this.addEventListeners();
  }
}

;// CONCATENATED MODULE: ./src/modules/SlideIn.js
class SlideIn{
  constructor(anime){
    this.anime = document.querySelectorAll(anime);
    this.handleScroll = this.handleScroll.bind(this);
  }

  handleScroll(){
    const windowHeight = window.innerHeight * .6;

    this.anime.forEach(item => {
      const {top} = item.getBoundingClientRect();
      const animeHeight = windowHeight - top > 0
      if(animeHeight){
        item.classList.add('ativo');
      } else {
        item.classList.remove('ativo');
      }
    })
  }

  addEventListeners(){
    window.addEventListener('scroll', this.handleScroll);
  }

  init(){
    this.addEventListeners();
    this.anime[0].classList.add('ativo')
    return this;
  }
}
;// CONCATENATED MODULE: ./src/modules/fetchDados.js
async function fetchDados(
  url,
  method = 'GET',
  headers = {},
  body = null,
) {
  const options = { method, headers };
  if (body) options.body = JSON.stringify(body);
  try {
    const response = await fetch(url, options);
    console.log(response);
    if (!response.ok) {
      throw new Error(`Erro ao buscar dados: ${response.status}`);
    }
    return response;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Erro ao buscar dados:', error);
    throw error;
  }
}

;// CONCATENATED MODULE: ./src/modules/SimularValor.js


class SimularValores {
  constructor(abrir, form, container) {
    this.abrir = document.querySelector(abrir);
    this.form = document.querySelectorAll(`${form} select`);
    this.container = document.querySelector(container);

    this.handleClick = this.handleClick.bind(this);
    this.dadosFetch = this.dadosFetch.bind(this);
  }

  async dadosFetch() {
    if (this.form[0].value && this.form[1].value) {
      const img = document.createElement('img');
      img.src = './assets/img/loading.svg';
      img.className = 'rotate-image';
      this.container.appendChild(img);
      try {
        const dadosFetch = await fetchDados(
          'https://zoe-production-4a9e.up.railway.app/product',
          'GET',
        );
        const dadosJson = await dadosFetch.json()
        return dadosJson;
      } catch (error) {
        console.log(error);
      } finally {
        this.container.removeChild(img);
      }
    }
    return null;
  }

  createDiv(valor) {
    const divAnterior = this.container.querySelector('.valores-popup');
    if (divAnterior) {
      this.container.removeChild(divAnterior);
    }
    const div = document.createElement('div');
    div.className = 'valores-popup cor-p5 ativo';
    div.setAttribute('data-anime', 'slide-left');
    div.innerHTML = `
    <h1>VALOR R$${valor},00</h1>
  `;
    this.container.appendChild(div);
    return div;
  }

  handleClick(event) {
    event.preventDefault();
    this.dadosFetch().then((dadosJson) => {
      const select1 = this.form[0].value.toLowerCase();
      const select2 = this.form[1].value.toLowerCase();

      let value = null;
      console.log(select1, select2)
      if (dadosJson) {
        dadosJson.forEach((item) => {
          const [origem, destino] = item.name.toLowerCase().split('x');
          if (
            (origem === select1 && destino === select2) ||
            (origem === select2 && destino === select1)
          ) {
            value = item.price;
          }
        });
      } else {
        // eslint-disable-next-line no-alert
        window.alert('[ERROR] Insira um valor válido!');
      }

      if (value) {
        console.log(value);
        this.createDiv(value);
      }
    });
  }

  addEventListeners() {
    this.abrir.addEventListener('click', this.handleClick);
  }

  init() {
    if (this.abrir) this.addEventListeners();
  }
}

;// CONCATENATED MODULE: ./src/modules/Formulario.js


class Formulario {
  constructor(button, form, url, method, header) {
    this.button = document.querySelector(button);
    this.form = document.querySelector(form);
    this.url = url;
    this.method = method;
    this.headers = header;

    this.handleClick = this.handleClick.bind(this);
  }

  static formatarTelefone(telefone) {
    if (telefone.length > 13) {
      telefone = telefone.slice(0, 15);
    }
    telefone = telefone.replace(/\D/g, '');
    telefone = telefone.replace(/^(\d{2})(\d)/g, '($1) $2');
    telefone = telefone.replace(/(\d)(\d{4})$/, '$1-$2');
    return telefone;
  }

  static validarTelefone(telefone) {
    let telefoneValidar = telefone;
    telefoneValidar = telefoneValidar.replace(/[^\d]+/g, '');

    if (telefoneValidar.length !== 10 && telefoneValidar.length !== 11) {
      return false;
    }

    const ddd = telefoneValidar.substring(0, 2);
    if (
      ![
        '11',
        '12',
        '13',
        '14',
        '15',
        '16',
        '17',
        '18',
        '19',
        '21',
        '22',
        '24',
        '27',
        '28',
        '31',
        '32',
        '33',
        '34',
        '35',
        '37',
        '38',
        '41',
        '42',
        '43',
        '44',
        '45',
        '46',
        '47',
        '48',
        '49',
        '51',
        '53',
        '54',
        '55',
        '61',
        '62',
        '63',
        '64',
        '65',
        '66',
        '67',
        '68',
        '69',
        '71',
        '73',
        '74',
        '75',
        '77',
        '79',
        '81',
        '82',
        '83',
        '84',
        '85',
        '86',
        '87',
        '88',
        '89',
        '91',
        '92',
        '93',
        '94',
        '95',
        '96',
        '97',
        '98',
        '99',
      ].includes(ddd)
    ) {
      return false;
    }

    return true;
  }

  static formatarCPF(cpf) {
    cpf = cpf.replace(/\D/g, '');
    cpf = cpf.replace(/^(\d{3})(\d)/, '$1.$2');
    cpf = cpf.replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3');
    cpf = cpf.replace(/\.(\d{3})(\d)/, '.$1-$2');
    return cpf;
  }

  static formatarCNPJ(cnpj) {
    cnpj = cnpj.replace(/\D/g, ''); // remove caracteres não numéricos
    cnpj = cnpj.replace(/^(\d{2})(\d)/, '$1.$2');
    cnpj = cnpj.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
    cnpj = cnpj.replace(/\.(\d{3})(\d)/, '.$1/$2');
    cnpj = cnpj.replace(/(\d{4})(\d)/, '$1-$2');
    return cnpj;
  }

  static validarCNPJ(cnpj) {
    cnpj = cnpj.replace(/[^\d]+/g, '');

    if (cnpj.length !== 14) return false;

    if (
      cnpj === '00000000000000' ||
      cnpj === '11111111111111' ||
      cnpj === '22222222222222' ||
      cnpj === '33333333333333' ||
      cnpj === '44444444444444' ||
      cnpj === '55555555555555' ||
      cnpj === '66666666666666' ||
      cnpj === '77777777777777' ||
      cnpj === '88888888888888' ||
      cnpj === '99999999999999'
    )
      return false;

    let tamanho = cnpj.length - 2;
    let numeros = cnpj.substring(0, tamanho);
    const digitos = cnpj.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;

    for (let i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2) pos = 9;
    }

    let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado !== Number(digitos.charAt(0))) return false;

    tamanho += 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;

    for (let i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2) pos = 9;
    }

    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado !== Number(digitos.charAt(1))) return false;

    return true;
  }

  static validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, '');

    if (cpf.length !== 11) {
      return false;
    }

    if (/^(\d)\1+$/.test(cpf)) {
      return false;
    }

    let sum = 0;
    for (let i = 0; i < 9; i += 1) {
      sum += Number(cpf.charAt(i)) * (10 - i);
    }
    let mod = sum % 11;
    let digit = mod < 2 ? 0 : 11 - mod;
    if (digit !== Number(cpf.charAt(9))) {
      return false;
    }

    sum = 0;
    for (let i = 0; i < 10; i += 1) {
      sum += Number(cpf.charAt(i)) * (11 - i);
    }
    mod = sum % 11;
    digit = mod < 2 ? 0 : 11 - mod;
    if (digit !== Number(cpf.charAt(10))) {
      return false;
    }

    return true;
  }

  static validarEmail(email) {
    const regex =
      /(?:[a-z0-9+!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i;
    return regex.test(email);
  }

  static erroValidacao(input, erro) {
    const span = document.createElement('span');
    span.style.color = 'red';
    span.innerText = `Erro no ${erro}`;
    input.insertAdjacentElement('afterend', span);
    return span;
  }

  limparInput() {
    const inputs = this.form.querySelectorAll('input, textarea');
    inputs.forEach((item) => {
      const input = item;
      input.value = '';
    });
  }

  async handleClick(event) {
    event.preventDefault();
    console.log(typeof this.form);
    const cpf = this.form.querySelector("input[name='cpf']");
    const email = this.form.querySelector('#email');
    const telefoneInput = this.form.querySelector('#cel');
    const telefone = telefoneInput ? telefoneInput.value : '';
    const nome = this.form.querySelector("input[name='fullName']");

    if (nome.value.length < 3) {
      alert('Insira um nome valido');
      return;
    }

    if (telefone && !Formulario.validarTelefone(telefone)) {
      alert('Telefone inválido!');
      return;
    }

    if (
      cpf &&
      cpf.value !== '' &&
      !Formulario.validarCPF(Formulario.formatarCPF(cpf.value))
    ) {
      Formulario.erroValidacao(cpf, 'cpf');
      return;
    }

    if (email && email.value !== '' && !Formulario.validarEmail(email.value)) {
      Formulario.erroValidacao(telefone, 'telefone');
      return;
    }

    if (this.method === ('GET' || 0)) {
      fetchDados(this.url, this.method).then((response) =>
        console.log(response),
      );
    } else {
      const formData = new FormData(this.form);
      const formJson = {};
      // eslint-disable-next-line no-restricted-syntax
      for (const [key, value] of formData) {
        formJson[key] = value;
      }
      try {
        await fetchDados(this.url, this.method, this.headers, formJson);
        this.limparInput();
        alert('Enviado!');
      } catch (error) {
        console.log(error);
      }
    }
  }

  addEventListeners() {
    this.button.addEventListener('click', this.handleClick);
  }

  init() {
    if (this.button) this.addEventListeners();
    return this;
  }
}

;// CONCATENATED MODULE: ./src/modules/Carousel.js



class FormCarousel {
  constructor(form, proximo, anterior, nav) {
    this.form = document.querySelector(form);
    this.proximo = document.querySelector(proximo);
    this.anterior = document.querySelector(anterior);
    this.nav = document.querySelectorAll(nav);
    this.activeClass = 'ativo';
    this.index = 0;
    this.currentNav = this.nav[this.index];
    if (this.form) {
      this.currentForm = this.form.children[this.index];
      this.cpfInput = this.currentForm.querySelector('#cpf');
      this.email = this.currentForm.querySelector('#email');
      this.cel = this.form.querySelectorAll('input[name="phone"]');
    }

    this.handleClickNext = this.handleClickNext.bind(this);
    this.handleClickPrev = this.handleClickPrev.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault()
    console.log('handlesubmit');

    const sender = {};
    const recipient = {};
    const senderInputs = document.querySelectorAll(
      '[data-fazer-pedido="sender"] input, [data-fazer-pedido="sender"] select, [data-fazer-pedido="sender"] textarea',
    );
    senderInputs.forEach((input) => {
      sender[input.name] = input.value;
    });
    const recipientInputs = document.querySelectorAll(
      '[data-fazer-pedido="recipient"] input, [data-fazer-pedido="recipient"] select, [data-fazer-pedido="recipient"] textarea',
    );
    recipientInputs.forEach((input) => {
      recipient[input.name] = input.value;
    });

    const formJson = {
      sender,
      recipient,
    };

    const termos = document.querySelector('#termos');

    if (termos && !termos.checked) {
      termos.classList.add("erro")
      return;
    }

    if (!Formulario.validarTelefone(this.cel[this.index].value)) {
      termos.classList.add("erro")
      return;
    }

    const img = document.createElement('img');
    img.src = './assets/img/loading.svg';
    img.className = 'rotate-image';
    this.currentForm.appendChild(img);
    try {
      await fetchDados(
        `https://zoe-production-4a9e.up.railway.app/order`,
        'POST',
        { 'Content-Type': 'application/json' },
        formJson,
      ).then((response) => {
        if (!response.ok) {
          console.log(this.currentForm);
          this.currentForm.innerHTML = `<p>${response.ok}</p>`;
        }
        console.log('foi');
      });

    } catch (error) {
      console.error(error);
      this.currentForm.innerHTML = `<p>deu erro ${error}<p>`
    } finally {
      this.limparInput();
      this.currentForm.removeChild(img);
    }
  }

  handleClickNext(event) {
    event.preventDefault();
    if (
      !(
        Formulario.validarCPF(Formulario.formatarCPF(this.cpfInput.value)) ||
        Formulario.validarCNPJ(Formulario.formatarCNPJ(this.cpfInput.value))
      )
    ) {
      alert('CPF/CNPJ inválido!');
      this.cpfInput.focus();
      return;
    }

    if (!Formulario.validarEmail(this.email.value)) {
      alert('Email inválido!');
      this.email.focus();
      return;
    }

    if (!Formulario.validarTelefone(this.cel[this.index].value)) {
      alert('Insira um telefone válido');
      return;
    }

    if (this.index <= (this.form.length - 1)) {
      this.index += 1;
      console.log(this.index);
      // this.form.forEach((item) => item.classList.remove(this.activeClass));
      const { children } = this.form;
      for (let i = 0; i < children.length; i += 1) {
        const item = children[i];
        item.classList.remove(this.activeClass);
      }
      this.currentForm = this.form.children[this.index];
      this.currentForm.classList.add(this.activeClass);

      this.nav.forEach((item) => item.classList.remove(this.activeClass));
      this.currentNav = this.nav[this.index];
      this.currentNav.classList.add(this.activeClass);

      console.log(this.form);

      if (this.index === this.form.children.length - 1) {
        this.form.addEventListener('submit', this.handleSubmit);
      }
    }

    this.addEventListeners(this.index);
  }

  handleClickPrev(event) {
    event.preventDefault();
    if (this.index >= 0) {
      this.index -= 1;
      console.log(this.index);
      const { children } = this.form;
      for (let i = 0; i < children.length; i += 1) {
        const item = children[i];
        item.classList.remove(this.activeClass);
      }
      this.currentForm = this.form.children[this.index];
      this.currentForm.classList.add(this.activeClass);

      this.nav.forEach((item) => item.classList.remove(this.activeClass));
      this.currentNav = this.nav[this.index];
      this.currentNav.classList.add(this.activeClass);
    }
  }

  formatarCPForCPNJ(value) {
    if (value.length > 18) {
      value = value.slice(0, 18);
    }

    if (value.length <= 14) {
      this.cpfInput.value = Formulario.formatarCPF(value);
      if (Formulario.validarCPF(Formulario.formatarCPF(value))) {
        this.cpfInput.classList.remove('erro');
      } else {
        this.cpfInput.classList.add('erro');
      }
    } else {
      this.cpfInput.value = Formulario.formatarCNPJ(value);
      if (Formulario.validarCNPJ(Formulario.formatarCNPJ(value))) {
        this.cpfInput.classList.remove('erro');
      } else {
        this.cpfInput.classList.add('erro');
      }
    }
  }

  limparInput() {
    const inputs = this.form.querySelectorAll('input, textarea');
    inputs.forEach((item) => {
      const input = item;
      input.value = '';
    });
  }

  addEventListeners() {
    this.proximo.addEventListener('click', this.handleClickNext);
    this.anterior.addEventListener('click', this.handleClickPrev);

    this.cpfInput.addEventListener('input', () => {
      this.formatarCPForCPNJ(this.cpfInput.value);
    });

    // const inputCel = this.currentForm.querySelector("#cel");
    // inputCel.addEventListener("input", (event)=>{
    //   console.log(inputCel.value)
    //   inputCel.value = this.formatarCel(event.target.value)

    // })
    this.cel.forEach((cel) => {
      cel.addEventListener('input', (event) => {
        console.log(this.cel[2]);
        const phone = cel;
        phone.value = Formulario.formatarTelefone(event.target.value);
      });
    });
  }

  init() {
    if (this.form) {
      console.log(this.form);
      this.addEventListeners();
      this.currentForm.classList.add(this.activeClass);
      this.currentNav.classList.add(this.activeClass);
    }
    return this;
  }
}

;// CONCATENATED MODULE: ./src/index.js








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

const simularValor = new SimularValores(
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

/******/ })()
;