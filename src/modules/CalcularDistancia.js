export default function calcularDistancia(remetente, destinatario) {
  const cidade1 = remetente;
  const cidade2 = destinatario;

  const url1 = `https://nominatim.openstreetmap.org/search?q=${cidade1}&format=json&limit=1`;
  const url2 = `https://nominatim.openstreetmap.org/search?q=${cidade2}&format=json&limit=1`;
  return Promise.all([fetch(url1), fetch(url2)])
    .then((responses) =>
      Promise.all(responses.map((response) => response.json())),
    )
    .then((data) => {
      const lat1 = parseFloat(data[0][0].lat);
      const lng1 = parseFloat(data[0][0].lon);
      const lat2 = parseFloat(data[1][0].lat);
      const lng2 = parseFloat(data[1][0].lon);

      const R = 6371;
      const dLat = ((lat2 - lat1) * Math.PI) / 180;
      const dLon = ((lng2 - lng1) * Math.PI) / 180;
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) *
          Math.cos((lat2 * Math.PI) / 180) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distancia = R * c;

      return distancia;
    })
    .catch((error) => {
      console.log(`Erro ao obter dados do OpenStreetMap: ${error}`);
    });
}
