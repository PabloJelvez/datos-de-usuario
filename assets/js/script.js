const moduloPrueba = (() => {
  let urlApi = "https://randomuser.me/api/?results=5000";

  const getData = async (url) => {
    let code;
    try {
      let response = await fetch(url);
      if (response.status == 200) {
        let data = await response.json();
        console.log(data);
        return { code: 200, data };
      } else {
        code = response.status;
        throw new Error("Llamada de la Api fallido");
      }
    } catch (error) {
      return { code, message: "Llamada a la Api fallido" };
    }
  };
  const agregarPost = (listado) => {
    let elementoLista = "";
    listado.slice(0, 10).forEach((user) => {
      elementoLista += `
                <div class="card" style="width: 18rem;">
                  <img src="${user.picture.large}" class="card-img-top" alt="...">
                  <div class="card-body">
                    <h5 class="card-title">Nombre: ${user.name.first} ${user.name.last}</h5>
                    <p class="card-text">email: ${user.email}</p>
                    <p>Telefonot: ${user.phone}</p>
                  </div>
                </div>
                `;
    });
    document.getElementById("divPost").innerHTML = elementoLista;
  };

  const generarRetardo = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("Procesando respuesta");
      }, 3000);
    });
  };

  const main = async () => {
    let parrafoResultado = document.getElementById("resultadoApi");
    parrafoResultado.innerText = "Realizando solicitudes a la Api";
    let mensajeRetardo = await generarRetardo();
    parrafoResultado.innerText = mensajeRetardo;
    let datos = await getData(urlApi);
    if (datos.code == 200) {
      let data = datos.data;
      parrafoResultado.innerText = `Resultado exitoso, estos son los post que encontramos`;
      agregarPost(datos.data.results);
    } else {
      parrafoResultado.innerText = datos.message;
    }
  };
  main();

  return;
})();
