import React, { Component } from "react";
import type { ErrorInfo, ReactNode } from "react";
import { useRouteError, isRouteErrorResponse } from "react-router-dom";
import { NotFoundPage } from "./NotFoundPage";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * ErrorBoundary component to catch React rendering errors
 * and provide a user-friendly error UI
 */
export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null,
    });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <ErrorDisplay
          error={this.state.error}
          onReset={this.handleReset}
        />
      );
    }

    return this.props.children;
  }
}

interface ErrorDisplayProps {
  error: Error | null;
  onReset: () => void;
}

/**
 * ErrorDisplay component for rendering error UI
 * Used by both ErrorBoundary and route errorElement
 */
export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
  error,
  onReset,
}) => {
  return (
    <div className="min-h-screen bg-[#000004] flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        <h1 className="text-6xl font-bold text-primary mb-4">Oops!</h1>
        <h2 className="text-2xl text-bodyText mb-6">
          Something went wrong
        </h2>
        <p className="text-bodyTextDim mb-8">
          {error?.message || "An unexpected error occurred"}
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={onReset}
            className="cursor-pointer text-black bg-primary rounded-md flex justify-center items-center gap-2 text-sm px-6 py-3"
          >
            Try Again
          </button>
          <button
            onClick={() => (window.location.href = "/")}
            className="cursor-pointer text-white bg-transparent border-2 border-borderColor rounded-md flex justify-center items-center gap-2 text-sm px-6 py-3"
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
};

/**
 * RouteErrorDisplay component for React Router errors
 * Handles both route errors and 404s
 */
export const RouteErrorDisplay: React.FC = () => {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return <NotFoundPage />;
    }

    return (
      <ErrorDisplay
        error={new Error(error.statusText || `Error ${error.status}`)}
        onReset={() => (window.location.href = "/")}
      />
    );
  }

  const errorMessage =
    error instanceof Error ? error.message : "An unexpected error occurred";

  return (
    <ErrorDisplay
      error={new Error(errorMessage)}
      onReset={() => (window.location.href = "/")}
    />
  );
};

