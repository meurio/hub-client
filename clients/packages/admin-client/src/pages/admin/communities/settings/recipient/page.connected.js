//
// @route /community/recipient
//
import React from 'react';
import urljoin from 'url-join';

export default class extends React.Component {
  componentDidMount() {
    window.location.href = urljoin(process.env.REACT_APP_DOMAIN_ADMIN_CANARY, '/community/recipient');
  }

  render() {
    return (
      <p>Redirecionando para admin-canary</p>
    );
  }
}