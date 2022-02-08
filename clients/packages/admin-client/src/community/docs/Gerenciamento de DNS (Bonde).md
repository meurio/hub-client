Gerenciamento de DNS (Bonde)
---------------------------

1. **Página: Criar domínio**

    1.1. Formulario passo-a-passo para inserção de um domínio (DNS Hosted Zone) na AWS.

    1.1.1. Inserir nome do domínio

    1.1.2. Registrar no serviço de domínio do usuário (RegistroBR, Godaddy ...) os endereços (delegate server name) recebidos pela AWS

    1.1.3. Testar preenchimento dos endereços dado ao usuário no seu serviço de domínio

2. **Página: Listar domínios**

    2.1. Listar domínios relacionados a comunidade selecionada

    2.2. **Remover domínio**

    2.2.1. Para cada item na lista de domínio deve haver um botão Remover domínio

    2.2.2. Ao clicar no botão Remover domínio, deve ser removido o domínio selecionado e seus subdomínios

    2.3. **Listar subdomínios**

    2.3.1. Ao selecionar um domínio deve apresentar os subdomínios cadastrados para o domínio selecionado e um botão para Adicionar um novo subdomínio.

    2.3.2. **Adicionar subdmonínio**

    2.3.2.1. Ao clicar no botão Adicionar um novo subdomínio, deve apresentar um formulário para criar um novo subdomínio (DNS Record)

    2.3.2.2. Ao finalizar a inserção de um novo subdomínio, deve retornar com o botão de Adicionar um novo subdomínio e a lista de subdomínios deve ser atualizada com o novo registro

    2.3.2.3. Subdomínios são sempre externos, nunca para uma mobilização.

    2.3.3. **Remover subdomínio**

    2.3.3.1. Ao clicar no botão Remover subdomínio, deve remover o registro de subdomínio

    2.4. Deve existir um botão para Adicionar novo domínio (1. Página: Criar domínio)
