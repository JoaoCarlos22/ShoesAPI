document.addEventListener("DOMContentLoaded", () => {
  const shoeItems = document.querySelectorAll(".fields li");

  shoeItems.forEach(item => {
    item.addEventListener("click", () => {
      const shoeId = item.getAttribute("data-id");
      if (shoeId) {
        window.location.href = `/ShoesSystem/calcado/${shoeId}`;
      } else {
        console.error("ID do calçado não encontrado.");
      }
    });
  });
});