import React from 'react';
import PropTypes from 'prop-types';

import './CloseButton.css';

const CloseButton = ({ close, id }) => (
    <div 
        onClick={close}
        id = {id}
        className="closeButton"
    >
        X
    </div>
);

CloseButton.proptypes = {
    close: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
};

export default CloseButton;