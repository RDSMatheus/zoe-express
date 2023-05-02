const btn = document.querySelector('#enviar');

function limparInput() {
  const input = document.querySelectorAll('input');
  input.value = '';
}

async function testantoAPI(event) {
  event.preventDefault();
  const source = document.querySelector('#source').value;
  const destination = document.querySelector('#destination').value;
  const price = Number(document.querySelector('#price').value);
  const objeto = {
    source,
    destination,
    price,
  };
  console.log(objeto);
  const data = JSON.stringify(objeto);
  await fetch('https://zoe-production-06b7.up.railway.app/product', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: data,
  }).then((response) => {
    if (response.ok) {
      alert('Produto Cadastrado!');
      limparInput();
    }
  });
}

btn.addEventListener('click', testantoAPI);
