/**
 * Shared test helpers: render with LocaleProvider so useLocale() and i18n work.
 * Use renderWithProviders(ui) instead of render(ui) for components that need locale context.
 */
/* eslint-disable react-refresh/only-export-components */
import { ReactElement, ReactNode } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { LocaleProvider } from '../contexts/LocaleContext';

function AllTheProviders({ children }: { children: ReactNode }) {
  return <LocaleProvider>{children}</LocaleProvider>;
}

export function renderWithProviders(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) {
  return render(ui, {
    wrapper: AllTheProviders,
    ...options,
  });
}
