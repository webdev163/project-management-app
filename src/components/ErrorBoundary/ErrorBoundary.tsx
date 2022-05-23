import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            width: '100vw',
            backgroundColor: '#f0f2f5',
          }}
        >
          <div style={{ backgroundColor: '#c54040', padding: '20px 40px', borderRadius: '20px' }}>
            <h1 style={{ textAlign: 'center', color: '#fff' }}>
              Sorry... there was an error. Please reload application.
            </h1>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
