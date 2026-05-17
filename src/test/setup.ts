import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

// jsdom lacks these — stub them so components relying on them render.
window.matchMedia = vi.fn().mockImplementation((query: string) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: vi.fn(),
  removeListener: vi.fn(),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn(),
}));

window.scrollTo = vi.fn();

class IntersectionObserverStub {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  takeRecords = vi.fn(() => []);
}
window.IntersectionObserver =
  IntersectionObserverStub as unknown as typeof IntersectionObserver;
