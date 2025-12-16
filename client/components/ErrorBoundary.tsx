import React, { Component, ErrorInfo, ReactNode } from "react";
import { Button } from "./ui/button";
import { AlertTriangle, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

// Functional component for error fallback UI (can use hooks)
const ErrorFallback: React.FC<{
  error: Error | null;
  errorInfo: ErrorInfo | null;
  onReset: () => void;
}> = ({ error, errorInfo, onReset }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-silver via-white to-silver flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white/60 backdrop-blur-apple border border-white/30 rounded-apple-lg shadow-apple-sm p-8">
        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle className="w-6 h-6 text-orange-500" />
          <h1 className="text-2xl font-bold text-graphite">Something went wrong</h1>
        </div>
        
        <p className="text-graphite/70 mb-4">
          An error occurred while loading this page. This might be a temporary issue.
        </p>

        {process.env.NODE_ENV === "development" && error && (
          <details className="mb-4 p-4 bg-graphite/5 rounded-lg border border-graphite/10">
            <summary className="cursor-pointer text-sm font-medium text-graphite/80 mb-2">
              Error Details (Development Only)
            </summary>
            <pre className="text-xs text-graphite/60 overflow-auto mt-2">
              {error.toString()}
              {errorInfo?.componentStack}
            </pre>
          </details>
        )}

        <div className="flex gap-3">
          <Button onClick={onReset} variant="default">
            Try Again
          </Button>
          <Button
            onClick={() => {
              navigate("/");
              onReset();
            }}
            variant="outline"
          >
            <Home className="w-4 h-4 mr-2" />
            Go Home
          </Button>
        </div>
      </div>
    </div>
  );
};

class ErrorBoundaryClass extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <ErrorFallback
          error={this.state.error}
          errorInfo={this.state.errorInfo}
          onReset={this.handleReset}
        />
      );
    }

    return this.props.children;
  }
}

export const ErrorBoundary: React.FC<Props> = (props) => {
  return <ErrorBoundaryClass {...props} />;
};



