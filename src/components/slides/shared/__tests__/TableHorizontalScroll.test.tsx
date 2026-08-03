import { screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { renderWithProviders } from '../../../../test/test-utils';
import TableHorizontalScroll from '../TableHorizontalScroll';

describe('TableHorizontalScroll', () => {
  beforeEach(() => {
    localStorage.clear();
    localStorage.setItem('prompt-anatomy-locale', 'lt');
  });

  it('shows swipe chrome when showChrome is true', () => {
    renderWithProviders(
      <TableHorizontalScroll
        showChrome
        ariaLabel="Comparison table"
        viewportClassName="rounded-lg border"
      >
        <table>
          <tbody>
            <tr>
              <td>Cell</td>
            </tr>
          </tbody>
        </table>
      </TableHorizontalScroll>
    );

    expect(screen.getByText('Slinkite horizontaliai')).toBeInTheDocument();
    expect(
      screen.getByRole('region', { name: 'Comparison table' })
    ).toBeInTheDocument();
  });

  it('hides swipe chrome when showChrome is false', () => {
    renderWithProviders(
      <TableHorizontalScroll
        showChrome={false}
        ariaLabel="Plain table"
        viewportClassName="rounded-lg border"
      >
        <table>
          <tbody>
            <tr>
              <td>Cell</td>
            </tr>
          </tbody>
        </table>
      </TableHorizontalScroll>
    );

    expect(screen.queryByText('Slinkite horizontaliai')).toBeNull();
  });
});
