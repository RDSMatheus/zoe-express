function teste() {
  const url = 'https://zoe-production-4a9e.up.railway.app/order';
  const username = 'admin';
  const password = 'senha';

  const headers = new Headers();

  headers.set('Content-Type', 'application/json');
  headers.set('Authorization', `Basic ${btoa(`${username} : ${password}`)}`);

  function deleteUser(id, usuario) {
    const confirmar = confirm(
      `Tem certeza que deseja deletar o usuário ${usuario}?`,
    );
    if (confirmar) {
      fetch(`${url}/${id}`, {
        method: 'DELETE',
      }).then(() => location.reload());
    }
  }

  // cria uma ul pra cada cliente
  function exibirClientes(cliente) {
    const listaClientes = document.querySelector('#lista-clientes');
    const ul = document.createElement('ul');
    ul.innerHTML = `
    <li>Nome: ${cliente.name}</li>
    <li>Sobrenome: ${cliente.lastName}</li>
    <li>Email: ${cliente.email}</li>
    <li>cpf: ${cliente.cpf}</li>
    <li>Tel: ${cliente.cel}</li>
    <button id="delete${cliente.id}">Deletar</button>
    `;
    const id = ul.querySelector(`#delete${cliente.id}`);
    if (id) {
      id.addEventListener('click', () => {
        deleteUser(cliente.id, cliente.name);
      });
    }

    listaClientes.appendChild(ul);
  }

  // Chamando a função para exibir os clientes quando a página é carregada
  window.addEventListener('load', () => {
    fetch(url, {
      method: 'GET',
      headers,
    }).then((clientes) => {
      console.log(clientes);
      clientes.forEach((cliente) => {
        exibirClientes(cliente);
      });
    });
  });
}
teste();
