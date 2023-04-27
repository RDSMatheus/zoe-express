import Formulario from './EnviarFormulario';
import fetchDados from './fetchDados';

export default class FormCarousel {
  constructor(form, proximo, anterior, nav) {
    this.form = document.querySelectorAll(form);
    this.proximo = document.querySelector(proximo);
    this.anterior = document.querySelector(anterior);
    this.nav = document.querySelectorAll(nav);
    this.activeClass = 'ativo';
    this.index = 0;
    this.currentForm = this.form[this.index];
    this.currentNav = this.nav[this.index];
    if (this.currentForm) {
      this.cpfInput = this.currentForm.querySelector('#cpf');
      this.email = this.currentForm.querySelector('#email');
      this.cel = this.currentForm.querySelector('input[name="phone"]');
    }

    this.handleClickNext = this.handleClickNext.bind(this);
    this.handleClickPrev = this.handleClickPrev.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault();
    console.log('olá');
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

    const celSenders = document.querySelector("#cel")
    celSenders.value = Formulario.formatarTelefone(celSenders.value)
    console.log(celSenders.value)
    if (termos) {
      console.log(!termos.checked)
      if (!termos.checked) {
        alert('Leia os termos de serviço!');
        return;
      }
    }

    if (Formulario.validarTelefone(celSenders.value)) {
      console.log("oláaaaa")
      alert('Insira um telefone válido');
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
      );

      this.limparInput();
    } catch (error) {
      console.error(error);
    } finally {
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

    if (!Formulario.validarTelefone(this.cel.value)) {
      alert('Insira um telefone válido');
      return;
    }

    if (this.index < this.form.length - 1) {
      this.index += 1;
      console.log(this.index);
      this.form.forEach((item) => item.classList.remove(this.activeClass));
      this.currentForm = this.form[this.index];
      this.currentForm.classList.add(this.activeClass);

      this.nav.forEach((item) => item.classList.remove(this.activeClass));
      this.currentNav = this.nav[this.index];
      this.currentNav.classList.add(this.activeClass);

      if (this.index === this.form.length - 1) {
        const lastForm = this.currentForm.querySelector('.btn.cadastrar');
        lastForm.addEventListener('click', this.handleSubmit);
      }
    }
  }

  handleClickPrev(event) {
    event.preventDefault();
    if (this.index >= 0) {
      this.index -= 1;
      console.log(this.index);
      this.form.forEach((item) => item.classList.remove(this.activeClass));
      this.currentForm = this.form[this.index];
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

  formatarCel(value) {
    if (value.length > 13) {
      value = value.slice(0, 15);
    }
    this.cel.value = Formulario.formatarTelefone(value);
  }

  limparInput() {
    const inputs = this.form.querySelectorAll('input, textarea');
    inputs.forEach((item) => {
      const input = item;
      input.value = '';
    });
  }

  addButtonEvent() {
    this.proximo.addEventListener('click', this.handleClickNext);
    this.anterior.addEventListener('click', this.handleClickPrev);

    this.cpfInput.addEventListener('input', () => {
      this.formatarCPForCPNJ(this.cpfInput.value);
    });
    this.cel.addEventListener('input', () => {
      this.formatarCel(this.cel.value);
    });
  }

  init() {
    if (this.form.length) {
      this.addButtonEvent();
      this.currentForm.classList.add(this.activeClass);
      this.currentNav.classList.add(this.activeClass);
    }
    return this;
  }
}
