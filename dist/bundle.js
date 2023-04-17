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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_ProximoItem_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/ProximoItem.js */ \"./src/modules/ProximoItem.js\");\n/* harmony import */ var _modules_FixedContainer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/FixedContainer.js */ \"./src/modules/FixedContainer.js\");\n/* harmony import */ var _modules_NavFixed_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/NavFixed.js */ \"./src/modules/NavFixed.js\");\n/* harmony import */ var _modules_SlideIn_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/SlideIn.js */ \"./src/modules/SlideIn.js\");\n/* harmony import */ var _modules_SimularValor_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/SimularValor.js */ \"./src/modules/SimularValor.js\");\n/* harmony import */ var _modules_fetchDados_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/fetchDados.js */ \"./src/modules/fetchDados.js\");\n\n\n\n\n\n\n\nconst menuMobile = new _modules_FixedContainer_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"](\n  '#btn-menu-mobile',\n  '.menu-mobile',\n  '#btn-mobile-fechar',\n);\nmenuMobile.init();\n\n//container de rastreio\nconst containerRastreio = new _modules_FixedContainer_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"](\n  '#btn-rastreio',\n  '[data-rastreio]',\n  '#btn-rastreio-fechar',\n);\ncontainerRastreio.init();\n\nconst simularValor = new _modules_SimularValor_js__WEBPACK_IMPORTED_MODULE_4__[\"default\"](\n  '#btn-consultar-valor',\n  \"[data-form='simular-valor']\",\n  \"[data-form='simular-valor']\",\n);\nsimularValor.init();\n\nconst proximoFormulario = new _modules_ProximoItem_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](\n  '[data-fazer-pedido]',\n  '.btn.proximo',\n  '.btn.anterior',\n);\nproximoFormulario.init();\n\nconst navFixed = new _modules_NavFixed_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"]('.navegacao-bg');\nnavFixed.init();\n\nconst anime = new _modules_SlideIn_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"]('[data-anime]');\nanime.init();\n\n\n//# sourceURL=webpack://zoe-express-build/./src/index.js?");

/***/ }),

/***/ "./src/modules/FixedContainer.js":
/*!***************************************!*\
  !*** ./src/modules/FixedContainer.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ FixedContainer)\n/* harmony export */ });\nclass FixedContainer {\n  constructor(abrir, container, fechar) {\n    this.abrir = document.querySelector(abrir);\n    this.container = document.querySelector(container);\n    this.fechar = document.querySelector(fechar);\n    this.activeClass = 'ativo';\n\n    this.toggleMenu = this.toggleMenu.bind(this);\n  }\n\n  toggleMenu(event) {\n    event.preventDefault()\n    this.container.classList.toggle(this.activeClass);\n  }\n\n  addEventListeners() {\n    this.abrir.addEventListener('click', this.toggleMenu);\n    this.fechar.addEventListener('click', this.toggleMenu);\n  }\n\n  init() {\n    if (this.abrir) {\n      this.addEventListeners();\n    }\n    return this;\n  }\n}\n\n\n//# sourceURL=webpack://zoe-express-build/./src/modules/FixedContainer.js?");

/***/ }),

/***/ "./src/modules/NavFixed.js":
/*!*********************************!*\
  !*** ./src/modules/NavFixed.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ NavFixed)\n/* harmony export */ });\nclass NavFixed {\n  constructor(nav) {\n    this.nav = document.querySelector(nav);\n    this.handleScroll = this.handleScroll.bind(this);\n  }\n\n  handleScroll() {\n    const windowHeight = window.scrollY - 25;\n    const { height } = this.nav.getBoundingClientRect();\n    if (windowHeight > height) {\n      this.nav.classList.add(\"ativo\")\n    } else {\n      this.nav.classList.remove(\"ativo\")\n    }\n    \n  }\n\n  addEventListeners() {\n    window.addEventListener('scroll', ()=>{\n      this.handleScroll();\n      window.removeEventListener(\"scroll\", this.handleScroll)\n    });\n  }\n\n  init() {\n    this.addEventListeners();\n  }\n}\n\n\n//# sourceURL=webpack://zoe-express-build/./src/modules/NavFixed.js?");

/***/ }),

/***/ "./src/modules/ProximoItem.js":
/*!************************************!*\
  !*** ./src/modules/ProximoItem.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Proximo)\n/* harmony export */ });\nclass Proximo {\n  constructor(lista, proximo, anterior) {\n    this.lista = document.querySelectorAll(lista);\n    this.proximo = document.querySelector(proximo);\n    this.anterior = document.querySelector(anterior);\n    this.activeClass = 'ativo';\n    this.handleClickNext = this.handleClickNext.bind(this);\n    this.handleClickPrev = this.handleClickPrev.bind(this);\n  }\n\n  handleClickNext(event) {\n    event.preventDefault();\n    this.lista[0].nextElementSibling.classList.add(this.activeClass);\n    this.lista[0].classList.remove(this.activeClass);\n  }\n\n  handleClickPrev(event) {\n    event.preventDefault();\n    this.lista[1].previousElementSibling.classList.add(this.activeClass);\n    this.lista[1].classList.remove(this.activeClass);\n  }\n\n  addButtonEvent() {\n    this.proximo.addEventListener('click', this.handleClickNext);\n    this.anterior.addEventListener('click', this.handleClickPrev);\n  }\n\n  init() {\n    if (this.lista.length) {\n      this.addButtonEvent();\n      console.log(this.lista);\n      this.lista[0].classList.add(this.activeClass);\n    }\n    return this;\n  }\n}\n\n\n//# sourceURL=webpack://zoe-express-build/./src/modules/ProximoItem.js?");

/***/ }),

/***/ "./src/modules/SimularValor.js":
/*!*************************************!*\
  !*** ./src/modules/SimularValor.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ SimularValores)\n/* harmony export */ });\nclass SimularValores {\n  constructor(abrir, form, container) {\n    this.abrir = document.querySelector(abrir);\n    this.form = document.querySelectorAll(`${form} select`);\n    this.container = document.querySelector(container);\n\n    this.handleClick = this.handleClick.bind(this);\n    this.dadosFetch = this.dadosFetch.bind(this);\n  }\n\n  async dadosFetch() {\n    const img = document.createElement('img');\n    img.src = './assets/img/loading.svg';\n    img.className = \"rotate-image\";\n    this.container.appendChild(img);\n    try {\n      const dados = await fetch(\n        'https://zoe-production-4a9e.up.railway.app/product',\n      );\n      const dadosJson = await dados.json();\n      console.log(dadosJson);\n      return dadosJson;\n    } catch (error) {\n      console.log(error);\n    } finally{\n      this.container.removeChild(img)\n    }\n  }\n\n  createDiv(valor) {\n    const divAnterior = this.container.querySelector('.valores-popup');\n    if (divAnterior) {\n      this.container.removeChild(divAnterior);\n    }\n    const div = document.createElement('div');\n    div.className = 'valores-popup cor-p5 ativo';\n    div.setAttribute('data-anime', 'slide-left');\n    div.innerHTML = `\n    <h1>VALOR R$${valor},00</h1>\n  `;\n    this.container.appendChild(div);\n    return div;\n  }\n\n  handleClick(event) {\n    event.preventDefault();\n    this.dadosFetch().then((dadosJson) => {\n      const select1 = this.form[0].value.toLowerCase();\n      const select2 = this.form[1].value.toLowerCase();\n\n      let value = null;\n\n      dadosJson.forEach((item) => {\n        const [origem, destino] = item.name.toLowerCase().split('x');\n        if (\n          (origem === select1 && destino === select2) ||\n          (origem === select2 && destino === select1)\n        ) {\n          value = item.price;\n        }\n        console.log(origem);\n      });\n      if (value) {\n        console.log(value);\n        this.createDiv(value);\n      }\n      console.log(`${select1},${select2}`);\n    });\n  }\n\n  addEventListeners() {\n    this.abrir.addEventListener('click', this.handleClick);\n  }\n\n  init() {\n    if (this.abrir) this.addEventListeners();\n  }\n}\n\n\n//# sourceURL=webpack://zoe-express-build/./src/modules/SimularValor.js?");

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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ fetchDados)\n/* harmony export */ });\nfunction fetchDados(url, method, form) {\n  const formValue = document.querySelector(form);\n\n  if (formValue) {\n    const formData = new FormData(formValue);\n    function clearInput() {\n      const inputs = document.querySelectorAll(`${form} input, textarea`);\n      inputs.forEach((input) => {\n        input.value = '';\n      });\n    }\n\n    formValue.addEventListener('submit', async (event) => {\n      event.preventDefault();\n\n      const jsonObject = {};\n      for (const [key, value] of formData.entries()) {\n        jsonObject[key] = value;\n      }\n      const JSONForm = JSON.stringify(jsonObject);\n\n      const options = {\n        method: method,\n      };\n\n      const fetchMethod = method.toUpperCase();\n\n      if (fetchMethod === 'POST') {\n        options.body = JSONForm;\n        options.headers = {\n          'Content-Type': 'application/json; charset=utf-8',\n        };\n      }\n\n      console.log(options);\n\n      try {\n        const fetchDados = await fetch(url);\n        const jsonDados = await fetchDados.json();\n        return jsonDados;\n      } catch (error) {\n        console.error('Erro ao analisar o JSON:', error);\n      }\n\n      clearInput();\n    });\n  }\n}\n\n\n//# sourceURL=webpack://zoe-express-build/./src/modules/fetchDados.js?");

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