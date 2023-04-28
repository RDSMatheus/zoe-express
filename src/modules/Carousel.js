import Formulario from './Formulario';
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
