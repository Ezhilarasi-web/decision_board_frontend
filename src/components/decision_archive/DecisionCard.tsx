/**
 * @fileoverview DecisionCard component that displays business decision information
 * with expandable details and KPI metrics.
 */
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import KpiPill, { KPIData } from "./KpiPill";
import { Fan, Lightbulb, Cpu, Tv, Search, Megaphone, Globe, Eye, Package, DollarSign, Mail, Users, BarChart } from "lucide-react";

/**
 * Interface for decision data representing business decisions
 * 
 * @interface
 * @property {number} id - Unique identifier for the decision
 * @property {string} uniqueId - Optional compound identifier for uniqueness across context groupings
 * @property {string} title - Title of the decision
 * @property {"Effect" | "Approvals" | "Rollout"} stage - Current stage of the decision
 * @property {KPIData[]} kpis - Array of KPI metrics associated with this decision
 */
export interface DecisionData {
  id: number;
  uniqueId?: string;
  title: string;
  stage: "Effect" | "Approvals" | "Rollout";
  kpis: KPIData[];
}

/**
 * Props for the DecisionCard component
 * 
 * @interface
 * @property {DecisionData} decision - The decision data to display
 * @property {number | null} activeCardId - ID of the currently active card (if any)
 * @property {function} setActiveCardId - Function to set the active card ID
 * @property {function} [onDialogOpen] - Optional callback when a KPI dialog opens
 * @property {function} [onDialogClose] - Optional callback when a KPI dialog closes
 * @property {string} [width] - Optional width for the decision card
 * @property {string} [fontSizeClass] - Optional CSS class for controlling title font size
 */
interface DecisionCardProps {
  decision: DecisionData;
  activeCardId: number | null;
  setActiveCardId: (id: number | null) => void;
  onDialogOpen?: () => void;
  onDialogClose?: () => void;
  width?: string;
  fontSizeClass?: string;
}

/**
 * Returns an appropriate icon based on the decision title
 * 
 * @param {string} title - Title of the decision to derive icon from
 * @returns {JSX.Element | null} The icon component or null if no match
 */
const getProductIcon = (title: string) => {
  const t = title.toLowerCase();
  // Marketing decision icons
  if (t.includes("competitive") || t.includes("analysis") || t.includes("research")) 
    return <Search size={32} className="text-indigo-600" />;
  if (t.includes("advertis") || t.includes("promotion") || t.includes("campaign")) 
    return <Megaphone size={32} className="text-indigo-600" />;
  if (t.includes("social media") || t.includes("digital")) 
    return <Globe size={32} className="text-indigo-600" />;
  if (t.includes("brand") || t.includes("awareness")) 
    return <Eye size={32} className="text-indigo-600" />;
  if (t.includes("packaging") || t.includes("feature") || t.includes("product")) 
    return <Package size={32} className="text-indigo-600" />;
  if (t.includes("price") || t.includes("discount")) 
    return <DollarSign size={32} className="text-indigo-600" />;
  if (t.includes("email") || t.includes("newsletter")) 
    return <Mail size={32} className="text-indigo-600" />;
  if (t.includes("influencer") || t.includes("partner")) 
    return <Users size={32} className="text-indigo-600" />;
  
  // Original product icons as fallback
  if (t.includes("fan")) return <Fan size={32} className="text-indigo-600" />;
  if (t.includes("bulb")) return <Lightbulb size={32} className="text-indigo-600" />;
  if (t.includes("processor")) return <Cpu size={32} className="text-indigo-600" />;
  if (t.includes("tv")) return <Tv size={32} className="text-indigo-600" />;
  
  // Default marketing icon
  return <BarChart size={32} className="text-indigo-600" />;
};

/**
 * Array of stages for the decision progress tracker
 */
const DECISION_STAGES = ["Discussion", "Approvals", "Rollout", "Effect"];

/**
 * DecisionCard component that displays a decision with its metrics and current stage
 * in an expandable card format.
 * 
 * @param {DecisionCardProps} props - Component props
 * @returns {JSX.Element} The rendered DecisionCard component
 */
const DecisionCard: React.FC<DecisionCardProps> = ({
  decision,
  activeCardId,
  setActiveCardId,
  onDialogOpen,
  onDialogClose,
  width = "72%",
  fontSizeClass = "text-xl"
}) => {
  const [expanded, setExpanded] = useState(false);
  const [kpiDialogOpen, setKpiDialogOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  // Determine current stage (default to first stage if not specified)
  const currentStage = decision.stage || "Discussion";
  const currentStageIndex = DECISION_STAGES.indexOf(currentStage);

  /**
   * Reset expanded state when activeCardId changes and not hovering
   */
  useEffect(() => {
    if (activeCardId !== decision.id && !isHovering) {
      setExpanded(false);
    }
  }, [activeCardId, decision.id, isHovering]);

  /**
   * Reset expanded state when dialog closes and not hovering
   */
  useEffect(() => {
    if (!kpiDialogOpen && !isHovering) {
      const timer = setTimeout(() => {
        setExpanded(false);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [kpiDialogOpen, isHovering]);

  /**
   * Handles mouse hover start event to expand card
   */
  const handleHoverStart = () => {
    setIsHovering(true);
    if (!kpiDialogOpen) {
      setExpanded(true);
      setActiveCardId(decision.id);
    }
  };

  /**
   * Handles mouse hover end event to contract card
   */
  const handleHoverEnd = () => {
    setIsHovering(false);
    if (!kpiDialogOpen) {
      // Add a small delay to prevent flickering
      setTimeout(() => {
        if (!isHovering && !kpiDialogOpen) {
          setExpanded(false);
          if (activeCardId === decision.id) {
            setActiveCardId(null);
          }
        }
      }, 50);
    }
  };

  const isActive = activeCardId === decision.id;

  /**
   * Calculates the progress percentage for the stage indicator
   * 
   * @returns {number} Percentage of progress through decision stages (0-100)
   */
  const getProgressPercentage = () => {
    // Calculate progress to fill exactly up to the current stage
    // Each stage represents 25% of the total progress (4 stages total)
    // For the current stage, we fill up to the marker position
    return currentStageIndex * (100 / (DECISION_STAGES.length - 1));
  };

  /**
   * Handles KPI dialog open event
   */
  const handleKpiDialogOpen = () => {
    setKpiDialogOpen(true);
    setActiveCardId(decision.id);
    // Call the parent callback if provided
    if (onDialogOpen) {
      onDialogOpen();
    }
  };

  /**
   * Handles KPI dialog close event
   */
  const handleKpiDialogClose = () => {
    setKpiDialogOpen(false);
    // Use a timeout to ensure state is updated properly
    setTimeout(() => {
      setActiveCardId(null);
      if (!isHovering) {
        setExpanded(false);
      }
    }, 100);
    // Call the parent callback if provided
    if (onDialogClose) {
      onDialogClose();
    }
  };

  return (
    <div className="mx-auto" style={{ width }}>
      <motion.div
        className="rounded-md border border-gray-200 pt-6 px-4 pb-4 overflow-hidden shadow-sm"
        style={{
          background: `linear-gradient(135deg, rgba(254, 240, 225, 0.8), rgba(236, 236, 255, 0.8))`,
          borderColor: `rgba(224, 224, 224, 1)`,
          transformOrigin: "center"
        }}
        onHoverStart={handleHoverStart}
        onHoverEnd={handleHoverEnd}
        animate={{
          scale: expanded ? 1.05 : 1,
          minHeight: expanded ? 350 : 220,
          boxShadow: expanded 
            ? "0 10px 25px -5px rgba(0, 0, 0, 0.08)" 
            : "0 4px 6px -1px rgba(0, 0, 0, 0.03)"
        }}
        transition={{
          scale: { 
            type: "spring", 
            stiffness: 300, 
            damping: 30,
            duration: expanded ? 0.3 : 0.5 
          },
          minHeight: { 
            duration: expanded ? 0.3 : 0.5, 
            ease: "easeOut" 
          },
          boxShadow: {
            duration: 0.3
          }
        }}
      >
        <div className="flex flex-col h-full">
          {/* Decision title with product icon */}
          <div className={`${expanded ? 'mb-2' : ''} flex items-center justify-between py-4`}>
            <div className="w-[60px] flex justify-center">
              <div className="p-2 rounded-full bg-indigo-100">
                {React.cloneElement(getProductIcon(decision.title), { className: "text-indigo-600" })}
              </div>
            </div>
            <h2 className={`${fontSizeClass} font-medium text-gray-800 flex-1 ml-2 text-center`}>
              {decision.title}
            </h2>
            <div className="w-[60px]"></div>
          </div>
          
          {/* Step Progress Chart (only visible when expanded) */}
          {expanded && (
            <motion.div 
              className="w-full px-4 mb-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-full px-6 py-4 bg-white rounded-lg border border-gray-200">
                {/* Progress bar */}
                <div className="relative h-2 w-full bg-gray-200 rounded-full mb-5">
                  <div 
                    className="absolute top-0 left-0 h-full bg-indigo-500 rounded-full"
                    style={{ width: `${getProgressPercentage()}%` }}
                  />
                  
                  {/* Stage markers */}
                  {DECISION_STAGES.map((_, index) => {
                    const position = index * (100 / (DECISION_STAGES.length - 1));
                    return (
                      <div 
                        key={index}
                        className={`absolute top-0 w-3 h-3 rounded-full -mt-0.5 transform -translate-x-1/2 border-2 border-white ${
                          index <= currentStageIndex ? 'bg-indigo-600' : 'bg-gray-300'
                        } ${index === currentStageIndex ? 'ring-2 ring-indigo-200' : ''}`}
                        style={{ left: `${position}%` }}
                      />
                    );
                  })}
                </div>
                
                {/* Stage labels with adjusted positioning */}
                <div className="flex justify-between w-full">
                  {DECISION_STAGES.map((stage, index) => {
                    // Special positioning for first and last labels to prevent overflow
                    const className = `text-sm ${
                      index <= currentStageIndex ? 'text-gray-800 font-medium' : 'text-gray-500'
                    } ${index === 0 ? 'text-left' : index === DECISION_STAGES.length - 1 ? 'text-right' : 'text-center'}`;
                    
                    return (
                      <div 
                        key={stage} 
                        className={className}
                        style={{ 
                          width: index === 0 || index === DECISION_STAGES.length - 1 ? '25%' : '25%'
                        }}
                      >
                        {stage}
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
          
          {/* KPI Pills in a single row */}
          <div className="w-full px-4">
            <div className="flex space-x-4">
              {decision.kpis.map((kpi) => (
                <div key={kpi.id} className="w-full md:w-1/2 p-1">
                  <KpiPill 
                    kpi={kpi} 
                    expanded={expanded || kpiDialogOpen}
                    onDialogOpen={handleKpiDialogOpen}
                    onDialogClose={handleKpiDialogClose}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DecisionCard;
