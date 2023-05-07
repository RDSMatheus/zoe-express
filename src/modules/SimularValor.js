import Loading from './Loading';
import calcularBairro from './calcularBairro';
import fetchDados from './fetchDados';

export default class SimularValores {
  constructor(abrir, form, container) {
    this.abrir = document.querySelector(abrir);
    this.form = document.querySelectorAll(`${form} select`);
    this.container = document.querySelector(container);

    this.handleClick = this.handleClick.bind(this);
    this.dadosFetch = this.dadosFetch.bind(this);
  }

  async dadosFetch() {
    if (this.form[0].value && this.form[1].value) {
      const loading = Loading();
      this.container.appendChild(loading);
      try {
        const dadosFetch = await fetchDados(
          'https://zoe-production-06b7.up.railway.app/product',
          'GET',
        );
        const dadosJson = await dadosFetch.json();
        console.log(dadosJson);
        return dadosJson;
      } catch (error) {
        console.log(error);
      } finally {
        this.container.removeChild(loading);
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
    <h1>${valor}</h1>
  `;
    this.container.appendChild(div);
    return div;
  }

  async handleClick(event) {
    event.preventDefault();
    let value = null;
    let bairroEncontrado = false;
    this.dadosFetch().then(async (dadosJson) => {
      const select1 = this.form[0].value
        .toLowerCase()
        .replace(/-/g, ' ')
        .trim();
      const select2 = this.form[1].value
        .toLowerCase()
        .replace(/-/g, ' ')
        .trim();

      if (dadosJson) {
        // eslint-disable-next-line no-restricted-syntax
        for (const item of dadosJson) {
          const origem = item.source.toLowerCase();
          const destino = item.destination.toLowerCase();
          if (
            ((origem === select1 && destino === select2) ||
              (origem === select2 && destino === select1)) &&
            !bairroEncontrado
          ) {
            value = item.price;
            console.log(value);
            if (value) {
              this.createDiv(`Valor: R$${value.toFixed(2).replace('.', ',')}`);
              return;
            }
          }
          if (origem === select1 && origem === select2 && !bairroEncontrado) {
            const districtsInput = document.querySelectorAll('.district input');
            // eslint-disable-next-line no-await-in-loop
            const valueBairro = await calcularBairro(
              districtsInput[0].value.toLowerCase().trim(),
              districtsInput[1].value.toLowerCase().trim(),
            );
            // eslint-disable-next-line no-await-in-loop
            value = await valueBairro;
            console.log(value);
            if (value) {
              console.log(
                this.createDiv(
                  `Valor: R$${value.toFixed(2).replace('.', ',')}`,
                ),
              );
              bairroEncontrado = true;
            }
          }
        }
        if (!value && !bairroEncontrado) {
          alert('Insira o bairro correto');
          this.createDiv('[ERRO] Bairro Incorreto');
        }
      } else {
        window.alert('[ERROR] Insira um valor válido!');
      }
    });
  }

  showDistrict() {
    const districts = document.querySelectorAll('.district');
    districts.forEach((district) => district.classList.remove('ativo'));
    if (this.form[0].value === this.form[1].value) {
      districts.forEach((district) => district.classList.add('ativo'));
    }
  }

  addEventListeners() {
    this.abrir.addEventListener('click', this.handleClick);
    this.form.forEach((select) =>
      select.addEventListener('change', this.showDistrict),
    );
  }

  init() {
    if (this.abrir) this.addEventListeners();
  }
}
