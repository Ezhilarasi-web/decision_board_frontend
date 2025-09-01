import React from "react";
import { motion } from "framer-motion";
import { DecisionData } from "./DecisionCard";
import DecisionCard from "./DecisionCard";

interface DecisionRendererProps {
  decision: DecisionData;
  activeCardId: number | null;
  setActiveCardId: (id: number | null) => void;
  onDialogOpen: () => void;
  onDialogClose: () => void;
  index: number;
  groupContext?: string;
  cardWidth?: string;
}

/**
 * Renders a decision card with animation
 */
const DecisionRenderer: React.FC<DecisionRendererProps> = ({
  decision,
  activeCardId,
  setActiveCardId,
  onDialogOpen,
  onDialogClose,
  index,
  groupContext = '',
  cardWidth
}) => {
  // Create a unique key for the decision card to avoid React key warnings
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
        onDialogOpen={onDialogOpen}
        onDialogClose={onDialogClose}
        width={cardWidth}
      />
    </motion.div>
  );
};

export default DecisionRenderer;