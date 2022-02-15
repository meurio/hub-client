import React from 'react';
import styled from '@emotion/styled';
import LGPD from '../../../components/ux/LGPD';

type DonationFormStylesProps = {
  mainColor: string;
};

const DonationFormStyles = styled.div<DonationFormStylesProps>`
  .donation-form {
    position: relative;
    padding: 2rem;
  }

  .btn-submit {
    width: 100%;
    padding: 1rem;
    color: #fff;
    text-transform: uppercase;
    background-color: ${props => props.mainColor};
    font-weight: bold;
    border: none;
    border-radius: 3px;
    margin-top: 0.5rem;
    cursor: pointer;

    &:focus {
      outline: none;
    }
  }
`;

type Props = {
  title: string;
  headerFont: string;
  mainColor: string;
  buttonText: string;
  onClickDonate: any;
  loading: boolean;
};

const DonationForm: React.FC<Props> = ({
  children,
  title,
  headerFont,
  mainColor,
  buttonText,
  onClickDonate,
  loading,
}) => (
  <DonationFormStyles mainColor={mainColor}>
    <h2 style={{ fontFamily: headerFont }}>{title}</h2>
    <div className="donation-form">
      {children}
      <button
        className="btn-submit"
        type="button"
        onClick={onClickDonate}
        disabled={loading}
      >
        {loading ? 'Enviando...' : buttonText}
      </button>
      <LGPD color="#545454" />
    </div>
  </DonationFormStyles>
);

export default DonationForm;
