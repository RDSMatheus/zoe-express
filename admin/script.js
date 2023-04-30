function teste() {
  const url = 'https://zoe-production-06b7.up.railway.app/order';
  const username = 'admin';
  const password = 'senha';

  const headers = new Headers();

  headers.set('Content-Type', 'application/json');
  // headers.set('Authorization', `Basic ${btoa(`${username} </span>: ${password}`)}`);

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

  function updateUser(user) {
    const form = document.createElement("form");
  }

  function formatarCidade(cidade){
    return cidade.valueOf().replace(/-/g, ' ');
  }

  function exibirClientes(cliente, index) {
    const listaClientes = document.querySelector('.admin');
    const div = document.createElement('div');
    div.classList.add('clientes');
    const status = cliente.status ? cliente.status : 'Aguardando Pagamento';
    const citySenders = cliente.senders.city;
    const cityRecipients = cliente.senders.city;
    let cidadeFormatadaSenders
    let cidadeFormatadaRecipients;
    if (citySenders && cityRecipients) {
      cidadeFormatadaSenders = formatarCidade(citySenders);
      cidadeFormatadaRecipients = formatarCidade(cityRecipients);
    }
    div.innerHTML = `
    <h2>#Pedido ${[index + 1]}</h2>
    <div>
      <h3>Remetente</h3>
      <ul>
      <li><span>Código de rastreio</span>: ${cliente.tracker}</li>
      <li><span>Status</span>: ${status}</li>
      <li><span>Nome</span>: ${cliente.senders.fullName}</li>
      <li><span>Endereço</span>: ${cliente.senders.address}</li>
      <li><span>Complemento</span>: ${cliente.senders.address2}</li>
      <li><span>Ponto de Referencia</span>: ${cliente.recipients.landmark}</li>
      <li><span>Cidade Origem</span>: ${cidadeFormatadaSenders}</li>
      <li><span>Email</span>: ${cliente.senders.mail}</li>
      <li><span>CPF/CNPJ</span>: ${cliente.senders.cpf}</li>
      <li><span>Tel</span>: ${cliente.senders.phone}</li>
      <li><span>Descrição do Produto</span>: ${
        cliente.senders.productDescription
      }</li>
      </ul>
    </div>
    <div>
      <h3>Destinatário</h3>
      <ul>
      <li><span>Nome</span>: ${cliente.recipients.fullName}</li>
      <li><span>Endereço</span>: ${cliente.recipients.address}</li>
      <li><span>Complemento</span>: ${cliente.senders.address2}</li>
      <li><span>Ponto de Referencia</span>: ${cliente.recipients.landmark}</li>
      <li><span>Cidade Destino</span>: ${cidadeFormatadaRecipients}</li>
      <li><span>Tel</span>: ${cliente.recipients.phone}</li>
      </ul>
    </div>
    <div class="btn-container">
      <button class="button delete" id="delete${cliente.id}">X</button>
      <button class="button update" id="update${cliente.id}">
        <img src="./pencil.svg">
      </button>
    </div>
    `;
    const deletar = div.querySelector(`#delete${cliente.id}`);
    if (deletar) {
      deletar.addEventListener('click', () => {
        deleteUser(cliente.id, cliente.senders.fullName);
      });
    }
    const update = div.querySelector(`#update${cliente.id}`);
    if (update) {
      update.addEventListener('click', () => {
        updateUser(cliente.id, cliente.senders.fullName);
      });
    }

    listaClientes.appendChild(div);
  }

  window.addEventListener('load', () => {
    fetch(url, {
      method: 'GET',
      headers,
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        json.forEach((item, index) => {
          exibirClientes(item, index);
        });
      });
  });
}
teste();
