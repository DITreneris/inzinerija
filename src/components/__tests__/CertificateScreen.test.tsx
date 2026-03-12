import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../test/test-utils';
import { CertificateScreen } from '../CertificateScreen';

vi.mock('../../utils/introPiePdf', () => ({
  ensurePdfFont: vi.fn().mockResolvedValue(undefined),
}));

const mockDownload = vi.fn().mockResolvedValue(undefined);
vi.mock('../../utils/certificatePdf', () => ({
  downloadCertificatePdf: (...args: unknown[]) => mockDownload(...args),
}));

vi.mock('../../utils/analytics', () => ({
  track: vi.fn(),
}));

vi.mock('../../utils/certificateStorage', () => ({
  getCertificateName: vi.fn(() => ''),
  setCertificateName: vi.fn(),
}));

describe('CertificateScreen', () => {
  const onBack = vi.fn();
  const storageKey = 'prompt-anatomy-locale';

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.setItem(storageKey, 'lt');
  });

  it('renders certificate content for tier 1', () => {
    renderWithProviders(<CertificateScreen tier={1} onBack={onBack} />);
    expect(screen.getByRole('heading', { name: /Sertifikatas|Certificate/i })).toBeInTheDocument();
  });

  it('shows LT program title and certificate label in preview by default', () => {
    renderWithProviders(<CertificateScreen tier={1} onBack={onBack} />);
    expect(screen.getByText('Promptų anatomija')).toBeInTheDocument();
    expect(screen.getByText('SERTIFIKATAS')).toBeInTheDocument();
  });

  it('download button is disabled when name is empty', () => {
    renderWithProviders(<CertificateScreen tier={1} onBack={onBack} />);
    const downloadBtn = screen.getByRole('button', { name: /parsisiųsti|download/i });
    expect(downloadBtn).toBeDisabled();
  });

  it('download button becomes enabled after entering a name', async () => {
    renderWithProviders(<CertificateScreen tier={1} onBack={onBack} />);
    const input = screen.getByLabelText(/vardas|your name/i);
    await act(async () => {
      await userEvent.type(input, 'Jonas');
    });
    const downloadBtn = screen.getByRole('button', { name: /parsisiųsti|download/i });
    expect(downloadBtn).not.toBeDisabled();
  });

  it('calls downloadCertificatePdf with locale and content options when saving and downloading', async () => {
    renderWithProviders(<CertificateScreen tier={1} onBack={onBack} />);
    const input = screen.getByLabelText(/vardas|your name/i);
    await act(async () => {
      await userEvent.type(input, 'Jonas');
    });
    await act(async () => {
      await userEvent.click(screen.getByRole('button', { name: /parsisiųsti|download/i }));
    });
    expect(mockDownload).toHaveBeenCalledTimes(1);
    const [, , name, options] = mockDownload.mock.calls[0];
    expect(name).toBe('Jonas');
    expect(options).toMatchObject({
      programTitle: 'Promptų anatomija',
      certificateLabel: 'SERTIFIKATAS',
      websiteUrl: expect.any(String),
      websiteCta: expect.any(String),
    });
  });

  it('with locale en shows EN content in preview and passes locale to download', async () => {
    const prev = localStorage.getItem(storageKey);
    localStorage.setItem(storageKey, 'en');
    renderWithProviders(<CertificateScreen tier={1} onBack={onBack} />);
    expect(screen.getByText('Prompt Anatomy')).toBeInTheDocument();
    expect(screen.getByText('CERTIFICATE')).toBeInTheDocument();
    const input = screen.getByRole('textbox', { name: /your name/i });
    await act(async () => {
      await userEvent.type(input, 'Jane');
    });
    await act(async () => {
      await userEvent.click(screen.getByRole('button', { name: /save name and download certificate as pdf/i }));
    });
    expect(mockDownload).toHaveBeenCalledTimes(1);
    const options = mockDownload.mock.calls[0][3];
    expect(options?.locale).toBe('en');
    expect(options?.programTitle).toBe('Prompt Anatomy');
    if (prev !== null) localStorage.setItem(storageKey, prev);
    else localStorage.removeItem(storageKey);
  });

  it('calls onBack when Grįžti button is clicked', async () => {
    renderWithProviders(<CertificateScreen tier={1} onBack={onBack} />);
    await userEvent.click(screen.getByRole('button', { name: /Grįžti|Back/i }));
    expect(onBack).toHaveBeenCalledTimes(1);
  });
});
