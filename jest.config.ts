import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      tsconfig: 'tsconfig.jest.json'
    }]
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.svg$': '<rootDir>/src/tests/__mocks__/svgrMock.ts',
    '\\.(jpg|jpeg|png|gif|webp|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/src/tests/__mocks__/fileMock.ts',
    '@/(.*)$': '<rootDir>/src/$1',
    // Mock problematic dependencies
    '@nivo/(.*)': '<rootDir>/src/tests/__mocks__/nivoMock.ts'
  },
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/tests/**/*',
    '!src/**/index.{ts,tsx}',
  ],
  setupFilesAfterEnv: ['<rootDir>/src/tests/setupTests.ts'],
  // Handle ES modules in node_modules
  transformIgnorePatterns: [
    '/node_modules/(?!(@nivo|d3-|react-router|@remix-run|framer-motion))'
  ]
};

export default config;