const btn = document.querySelector('#enviar');
async function testantoAPI(event) {
  event.preventDefault();
  const source = document.querySelector('#source').value;
  const destination = document.querySelector('#destination').value;
  const price = document.querySelector('#price').value;
  const objeto = {
    source: "bacabal",
    destination: "cu do yuri",
    price: "2",
  };
  console.log(objeto);
  const data = JSON.stringify(objeto);
  await fetch('https://zoe-production-06b7.up.railway.app/product', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: data,
  }).then((response) => console.log(response));
}
btn.addEventListener('click', testantoAPI);
