export default class Proximo {
  constructor(lista, proximo, anterior) {
    this.lista = document.querySelectorAll(lista);
    this.proximo = document.querySelector(proximo);
    this.anterior = document.querySelector(anterior);
    this.activeClass = 'ativo';
    this.handleClickNext = this.handleClickNext.bind(this);
    this.handleClickPrev = this.handleClickPrev.bind(this);
  }

  handleClickNext(event) {
    event.preventDefault();
    this.lista[0].nextElementSibling.classList.add(this.activeClass);
    this.lista[0].classList.remove(this.activeClass);
  }

  handleClickPrev(event) {
    event.preventDefault();
    this.lista[1].previousElementSibling.classList.add(this.activeClass);
    this.lista[1].classList.remove(this.activeClass);
  }

  addButtonEvent() {
    this.proximo.addEventListener('click', this.handleClickNext);
    this.anterior.addEventListener('click', this.handleClickPrev);
  }

  init() {
    if (this.lista.length) {
      this.addButtonEvent();
      console.log(this.lista);
      this.lista[0].classList.add(this.activeClass);
    }
    return this;
  }
}
