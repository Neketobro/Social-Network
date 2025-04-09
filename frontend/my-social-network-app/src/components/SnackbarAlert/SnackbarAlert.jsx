import { Snackbar, Alert } from '@mui/material';

export function SnackbarAlert({
    open,
    messageAlert,
    severity,
    autoHideDuration = 3000,
}) {

    return (
        <Snackbar
            open={open}
            autoHideDuration={autoHideDuration}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
            <Alert
                severity={severity}
                variant="filled"
                sx={{ width: '100%' }}
            >
                {messageAlert}
            </Alert>
        </Snackbar>
    );
}