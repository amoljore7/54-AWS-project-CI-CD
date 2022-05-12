import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Notification = ({
    isOpen = false,
    duration = 3000,
    message = 'no message found!',
    vertical = 'top',
    horizontal = 'center',
    type = 'success',
}) => {
    const [open, setOpen] = useState(isOpen);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Snackbar anchorOrigin={{ vertical, horizontal }} autoHideDuration={duration} open={open} onClose={handleClose}>
            <Alert severity={type}>{message}</Alert>
        </Snackbar>
    );
};

Notification.propTypes = {
    duration: PropTypes.number,
    message: PropTypes.string,
    isOpen: PropTypes.open,
    vertical: PropTypes.string,
    horizontal: PropTypes.string,
    type: PropTypes.string,
};

export default Notification;
