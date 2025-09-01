import { DecisionData } from "./DecisionCard";
import { InsightDecisions, QuarterDecisions, INSIGHTS } from "./data";

/**
 * Object mapping insight IDs to their icons 
 * (exported from main component for reusability)
 */
export const INSIGHT_ICONS_MAP = {
  brand_awareness: "Megaphone",
  market_share: "TrendingUp",
  market_performance: "AreaChart",
  customer_engagement: "Users"
};

/**
 * Filters decisions based on the search term
 * 
 * @param {DecisionData} decision - The decision to check
 * @param {string} searchTerm - Term to filter by
 * @returns {boolean} Whether the decision matches the search term
 */
export const filterDecision = (decision: DecisionData, searchTerm: string): boolean => {
  if (!searchTerm) return true;

  const searchTermLower = searchTerm.toLowerCase();

  // Check if the title contains the search term
  if (decision.title.toLowerCase().includes(searchTermLower)) {
    return true;
  }

  // Check if any KPI metric or data contains the search term
  if (decision.kpis && decision.kpis.some(kpi =>
    kpi.label.toLowerCase().includes(searchTermLower) ||
    kpi.value.toString().toLowerCase().includes(searchTermLower)
  )) {
    return true;
  }

  return false;
};

/**
 * Creates insight-grouped decisions from all decisions
 * 
 * @param allDecisions - Array of all decisions
 * @param groupedDecisions - Object containing grouped decisions by year/quarter
 * @param searchTerm - Current search term for filtering
 * @returns {InsightDecisions[]} Array of decisions grouped by insight
 */
export const getInsightGroupedDecisions = (
  allDecisionsList: DecisionData[],
  groupedDecisions: Record<string, DecisionData[] | QuarterDecisions[]>,
  searchTerm: string
): InsightDecisions[] => {
  // Collect all decisions into a flat array
  const allDecisionsFlat: DecisionData[] = [];

  // Add decisions from allDecisions array
  allDecisionsFlat.push(...allDecisionsList);

  // Add decisions from each year group in groupedDecisions
  Object.entries(groupedDecisions).forEach(([year, content]) => {
    if (Array.isArray(content) && !('month' in content[0])) {
      // Direct array of decisions
      allDecisionsFlat.push(...(content as DecisionData[]));
    } else {
      // Quarter-grouped decisions
      (content as QuarterDecisions[]).forEach(quarterGroup => {
        allDecisionsFlat.push(...quarterGroup.decisions);
      });
    }
  });

  // Create a map to track which decisions have been processed
  // to avoid duplicates when a decision appears in multiple insights
  const processedDecisionMap = new Map<number, boolean>();

  // Process insights in a specific order (priority-based)
  // This ensures that if a decision appears in multiple insights,
  // it's consistently assigned to the highest priority insight
  const insightOrder = ["market_share", "brand_awareness", "market_performance", "customer_engagement"];

  // Sort the insights based on the defined order
  const orderedInsights = [...INSIGHTS].sort((a, b) => {
    const indexA = insightOrder.indexOf(a.id);
    const indexB = insightOrder.indexOf(b.id);
    return indexA - indexB; // Sort by priority (lower index = higher priority)
  });

  // Build insight groups based on the ordered insights
  return orderedInsights.map(insight => {
    // Filter decisions for this insight
    const insightDecisions = allDecisionsFlat
      .filter(decision => {
        // Check if this decision belongs to this insight
        if (!insight.decisions.includes(decision.id)) {
          return false;
        }

        // If decision has already been processed, skip it to avoid duplicates
        if (processedDecisionMap.has(decision.id)) {
          return false;
        }

        // Apply search filter
        if (!filterDecision(decision, searchTerm)) {
          return false;
        }

        // Mark this decision as processed
        processedDecisionMap.set(decision.id, true);
        return true;
      })
      .map(decision => ({
        ...decision,
        // Add a unique compound ID when used in insight groups
        uniqueId: `${insight.id}-${decision.id}`
      }));

    return {
      id: insight.id,
      name: insight.name,
      decisions: insightDecisions
    };
  }).filter(group => group.decisions.length > 0); // Only keep groups with decisions
};

/**
 * Sorts years in descending order for display
 * 
 * @param {string} a - First year string
 * @param {string} b - Second year string
 * @returns {number} Sort order value
 */
export const sortYears = (a: string, b: string): number => {
  // Extract year numbers for comparison
  const yearA = a.includes("2024") ? 2024 : a.includes("2023") ? 2023 : a.includes("2022") ? 2022 : parseInt(a);
  const yearB = b.includes("2024") ? 2024 : b.includes("2023") ? 2023 : b.includes("2022") ? 2022 : parseInt(b);

  // Sort in descending order
  return yearB - yearA;
};

/**
 * Gets numeric value for quarter names for sorting
 * 
 * @param {string} monthStr - Quarter string to convert
 * @returns {number} Numeric value for quarter (1-4)
 */
export const getMonthNumber = (monthStr: string): number => {
  // Handle quarter-based formats
  if (monthStr.includes("Q1")) return 1;
  if (monthStr.includes("Q2")) return 2;
  if (monthStr.includes("Q3")) return 3;
  if (monthStr.includes("Q4")) return 4;

  // Legacy month-based formats (kept for backward compatibility)
  const months: Record<string, number> = {
    "January": 1, "February": 2, "March": 3, "April": 4,
    "May": 5, "June": 6, "July": 7, "August": 8,
    "September": 9, "October": 10, "November": 11, "December": 12
  };

  // Check if the month string contains any of our known month names
  for (const month in months) {
    if (monthStr.includes(month)) {
      return months[month];
    }
  }

  return 0; // Default value if no month is found
};

/**
 * Sorts quarters in descending order (Q4 -> Q1)
 * 
 * @param {QuarterDecisions} a - First quarter data
 * @param {QuarterDecisions} b - Second quarter data
 * @returns {number} Sort order value
 */
export const sortQuarters = (a: QuarterDecisions, b: QuarterDecisions): number => {
  // Get quarter numbers and sort in descending order
  const aQuarter = getMonthNumber(a.month);
  const bQuarter = getMonthNumber(b.month);
  return bQuarter - aQuarter;
};