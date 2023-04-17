export default function fetchDados(
  url,
  method = 'GET',
  headers = {},
  body = null,
) {
  const options = { method, headers };
  if (body) options.body = JSON.stringify(body);

  return fetch(url, options)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Erro ao buscar dados: ${response.status}`);
      }
      return response.json();
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.error('Erro ao buscar dados:', error);
      throw error;
    });
}
