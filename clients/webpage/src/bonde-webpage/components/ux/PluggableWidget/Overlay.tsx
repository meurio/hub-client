import React, { useState } from 'react';

/* import PropTypes from 'prop-types' */
import { css, cx } from '@emotion/css';

const overlayStyle = css`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  font-weight: bold;
  border-width: 6px;
  opacity: 0.82;
  background-color: #222222;
  font-size: 1.8rem;
`;

const Overlay = (props: any) => {
  const [hasMouseOver, setMouseOver] = useState(false);

  const { children, onEdit, onDelete } = props;
  return (
    <div
      className="relative overlay"
      style={{ cursor: 'pointer' }}
      onMouseEnter={() => setMouseOver(true)}
      onMouseLeave={() => setMouseOver(false)}
    >
      {children}
      {hasMouseOver ? (
        <div
          className={cx(
            overlayStyle,
            'h1 rounded z1 border border-pagenta px2'
          )}
        >
          <div className="table full-height col-12 center">
            <div className="white table-cell align-middle">
              <button
                className="btn m1 btn-edit"
                onClick={onEdit}
                title="Editar"
              >
                <i className="fa fa-edit" />
              </button>
              <button
                className="btn m1 btn-remove"
                onClick={onDelete}
                title="Remover"
              >
                <i className="fa fa-trash" />
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Overlay;
