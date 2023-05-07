export default async function calcularBairro(origem, destino) {
  let bairroEncontrado = null;
  const precoBairro = await fetch(
    `https://zoe-production-06b7.up.railway.app/product`,
  );
  const bairroJson = await precoBairro.json();
  const hasDistrict = bairroJson.filter((bairro) => bairro.cityPrice);
  bairroEncontrado = hasDistrict.find((bairro) => {
    const source = bairro.cityPrice.sourceNeighborhood.toLowerCase().trim();
    const destination = bairro.cityPrice.destinationNeighborhood
      .toLowerCase()
      .trim();
      console.log(destino)
    if (
      (source === origem && destination === destino) ||
      (source === destino && destination === origem)
    ) {
      return true;
    }
    console.log(source)
    console.log(destination)
    return null;
  });
  if(!bairroEncontrado){
    return null;
  }
  console.log(bairroEncontrado.price)
  return bairroEncontrado.price;
}
