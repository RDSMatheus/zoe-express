/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_FixedContainer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/FixedContainer */ \"./src/modules/FixedContainer.js\");\n/* harmony import */ var _modules_NavFixed__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/NavFixed */ \"./src/modules/NavFixed.js\");\n/* harmony import */ var _modules_SlideIn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/SlideIn */ \"./src/modules/SlideIn.js\");\n/* harmony import */ var _modules_SimularValor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/SimularValor */ \"./src/modules/SimularValor.js\");\n/* harmony import */ var _modules_EnviarFormulario__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/EnviarFormulario */ \"./src/modules/EnviarFormulario.js\");\n/* harmony import */ var _modules_FormWizard__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/FormWizard */ \"./src/modules/FormWizard.js\");\n\n\n\n\n\n\n\nconst menuMobile = new _modules_FixedContainer__WEBPACK_IMPORTED_MODULE_0__[\"default\"](\n  '#btn-menu-mobile',\n  '.menu-mobile',\n  '#btn-mobile-fechar',\n);\nmenuMobile.init();\n\n// container de rastreio\nconst containerRastreio = new _modules_FixedContainer__WEBPACK_IMPORTED_MODULE_0__[\"default\"](\n  '#btn-rastreio',\n  '[data-rastreio]',\n  '#btn-rastreio-fechar',\n);\ncontainerRastreio.init();\n\nconst containerTermos = new _modules_FixedContainer__WEBPACK_IMPORTED_MODULE_0__[\"default\"](\n  '#abrir-termos',\n  '[data-termos]',\n  '#btn-termos-fechar',\n);\ncontainerTermos.init();\n\nconst simularValor = new _modules_SimularValor__WEBPACK_IMPORTED_MODULE_3__[\"default\"](\n  '#btn-consultar-valor',\n  \"[data-form='simular-valor']\",\n  \"[data-form='simular-valor']\",\n);\nsimularValor.init();\n\nconst headersContato = { 'Content-Type': 'application/json' };\nconst enviarContato = new _modules_EnviarFormulario__WEBPACK_IMPORTED_MODULE_4__[\"default\"](\n  '#enviar-contato',\n  \"[data-form='contato']\",\n  'https://zoe-production-4a9e.up.railway.app/contact',\n  'POST',\n  headersContato,\n);\nenviarContato.init();\n\nconst navFixed = new _modules_NavFixed__WEBPACK_IMPORTED_MODULE_1__[\"default\"]('.navegacao-bg');\nnavFixed.init();\n\nconst anime = new _modules_SlideIn__WEBPACK_IMPORTED_MODULE_2__[\"default\"]('[data-anime]');\nanime.init();\n\nconst formMultiStep = new _modules_FormWizard__WEBPACK_IMPORTED_MODULE_5__[\"default\"](\n  '[data-fazer-pedido]',\n  '.cadastro-nav-item',\n);\nformMultiStep.init();\n\n\n\n//# sourceURL=webpack://zoe-express-build/./src/index.js?");

/***/ }),

/***/ "./src/modules/EnviarFormulario.js":
/*!*****************************************!*\
  !*** ./src/modules/EnviarFormulario.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Formulario)\n/* harmony export */ });\n/* harmony import */ var _fetchDados__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fetchDados */ \"./src/modules/fetchDados.js\");\n\n\nclass Formulario {\n  constructor(button, form, url, method, header) {\n    this.button = document.querySelector(button);\n    this.form = document.querySelector(form);\n    this.url = url;\n    this.method = method;\n    this.headers = header;\n\n    this.handleClick = this.handleClick.bind(this);\n  }\n\n  static validarTelefone(telefone) {\n    let telefoneValidar = telefone;\n    telefoneValidar = telefoneValidar.replace(/[^\\d]+/g, '');\n\n    if (telefoneValidar.length !== 10 && telefoneValidar.length !== 11) {\n      return false;\n    }\n\n    const ddd = telefoneValidar.substring(0, 2);\n    if (\n      ![\n        '11',\n        '12',\n        '13',\n        '14',\n        '15',\n        '16',\n        '17',\n        '18',\n        '19',\n        '21',\n        '22',\n        '24',\n        '27',\n        '28',\n        '31',\n        '32',\n        '33',\n        '34',\n        '35',\n        '37',\n        '38',\n        '41',\n        '42',\n        '43',\n        '44',\n        '45',\n        '46',\n        '47',\n        '48',\n        '49',\n        '51',\n        '53',\n        '54',\n        '55',\n        '61',\n        '62',\n        '63',\n        '64',\n        '65',\n        '66',\n        '67',\n        '68',\n        '69',\n        '71',\n        '73',\n        '74',\n        '75',\n        '77',\n        '79',\n        '81',\n        '82',\n        '83',\n        '84',\n        '85',\n        '86',\n        '87',\n        '88',\n        '89',\n        '91',\n        '92',\n        '93',\n        '94',\n        '95',\n        '96',\n        '97',\n        '98',\n        '99',\n      ].includes(ddd)\n    ) {\n      return false;\n    }\n\n    return true;\n  }\n\n  static formatarCPF(cpf) {\n    cpf = cpf.replace(/\\D/g, '');\n    cpf = cpf.replace(/^(\\d{3})(\\d)/, '$1.$2');\n    cpf = cpf.replace(/^(\\d{3})\\.(\\d{3})(\\d)/, '$1.$2.$3');\n    cpf = cpf.replace(/\\.(\\d{3})(\\d)/, '.$1-$2');\n    return cpf;\n  }\n\n  static formatarCNPJ(cnpj) {\n    cnpj = cnpj.replace(/\\D/g, ''); // remove caracteres não numéricos\n    cnpj = cnpj.replace(/^(\\d{2})(\\d)/, '$1.$2');\n    cnpj = cnpj.replace(/^(\\d{2})\\.(\\d{3})(\\d)/, '$1.$2.$3');\n    cnpj = cnpj.replace(/\\.(\\d{3})(\\d)/, '.$1/$2');\n    cnpj = cnpj.replace(/(\\d{4})(\\d)/, '$1-$2');\n    return cnpj;\n  }\n\n  static validarCNPJ(cnpj) {\n    cnpj = cnpj.replace(/[^\\d]+/g, '');\n\n    if (cnpj.length !== 14) return false;\n\n    if (\n      cnpj === '00000000000000' ||\n      cnpj === '11111111111111' ||\n      cnpj === '22222222222222' ||\n      cnpj === '33333333333333' ||\n      cnpj === '44444444444444' ||\n      cnpj === '55555555555555' ||\n      cnpj === '66666666666666' ||\n      cnpj === '77777777777777' ||\n      cnpj === '88888888888888' ||\n      cnpj === '99999999999999'\n    )\n      return false;\n\n    let tamanho = cnpj.length - 2;\n    let numeros = cnpj.substring(0, tamanho);\n    const digitos = cnpj.substring(tamanho);\n    let soma = 0;\n    let pos = tamanho - 7;\n\n    for (let i = tamanho; i >= 1; i--) {\n      soma += numeros.charAt(tamanho - i) * pos--;\n      if (pos < 2) pos = 9;\n    }\n\n    let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);\n    if (resultado !== Number(digitos.charAt(0))) return false;\n\n    tamanho += 1;\n    numeros = cnpj.substring(0, tamanho);\n    soma = 0;\n    pos = tamanho - 7;\n\n    for (let i = tamanho; i >= 1; i--) {\n      soma += numeros.charAt(tamanho - i) * pos--;\n      if (pos < 2) pos = 9;\n    }\n\n    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);\n    if (resultado !== Number(digitos.charAt(1))) return false;\n\n    return true;\n  }\n\n  static validarCPF(cpf) {\n    cpf = cpf.replace(/[^\\d]+/g, '');\n\n    if (cpf.length !== 11) {\n      return false;\n    }\n\n    if (/^(\\d)\\1+$/.test(cpf)) {\n      return false;\n    }\n\n    let sum = 0;\n    for (let i = 0; i < 9; i += 1) {\n      sum += Number(cpf.charAt(i)) * (10 - i);\n    }\n    let mod = sum % 11;\n    let digit = mod < 2 ? 0 : 11 - mod;\n    if (digit !== Number(cpf.charAt(9))) {\n      return false;\n    }\n\n    sum = 0;\n    for (let i = 0; i < 10; i += 1) {\n      sum += Number(cpf.charAt(i)) * (11 - i);\n    }\n    mod = sum % 11;\n    digit = mod < 2 ? 0 : 11 - mod;\n    if (digit !== Number(cpf.charAt(10))) {\n      return false;\n    }\n\n    return true;\n  }\n\n  static validarEmail(email) {\n    const regex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;\n    return regex.test(email);\n  }\n\n  static erroValidacao(input, erro) {\n    const span = document.createElement('span');\n    span.style.color = 'red';\n    span.innerText = `Erro no ${erro}`;\n    input.insertAdjacentElement('afterend', span);\n    return span;\n  }\n\n  limparInput() {\n    const inputs = this.form.querySelectorAll('input, textarea');\n    inputs.forEach((item) => {\n      const input = item;\n      input.value = '';\n    });\n  }\n\n  async handleClick(event) {\n    event.preventDefault();\n    console.log(typeof this.form);\n    const cpf = this.form.querySelector(\"input[name='cpf']\");\n    const email = this.form.querySelector('#email');\n    const telefoneInput = this.form.querySelector('#cel');\n    const telefone = telefoneInput ? telefoneInput.value : '';\n    const nome = this.form.querySelector(\"input[name='fullName']\");\n\n    if (nome.value.length < 3) {\n      alert('Insira um nome valido');\n      return;\n    }\n\n    if (telefone && !Formulario.validarTelefone(telefone)) {\n      alert('Telefone inválido!');\n      return;\n    }\n\n    if (\n      cpf &&\n      cpf.value !== '' &&\n      !Formulario.validarCPF(Formulario.formatarCPF(cpf.value))\n    ) {\n      Formulario.erroValidacao(cpf, 'cpf');\n      return;\n    }\n\n    if (email && email.value !== '' && !Formulario.validarEmail(email.value)) {\n      Formulario.erroValidacao(telefone, 'telefone');\n      return;\n    }\n\n    if (this.method === ('GET' || 0)) {\n      (0,_fetchDados__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this.url, this.method).then((response) =>\n        console.log(response),\n      );\n    } else {\n      const formData = new FormData(this.form);\n      const formJson = {};\n      // eslint-disable-next-line no-restricted-syntax\n      for (const [key, value] of formData) {\n        formJson[key] = value;\n      }\n      try {\n        await (0,_fetchDados__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this.url, this.method, this.headers, formJson);\n        this.limparInput();\n        alert('Enviado!');\n      } catch (error) {\n        console.log(error);\n      }\n    }\n  }\n\n  addEventListeners() {\n    this.button.addEventListener('click', this.handleClick);\n  }\n\n  init() {\n    if (this.button) this.addEventListeners();\n    return this;\n  }\n}\n\n\n//# sourceURL=webpack://zoe-express-build/./src/modules/EnviarFormulario.js?");

/***/ }),

/***/ "./src/modules/FixedContainer.js":
/*!***************************************!*\
  !*** ./src/modules/FixedContainer.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ FixedContainer)\n/* harmony export */ });\nclass FixedContainer {\n  constructor(abrir, container, fechar) {\n    this.abrir = document.querySelector(abrir);\n    this.container = document.querySelector(container);\n    this.fechar = document.querySelector(fechar);\n    this.activeClass = 'ativo';\n\n    this.toggleMenu = this.toggleMenu.bind(this);\n  }\n\n  toggleMenu(event) {\n    event.preventDefault()\n    this.container.classList.toggle(this.activeClass);\n  }\n\n  addEventListeners() {\n    this.abrir.addEventListener('click', this.toggleMenu);\n    this.fechar.addEventListener('click', this.toggleMenu);\n  }\n\n  init() {\n    if (this.abrir) {\n      this.addEventListeners();\n    }\n    return this;\n  }\n}\n\n\n//# sourceURL=webpack://zoe-express-build/./src/modules/FixedContainer.js?");

/***/ }),

/***/ "./src/modules/FormWizard.js":
/*!***********************************!*\
  !*** ./src/modules/FormWizard.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ FormWizard)\n/* harmony export */ });\n/* harmony import */ var _fetchDados__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fetchDados */ \"./src/modules/fetchDados.js\");\n/* harmony import */ var _EnviarFormulario__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EnviarFormulario */ \"./src/modules/EnviarFormulario.js\");\n\n\n\nclass FormWizard {\n  constructor(forms, nav) {\n    this.forms = document.querySelectorAll(forms);\n    this.navItems = document.querySelectorAll(nav);\n    this.formIndex = 0;\n    this.currentForm = this.forms[this.formIndex];\n    if (this.currentForm) {\n      this.cpfInput = this.currentForm.querySelector('input[name=\"cpf\"]');\n    }\n\n    this.handleSubmit = this.handleSubmit.bind(this);\n  }\n\n  async handleSubmit(event) {\n    event.preventDefault();\n    const formData = new FormData(this.currentForm);\n    const formJson = Object.fromEntries([...formData]);\n    const termos = this.currentForm.querySelector('#termos');\n    if (termos) {\n      if(!termos.checked) {\n        alert(\"Leia os termos de serviço!\")\n        return;\n      }\n    }\n\n    if (this.cpfInput.length) {\n      if (\n        !(\n          _EnviarFormulario__WEBPACK_IMPORTED_MODULE_1__[\"default\"].validarCPF(_EnviarFormulario__WEBPACK_IMPORTED_MODULE_1__[\"default\"].formatarCPF(this.cpfInput.value)) ||\n          _EnviarFormulario__WEBPACK_IMPORTED_MODULE_1__[\"default\"].validarCNPJ(_EnviarFormulario__WEBPACK_IMPORTED_MODULE_1__[\"default\"].formatarCNPJ(this.cpfInput.value))\n        )\n      ) {\n        alert('CPF/CNPJ inválido!');\n        this.cpfInput.focus();\n        return;\n      }\n    }\n\n    const img = document.createElement('img');\n    img.src = './assets/img/loading.svg';\n    img.className = 'rotate-image';\n    this.currentForm.appendChild(img);\n    try {\n      await (0,_fetchDados__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(\n        `https://zoe-production-4a9e.up.railway.app/${this.currentForm.dataset.form}`,\n        'POST',\n        { 'Content-Type': 'application/json' },\n        formJson,\n      );\n      this.formIndex += 1;\n\n      this.limparInput();\n\n      if (this.formIndex < this.forms.length) {\n        this.currentForm.classList.remove('ativo');\n        this.navItems[this.formIndex - 1].classList.remove('ativo');\n        this.navItems[this.formIndex].classList.add('ativo');\n        this.currentForm = this.forms[this.formIndex];\n        this.currentForm.classList.add('ativo');\n        this.currentForm.addEventListener(\n          'submit',\n          this.handleSubmit.bind(this),\n        );\n      }\n    } catch (error) {\n      console.error(error);\n    } finally {\n      this.forms[this.formIndex - 1].removeChild(img);\n    }\n  }\n\n  formatarCPFCPNJ(value) {\n    if (value.length > 18) {\n      value = value.slice(0, 18);\n    }\n\n    if (value.length <= 14) {\n      this.cpfInput.value = _EnviarFormulario__WEBPACK_IMPORTED_MODULE_1__[\"default\"].formatarCPF(value);\n      if (_EnviarFormulario__WEBPACK_IMPORTED_MODULE_1__[\"default\"].validarCPF(_EnviarFormulario__WEBPACK_IMPORTED_MODULE_1__[\"default\"].formatarCPF(value))) {\n        this.cpfInput.classList.remove('erro');\n      } else {\n        this.cpfInput.classList.add('erro');\n      }\n    } else {\n      this.cpfInput.value = _EnviarFormulario__WEBPACK_IMPORTED_MODULE_1__[\"default\"].formatarCNPJ(value);\n      if (_EnviarFormulario__WEBPACK_IMPORTED_MODULE_1__[\"default\"].validarCNPJ(_EnviarFormulario__WEBPACK_IMPORTED_MODULE_1__[\"default\"].formatarCNPJ(value))) {\n        this.cpfInput.classList.remove('erro');\n      } else {\n        this.cpfInput.classList.add('erro');\n      }\n    }\n  }\n\n  limparInput() {\n    const inputs = this.currentForm.querySelectorAll('input, textarea, select');\n    inputs.forEach((item) => {\n      const input = item;\n      input.value = '';\n      input.checked = false\n    });\n  }\n\n  addEventListeners() {\n    this.currentForm.addEventListener('submit', this.handleSubmit);\n    this.cpfInput.addEventListener('input', () => {\n      this.formatarCPFCPNJ(this.cpfInput.value);\n    });\n  }\n\n  init() {\n    if (this.currentForm && this.cpfInput) {\n      this.addEventListeners();\n      this.currentForm.classList.add('ativo');\n      this.navItems[this.formIndex].classList.add('ativo');\n    }\n    return this;\n  }\n}\n\n\n//# sourceURL=webpack://zoe-express-build/./src/modules/FormWizard.js?");

/***/ }),

/***/ "./src/modules/NavFixed.js":
/*!*********************************!*\
  !*** ./src/modules/NavFixed.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ NavFixed)\n/* harmony export */ });\nclass NavFixed {\n  constructor(nav) {\n    this.nav = document.querySelector(nav);\n    this.handleScroll = this.handleScroll.bind(this);\n  }\n\n  handleScroll() {\n    const windowHeight = window.scrollY - 25;\n    const { height } = this.nav.getBoundingClientRect();\n    if (windowHeight > height) {\n      this.nav.classList.add(\"ativo\")\n    } else {\n      this.nav.classList.remove(\"ativo\")\n    }\n    \n  }\n\n  addEventListeners() {\n    window.addEventListener('scroll', ()=>{\n      this.handleScroll();\n      window.removeEventListener(\"scroll\", this.handleScroll)\n    });\n  }\n\n  init() {\n    this.addEventListeners();\n  }\n}\n\n\n//# sourceURL=webpack://zoe-express-build/./src/modules/NavFixed.js?");

/***/ }),

/***/ "./src/modules/SimularValor.js":
/*!*************************************!*\
  !*** ./src/modules/SimularValor.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ SimularValores)\n/* harmony export */ });\n/* harmony import */ var _fetchDados__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fetchDados */ \"./src/modules/fetchDados.js\");\n\n\nclass SimularValores {\n  constructor(abrir, form, container) {\n    this.abrir = document.querySelector(abrir);\n    this.form = document.querySelectorAll(`${form} select`);\n    this.container = document.querySelector(container);\n\n    this.handleClick = this.handleClick.bind(this);\n    this.dadosFetch = this.dadosFetch.bind(this);\n  }\n\n  async dadosFetch() {\n    if (this.form[0].value && this.form[1].value) {\n      const img = document.createElement('img');\n      img.src = './assets/img/loading.svg';\n      img.className = 'rotate-image';\n      this.container.appendChild(img);\n      try {\n        console.log(this.form[0].value);\n        console.log('olá');\n        const dadosJson = await (0,_fetchDados__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(\n          'https://zoe-production-4a9e.up.railway.app/product',\n          'GET',\n        );\n        console.log(dadosJson);\n        return dadosJson;\n      } catch (error) {\n        console.log(error);\n      } finally {\n        this.container.removeChild(img);\n      }\n    }\n    return null;\n  }\n\n  createDiv(valor) {\n    const divAnterior = this.container.querySelector('.valores-popup');\n    if (divAnterior) {\n      this.container.removeChild(divAnterior);\n    }\n    const div = document.createElement('div');\n    div.className = 'valores-popup cor-p5 ativo';\n    div.setAttribute('data-anime', 'slide-left');\n    div.innerHTML = `\n    <h1>VALOR R$${valor},00</h1>\n  `;\n    this.container.appendChild(div);\n    return div;\n  }\n\n  handleClick(event) {\n    event.preventDefault();\n    this.dadosFetch().then((dadosJson) => {\n      const select1 = this.form[0].value.toLowerCase();\n      const select2 = this.form[1].value.toLowerCase();\n\n      let value = null;\n\n      if (dadosJson) {\n        dadosJson.forEach((item) => {\n          const [origem, destino] = item.name.toLowerCase().split('x');\n          if (\n            (origem === select1 && destino === select2) ||\n            (origem === select2 && destino === select1)\n          ) {\n            value = item.price;\n          }\n        });\n      } else {\n        // eslint-disable-next-line no-alert\n        window.alert('[ERROR] Insira um valor válido!');\n      }\n\n      if (value) {\n        console.log(value);\n        this.createDiv(value);\n      }\n    });\n  }\n\n  addEventListeners() {\n    this.abrir.addEventListener('click', this.handleClick);\n  }\n\n  init() {\n    if (this.abrir) this.addEventListeners();\n  }\n}\n\n\n//# sourceURL=webpack://zoe-express-build/./src/modules/SimularValor.js?");

/***/ }),

/***/ "./src/modules/SlideIn.js":
/*!********************************!*\
  !*** ./src/modules/SlideIn.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ SlideIn)\n/* harmony export */ });\nclass SlideIn{\n  constructor(anime){\n    this.anime = document.querySelectorAll(anime);\n    this.handleScroll = this.handleScroll.bind(this);\n  }\n\n  handleScroll(){\n    const windowHeight = window.innerHeight * .6;\n\n    this.anime.forEach(item => {\n      const {top} = item.getBoundingClientRect();\n      const animeHeight = windowHeight - top > 0\n      if(animeHeight){\n        item.classList.add('ativo');\n      } else {\n        item.classList.remove('ativo');\n      }\n    })\n  }\n\n  addEventListeners(){\n    window.addEventListener('scroll', this.handleScroll);\n  }\n\n  init(){\n    this.addEventListeners();\n    this.anime[0].classList.add('ativo')\n    return this;\n  }\n}\n\n//# sourceURL=webpack://zoe-express-build/./src/modules/SlideIn.js?");

/***/ }),

/***/ "./src/modules/fetchDados.js":
/*!***********************************!*\
  !*** ./src/modules/fetchDados.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ fetchDados)\n/* harmony export */ });\nasync function fetchDados(\n  url,\n  method = 'GET',\n  headers = {},\n  body = null,\n) {\n  const options = { method, headers };\n  if (body) options.body = JSON.stringify(body);\n  try {\n    const response = await fetch(url, options);\n    if (!response.ok) {\n      throw new Error(`Erro ao buscar dados: ${response.status}`);\n    }\n  } catch (error) {\n    // eslint-disable-next-line no-console\n    console.error('Erro ao buscar dados:', error);\n    throw error;\n  }\n}\n\n\n//# sourceURL=webpack://zoe-express-build/./src/modules/fetchDados.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;