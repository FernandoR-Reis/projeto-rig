const form = document.getElementById('contato-form');
const feedback = document.getElementById('form-feedback');

if (form && feedback) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!form.reportValidity()) {
      return;
    }

    feedback.textContent = 'Mensagem preparada com sucesso. Integre este formulário a um endpoint ou serviço de e-mail para envio real.';
    form.reset();
  });
}
