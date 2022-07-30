const nomeDoCliente = document.querySelector("#nomeCliente");
const pesoDaEntrega = document.querySelector("#pesoEntrega");
const enderecoCliente = document.querySelector(".cep");
const botaoFormularioCadastrar = document.querySelector(".botaoFormulario");

botaoFormularioCadastrar.addEventListener("click", (e) => {
  e.preventDefault();

  console.log(guardaInformações());
});

function guardaInformações() {
  const nomeCliente = nomeDoCliente.value;
  const pesoEntrega = pesoDaEntrega.value;
  const endereco = enderecoCliente.value;

  let pacote = {
    nomeDoCliente: nomeCliente,
    pesoDaEntrega: pesoDaEntrega,
    enderecoDaConsulta: endereco,
  };

  return pacote;
}
