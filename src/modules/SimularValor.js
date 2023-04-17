export default class SimularValores {
  constructor(abrir, form, container) {
    this.abrir = document.querySelector(abrir);
    this.form = document.querySelectorAll(`${form} select`);
    this.container = document.querySelector(container);

    this.handleClick = this.handleClick.bind(this);
    this.dadosFetch = this.dadosFetch.bind(this);
  }

  async dadosFetch() {
    try {
      const dados = await fetch(
        'https://zoe-production-4a9e.up.railway.app/product',
      );
      const dadosJson = await dados.json();
      return dadosJson;
    } catch (error) {
      console.log(error);
    }
  }

  createDiv(valor) {
    const div = document.createElement('div');
    div.innerText = `O valor do seu frete é R$${valor},00`;
    this.container.appendChild(div);
  }

  handleClick(event) {
    event.preventDefault();
    this.dadosFetch().then((dadosJson) => {
      const select1 = this.form[0].value.toLowerCase();
      const select2 = this.form[1].value.toLowerCase();

      let value;

      dadosJson.forEach((item) => {
        const [origem, destino] = ["bom-lugar", "lago-da-pedra"]
        // item.name.toLowerCase().split('x');
        if (
          (origem === select1 && destino === select2) ||
          (origem === select2 && destino === select1)
        ) {
          value = item.price;
        }
        console.log(origem, destino)
      });
      if (value) {
        console.log(value);
        this.createDiv(value);
      }
      console.log(select1, select2);
    });
  }

  addEventListeners() {
    this.abrir.addEventListener('click', this.handleClick);
  }

  init() {
    if (this.abrir) this.addEventListeners();
  }
}
