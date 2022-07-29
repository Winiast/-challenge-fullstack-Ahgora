const nomeDoCliente = document.querySelector("#nomeCliente");
const pesoDaEntrega = document.querySelector("#pesoEntrega");
const enderecoCliente = document.querySelector(".cep");
const botaoFormularioCadastrar = document.querySelector(".cadastrarCliente");

class Elementos {
  constructor(
    nomeDoCliente,
    pesoDaEntrega,
    enderecoCliente,
    botaoFormularioCadastrar
  ) {
    this.nomeDoCliente = nomeDoCliente;
    this.pesoDaEntrega = pesoDaEntrega;
    this.enderecoCliente = enderecoCliente;
    this.botaoFormularioCadastrar = botaoFormularioCadastrar;
  }
}

Elementos.prototype(
  nomeDoCliente,
  pesoDaEntrega,
  enderecoCliente,
  botaoFormularioCadastrar
);

console.log(Elementos.nomeDoCliente);
