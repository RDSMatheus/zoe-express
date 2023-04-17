export default class SimularValores {
  constructor(abrir, form, container) {
    this.abrir = document.querySelector(abrir);
    this.form = document.querySelectorAll(`${form} select`);
    this.container = document.querySelector(container);

    this.handleClick = this.handleClick.bind(this);
    this.dadosFetch = this.dadosFetch.bind(this);
  }

  async dadosFetch() {
    const img = document.createElement('img');
    img.src = './assets/img/loading.svg';
    img.className = "rotate-image";
    this.container.appendChild(img);
    try {
      const dados = await fetch(
        'https://zoe-production-4a9e.up.railway.app/product',
      );
      const dadosJson = await dados.json();
      console.log(dadosJson);
      return dadosJson;
    } catch (error) {
      console.log(error);
    } finally{
      this.container.removeChild(img)
    }
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

      dadosJson.forEach((item) => {
        const [origem, destino] = item.name.toLowerCase().split('x');
        if (
          (origem === select1 && destino === select2) ||
          (origem === select2 && destino === select1)
        ) {
          value = item.price;
        }
        console.log(origem);
      });
      if (value) {
        console.log(value);
        this.createDiv(value);
      }
      console.log(`${select1},${select2}`);
    });
  }

  addEventListeners() {
    this.abrir.addEventListener('click', this.handleClick);
  }

  init() {
    if (this.abrir) this.addEventListeners();
  }
}
