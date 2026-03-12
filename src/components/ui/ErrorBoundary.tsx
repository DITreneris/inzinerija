import { Component, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import i18n from 'i18next';
import { logError } from '../../utils/logger';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    logError(error, {
      componentStack: errorInfo.componentStack,
      errorBoundary: true,
    });
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex flex-col items-center justify-center min-h-[300px] p-8 text-center">
          <div className="bg-rose-100 dark:bg-rose-900/30 p-4 rounded-full mb-4">
            <AlertTriangle className="w-10 h-10 text-rose-600 dark:text-rose-400" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
            {i18n.t('common:errorTitle')}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 max-w-md">
            {i18n.t('common:errorHint')}
          </p>
          <div className="flex gap-4">
            <button
              onClick={this.handleRetry}
              className="btn-secondary flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              {i18n.t('common:retry')}
            </button>
            <button
              onClick={() => window.location.reload()}
              className="btn-primary"
            >
              {i18n.t('common:refreshPage')}
            </button>
          </div>
          {import.meta.env.DEV && this.state.error && (
            <details className="mt-6 text-left w-full max-w-lg">
              <summary className="text-xs text-gray-500 dark:text-gray-400 cursor-pointer">
                {i18n.t('common:techInfo')}
              </summary>
              <pre className="mt-2 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-xs overflow-auto">
                {this.state.error.message}
                {'\n\n'}
                {this.state.error.stack}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}
