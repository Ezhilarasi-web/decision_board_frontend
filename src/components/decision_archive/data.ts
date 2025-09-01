import { DecisionData } from "./DecisionCard";

/**
 * Sample decision data representing various business decisions
 */
const allDecisions: DecisionData[] = [
    {
        id: 201,
        title: "Launch social media campaign for skincare products in Northeastern Region",
        stage: "Effect",
        kpis: [
            {
                id: 1,
                label: "Social Media Reach",
                value: 20,
                percent: 40,
                trend: "up"
            },
            {
                id: 2,
                label: "Engagement Rate",
                value: 68,
                percent: 15,
                trend: "up"
            }
        ]
    },
    {
        id: 203,
        title: "Launch TV advertising campaign for baby care products in Western Markets",
        stage: "Effect",
        kpis: [
            {
                id: 1,
                label: "NGRP",
                value: 420,
                percent: 40,
                trend: "up"
            },
            {
                id: 2,
                label: "Ad Impressions",
                value: 2.8,
                percent: 35,
                trend: "up"
            }
        ]
    },
    {
        id: 204,
        title: "Lower redemption thresholds across all products",
        stage: "Effect",
        kpis: [
            { id: 1, label: "Redemption Rate", value: 45, percent: 38, trend: "up" },
            { id: 2, label: "Active Users", value: 72, percent: 28, trend: "up" }
        ]
    },
    {
        id: 207,
        title: "Introduce 10$ movie vouchers and 5$ ice cream vouchers in the redemption catalogue",
        stage: "Effect",
        kpis: [
            { id: 1, label: "Voucher Redemptions", value: 12500, percent: 52, trend: "up" },
            { id: 2, label: "User Satisfaction", value: 78, percent: 22, trend: "up" }
        ]
    },
    {
        id: 202,
        title: "Increase collaboration with other brands to expand the redemption catalogue",
        stage: "Effect",
        kpis: [
            { id: 1, label: "Partner Brands", value: 42, percent: 35, trend: "up" },
            { id: 2, label: "Catalogue Options", value: 187, percent: 65, trend: "up" }
        ]
    },
    {
        id: 501,
        title: "Start tracking overall customer sentiment score across all demographics",
        stage: "Effect",
        kpis: [
            { id: 1, label: "Sentiment Score", value: 7.8, percent: 35, trend: "up" },
            { id: 2, label: "Survey Responses", value: 4250, percent: 65, trend: "up" }
        ]
    },
    {
        id: 502,
        title: "Investigate change in ad-spend portfolio over the last 2 quarters",
        stage: "Rollout",
        kpis: [
            { id: 1, label: "Ad Spend Efficiency", value: 3.2, percent: 35, trend: "up" },
            { id: 2, label: "ROAS", value: 4.7, percent: 28, trend: "up" }
        ]
    }
];

/**
 * Insight types for grouping decisions
 */
const INSIGHTS = [
    { id: "brand_awareness", name: "Brand Awareness", decisions: [501, 502] },
    { id: "market_share", name: "Market Share & Revenue", decisions: [301, 302] },
    { id: "market_performance", name: "Market Performance", decisions: [201, 902, 203] },
    { id: "customer_engagement", name: "Customer Engagement & Loyalty", decisions: [202, 204, 207] }
];

/**
 * Interface for quarterly grouped decisions
 * 
 * @interface
 * @property {string} month - Quarter name
 * @property {DecisionData[]} decisions - Array of decisions for this quarter
 */
interface QuarterDecisions {
    month: string;
    decisions: DecisionData[];
}

/**
 * Interface for insight grouped decisions
 * 
 * @interface
 * @property {string} id - Insight ID
 * @property {string} name - Insight category name
 * @property {DecisionData[]} decisions - Array of decisions for this insight
 */
interface InsightDecisions {
    id: string;
    name: string;
    decisions: DecisionData[];
}

/**
 * Union type for year content which can be either a flat array of decisions
 * or an array of quarterly grouped decisions
 */
type YearContent = DecisionData[] | QuarterDecisions[];

/**
 * Type for decisions organized by year and quarter
 */
type GroupedDecisions = Record<string, YearContent>;

/**
 * Decisions organized by year and quarter
 */
const groupedDecisions: GroupedDecisions = {
    "Q4 2024": [
        {
            id: 301,
            title: "Conduct deep competitive analysis to identify competitors' strategies",
            stage: "Effect",
            kpis: [
                {
                    id: 1,
                    label: "Market Share",
                    value: 29.5,
                    percent: 5,
                    trend: "up",
                    charts: [
                        {
                            type: "line",
                            header: "Market Share Trends (2023)",
                            data: [
                                { date: "2023-01-01", company: 29.27, competitor: 20.19, annotation: "Ad Spend Spike", revenue: 11.2 },
                                { date: "2023-02-01", company: 28.95, competitor: 23.64, revenue: 11.5 },
                                { date: "2023-03-01", company: 29.63, competitor: 21.12, annotation: "Product Packaging Change", revenue: 11.9 },
                                { date: "2023-04-01", company: 28.63, competitor: 24.94, revenue: 12.2 },
                                { date: "2023-05-01", company: 29.51, competitor: 22.83, revenue: 12.4 },
                                { date: "2023-06-01", company: 29.36, competitor: 20.60, revenue: 12.3 },
                                { date: "2023-07-01", company: 28.74, competitor: 20.32, annotation: "Marketing Campaign Launch", revenue: 12.5 },
                                { date: "2023-08-01", company: 30.13, competitor: 22.23, revenue: 13.1 },
                                { date: "2023-09-01", company: 29.44, competitor: 21.39, revenue: 13.4 },
                                { date: "2023-10-01", company: 30.35, competitor: 26.97, revenue: 13.8 },
                                { date: "2023-11-01", company: 28.74, competitor: 23.86, revenue: 14.0 },
                                { date: "2023-12-01", company: 28.98, competitor: 22.71, revenue: 14.5 }
                            ],
                            config: {
                                xAxis: "date",
                                yAxis: "Market Share (%)",
                                metrics: ["company", "competitor", "revenue"],
                                colors: ["#ff2534", "#0066ff", "#32a852"]
                            }
                        },
                    ]
                },
                {
                    id: 2,
                    label: "Competitor Analysis",
                    value: 42,
                    percent: 15,
                    trend: "up",
                    charts: [
                        {
                            type: "bar",
                            header: "Competitive Landscape",
                            data: [
                                { name: "Q1 2023", value: 21.65, unit: "%", marketSize: 145.2, competitors: 12, topCompetitor: 18.32 },
                                { name: "Q2 2023", value: 22.79, unit: "%", marketSize: 152.8, competitors: 11, topCompetitor: 19.45 },
                                { name: "Q3 2023", value: 21.31, unit: "%", marketSize: 149.3, competitors: 13, topCompetitor: 17.89 },
                                { name: "Q4 2023", value: 24.51, unit: "%", marketSize: 158.4, competitors: 12, topCompetitor: 20.12 },
                                { name: "Q1 2024", value: 24.59, unit: "%", marketSize: 162.7, competitors: 11, topCompetitor: 21.34 },
                                { name: "Q2 2024", value: 23.15, unit: "%", marketSize: 165.9, competitors: 12, topCompetitor: 20.87 }
                            ],
                            config: {
                                metrics: ["value", "marketSize", "competitors", "topCompetitor"],
                                colors: ["#2563eb", "#16a34a", "#dc2626", "#ea580c"],
                                xAxis: "name",
                                yAxis: "Market Share (%)"
                            }
                        },
                    ]
                }
            ]
        },
        {
            id: 302,
            title: "Boost advertising and promotions by 15% to capture more market share",
            stage: "Rollout",
            kpis: [
                {
                    id: 1,
                    label: "Ad Impressions",
                    value: 4.8,
                    percent: 35,
                    trend: "up",
                    charts: [
                        {
                            type: "line",
                            header: "Impression Growth",
                            data: [
                                { date: "2023-07-01", value: 2.5 },
                                { date: "2023-08-01", value: 2.8 },
                                { date: "2023-09-01", value: 3.2 },
                                { date: "2023-10-01", value: 3.5 },
                                { date: "2023-11-01", value: 4.0 },
                                { date: "2023-12-01", value: 4.3 },
                                { date: "2024-01-01", value: 4.8 },
                                { date: "2024-02-01", value: 5.1 },
                                { date: "2024-03-01", value: 5.6 },
                                { date: "2024-04-01", value: 6.2 }
                            ]
                        },
                        {
                            type: "line",
                            header: "Advertising ROI",
                            data: [
                                { date: "2023-07-01", spend: 16.9, impact: 1.27 },
                                { date: "2023-08-01", spend: 6.8, impact: 1.28 },
                                { date: "2023-09-01", spend: 14.4, impact: 1.58 },
                                { date: "2023-10-01", spend: 14.1, impact: 1.51 },
                                { date: "2023-11-01", spend: 13.8, impact: 1.23 },
                                { date: "2023-12-01", spend: 12.6, impact: 2.23 },
                                { date: "2024-01-01", spend: 9.1, impact: 2.15 },
                                { date: "2024-02-01", spend: 5.1, impact: 1.67 },
                                { date: "2024-03-01", spend: 18.7, impact: 0.63 },
                                { date: "2024-04-01", spend: 6.3, impact: 1.72 },
                                { date: "2024-05-01", spend: 13.5, impact: 2.24 }
                            ],
                            config: {
                                xAxis: "date",
                                metrics: ["spend", "impact"]
                            }
                        },
                        {
                            type: "bar",
                            header: "Monthly Performance",
                            data: [
                                { name: "Jul 2023", value: 2.5, target: 2.3 },
                                { name: "Aug 2023", value: 2.8, target: 2.6 },
                                { name: "Sep 2023", value: 3.2, target: 3.0 },
                                { name: "Oct 2023", value: 3.5, target: 3.3 },
                                { name: "Nov 2023", value: 4.0, target: 3.7 },
                                { name: "Dec 2023", value: 4.3, target: 4.0 },
                                { name: "Jan 2024", value: 4.8, target: 4.5 }
                            ],
                            config: {
                                metrics: ["value", "target"]
                            }
                        }
                    ]
                },
                {
                    id: 2,
                    label: "Market Share Impact",
                    value: 3.2,
                    percent: 28,
                    trend: "up",
                    charts: [
                        {
                            type: "stacked",
                            header: "Category Share Growth",
                            data: [
                                { name: "Q3 2023", beverages: 10.19, snacks: 8.81, dairy: 9.03, personal: 8.51 },
                                { name: "Q4 2023", beverages: 9.62, snacks: 9.10, dairy: 8.35, personal: 11.03 },
                                { name: "Q1 2024", beverages: 10.81, snacks: 11.03, dairy: 8.27, personal: 6.34 },
                                { name: "Q2 2024", beverages: 8.83, snacks: 9.46, dairy: 9.23, personal: 11.20 }
                            ]
                        },
                        {
                            type: "line",
                            header: "Revenue Growth by Quarter (millions)",
                            data: [
                                { date: "2023-07-01", revenue: 12.5, projected: 12.3 },
                                { date: "2023-10-01", revenue: 13.8, projected: 13.5 },
                                { date: "2024-01-01", revenue: 15.2, projected: 14.8 },
                                { date: "2024-04-01", revenue: 16.9, projected: 16.0 },
                                { date: "2024-07-01", revenue: null, projected: 18.5 },
                                { date: "2024-10-01", revenue: null, projected: 20.2 }
                            ],
                            config: {
                                xAxis: "date",
                                metrics: ["revenue", "projected"]
                            }
                        },
                        {
                            type: "pie",
                            header: "Marketing Spend Distribution",
                            data: [
                                { label: "Digital Ads", value: 35 },
                                { label: "TV Spots", value: 25 },
                                { label: "Social Media", value: 20 },
                                { label: "Influencers", value: 15 },
                                { label: "Print Media", value: 5 }
                            ]
                        },
                        {
                            type: "waterfall",
                            header: "Marketing ROI Breakdown",
                            data: [
                                { name: "Budget", value: 15.0 },
                                { name: "Creative", value: -2.5 },
                                { name: "Production", value: -3.2 },
                                { name: "Media Buy", value: -5.8 },
                                { name: "Agency Fees", value: -1.2 },
                                { name: "Return", value: 18.5 },
                                { name: "Net ROI", value: 0 }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            id: 501,
            title: "Start tracking overall customer sentiment score across all demographics",
            stage: "Effect",
            kpis: [
                { id: 1, label: "Sentiment Score", value: 7.8, percent: 35, trend: "up" },
                { id: 2, label: "Survey Responses", value: 4250, percent: 65, trend: "up" }
            ]
        },
    ],
    "Q3 2024": [
        {
            id: 902,
            title: "Create a mobile friendly version of website to boost consumption from Tier II/III cities",
            stage: "Effect",
            kpis: [
                { id: 1, label: "Mobile Orders", value: 70, percent: 32, trend: "up" },
                { id: 2, label: "Conversion Rate", value: 5.2, percent: 15, trend: "up" }
            ]
        },
        {
            id: 502,
            title: "Investigate change in ad-spend portfolio over the last 2 quarters",
            stage: "Rollout",
            kpis: [
                { id: 1, label: "Ad Spend Efficiency", value: 3.2, percent: 35, trend: "up" },
                { id: 2, label: "ROAS", value: 4.7, percent: 28, trend: "up" }
            ]
        },
    ],
    "Q2 2024": [
        {
            month: "Q4",
            decisions: [
                {
                    id: 201,
                    title: "Refresh brand identity across all customer touchpoints",
                    stage: "Effect",
                    kpis: [
                        { id: 1, label: "Brand Recognition", value: 72, percent: 18, trend: "up" },
                        { id: 2, label: "Brand Sentiment", value: 8.4, percent: 12, trend: "up" }
                    ]
                },
                {
                    id: 202,
                    title: "Increase collaboration with other brands to expand the redemption catalogue",
                    stage: "Effect",
                    kpis: [
                        { id: 1, label: "Redemption Rate", value: 68, percent: 42, trend: "up" },
                        { id: 2, label: "User Satisfaction", value: 8.7, percent: 35, trend: "up" }
                    ]
                }
            ]
        }
    ],
    "Q1 2024": [
        {
            month: "Q3",
            decisions: [
                {
                    id: 203,
                    title: "Implement SEO optimization strategy across product pages",
                    stage: "Effect",
                    kpis: [
                        { id: 1, label: "Organic Traffic", value: 125000, percent: 45, trend: "up" },
                        { id: 2, label: "Search Rankings", value: 4.2, percent: 38, trend: "up" }
                    ]
                },
                {
                    id: 204,
                    title: "Lower redemption thresholds across all products",
                    stage: "Effect",
                    kpis: [
                        { id: 1, label: "Engagement", value: 45, percent: 38, trend: "up" },
                        { id: 2, label: "Active Users", value: 72, percent: 28, trend: "up" }
                    ]
                }
            ]
        }
    ],
    "Q4 2023": [
        {
            month: "Q2",
            decisions: [
                {
                    id: 205,
                    title: "Develop content marketing strategy for thought leadership",
                    stage: "Effect",
                    kpis: [
                        { id: 1, label: "Content Views", value: 84000, percent: 62, trend: "up" },
                        { id: 2, label: "Time on Page", value: 3.8, percent: 25, trend: "up" }
                    ]
                }
            ]
        }
    ],
    "Q3 2023": [
        {
            month: "Q1",
            decisions: [
                {
                    id: 206,
                    title: "Revamp email marketing automation funnel",
                    stage: "Effect",
                    kpis: [
                        { id: 1, label: "Open Rate", value: 32, percent: 28, trend: "up" },
                        { id: 2, label: "Click-through Rate", value: 4.8, percent: 35, trend: "up" }
                    ]
                }
            ]
        }
    ]
};

export { allDecisions, groupedDecisions, INSIGHTS };
export type { InsightDecisions, QuarterDecisions, DecisionData };