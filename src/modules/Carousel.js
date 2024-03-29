import Formulario from './Formulario';
import Loading from './Loading';
import calcularBairro from './calcularBairro';
import fetchDados from './fetchDados';

export default class FormCarousel {
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
      this.citySender = this.form.querySelector('#cidade-remetente');
      this.cityRecipient = this.form.querySelector('#cidade-destinatario');
      // this.price = this.form.querySelector('#preco');
      this.districts = this.form.querySelectorAll("[name='district']");
    }

    this.handleClickNext = this.handleClickNext.bind(this);
    this.handleClickPrev = this.handleClickPrev.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fetchProduct = this.fetchProduct.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault();
    const [productId, productPrice, cityPrice] = await this.fetchProduct();
    const senders = {};
    const recipients = {};
    const product = {};
    const nameRecipent = document.querySelector('#name-recipient');
    const sendersInputs = document.querySelectorAll(
      '[data-fazer-pedido="sender"] input, [data-fazer-pedido="sender"] select, [data-fazer-pedido="sender"] textarea',
    );
    sendersInputs.forEach((input) => {
      senders[input.name] = input.value;
    });
    const recipientsInputs = document.querySelectorAll(
      '[data-fazer-pedido="recipient"] input, [data-fazer-pedido="recipient"] select, [data-fazer-pedido="recipient"] textarea',
    );
    recipientsInputs.forEach((input) => {
      recipients[input.name] = input.value;
    });
    // const priceFormatado = Number(
    //   this.price.value.replace('R$', ' ').replace(',', '.'),
    // );
    product.price = productPrice;
    product.source = this.citySender.value;
    product.destination = this.cityRecipient.value;
    product.id = productId;
    if (cityPrice) {
      product.cityPrice = cityPrice;
    }
    const formJson = {
      senders,
      recipients,
      product,
      status: 'Aguardando pagamento',
    };
    console.log(formJson);

    const termos = document.querySelector('#termos');

    if (nameRecipent.value.length < 3) {
      alert('Nome inválido!');
      return;
    }

    if (termos && !termos.checked) {
      alert('Leia os termos!');
      termos.classList.add('erro');
      return;
    }

    if (!Formulario.validarTelefone(this.cel[this.index].value)) {
      alert('Telefone inválido');
      this.cel[this.index].classList.add('erro');
      return;
    }

    // if (!this.price.hasAttribute('readonly')) {
    //   alert('Não tente modificar o HTML!');
    //   this.limparInput();
    //   return;
    // }

    const loading = Loading();
    this.currentForm.appendChild(loading);

    try {
      const enviar = await fetchDados(
        `https://zoe-production-06b7.up.railway.app/order`,
        'POST',
        { 'Content-Type': 'application/json' },
        formJson,
      );

      const { children } = this.form;
      for (let i = 0; i < children.length; i += 1) {
        const item = children[i];
        item.classList.remove(this.activeClass);
      }

      const div = this.confirmacaoEnvio(enviar.ok);
      this.form.appendChild(div);

      div.querySelector('.voltar').addEventListener('click', (e) => {
        e.preventDefault();
        for (let i = 0; i < children.length; i += 1) {
          const item = children[i];
          item.classList.remove(this.activeClass);
          if (item.contains(loading)) {
            item.removeChild(loading);
          }
        }
        this.index = 0;
        this.currentForm = this.form.children[this.index];
        this.currentForm.classList.add(this.activeClass);
        this.nav.forEach((item) => item.classList.remove(this.activeClass));
        this.currentNav = this.nav[this.index];
        this.currentNav.classList.add(this.activeClass);
      });
      // this.limparInput();
    } catch (error) {
      const { children } = this.form;
      for (let i = 0; i < children.length; i += 1) {
        const item = children[i];
        item.classList.remove(this.activeClass);
      }

      const div = this.confirmacaoEnvio(false, error.message);
      this.form.appendChild(div);

      div.querySelector('.voltar').addEventListener('click', (e) => {
        e.preventDefault();
        for (let i = 0; i < children.length; i += 1) {
          const item = children[i];
          item.classList.remove(this.activeClass);
          if (item.contains(loading)) {
            item.removeChild(loading);
          }
        }
        this.index = 0;
        this.currentForm = this.form.children[this.index];
        this.currentForm.classList.add(this.activeClass);
        this.nav.forEach((item) => item.classList.remove(this.activeClass));
        this.currentNav = this.nav[this.index];
        this.currentNav.classList.add(this.activeClass);
      });
    }
  }

  async fetchProduct() {
    const produtos = await fetchDados(
      `https://zoe-production-06b7.up.railway.app/product`,
    );
    const produtosResponse = await produtos.json();
    const selectSender = this.citySender.value.toLowerCase().trim();
    const selectRecipient = this.cityRecipient.value.toLowerCase().trim();
    const districtsInput = document.querySelectorAll('[name="district"]');
    let productId;
    let productPrice;
    let productCity;
    let bairroEncontrado = false;
    // eslint-disable-next-line no-restricted-syntax
    for (const produto of produtosResponse) {
      const { source, destination, price, id, cityPrice } = produto;
      const sourceFormatado = source.toLowerCase().trim();
      const destinationFormatado = destination.toLowerCase().trim();
      const preco = this.form.querySelector('#preco');

      if (
        ((selectSender === sourceFormatado &&
          selectRecipient === destinationFormatado) ||
          (selectSender === destinationFormatado &&
            selectRecipient === sourceFormatado)) &&
        !bairroEncontrado
      ) {
        preco.value = `R$ ${price},00`;
        productId = id;
        productPrice = price;
      }

      if (
        selectSender === sourceFormatado &&
        selectRecipient === sourceFormatado &&
        cityPrice &&
        !bairroEncontrado
      ) {
        // eslint-disable-next-line no-await-in-loop
        const valueBairro = await calcularBairro(
          districtsInput[0].value.toLowerCase().trim(),
          districtsInput[1].value.toLowerCase().trim(),
        );
        // eslint-disable-next-line no-await-in-loop
        productPrice = await valueBairro;
        productCity = {};
        productCity.price = productPrice;
        productCity.sourceNeighborhood = districtsInput[0].value
          .toLowerCase()
          .trim();
        productCity.destinationNeighborhood = districtsInput[1].value
          .toLowerCase()
          .trim();
        preco.value = `R$ ${productPrice},00`;
        productId = id;
        console.log(productId);
        bairroEncontrado = true;
      }

      if (selectSender === '' || selectRecipient === '') {
        preco.value = '';
      }
    }
    console.log(productId);
    if (productCity) return [productId, productPrice, productCity];
    return [productId, productPrice];
  }

  confirmacaoEnvio(status, erro) {
    if (status) {
      const div = document.createElement('div');
      div.classList.add('confirmacao-envio', this.activeClass);
      div.innerHTML = `
      <img src="../dist/assets/img/checked.svg">
      <h2>Formulário enviado<h2>
      <button class="btn voltar">Voltar</button>`;
      return div;
    }

    if (!status) {
      const div = document.createElement('div');
      div.classList.add(this.activeClass, 'confirmacao-envio');
      div.innerHTML = `
      <img src="../dist/assets/img/error.svg">
      <h2>${erro}<h2>
      <div class="confirmacao-envio-btn">
        <button class="btn voltar">Tentar Novamente</button>
        <a href="../dist/contato.html" class="btn">Fale Conosco</a>
      </div>
    `;
      return div;
    }
    return null;
  }

  handleClickNext(event) {
    event.preventDefault();
    this.index = 0;
    const nameSender = this.currentForm.querySelector('#name-sender');
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

    if (nameSender.value.length < 3) {
      alert('Nome inválido!');
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

    if (nameSender.value.length < 3) {
      alert('Nome de destinatário ou remetente inválido!');
      return;
    }

    if (this.index <= this.form.length - 1) {
      this.index = 0;
      this.index += 1;
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

      if (this.index === this.form.children.length - 1) {
        this.form.addEventListener('submit', this.handleSubmit);
      }
    }

    this.addEventListeners();
  }

  handleClickPrev(event) {
    event.preventDefault();
    if (this.index >= 0) {
      this.index -= 1;
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
    let CpfCnpj = value;
    if (CpfCnpj.length > 18) {
      CpfCnpj = value.slice(0, 18);
    }

    if (CpfCnpj.length <= 14) {
      this.cpfInput.value = Formulario.formatarCPF(CpfCnpj);
      if (Formulario.validarCPF(Formulario.formatarCPF(CpfCnpj))) {
        this.cpfInput.classList.remove('erro');
      } else {
        this.cpfInput.classList.add('erro');
      }
    } else {
      this.cpfInput.value = Formulario.formatarCNPJ(CpfCnpj);
      if (Formulario.validarCNPJ(Formulario.formatarCNPJ(CpfCnpj))) {
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

    this.citySender.addEventListener('change', this.fetchProduct);

    this.cityRecipient.addEventListener('change', this.fetchProduct);

    this.cpfInput.addEventListener('input', () => {
      this.formatarCPForCPNJ(this.cpfInput.value);
    });

    this.districts.forEach((district) => {
      district.addEventListener('input', this.fetchProduct);
    });

    this.cel.forEach((cel) => {
      cel.addEventListener('input', (event) => {
        const phone = cel;
        phone.value = Formulario.formatarTelefone(event.target.value);
      });
    });
  }

  init() {
    if (this.form) {
      this.addEventListeners();
      this.currentForm.classList.add(this.activeClass);
      this.currentNav.classList.add(this.activeClass);
    }
    return this;
  }
}
