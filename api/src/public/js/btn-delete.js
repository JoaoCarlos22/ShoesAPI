// Função para tratar o clique no botão de excluir
function excluirCalcado(event) {
  const botaoExcluir = event.currentTarget;
  const shoeId = botaoExcluir.getAttribute('data-shoe-id');

  if (confirm('Tem certeza que deseja excluir este calçado?')) {
    fetch(`/ShoesSystem/delCalcado/${shoeId}`, {
      method: 'POST',
    })
    window.location.href = '/ShoesSystem/home';
  }
}

// Adicionar evento ao botão de excluir
document
  .querySelector(`#btn-excluir-{{shoe._id}}`)
  .addEventListener('click', excluirCalcado);