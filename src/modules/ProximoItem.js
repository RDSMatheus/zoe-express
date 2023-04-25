export default class Proximo {
  constructor(formulario, lista, proximo, nav, anterior = null) {
    this.formulario = formulario;
    this.lista = document.querySelectorAll(lista);
    this.proximo = document.querySelector(proximo);
    this.anterior = document.querySelector(anterior);
    this.nav = document.querySelectorAll(nav);
    this.activeClass = 'ativo';
    this.handleClickNext = this.handleClickNext.bind(this);
    this.handleClickPrev = this.handleClickPrev.bind(this);
  }

  activeNav(index) {
    this.nav.forEach((item) => {
      item.classList.remove(this.activeClass);
    });
    this.nav[index].classList.add(this.activeClass);
  }

  handleClickNext(event) {
    event.preventDefault();
      this.lista[0].nextElementSibling.classList.add(this.activeClass);
      this.lista[0].classList.remove(this.activeClass);
      this.activeNav(1);
  }

  handleClickPrev(event) {
    if (!this.anterior) return;
    event.preventDefault();
    this.lista[1].previousElementSibling.classList.add(this.activeClass);
    this.lista[1].classList.remove(this.activeClass);
    this.activeNav(0);
  }

  addButtonEvent() {
    this.proximo.addEventListener('click', this.handleClickNext);
    if (!this.anterior) return;
    this.anterior.addEventListener('click', this.handleClickPrev);
  }

  init() {
    if (this.lista.length) {
      this.addButtonEvent();
      console.log(this.lista);
      this.lista[0].classList.add(this.activeClass);
      this.activeNav(0);
    }
    return this;
  }
}
