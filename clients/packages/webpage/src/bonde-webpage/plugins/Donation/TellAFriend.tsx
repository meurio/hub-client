import React from 'react';
import PropTypes from 'prop-types';
import TellAFriendBase from '../../components/ux/TellAFriendBase';

// type Props = {
//   preview: any;
//   mobilization: any;
//   widget: any;
// }

const DonationTellAFriend = ({
  preview,
  mobilization,
  widget,
  ...ownProps
}: any) => {
  return (
    <TellAFriendBase
      {...ownProps}
      preview={preview}
      mobilization={mobilization}
      widget={widget}
      message='Obrigada pelo apoio <3 Se selecionou a opção "boleto", dá uma olhada no seu e-mail que o link deve chegar por lá :)'
    />
  );
};

DonationTellAFriend.propTypes = {
  preview: PropTypes.bool,
  mobilization: PropTypes.object.isRequired,
  widget: PropTypes.object.isRequired,
};

export default DonationTellAFriend;
