export default function fetchDados(url, method, form) {
  const formValue = document.querySelector(form);

  if (formValue) {
    const formData = new FormData(formValue);
    function clearInput() {
      const inputs = document.querySelectorAll(`${form} input, textarea`);
      inputs.forEach((input) => {
        input.value = '';
      });
    }

    formValue.addEventListener('submit', async (event) => {
      event.preventDefault();

      const jsonObject = {};
      for (const [key, value] of formData.entries()) {
        jsonObject[key] = value;
      }
      const JSONForm = JSON.stringify(jsonObject);

      const options = {
        method: method,
      };

      const fetchMethod = method.toUpperCase();

      if (fetchMethod === 'POST') {
        options.body = JSONForm;
        options.headers = {
          'Content-Type': 'application/json; charset=utf-8',
        };
      }

      console.log(options);

      try {
        const fetchDados = await fetch(url);
        const jsonDados = await fetchDados.json();
        return jsonDados;
      } catch (error) {
        console.error('Erro ao analisar o JSON:', error);
      }

      clearInput();
    });
  }
}
