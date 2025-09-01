/**
 * @fileoverview Barrel file that exports all insights-related components
 * to simplify imports and resolve circular dependency issues.
 */

// Re-export all insight components
export * from '../../lib/types';
export { InsightKPI } from './InsightKPI';
export { default as InsightKPIDialog } from './InsightKPIDialog';
export { default as InsightCard } from './InsightCard'; 