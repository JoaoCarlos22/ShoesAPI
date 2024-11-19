// Função para tratar o clique no botão de excluir
function excluirCalcado(event) {
    const botaoExcluir = event.target;
    const shoeId = botaoExcluir.dataset.shoeId;
  
    // Resto do código para enviar a requisição, como no exemplo anterior
    fetch(`/ShoesSystem/delCalcado/${shoeId}`, {
      method: 'POST',
      body: new FormData()
    })
    // ...
  }
  
  // Adiciona um event listener a todos os botões de exclusão
  const botoesExcluir = document.querySelectorAll('.btn-excluir');
  botoesExcluir.forEach(botao => {
    botao.addEventListener('click', excluirCalcado);
  });