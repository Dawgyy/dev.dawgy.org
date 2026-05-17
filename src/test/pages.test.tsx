import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/components/theme-provider';
import Home from '@/pages/Home';
import Work from '@/pages/Work';
import Blog from '@/pages/Blog';
import About from '@/pages/About';
import NotFound from '@/pages/NotFound';

function renderAt(path: string, element: React.ReactNode) {
  return render(
    <ThemeProvider>
      <MemoryRouter initialEntries={[path]}>
        <Routes>
          <Route path={path} element={element} />
        </Routes>
      </MemoryRouter>
    </ThemeProvider>,
  );
}

describe('page smoke tests', () => {
  it('Home renders the hero', () => {
    renderAt('/', <Home />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      /Alex Gerard/i,
    );
  });

  it('Work renders both sections', () => {
    renderAt('/work', <Work />);
    expect(
      screen.getByRole('heading', { level: 1, name: /work/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/Professional Engagements/i)).toBeInTheDocument();
  });

  it('Blog renders the writing index', () => {
    renderAt('/blog', <Blog />);
    expect(
      screen.getByRole('heading', { level: 1, name: /writing/i }),
    ).toBeInTheDocument();
  });

  it('About renders the bio', () => {
    renderAt('/about', <About />);
    expect(
      screen.getByRole('heading', { level: 1, name: /about/i }),
    ).toBeInTheDocument();
  });

  it('NotFound renders the 404', () => {
    renderAt('/missing', <NotFound />);
    expect(screen.getByText('404')).toBeInTheDocument();
  });
});
