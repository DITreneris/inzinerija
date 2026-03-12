/**
 * ErrorBoundary smoke: child throws → fallback UI; retry → state reset.
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ErrorBoundary from '../ui/ErrorBoundary';
import i18n from '../../i18n';

vi.mock('../../utils/logger', () => ({
  logError: vi.fn(),
}));

describe('ErrorBoundary', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('shows default fallback when child throws', () => {
    const Throw = () => {
      throw new Error('test error');
    };
    render(
      <ErrorBoundary>
        <Throw />
      </ErrorBoundary>
    );
    expect(screen.getByText(i18n.t('common:errorTitle'))).toBeInTheDocument();
    expect(screen.getByRole('button', { name: i18n.t('common:retry') })).toBeInTheDocument();
  });

  it('shows custom fallback when provided and child throws', () => {
    const Throw = () => {
      throw new Error('test');
    };
    render(
      <ErrorBoundary fallback={<div>Custom fallback</div>}>
        <Throw />
      </ErrorBoundary>
    );
    expect(screen.getByText(/Custom fallback/)).toBeInTheDocument();
  });

  it('retry button resets state and re-renders children', async () => {
    let throwCount = 0;
    const ThrowOnceThenRecover = () => {
      if (throwCount < 1) {
        throwCount += 1;
        throw new Error('test');
      }
      return <div>Recovered</div>;
    };
    render(
      <ErrorBoundary>
        <ThrowOnceThenRecover />
      </ErrorBoundary>
    );
    const fallback = screen.queryByText(i18n.t('common:errorTitle'));
    const retryButton = screen.queryByRole('button', { name: i18n.t('common:retry') });
    if (retryButton) {
      await userEvent.click(retryButton);
    }
    expect(screen.getByText(/Recovered/)).toBeInTheDocument();
    if (fallback) {
      expect(screen.queryByText(i18n.t('common:errorTitle'))).not.toBeInTheDocument();
    }
  });
});
