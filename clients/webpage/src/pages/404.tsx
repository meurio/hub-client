import React from 'react';

import ErrorPage from '../components/ErrorPage';

export default function Custom404() {
  return (
    <ErrorPage>
      <img src="/static/images/404.png" alt="404 Not Found" />
      <div className="content">
        <h2>Ops</h2>
        <p>
          Desculpa, mas não conseguimos encontrar a página que você procura.
          Confira se o link está certo e tente carregar a página novamente.
        </p>
        <p>
          Se o erro persistir, envie um email para{' '}
          <a href="mailto:suporte@bonde.org.">suporte@bonde.org</a> com link da
          página que você está tentando acessar.
        </p>
        <p>Te responderemos o quanto antes :)</p>
      </div>
    </ErrorPage>
  );
}
