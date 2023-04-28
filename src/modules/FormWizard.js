import fetchDados from './fetchDados';
import Formulario from './Formulario';

export default class FormWizard {
  constructor(forms, nav) {
    this.forms = document.querySelectorAll(forms);
    this.navItems = document.querySelectorAll(nav);
    this.formIndex = 0;
    this.currentForm = this.forms[this.formIndex];
    if (this.currentForm) {
      this.cpfInput = this.currentForm.querySelector('input[name="cpf"]');
    }
    
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(this.currentForm);
    const formJson = Object.fromEntries([...formData]);
    const termos = this.currentForm.querySelector('#termos');
    if (termos) {
      if(!termos.checked) {
        alert("Leia os termos de serviço!")
        return;
      }
    }

    if (this.cpfInput.length) {
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
      this.formIndex += 1;

      this.limparInput();

      if (this.formIndex < this.forms.length) {
        this.currentForm.classList.remove('ativo');
        this.navItems[this.formIndex - 1].classList.remove('ativo');
        this.navItems[this.formIndex].classList.add('ativo');
        this.currentForm = this.forms[this.formIndex];
        this.currentForm.classList.add('ativo');
        this.currentForm.addEventListener(
          'submit',
          this.handleSubmit.bind(this),
        );
      }
    } catch (error) {
      console.error(error);
    } finally {
      this.forms[this.formIndex - 1].removeChild(img);
    }
  }

  formatarCPFCPNJ(value) {
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
    const inputs = this.currentForm.querySelectorAll('input, textarea, select');
    inputs.forEach((item) => {
      const input = item;
      input.value = '';
      input.checked = false
    });
  }

  addEventListeners() {
    this.currentForm.addEventListener('submit', this.handleSubmit);
    this.cpfInput.addEventListener('input', () => {
      this.formatarCPFCPNJ(this.cpfInput.value);
    });
  }

  init() {
    if (this.currentForm && this.cpfInput) {
      this.addEventListeners();
      this.currentForm.classList.add('ativo');
      this.navItems[this.formIndex].classList.add('ativo');
    }
    return this;
  }
}
