function teste() {
  async function fetchDados() {
    try {
      const fetchApi = await fetch(`http://localhost:8080/client`);
      const fetchDados = await fetchApi.json();
      return fetchDados;
    } catch (error) {
      console.log('yuri é bicha');
    }
  }
  //deleta um cliente do banco de dados
  function deleteUser(id, usuario) {
    const confirmar = confirm(
      `Tem certeza que deseja deletar o usuário ${usuario}?`,
    );
    if (confirmar) {
      fetch(`http://localhost:8080/client/${id}`, {
        method: 'DELETE',
      }).then(() => location.reload());
    }
  }

  //cria uma ul pra cada cliente
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
    const id = ul.querySelector('button');
    if (id) {
      id.addEventListener('click', () => {
        deleteUser(cliente.id, cliente.name);
      });
    }

    listaClientes.appendChild(ul);
  }

  // Chamando a função para exibir os clientes quando a página é carregada
  window.addEventListener('load', () => {
    fetchDados().then((clientes) => {
      clientes.forEach((cliente) => {
        exibirClientes(cliente);
      });
    });
  });
}
teste();
