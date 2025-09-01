/**
 * @fileoverview DecisionBoardOverview component for displaying decisions organized by quarter or insight
 * 
 * This component handles the main decision archive UI in the Overview page
 * including filtering, grouping, and visualization of decision cards.
 * It supports auto-scrolling to specific insights when provided with a targetInsight prop.
 */
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import DecisionCard, { DecisionData } from "../decision_archive/DecisionCard";
import { InsightDecisions, QuarterDecisions, INSIGHTS, allDecisions, groupedDecisions } from "../decision_archive/data";
import {
  BarChart3, Calendar, BarChart, Newspaper, TrendingUp, Users
} from "lucide-react";
import SearchInputComponent from "./SearchInputComponent";

/**
 * Type definition for grouping options in the Decision Archive
 * 
 * @typedef {('quarter'|'insight')} GroupingOption
 * @property {'quarter'} quarter - Group decisions by time periods (years and quarters)
 * @property {'insight'} insight - Group decisions by business insights/categories
 */
type GroupingOption = "quarter" | "insight";

/**
 * Icons mapping for each insight category
 * Used to display visual indicators next to insight headings
 * 
 * @constant {Object.<string, JSX.Element>}
 */
const INSIGHT_ICONS = {
  brand_awareness: <Newspaper className="h-5 w-5 mr-3 text-violet-600" />,
  market_share: <TrendingUp className="h-5 w-5 mr-3 text-indigo-600" />,
  market_performance: <BarChart3 className="h-5 w-5 mr-3 text-blue-600" />,
  customer_engagement: <Users className="h-5 w-5 mr-3 text-emerald-600" />
};

/**
 * Props for the DecisionBoardOverview component
 * 
 * @interface DecisionBoardOverviewProps
 * @property {string} [targetInsight] - Optional insight ID to auto-scroll to
 * @property {string} [cardWidth=80%] - Width of decision cards (CSS value)
 * @property {string} [customScrollClass] - Optional CSS class for custom scrollbar styling
 */
interface DecisionBoardOverviewProps {
  targetInsight?: string;
  cardWidth?: string;
  customScrollClass?: string;
}

/**
 * DecisionBoardOverview component for the Overview page
 * 
 * Displays decision cards organized by either quarter or insight category
 * Includes filtering capabilities and auto-scrolling to specific insights
 * 
 * @component
 * @param {DecisionBoardOverviewProps} props - Component props
 * @returns {JSX.Element} Rendered DecisionBoardOverview component
 */
const DecisionBoardOverview: React.FC<DecisionBoardOverviewProps> = ({ 
  targetInsight, 
  cardWidth = "80%", 
  customScrollClass = "" 
}) => {
  // Track currently expanded decision card
  const [activeCardId, setActiveCardId] = useState<number | null>(null);

  // Default to insight view if targetInsight is provided, otherwise default to quarter view
  const [groupingOption, setGroupingOption] = useState<GroupingOption>(targetInsight ? "insight" : "quarter");

  // Dialog state for decision details modal
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Add search term state
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Ensure button group renders with correct visibility
  const [isComponentMounted, setIsComponentMounted] = useState(false);

  useEffect(() => {
    // Mark component as mounted after initial render
    setIsComponentMounted(true);
  }, []);

  /**
   * Handles grouping option selection
   * 
   * @param {GroupingOption} option - Selected grouping option
   */
  const selectGroupingOption = (option: GroupingOption) => {
    setGroupingOption(option);
  };

  // Scroll to target insight if specified
  useEffect(() => {
    // Only scroll if we have a target insight and are in insight view
    if (targetInsight && groupingOption === "insight") {
      // Delay scrolling to ensure components are rendered
      const timer = setTimeout(() => {
        const element = document.getElementById(`insight-${targetInsight}`);
        if (element) {
          // Scroll the element into view
          element.scrollIntoView({ behavior: "smooth", block: "start" });

          // Add offset to improve visibility
          const scrollCompleteTimer = setTimeout(() => {
            window.scrollBy({
              top: -100,
              behavior: "smooth"
            });
          }, 800);

          return () => clearTimeout(scrollCompleteTimer);
        }
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [targetInsight, groupingOption]);

  /**
   * Filters decisions based on the search term
   * 
   * @param {DecisionData} decision - The decision to check
   * @returns {boolean} Whether the decision matches the search term
   */
  const filterDecision = (decision: DecisionData): boolean => {
    if (!searchTerm) return true;

    const searchTermLower = searchTerm.toLowerCase();

    // Check if the title contains the search term
    if (decision.title.toLowerCase().includes(searchTermLower)) {
      return true;
    }

    // Check if any KPI metric or data contains the search term
    if (decision.kpis && decision.kpis.some(kpi =>
      kpi.label && kpi.label.toLowerCase().includes(searchTermLower) ||
      kpi.value && kpi.value.toString().toLowerCase().includes(searchTermLower)
    )) {
      return true;
    }

    return false;
  };

  /**
   * Creates insight-grouped decisions from all decisions
   * 
   * Processes the decision data to organize it by insight categories
   * Handles duplicate decisions and applies priority ordering to insights
   * 
   * @returns {InsightDecisions[]} Array of insight groups with their associated decisions
   */
  const getInsightGroupedDecisions = (): InsightDecisions[] => {
    // Flatten all decisions into a single array
    const allDecisionsFlat: DecisionData[] = [];
    allDecisionsFlat.push(...allDecisions);

    // Process decisions from grouped structure
    Object.entries(groupedDecisions).forEach(([year, content]) => {
      if (Array.isArray(content) && !('month' in content[0])) {
        // Handle flat arrays of decisions
        allDecisionsFlat.push(...(content as DecisionData[]));
      } else {
        // Handle quarter-grouped decisions
        (content as QuarterDecisions[]).forEach(quarterGroup => {
          allDecisionsFlat.push(...quarterGroup.decisions);
        });
      }
    });

    // Track processed decisions to avoid duplicates
    const processedDecisionMap = new Map<number, boolean>();

    // Define the display order for insights
    const insightOrder = ["market_share", "brand_awareness", "market_performance", "customer_engagement"];

    // Sort insights according to the defined order
    const orderedInsights = [...INSIGHTS].sort((a, b) => {
      const indexA = insightOrder.indexOf(a.id);
      const indexB = insightOrder.indexOf(b.id);
      return indexA - indexB;
    });

    // Map insights to their associated decisions
    return orderedInsights.map(insight => {
      const insightDecisions = allDecisionsFlat
        .filter(decision => {
          // Skip if decision doesn't belong to this insight
          if (!insight.decisions.includes(decision.id)) {
            return false;
          }
          // Skip if decision was already processed
          if (processedDecisionMap.has(decision.id)) {
            return false;
          }

          // Apply search filter
          if (!filterDecision(decision)) {
            return false;
          }

          // Mark decision as processed
          processedDecisionMap.set(decision.id, true);
          return true;
        })
        .map(decision => ({
          ...decision,
          uniqueId: `${insight.id}-${decision.id}`
        }));

      return {
        id: insight.id,
        name: insight.name,
        decisions: insightDecisions
      };
    }).filter(group => group.decisions.length > 0); // Remove empty groups
  };

  /**
   * Renders a decision card with animation
   * 
   * @param {DecisionData} decision - Decision data to render
   * @param {number} index - Index for staggered animation delay
   * @param {string} [groupContext=''] - Context string for unique key generation
   * @returns {JSX.Element} Animated decision card component
   */
  const renderDecision = (decision: DecisionData, index: number, groupContext: string = '') => {
    // Generate a unique key for the decision card
    const uniqueKey = decision.uniqueId || `${groupContext}-${decision.id}`;

    return (
      <motion.div
        key={uniqueKey}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
      >
        <DecisionCard
          decision={decision}
          activeCardId={activeCardId}
          setActiveCardId={setActiveCardId}
          width={cardWidth}
          fontSizeClass="text-base"
          onDialogOpen={() => setIsDialogOpen(true)}
          onDialogClose={() => setIsDialogOpen(false)}
        />
      </motion.div>
    );
  };

  /**
   * Sorts years in descending order for display
   * 
   * @param {string} a - First year string
   * @param {string} b - Second year string
   * @returns {number} Sort comparison result
   */
  const sortYears = (a: string, b: string): number => {
    // Extract numeric year values, handling special cases
    const yearA = a.includes("2024") ? 2024 : a.includes("2023") ? 2023 : a.includes("2022") ? 2022 : parseInt(a);
    const yearB = b.includes("2024") ? 2024 : b.includes("2023") ? 2023 : a.includes("2022") ? 2022 : parseInt(b);
    return yearB - yearA; // Descending order (newest first)
  };

  /**
   * Gets numeric value for quarter/month names for sorting
   * 
   * @param {string} monthStr - Quarter or month string
   * @returns {number} Numeric value for sorting
   */
  const getMonthNumber = (monthStr: string): number => {
    // Handle quarter notation
    if (monthStr.includes("Q1")) return 1;
    if (monthStr.includes("Q2")) return 2;
    if (monthStr.includes("Q3")) return 3;
    if (monthStr.includes("Q4")) return 4;

    // Handle month names
    const months: Record<string, number> = {
      "January": 1, "February": 2, "March": 3, "April": 4,
      "May": 5, "June": 6, "July": 7, "August": 8,
      "September": 9, "October": 10, "November": 11, "December": 12
    };

    // Check if month name is in the string
    for (const month in months) {
      if (monthStr.includes(month)) {
        return months[month];
      }
    }

    return 0; // Default fallback
  };

  /**
   * Sorts quarters in descending order (Q4 -> Q1)
   * 
   * @param {QuarterDecisions} a - First quarter group
   * @param {QuarterDecisions} b - Second quarter group
   * @returns {number} Sort comparison result
   */
  const sortQuarters = (a: QuarterDecisions, b: QuarterDecisions): number => {
    const aQuarter = getMonthNumber(a.month);
    const bQuarter = getMonthNumber(b.month);
    return bQuarter - aQuarter; // Descending order (Q4 before Q1)
  };

  /**
   * ButtonGroup component for switching between quarter and insight views
   * Designed to avoid FOUC with opacity transition and fixed dimensions
   * 
   * @component
   * @returns {JSX.Element} ButtonGroup UI
   */
  const ViewToggleButtonGroup = () => (
    <div
      className={`inline-flex rounded-md shadow-sm transition-opacity duration-300 ${isComponentMounted ? 'opacity-100' : 'opacity-0'}`}
      style={{ minWidth: '180px' }}
    >
      <button
        type="button"
        className={`px-3 py-1.5 text-sm font-medium border border-gray-200 rounded-l-lg flex items-center gap-1.5
          ${groupingOption === "quarter"
            ? 'text-white bg-indigo-600 hover:bg-indigo-700'
            : 'text-gray-700 bg-white hover:bg-gray-50'
          }`}
        onClick={() => selectGroupingOption("quarter")}
        aria-current={groupingOption === "quarter" ? "page" : undefined}
      >
        <Calendar size={14} className={groupingOption === "quarter" ? "text-white" : "text-gray-500"} />
        Quarter
      </button>
      <button
        type="button"
        className={`px-3 py-1.5 text-sm font-medium border border-gray-200 rounded-r-lg flex items-center gap-1.5
          ${groupingOption === "insight"
            ? 'text-white bg-indigo-600 hover:bg-indigo-700'
            : 'text-gray-700 bg-white hover:bg-gray-50'
          }`}
        onClick={() => selectGroupingOption("insight")}
        aria-current={groupingOption === "insight" ? "page" : undefined}
      >
        <BarChart size={14} className={groupingOption === "insight" ? "text-white" : "text-gray-500"} />
        Insight
      </button>
    </div>
  );

  return (
    <div className="bg-transparent h-full w-full flex flex-col relative pt-1">
      {/* Header with title and button group - sticky position */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm py-3 px-4 border-b border-gray-200 shrink-0">
        <div className="flex items-center justify-center gap-4 md:gap-6">
          <h3 className="text-lg md:text-xl font-bold text-gray-800 text-gray-800 flex items-center">
            {groupingOption === "quarter" ? (
              <>
                <Calendar className="h-4 w-4 mr-2 text-indigo-600" />
                Archive
              </>
            ) : (
              <>
                <BarChart className="h-4 w-4 mr-2 text-indigo-600" />
                Archive
              </>
            )}
          </h3>
          
          {/* Search bar moved between header text and filter buttons */}
          <div className="flex-1 mx-4 px-3">
            <SearchInputComponent onSearchChange={setSearchTerm} />
          </div>
          
          <ViewToggleButtonGroup />
        </div>
      </div>

      {/* Scrollable content area with custom scrollbar */}
      <div className={`flex-1 overflow-y-auto overflow-x-hidden ${customScrollClass} decision-board-scroll`}>
        {/* Conditional rendering based on selected grouping option */}
        {groupingOption === "quarter" ? (
          // Group by Quarter view
          <div className="space-y-4">
            {Object.entries(groupedDecisions)
              .sort(([yearA], [yearB]) => sortYears(yearA, yearB)) // Sort years newest first
              .map(([year, content], yearIndex) => {
                const hasDecisionsAfterFilter =
                  Array.isArray(content) && !('month' in content[0])
                    ? (content as DecisionData[]).some(filterDecision)
                    : (content as QuarterDecisions[]).some(quarterGroup =>
                      quarterGroup.decisions.some(filterDecision)
                    );

                if (!hasDecisionsAfterFilter && searchTerm) {
                  return null; // Skip this year if no decisions match the filter
                }

                return (
                  <div key={year} className="space-y-4">
                    {/* Year heading - sticky position */}
                    <motion.div
                      className="sticky top-0 z-40 bg-gray-50 backdrop-blur-sm flex items-center py-3 px-4 border-l-4 border-l-indigo-500 pl-4"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: yearIndex * 0.1 }}
                    >
                      <h3 className="text-lg font-medium text-gray-800 flex items-center">
                        <Calendar className="h-5 w-5 mr-2 text-indigo-600" />
                        {year}
                      </h3>
                    </motion.div>

                    {/* Handle two different data structures */}
                    {Array.isArray(content) && !('month' in content[0]) ? (
                      // Render flat list of decisions (not grouped by quarter)
                      (content as DecisionData[])
                        .filter(filterDecision)
                        .map((decision, index) => {
                          const decisionWithUniqueId = {
                            ...decision,
                            uniqueId: `quarter-${year}-${decision.id}`
                          };
                          return renderDecision(decisionWithUniqueId, index, `quarter-${year}`);
                        })
                    ) : (
                      // Render quarter-grouped decisions
                      ([...content] as QuarterDecisions[])
                        .sort(sortQuarters) // Sort quarters in descending order
                        .map((quarterGroup) => {
                          const filteredDecisions = quarterGroup.decisions.filter(filterDecision);

                          if (filteredDecisions.length === 0 && searchTerm) {
                            return null; // Skip this quarter if no decisions match the filter
                          }

                          return (
                            <div key={`${year}-${quarterGroup.month}`} className="space-y-4">
                              {filteredDecisions.map((decision: DecisionData, index: number) => {
                                const decisionWithUniqueId = {
                                  ...decision,
                                  uniqueId: `quarter-${year}-${quarterGroup.month}-${decision.id}`
                                };
                                return renderDecision(decisionWithUniqueId, index, `quarter-${year}-${quarterGroup.month}`);
                              })}
                            </div>
                          );
                        }).filter(Boolean)
                    )}
                  </div>
                );
              }).filter(Boolean)
            }

            {/* Show message when no results found */}
            {searchTerm && Object.entries(groupedDecisions).every(([_, content]) => {
              return Array.isArray(content) && !('month' in content[0])
                ? !(content as DecisionData[]).some(filterDecision)
                : !(content as QuarterDecisions[]).some(quarterGroup => quarterGroup.decisions.some(filterDecision));
            }) && (
                <div className="text-center py-8">
                  <p className="text-gray-500">No decisions found matching "{searchTerm}".</p>
                  <button
                    className="mt-2 text-indigo-600 hover:text-indigo-800"
                    onClick={() => {
                      setSearchTerm("");
                      // Find and trigger the search input's clear button click
                      const clearButton = document.querySelector('[data-search-clear]') as HTMLButtonElement;
                      clearButton?.click();
                    }}
                  >
                    Clear search
                  </button>
                </div>
              )}
          </div>
        ) : (
          // Group by Insight view
          <div className="space-y-4">
            {getInsightGroupedDecisions().map((insightGroup, groupIndex) => (
              <div
                key={insightGroup.id}
                className="space-y-4"
                id={`insight-${insightGroup.id}`} // ID for scrolling target
              >
                {/* Insight heading - sticky position */}
                <motion.div
                  className="sticky top-0 z-40 bg-gray-50 backdrop-blur-sm flex items-center py-3 px-4 border-l-4 border-l-violet-500 pl-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: groupIndex * 0.1 }}
                >
                  <h3 className="text-lg font-medium text-gray-800 flex items-center">
                    {INSIGHT_ICONS[insightGroup.id as keyof typeof INSIGHT_ICONS]}
                    {insightGroup.name}
                  </h3>
                </motion.div>

                {/* Decisions for this insight */}
                <div className="space-y-4">
                  {insightGroup.decisions.map((decision, index) => {
                    const decisionWithUniqueId = decision.uniqueId ?
                      decision :
                      {
                        ...decision,
                        uniqueId: `insight-${insightGroup.id}-${decision.id}`
                      };
                    return renderDecision(decisionWithUniqueId, index, `insight-${insightGroup.id}`);
                  })}
                </div>
              </div>
            ))}

            {/* Show message when no results found */}
            {searchTerm && getInsightGroupedDecisions().length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">No decisions found matching "{searchTerm}".</p>
                <button
                  className="mt-2 text-indigo-600 hover:text-indigo-800"
                  onClick={() => {
                    setSearchTerm("");
                    // Find and trigger the search input's clear button click
                    const clearButton = document.querySelector('[data-search-clear]') as HTMLButtonElement;
                    clearButton?.click();
                  }}
                >
                    Clear search
                </button>
              </div>
            )}
          </div>
        )}
        
        {/* Add bottom padding for graceful scrolling */}
        <div className="h-8"></div>
      </div>
    </div>
  );
};

export default DecisionBoardOverview;