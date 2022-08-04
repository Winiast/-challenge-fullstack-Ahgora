const latitudeDOM = document.querySelector("#Latitude");
const longitudeDOM = document.querySelector("#Longitude");

let geocoder;
let map;
let response;
let informacoesDeEndereco;
let rua, cidade, pais, peso;
let latidudeBanco;
let longitudeBanco;
let pacote;
let enderecoDaConsulta;

function IniciacaoDoMapa() {
  geocoder = new google.maps.Geocoder();
  let latlng = new google.maps.LatLng(-34.397, 150.644);
  let mapOptions = {
    zoom: 8,
    center: latlng,
  };
  map = new google.maps.Map(document.getElementById("map"), mapOptions);
}

function pegaInformacoesEndereco() {
  var address = document.querySelector("#address").value;
  geocoder.geocode({ address: address }, function (results, status) {
    if (status == "OK") {
      var marker = new google.maps.Marker({
        map: map,
        position: results[0].geometry.location,
      });
      map.setCenter(results[0].geometry.location);
      response = JSON.stringify(results[0]);
      response = JSON.parse(response);
      rua = response.address_components[1].long_name;
      cidade = response.address_components[3].long_name;
      pais = response.address_components[5].long_name;
      latidudeBanco = response.geometry.location.lat;
      longitudeBanco = response.geometry.location.lng;

      informacoesDeEndereco = {
        rua: rua,
        cidade: cidade,
        pais: pais,
        latidudeBanco: latidudeBanco,
        longitudeBanco: longitudeBanco,
      };

      latitudeDOM.value = informacoesDeEndereco.latidudeBanco;
      longitudeDOM.value = informacoesDeEndereco.longitudeBanco;
      return informacoesDeEndereco;
    } else {
      alert("Geocode was not successful for the following reason: " + status);
    }
  });
}

// Funções que precisam ser exportadas para outros locais mas não sei fazer ainda

// Puxando DOM

const nomeDoCliente = document.querySelector("#nomeCliente");
const pesoDaEntrega = document.querySelector("#pesoEntrega");
const enderecoCliente = document.querySelector(".cep");
const botaoFormularioCadastrar = document.querySelector(".botaoFormulario");

botaoFormularioCadastrar.addEventListener("click", (e) => {
  // e.preventDefault();
  guardaInformações();
});

function guardaInformações() {
  const nomeCliente = nomeDoCliente.value;
  const pesoEntrega = pesoDaEntrega.value;

  pacote = {
    nomeDoCliente: nomeCliente,
    pesoDaEntrega: pesoEntrega,
    enderecoDaConsulta: null,
  };
  pacote.enderecoDaConsulta = informacoesDeEndereco;
  return pacote;
}
let dadosUsuario = guardaInformações();

// Parte do banco de dados

const Client = new require("pg").Client;
const cliente = new Client({
  user: "postgres",
  password: "",
  host: "127.0.0.1",
  port: 5432,
  database: "bancoJava",
});

async function setUsuarios() {
  try {
    console.log("Iniciando conexao");
    await cliente.connect();
    console.log("Conexao deu certo");
    const resultado = await cliente.query(
      "INSERT INTO challenge(nome, peso, logradouro, pais, estado, cidade, bairro, numero, latitude, longitude) VALUES  (?, ?, 'Rua bento de Oliveira Rocha', 'Brasil', 'Parana', 'Paranagua', 'Sao Vicente', 925, -25.000, 48.000)",
      [pacote.nomeCliente, pacote.pesoDaEntrega]
    );
    console.table(resultado.rows);
  } catch (error) {
    console.log("Ocorreu um erro" + error.message);
  } finally {
    await cliente.end();
    console.log("Conexao finalizada");
  }
}
