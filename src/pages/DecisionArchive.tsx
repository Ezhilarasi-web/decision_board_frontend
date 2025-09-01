/**
 * @fileoverview DecisionBoard component displays an archive of business decisions
 * organized chronologically with their associated KPIs and metrics.
 */
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Megaphone,
  TrendingUp,
  AreaChart,
  Users
} from "lucide-react";
import { DecisionData } from "../components/decision_archive/DecisionCard";
import { InsightDecisions, QuarterDecisions, INSIGHTS, allDecisions, groupedDecisions } from "../components/decision_archive/data";
import SearchInput from "../components/decision_archive/SearchInput";
import ViewToggleButton, { GroupingOption } from "../components/decision_archive/ViewToggleButton";
import {
  getInsightGroupedDecisions,
  filterDecision,
  sortYears,
  sortQuarters,
} from "../components/decision_archive/DecisionUtils";
import DecisionRenderer from "../components/decision_archive/DecisionRenderer";
import NoResultsFound from "../components/decision_archive/NoResultsFound";

/**
 * Icons for each insight category
 */
const INSIGHT_ICONS = {
  brand_awareness: <Megaphone className="h-5 w-5 mr-3 text-violet-600" />,
  market_share: <TrendingUp className="h-5 w-5 mr-3 text-indigo-600" />,
  market_performance: <AreaChart className="h-5 w-5 mr-3 text-blue-600" />,
  customer_engagement: <Users className="h-5 w-5 mr-3 text-emerald-600" />
};

/**
 * Props for the DecisionBoard component
 * 
 * @interface
 * @property {string} [targetInsight] - Optional insight ID to scroll to when loaded
 * @property {string} [cardWidth] - Optional card width for DecisionCard
 * @property {GroupingOption} [initialGroupingOption] - Optional initial grouping option from URL
 */
interface DecisionBoardProps {
  targetInsight?: string;
  cardWidth?: string;
  initialGroupingOption?: GroupingOption;
}

/**
 * DecisionBoard component displays a chronological archive of business decisions
 * with expandable cards showing KPIs and metrics.
 * 
 * @param {DecisionBoardProps} props - Component props
 * @returns {JSX.Element} The rendered DecisionBoard component
 */
const DecisionBoard: React.FC<DecisionBoardProps> = ({ targetInsight, cardWidth, initialGroupingOption }) => {
  const [activeCardId, setActiveCardId] = useState<number | null>(null);
  const [groupingOption, setGroupingOption] = useState<GroupingOption>(
    initialGroupingOption || (targetInsight ? "insight" : "quarter")
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  // State to ensure button group renders properly
  const [isComponentMounted, setIsComponentMounted] = useState(false);

  // Define border pulse animation style for highlighting new features
  const borderPulseStyle = `
    @keyframes borderPulse {
      0% { box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.4); border-radius: 0.5rem; }
      50% { box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.6); border-radius: 0.5rem; }
      100% { box-shadow: 0 0 0 0 rgba(99, 102, 241, 0); border-radius: 0.5rem; }
    }
    .animate-border-pulse {
      animation: borderPulse 1.2s cubic-bezier(0.4, 0, 0.6, 1);
      border-radius: 0.5rem;
    }
  `;

  // Mark component as mounted after initial render
  useEffect(() => {
    setIsComponentMounted(true);
  }, []);

  // Scroll to target insight if specified
  useEffect(() => {
    if (targetInsight && groupingOption === "insight") {
      const timer = setTimeout(() => {
        // Use document.getElementById to find the element with the insight ID
        const element = document.getElementById(`insight-scrolltarget-${targetInsight}`);
        if (element) {
          // Begin scrolling
          element.scrollIntoView({ behavior: "smooth", block: "start" });

          // Detect when scrolling has completed (smooth scrolling takes time)
          const scrollCompleteTimer = setTimeout(() => {
            const element = document.getElementById(`insight-${targetInsight}`);
            // Add a small additional scroll to account for sticky headers
            if (element)
              element.scrollBy({
                top: -500,
                behavior: "smooth"
              });

            // Update URL hash if it doesn't already have the insight ID
            if (window.location.hash !== `#${targetInsight}`) {
              // Use history.replaceState to update hash without creating a new history entry
              window.history.replaceState(
                null,
                '',
                `${window.location.pathname}#${targetInsight}`
              );
            }
          }, 800);

          return () => clearTimeout(scrollCompleteTimer);
        }
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [targetInsight, groupingOption]);

  /**
   * Toggles between grouping options
   * 
   * @param {GroupingOption} option - The grouping option to set
   */
  const selectGroupingOption = (option: GroupingOption) => {
    setGroupingOption(option);

    // Clear the hash when switching to quarter view
    if (option === "quarter" && window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname);
    }
  };

  /**
   * Handle clearing the search
   */
  const handleClearSearch = () => {
    setSearchTerm("");
    // Find and trigger the search input's clear button click
    const clearButton = document.querySelector('[data-search-clear]') as HTMLButtonElement;
    clearButton?.click();
  };

  return (
    <div className="bg-white min-h-screen p-8 pt-0 pb-24">
      {/* Add style tag for border pulse animation */}
      <style dangerouslySetInnerHTML={{ __html: borderPulseStyle }} />

      <div className="max-w-[88%] mx-auto relative">
        {/* Header with title, search bar and button group */}
        <div className="sticky -top-2 z-50 bg-white py-6 border-b border-gray-200 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-800">
              Decision Archive
            </h2>

            {/* Search bar positioned between title and buttons */}
            <div className="flex-1 mx-4">
              <SearchInput onSearchChange={setSearchTerm} />
            </div>

            <div>
              <ViewToggleButton
                groupingOption={groupingOption}
                onToggle={selectGroupingOption}
                isComponentMounted={isComponentMounted}
              />
            </div>
          </div>
        </div>

        {/* Content area */}
        {groupingOption === "quarter" ? (
          // Group by Quarter (Original View)
          <div className="space-y-8">
            {Object.entries(groupedDecisions)
              .sort(([yearA], [yearB]) => sortYears(yearA, yearB))
              .map(([year, content], yearIndex) => {
                const hasDecisionsAfterFilter =
                  Array.isArray(content) && !('month' in content[0])
                    ? (content as DecisionData[]).some(decision => filterDecision(decision, searchTerm))
                    : (content as QuarterDecisions[]).some(quarterGroup =>
                      quarterGroup.decisions.some(decision => filterDecision(decision, searchTerm))
                    );

                if (!hasDecisionsAfterFilter && searchTerm) {
                  return null; // Skip this year if no decisions match the filter
                }

                return (
                  <div key={year} className="space-y-8">
                    {/* Quarter Heading - Updated to match Insight style and make sticky with filter */}
                    <motion.div
                      className="sticky top-24 z-40 bg-white flex items-center justify-between py-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: yearIndex * 0.1 }}
                    >
                      <h3 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2 flex items-center">
                        <Calendar className="h-5 w-5 mr-3 text-indigo-600" />
                        {year}
                      </h3>
                    </motion.div>

                    {Array.isArray(content) && !('month' in content[0]) ? (
                      // Render flat list of decisions
                      (content as DecisionData[])
                        .filter(decision => filterDecision(decision, searchTerm))
                        .map((decision, index) => {
                          // Ensure we have a unique ID for this decision in this context
                          const decisionWithUniqueId = {
                            ...decision,
                            uniqueId: `quarter-${year}-${decision.id}`
                          };
                          return (
                            <DecisionRenderer
                              key={`quarter-${year}-${decision.id}`}
                              decision={decisionWithUniqueId}
                              activeCardId={activeCardId}
                              setActiveCardId={setActiveCardId}
                              onDialogOpen={() => setIsDialogOpen(true)}
                              onDialogClose={() => setIsDialogOpen(false)}
                              index={index}
                              groupContext={`quarter-${year}`}
                              cardWidth={cardWidth}
                            />
                          );
                        })
                    ) : (
                      // Render quarter-grouped decisions, sorted by quarter in descending order
                      ([...content] as QuarterDecisions[])
                        .sort(sortQuarters)
                        .map((quarterGroup) => {
                          const filteredDecisions = quarterGroup.decisions.filter(decision =>
                            filterDecision(decision, searchTerm)
                          );

                          if (filteredDecisions.length === 0 && searchTerm) {
                            return null; // Skip this quarter if no decisions match the filter
                          }

                          return (
                            <div key={`${year}-${quarterGroup.month}`} className="space-y-6">
                              {filteredDecisions.map((decision: DecisionData, index: number) => {
                                // Ensure we have a unique ID for this decision in this context
                                const decisionWithUniqueId = {
                                  ...decision,
                                  uniqueId: `quarter-${year}-${quarterGroup.month}-${decision.id}`
                                };
                                return (
                                  <DecisionRenderer
                                    key={`quarter-${year}-${quarterGroup.month}-${decision.id}`}
                                    decision={decisionWithUniqueId}
                                    activeCardId={activeCardId}
                                    setActiveCardId={setActiveCardId}
                                    onDialogOpen={() => setIsDialogOpen(true)}
                                    onDialogClose={() => setIsDialogOpen(false)}
                                    index={index}
                                    groupContext={`quarter-${year}-${quarterGroup.month}`}
                                    cardWidth={cardWidth}
                                  />
                                );
                              })}
                            </div>
                          );
                        }).filter(Boolean) // Remove null entries
                    )}
                  </div>
                );
              }).filter(Boolean) // Remove null entries
            }

            {/* Show message when no results found */}
            {searchTerm && Object.entries(groupedDecisions).every(([_, content]) => {
              return Array.isArray(content) && !('month' in content[0])
                ? !(content as DecisionData[]).some(decision => filterDecision(decision, searchTerm))
                : !(content as QuarterDecisions[]).some(quarterGroup =>
                  quarterGroup.decisions.some(decision => filterDecision(decision, searchTerm))
                );
            }) && (
                <NoResultsFound
                  searchTerm={searchTerm}
                  onClearSearch={handleClearSearch}
                />
              )}
          </div>
        ) : (
          // Group by Insight
          <div className="space-y-8">
            {getInsightGroupedDecisions(allDecisions, groupedDecisions, searchTerm).map((insightGroup, groupIndex) => (
              <>
                <div
                  id={`insight-scrolltarget-${insightGroup.id}`}
                  style={{
                    position: 'relative',
                    top: '-156px',
                    height: 0,
                    width: 0,
                    pointerEvents: 'none',
                    visibility: 'hidden'
                  }}
                  aria-hidden="true"
                />
                <div
                  key={insightGroup.id}
                  className="space-y-8"
                  id={`insight-${insightGroup.id}`} // Add id for scrolling
                >
                  {/* Insight Heading - Updated to match Quarter style and make sticky with filter */}
                  <motion.div
                    className="sticky top-24 z-40 bg-white flex items-center justify-between py-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: groupIndex * 0.1 }}
                  >
                    <h3 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2 flex items-center">
                      {INSIGHT_ICONS[insightGroup.id as keyof typeof INSIGHT_ICONS]}
                      {insightGroup.name}
                    </h3>
                  </motion.div>

                  <div className="space-y-6">
                    {insightGroup.decisions.map((decision, index) => (
                      <DecisionRenderer
                        key={`insight-${insightGroup.id}-${decision.id}`}
                        decision={decision}
                        activeCardId={activeCardId}
                        setActiveCardId={setActiveCardId}
                        onDialogOpen={() => setIsDialogOpen(true)}
                        onDialogClose={() => setIsDialogOpen(false)}
                        index={index}
                        groupContext={`insight-${insightGroup.id}`}
                        cardWidth={cardWidth}
                      />
                    ))}
                  </div>
                </div>
              </>))}

            {/* Show message when no results found */}
            {searchTerm && getInsightGroupedDecisions(allDecisions, groupedDecisions, searchTerm).length === 0 && (
              <NoResultsFound
                searchTerm={searchTerm}
                onClearSearch={handleClearSearch}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DecisionBoard;