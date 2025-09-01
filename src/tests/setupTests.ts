// Jest DOM adds custom jest matchers for asserting on DOM nodes
// This allows for more readable test assertions
import '@testing-library/jest-dom';

// Polyfill for TextEncoder/TextDecoder (needed for React Router v7)
if (typeof globalThis.TextEncoder === 'undefined') {
  const { TextEncoder, TextDecoder } = require('util');
  globalThis.TextEncoder = TextEncoder;
  globalThis.TextDecoder = TextDecoder;
}

// Polyfill for ResizeObserver (needed for Recharts)
class ResizeObserverMock {
  observe = jest.fn();
  unobserve = jest.fn();
  disconnect = jest.fn();
}

global.ResizeObserver = ResizeObserverMock;