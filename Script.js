function exibirBoasVindas(nome) {
    alert("Bem-vinda ao meu portfólio, " + nome + "!");
}

exibirBoasVindas("Eduarda");

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    // Verifica se o formulário existe para evitar erros
    if (!form) return; 

    const feedback = document.getElementById('feedback-message');
    const submitButton = document.getElementById('submit-button');


    form.addEventListener('submit', function(event) {
        event.preventDefault(); // IMPEDE O COMPORTAMENTO PADRÃO DE RECARREGAR A PÁGINA

        // Desabilita o botão para evitar cliques duplicados
        submitButton.disabled = true;
        submitButton.textContent = 'Enviando...';

        // 2. CHAMA A FUNÇÃO DE ENVIO DO EMAILJS
        sendEmail();
    });

    function sendEmail() {
    
        const SERVICE_ID = "service_4mozzaw"; 
        const TEMPLATE_ID = "template_0k2cgc4";
        const FORM_ID = "#contact-form"; 
        // -----------------------------------------------------------------

        emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form)
            .then(function(response) {
                // SUCESSO
                feedback.textContent = 'Mensagem enviada com sucesso! Em breve entrarei em contato.';
                feedback.style.backgroundColor = '#d4edda'; // Cor verde claro para sucesso
                feedback.style.color = '#155724';
                feedback.style.display = 'block';

                // Limpa o formulário
                form.reset();
            }, function(error) {
                // ERRO
                console.log('FALHA AO ENVIAR:', error);
                feedback.textContent = 'Ops! Ocorreu um erro ao enviar. Tente novamente mais tarde.';
                feedback.style.backgroundColor = '#f8d7da'; // Cor vermelha clara para erro
                feedback.style.color = '#721c24';
                feedback.style.display = 'block';
            })
            .finally(() => {
                // Reabilita o botão e esconde o feedback após 3 segundos
                setTimeout(() => {
                    submitButton.disabled = false;
                    submitButton.textContent = 'Enviar';
                    feedback.style.display = 'none'; 
                }, 3000);
            });
    }
});
