/**
 * Interface representing exception data structure for both positive and negative exceptions
 * 
 * @interface
 * @property {number} id - Unique identifier for the exception
 * @property {string} title - Title describing the exception
 * @property {"positive" | "negative"} type - Type of exception (positive or negative)
 * @property {Array<{label: string, expected: string, actual: string, isPositive: boolean}>} metrics - Metrics comparing expected vs actual values
 * @property {"P0" | "P1" | "P2" | "P3" | "P4" | "P5"} urgency - Priority level of the exception (P0 highest, P5 lowest)
 * @property {"current" | "last" | "older"} timePeriod - Time period the exception belongs to
 * @property {string[]} suggestedActions - Array of suggested actions to address the exception (0-3 actions)
 */
interface ExceptionData {
    id: number;
    title: string;
    type: "positive" | "negative";
    metrics: {
        label: string;
        expected: string;
        actual: string;
        isPositive: boolean;
    }[];
    urgency: "P0" | "P1" | "P2" | "P3" | "P4" | "P5";
    timePeriod: "current" | "last" | "older";
    suggestedActions: string[];
}

// Helper function to get random urgency level
const getRandomUrgency = (): "P0" | "P1" | "P2" | "P3" | "P4" | "P5" => {
    const levels = ["P0", "P1", "P2", "P3", "P4", "P5"] as const;
    return levels[Math.floor(Math.random() * levels.length)];
};

const negativeExceptions: ExceptionData[] = [
    {
        id: 1,
        title: "Email Campaign for Organic Cereal Underperformed",
        type: "negative",
        metrics: [
            { label: "Open rate", expected: "22% rate", actual: "14.5% rate", isPositive: false },
            { label: "Click-through rate", expected: "8% rate", actual: "3.2% rate", isPositive: false }
        ],
        urgency: getRandomUrgency(),
        timePeriod: "current",
        suggestedActions: ["Revise email subject lines to improve open rates"]
    },
    {
        id: 2,
        title: "Social Media Ad Campaign for Laundry Detergent Missed Targeting Goals",
        type: "negative",
        metrics: [
            { label: "Reach", expected: "250K users", actual: "180K users", isPositive: false },
            { label: "Conversion rate", expected: "3.5% rate", actual: "1.8% rate", isPositive: false }
        ],
        urgency: getRandomUrgency(),
        timePeriod: "current",
        suggestedActions: ["Refine audience targeting parameters", "Review and update creative assets"]
    },
    {
        id: 3,
        title: "Instagram Influencer Campaign Generated Low Engagement",
        type: "negative",
        metrics: [
            { label: "Engagement rate", expected: "6% rate", actual: "2.7% rate", isPositive: false },
            { label: "Cost per acquisition", expected: "$12.50", actual: "$28.70", isPositive: false }
        ],
        urgency: getRandomUrgency(),
        timePeriod: "last",
        suggestedActions: ["Audit influencer selection criteria and engagement history"]
    },
    {
        id: 4,
        title: "Energy Drink Search Marketing Campaign Exceeded Budget",
        type: "negative",
        metrics: [
            { label: "Click volume", expected: "85K clicks", actual: "110K clicks", isPositive: true },
            { label: "Cost per click", expected: "$0.75", actual: "$1.28", isPositive: false }
        ],
        urgency: getRandomUrgency(),
        timePeriod: "last",
        suggestedActions: ["Implement daily bid caps on high-spend keywords", "Review keyword strategy for cost efficiency"]
    },
    {
        id: 5,
        title: "In-store Promotion for Baby Formula Failed to Drive Traffic",
        type: "negative",
        metrics: [
            { label: "Store traffic", expected: "15% increase", actual: "3.5% increase", isPositive: false },
            { label: "Conversion to sale", expected: "22% rate", actual: "14% rate", isPositive: false }
        ],
        urgency: getRandomUrgency(),
        timePeriod: "older",
        suggestedActions: ["Enhance in-store visibility with better placement"]
    },
    {
        id: 6,
        title: "Content Marketing Campaign Missed Lead Generation Targets",
        type: "negative",
        metrics: [
            { label: "Lead generation", expected: "1,500 leads", actual: "875 leads", isPositive: false },
            { label: "Cost per lead", expected: "$8.50", actual: "$14.20", isPositive: false }
        ],
        urgency: getRandomUrgency(),
        timePeriod: "older",
        suggestedActions: []
    },
    {
        id: 7,
        title: "Toothpaste Television Ad Campaign ROI Below Expectations",
        type: "negative",
        metrics: [
            { label: "Brand recall", expected: "35% increase", actual: "12% increase", isPositive: false },
            { label: "Sales lift", expected: "18% increase", actual: "7% increase", isPositive: false }
        ],
        urgency: getRandomUrgency(),
        timePeriod: "older",
        suggestedActions: ["Reassess media buying strategy and time slots"]
    }
];

const positiveExceptions: ExceptionData[] = [
    {
        id: 1,
        title: "TikTok Campaign for Sports Drinks Exceeded Engagement Goals",
        type: "positive",
        metrics: [
            { label: "Engagement rate", expected: "4.5% rate", actual: "9.2% rate", isPositive: true },
            { label: "Video completion rate", expected: "25% rate", actual: "42% rate", isPositive: true }
        ],
        urgency: getRandomUrgency(),
        timePeriod: "current",
        suggestedActions: ["Scale budget allocation for TikTok channel"]
    },
    {
        id: 2,
        title: "Email Re-engagement Campaign Drove Unexpected Conversions",
        type: "positive",
        metrics: [
            { label: "Re-activation rate", expected: "12% rate", actual: "27.5% rate", isPositive: true },
            { label: "Revenue generated", expected: "$45K", actual: "$98K", isPositive: true }
        ],
        urgency: getRandomUrgency(),
        timePeriod: "current",
        suggestedActions: ["Apply successful messaging to other customer segments"]
    },
    {
        id: 3,
        title: "Frozen Pizza Referral Marketing Campaign Performance",
        type: "positive",
        metrics: [
            { label: "Referral submissions", expected: "850 referrals", actual: "1,420 referrals", isPositive: true },
            { label: "Conversion to customer", expected: "15% rate", actual: "32% rate", isPositive: true }
        ],
        urgency: getRandomUrgency(),
        timePeriod: "last",
        suggestedActions: ["Document referral strategy for other product lines", "Increase referral rewards for top performers"]
    },
    {
        id: 4,
        title: "YouTube Pre-roll Ad Campaign Boosted Brand Awareness",
        type: "positive",
        metrics: [
            { label: "View-through rate", expected: "23% rate", actual: "38% rate", isPositive: true },
            { label: "Brand lift", expected: "12% increase", actual: "28% increase", isPositive: true }
        ],
        urgency: getRandomUrgency(),
        timePeriod: "older",
        suggestedActions: []
    },
    {
        id: 5,
        title: "Holiday Discount Campaign for Breakfast Cereal Exceeded Sales Targets",
        type: "positive",
        metrics: [
            { label: "Conversion rate", expected: "5.8% rate", actual: "11.3% rate", isPositive: true },
            { label: "Average order value", expected: "$65", actual: "$92", isPositive: true }
        ],
        urgency: getRandomUrgency(),
        timePeriod: "older",
        suggestedActions: ["Replicate discount structure for upcoming seasonal events"]
    },
    {
        id: 6,
        title: "LinkedIn B2B Marketing Campaign Generated High-Quality Leads",
        type: "positive",
        metrics: [
            { label: "Lead quality score", expected: "7.5 rating", actual: "9.2 rating", isPositive: true },
            { label: "Sales conversion rate", expected: "5% rate", actual: "12% rate", isPositive: true }
        ],
        urgency: getRandomUrgency(),
        timePeriod: "older",
        suggestedActions: ["Share targeting approach with other regional teams"]
    },
    {
        id: 7,
        title: "Retargeting Campaign for Dish Soap Recovered Abandoned Carts",
        type: "positive",
        metrics: [
            { label: "Recovery rate", expected: "18% rate", actual: "42% rate", isPositive: true },
            { label: "ROI", expected: "220% return", actual: "485% return", isPositive: true }
        ],
        urgency: getRandomUrgency(),
        timePeriod: "older",
        suggestedActions: ["Optimize messaging sequence and timing"]
    }
];

// Updated section structure to include all exceptions
const sections = [
    {
        id: "current",
        title: "Current Quarter",
        quarter: "Q4 2024",
        tiles: [
            ...negativeExceptions.filter(e => e.timePeriod === "current"),
            ...positiveExceptions.filter(e => e.timePeriod === "current")
        ]
    },
    {
        id: "last_qtr",
        title: "Last Quarter",
        quarter: "Q3 2024",
        tiles: [
            ...negativeExceptions.filter(e => e.timePeriod === "last"),
            ...positiveExceptions.filter(e => e.timePeriod === "last")
        ]
    },
    {
        id: "qtr_before_last",
        title: "Quarter Before Last",
        quarter: "Q2 2024",
        tiles: [
            ...negativeExceptions.filter(e => e.timePeriod === "older"),
            ...positiveExceptions.filter(e => e.timePeriod === "older")
        ]
    }
];

// Get all exceptions in a single array
const allExceptions = [...negativeExceptions, ...positiveExceptions];

export { negativeExceptions, positiveExceptions, sections, allExceptions };
export type { ExceptionData }