import React from 'react';

import ErrorPage from '../components/ErrorPage';

function Error() {
  return (
    <ErrorPage>
      <img src="/static/images/500.png" alt="500 Internal Server Error" />
      <div className="content">
        <h2>Ops</h2>
        <p>
          Estamos com um problema inesperado nos nossos servidores. Nossa equipe
          já foi alertada e está trabalhando para colocar o Bonde nos trilhos
          novamente.
        </p>
        <p>Tente acessar a página de novo em alguns minutos.</p>
        <p>
          Caso seja algo urgente ou você queira falar sobre outro assunto, envie
          um email para{' '}
          <a href="mailto:suporte@bonde.org.">suporte@bonde.org</a>.
        </p>
        <p>Obrigada pela compreensão :)</p>
      </div>
    </ErrorPage>
  );
}

Error.getInitialProps = ({ res, err }: any) => {
  if (res) return res.statusCode;
  if (err) return err.statusCode;

  return {
    statusCode: 404,
  };
};

export default Error;
