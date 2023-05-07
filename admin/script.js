function teste() {
  const url = 'https://zoe-production-06b7.up.railway.app/order';

  let username = '';
  let password = '';

  const cookies = document.cookie.split(';');
  const { 0: usernameCookie, 1: passwordCookie } = cookies;

  if (usernameCookie && passwordCookie) {
    [, username] = usernameCookie.split('=');
    [, password] = passwordCookie.split('=');
  } else {
    username = prompt('Insira o usuario');
    password = prompt('Insira a senha');

    document.cookie = `username=${username}`;
    document.cookie = `password=${password}`;
  }

  const listaClientes = document.querySelector('.admin');

  const headers = new Headers();
  headers.set('Content-Type', 'application/json');
  headers.set('Authorization', `Basic ${btoa(`${username}:${password}`)}`);

  function deleteUser(id, usuario) {
    const confirmar = confirm(
      `Tem certeza que deseja deletar o usuário ${usuario}?`,
    );
    if (confirmar) {
      fetch(`${url}/${id}`, {
        method: 'DELETE',
        headers,
      }).then(() => location.reload());
    }
  }

  function updateUser(cliente, index) {
    const pai = document.querySelector(`[data-user='${cliente.id}']`);
    const form = document.createElement('form');
    form.innerHTML = `
    <div class="col">
      <label for="status">Selecione o status</label>
      <select name="status">
      <option value="Aguardando Pagamento">Aguardando Pagamento</option>
      <option value="Pagamento Efetuado">Pagamento Efetuado</option>
      <option value="Saiu para entrega">Saiu para entrega</option>
      <option value="Entregue">Entregue</option>
      </select>
    </div>
    <button class="button" id="atualizar${cliente.id}"><img src="upload.svg"></button>
    `;
    pai.innerHTML = `
    <h2>#Pedido ${index + 1}</h2>
    ${form.innerHTML}
    `;
    const btnAtualizar = document.querySelector(`#atualizar${cliente.id}`);
    btnAtualizar.addEventListener('click', (event) => {
      event.preventDefault();
      const status = document.querySelector("[name='status']").value;
      const body = {
        status,
      };
      const data = JSON.stringify(body);
      console.log(data);
      fetch(`${url}/${cliente.id}`, {
        method: 'PUT',
        headers,
        body: data,
      }).then((response) => {
        console.log(response);
        location.reload();
      });
    });
  }

  function formatarCidade(cidade) {
    return cidade.valueOf().replace(/-/g, ' ');
  }

  function exibirClientes(cliente, index) {
    const div = document.createElement('div');
    div.classList.add('clientes');
    div.setAttribute('data-user', cliente.id);
    const status = cliente.status ? cliente.status : 'Aguardando Pagamento';
    const citySenders = cliente.senders.city;
    const cityRecipients = cliente.senders.city;
    let cidadeFormatadaSenders;
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
        <img width="30" heigth="30" src="./pencil.svg">
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
        updateUser(cliente, index);
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
        // for(let i = 5; json.length; i++){
        //   deleteUser(json[i].id)
        // }
        json.forEach((item, index) => {
          exibirClientes(item, index);
        });
      })
      .catch((error) => {
        console.log(error);
        listaClientes.innerHTML =
          '<h1>Não Autorizado<img src="laughing.svg"><img src="laughing.svg"><img src="laughing.svg"></h1>';
      });
  });
}
teste();
