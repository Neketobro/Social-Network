import React from 'react';
import { Button, Typography, Alert, Container, Paper } from '@mui/material';

export class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("ErrorBoundary caught an error:", error, errorInfo);
    }

    handleReload = () => {
        window.location.reload();
    };

    render() {
        if (this.state.hasError) {
            return (
                <Container maxWidth="sm" sx={{ mt: 10 }}>
                    <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
                        <Alert severity="error" sx={{ mb: 2 }}>

                            Something went wrong
                        </Alert>
                        <Typography variant="body2" color="textSecondary">
                            {this.state.error?.message || 'Невідома помилка'}
                        </Typography>
                        <Button
                            variant="contained"
                            sx={{ mt: 3 }}
                            onClick={this.handleReload}
                        >
                            Reload page
                        </Button>
                    </Paper>
                </Container>
            );
        }

        return this.props.children;
    }
}
