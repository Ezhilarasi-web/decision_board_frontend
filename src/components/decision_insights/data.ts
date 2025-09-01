import { InsightData } from "../../lib/types";

/**
 * Color scheme for visualizations - updated for cohesive palette
 */
const colors = {
    slate: "#64748b",      // Slate blue for neutral elements
    indigo: "#4f46e5",     // Indigo - primary brand color
    sky: "#0ea5e9",        // Sky blue - secondary color
    emerald: "#10b981",    // Emerald - for growth and positive trends
    amber: "#f59e0b",      // Amber - for warnings and attention
    rose: "#f43f5e",       // Rose - for negative or critical metrics
    violet: "#8b5cf6",     // Violet - for engagement metrics
    cyan: "#06b6d4",       // Cyan - for performance metrics
    fuchsia: "#d946ef",    // Fuchsia - for brand metrics

    // Tile-specific colors
    tile1: "#8b5cf6",      // Violet - Brand Awareness
    tile2: "#f43f5e",      // Rose - Market Share and Revenue
    tile3: "#06b6d4",      // Cyan - Market Performance
    tile4: "#4f46e5",      // Indigo - Customer Engagement
    tile5: "#0ea5e9",      // Sky - Decision Info
};

/**
 * Decision statistics data for visualizing good, neutral, and bad decisions
 */
const decisionStatsData = [
    { name: 'Exceeds Expectations', value: 17, color: colors.emerald },
    { name: 'Matches Expectations', value: 6, color: colors.slate },
    { name: 'Below Expectations', value: 7, color: colors.rose },
];

/**
 * Top decisions data showcasing high-impact business decisions
 */
const topDecisionsData = [
    {
        title: "Social Media Campaign for Product9_Brand1",
        description: "Expanded social media presence with influencer partnerships",
        date: "August 2022",
        region: "East - West Bengal",
        kpis: ["Reach", "Engagement rate"],
        impact: "+32% brand awareness",
        roi: "215%"
    },
    {
        title: "Packaging Redesign for Product6_Brand2",
        description: "Launched new packaging design to appeal to younger consumers",
        date: "May 2023",
        region: "East - Odisha",
        kpis: ["NPS", "Sales"],
        impact: "NPS +18 points",
        roi: "178%"
    },
    {
        title: "TV Ad Campaign for Product1_Brand3",
        description: "Increased TV ad frequency to capture rural market share",
        date: "October 2022",
        region: "East - Bihar",
        kpis: ["NGRP", "Market share"],
        impact: "+7.5% market share",
        roi: "192%"
    }
];

// Sales data over recent months
const salesData = [
    { month: 'Aug', value: 82 },
    { month: 'Sep', value: 75 },
    { month: 'Oct', value: 85 },
    { month: 'Nov', value: 92 }
];

/**
 * Product performance breakdown by category
 */
const productPerformanceData = [
    { name: 'Fans', value: 35 },
    { name: 'Lighting', value: 25 },
    { name: 'Switches', value: 15 },
    { name: 'Others', value: 25 },
];

/**
 * Sample bar chart data for month-to-month comparisons
 */
const barChartData = [
    { name: 'September', value: 165, color: colors.emerald },
    { name: 'November', value: 181, color: colors.amber }
];

const gaugeData = [{ value: 14 }];

/**
 * Line chart data for trend visualization
 */
const lineChartData = [
    { name: '1', value: 40 },
    { name: '2', value: 30 },
    { name: '3', value: 45 },
    { name: '4', value: 50 },
    { name: '5', value: 60 },
    { name: '6', value: 55 },
    { name: '7', value: 65 },
];

/**
 * Area chart data for cumulative metrics
 */
const areaChartData = [
    { name: '1', value: 50 },
    { name: '2', value: 45 },
    { name: '3', value: 60 },
    { name: '4', value: 75 },
    { name: '5', value: 65 },
    { name: '6', value: 80 },
    { name: '7', value: 90 },
];

/**
 * Click-through rate data for email and website channels
 */
const ctrData = [
    { date: '01-01', email_imp: 5000, email_clicks: 8010, website_imp: 8000, website_clicks: 6000, email_ctr: 6.0 },
    { date: '08-01', email_imp: 5700, email_clicks: 7701, website_imp: 8700, website_clicks: 6700, email_ctr: 6.49 },
    { date: '15-01', email_imp: 4800, email_clicks: 4410, website_imp: 9100, website_clicks: 7400, email_ctr: 6.88 },
    { date: '22-01', email_imp: 4140, email_clicks: 5201, website_imp: 10200, website_clicks: 7201, email_ctr: 6.22 },
    { date: '29-01', email_imp: 3998, email_clicks: 3810, website_imp: 10800, website_clicks: 8800, email_ctr: 6.56 }
];

/**
 * Colors for CTR visualization 
 */
const ctrColors = {
    email_imp: '#ff6b6b',
    email_clicks: '#4ecdc4',
    website_imp: '#45b7d1',
    website_clicks: '#96f7d2',
    email_ctr: '#a855f7'
};

/**
 * Conversion funnel data showing drop-off between stages
 */
const conversionData = [
    { name: 'Total Visitors', value: 20500, fill: colors.emerald },
    { name: 'Engaged Users', value: 15375, fill: colors.amber },
    { name: 'Interested Users', value: 8200, fill: colors.rose },
    { name: 'Conversions', value: 1600, fill: colors.fuchsia }
];

/**
 * Brand sentiment data across different brands
 */
const brandSentimentData = [
    { brand: 'Brand A', positive: 700, negative: 150, neutral: 150, total: 1000, score: 55, color: "#38bdf8" },
    { brand: 'Brand B', positive: 500, negative: 200, neutral: 150, total: 850, score: 35.3, color: "#818cf8" },
    { brand: 'Brand C', positive: 600, negative: 180, neutral: 140, total: 920, score: 45.7, color: "#c084fc" },
    { brand: 'Brand D', positive: 800, negative: 120, neutral: 180, total: 1100, score: 61.8, color: "#f472b6" },
    { brand: 'Brand E', positive: 650, negative: 160, neutral: 160, total: 970, score: 50.5, color: "#fb7185" },
];

/**
 * Separated positive sentiment data for visualization
 */
const positiveData = brandSentimentData.map(item => ({
    name: item.brand,
    value: item.positive,
    fill: item.color
}));

/**
 * Separated negative sentiment data for visualization
 */
const negativeData = brandSentimentData.map(item => ({
    name: item.brand,
    value: item.negative,
    fill: item.color
}));

/**
 * Color definition for brand sentiment visualization
 */
const brandColors = {
    inner: ["#00C2A0", "#2AC3F2", "#3182CE", "#0BC5EA"], // Green/blue modern colors
    outer: ["#FF0000", "#E50000", "#CC0000", "#B30000"]  // Pure red shades for negative mentions
};

/**
 * Colors for stacked bar chart brand visualization
 */
const stackedBrandColors = {
    positive: "#38bdf8", // Sky blue
    negative: "#f43f5e", // Rose red
    neutral: "#a855f7"   // Purple
};

/**
 * Colors for sentiment visualization
 */
const sentimentColors = {
    positive: "#FF9500", // Orange
    negative: "#FF3B30", // Red
    neutral: "#FFCC00"   // Yellow
};

/**
 * Campaign sentiment data for marketing campaigns
 */
const customerSentimentData = [
    {
        campaign: 'CAMP_14',
        positive: 80,
        negative: 10,
        neutral: 10,
        total: 100,
        survey: 10
    },
    {
        campaign: 'CAMP_15',
        positive: 85,
        negative: 15,
        neutral: 10,
        total: 110,
        survey: 8
    },
    {
        campaign: 'CAMP_13',
        positive: 75,
        negative: 5,
        neutral: 15,
        total: 95,
        survey: 9
    },
    // {
    //   campaign: 'CAMP_7',
    //   positive: 70,
    //   negative: 10,
    //   neutral: 10,
    //   total: 90,
    //   survey: 9
    // },
    // {
    //   campaign: 'CAMP_12',
    //   positive: 65,
    //   negative: 10,
    //   neutral: 10,
    //   total: 85,
    //   survey: 8
    // }
];

/**
 * Chart data for competitor market share
 */
const competitorGrowthData = [
    { name: 'Jan 2023', positive: 2.1, negative: 1.4 },
    { name: 'Feb 2023', positive: 1.8, negative: 0.9 },
    { name: 'Mar 2023', positive: 2.5, negative: 1.1 },
    { name: 'Apr 2023', positive: 3.0, negative: 2.2 },
    { name: 'May 2023', positive: 2.6, negative: 1.7 },
    { name: 'Jun 2023', positive: 2.2, negative: 1.5 },
];

/**
 * Chart data for company market share timeline - Updated with real data from CSV
 */
const marketShareTimelineData = [
    { name: 'Jan', year: 2023, share: 29.3, competitor: 20.2, action: 'New Product Launch', marketing: 12.6 },
    { name: 'Feb', year: 2023, share: 29.0, competitor: 23.6, action: null, marketing: 12.6 },
    { name: 'Mar', year: 2023, share: 29.6, competitor: 21.1, action: null, marketing: 8.2 },
    { name: 'Apr', year: 2023, share: 28.6, competitor: 24.9, action: 'Competitor Campaign', marketing: 8.6 },
    { name: 'May', year: 2023, share: 29.5, competitor: 22.8, action: 'Marketing Adjustment', marketing: 8.6 },
    { name: 'Jun', year: 2023, share: 29.4, competitor: 20.6, action: null, marketing: 13.3 },
    { name: 'Jul', year: 2023, share: 28.7, competitor: 20.3, action: null, marketing: 16.9 },
    { name: 'Aug', year: 2023, share: 30.1, competitor: 22.2, action: 'Product Optimization', marketing: 6.8 },
    { name: 'Sep', year: 2023, share: 29.4, competitor: 21.4, action: null, marketing: 14.4 },
    { name: 'Oct', year: 2023, share: 30.3, competitor: 27.0, action: 'Competitor Product Launch', marketing: 14.1 },
    { name: 'Nov', year: 2023, share: 28.7, competitor: 23.9, action: null, marketing: 13.8 },
    { name: 'Dec', year: 2023, share: 29.0, competitor: 22.7, action: 'Holiday Campaign', marketing: 12.6 }
];

/**
 * Market share insight data - Updated with real CSV data
 */
const marketShareInsight: InsightData[] = [
    {
        id: 1,
        title: "Market share remains stable despite competitor growth",
        kpis: [
            {
                id: 1,
                label: "Market Share Trends",
                chartTitle: "Market Share and Ad Spend vs. Competitors (Cooling Appliances)",
                chartType: "area",
                chartData: [
                    { name: 'Mar', company: 29.6, competitor_total: 21.1, competitor_a: 14.9, competitor_b: 6.2, ad_spend: 30, competitor_ad_spend_estimate: 31 },
                    { name: 'Apr', company: 28.6, competitor_total: 24.9, competitor_a: 16.7, competitor_b: 8.2, ad_spend: 32.1, competitor_ad_spend_estimate: 31 },
                    { name: 'May', company: 29.5, competitor_total: 22.8, competitor_a: 15.4, competitor_b: 7.4, ad_spend: 35.6, competitor_ad_spend_estimate: 32 },
                    { name: 'Jun', company: 29.4, competitor_total: 20.6, competitor_a: 13.8, competitor_b: 6.8, ad_spend: 32.8, competitor_ad_spend_estimate: 35 },
                    { name: 'Jul', company: 28.7, competitor_total: 20.3, competitor_a: 13.5, competitor_b: 6.8, ad_spend: 38.9, competitor_ad_spend_estimate: 31 },
                    { name: 'Aug', company: 30.1, competitor_total: 22.2, competitor_a: 14.8, competitor_b: 7.4, ad_spend: 39.9, competitor_ad_spend_estimate: 36 },
                    { name: 'Sep', company: 29.4, competitor_total: 21.4, competitor_a: 14.2, competitor_b: 7.2, ad_spend: 41.3, competitor_ad_spend_estimate: 38 },
                    { name: 'Oct', company: 30.3, competitor_total: 27.0, competitor_a: 18.2, competitor_b: 8.8, ad_spend: 42.7, competitor_ad_spend_estimate: 41 },
                    { name: 'Nov', company: 28.7, competitor_total: 23.9, competitor_a: 16.3, competitor_b: 7.6, ad_spend: 43.2, competitor_ad_spend_estimate: 45 },
                    { name: 'Dec', company: 29.0, competitor_total: 22.7, competitor_a: 15.3, competitor_b: 7.4, ad_spend: 44.5, competitor_ad_spend_estimate: 46 },
                    { name: 'Jan', company: 29.3, competitor_total: 20.2, competitor_a: 14.8, competitor_b: 5.4, ad_spend: 48.8, competitor_ad_spend_estimate: 49 },
                    { name: 'Feb', company: 29.0, competitor_total: 23.6, competitor_a: 16.2, competitor_b: 7.4, ad_spend: 51.2, competitor_ad_spend_estimate: 46 },
                ]
            },
            {
                id: 2,
                label: "Category Performance",
                chartTitle: "Market Share by Product Category",
                chartType: "bar",
                chartData: [
                    { name: 'Beverages', current_quarter: 11.9, previous_quarter: 9.1, competitor: 9.8 },
                    { name: 'Snacks', current_quarter: 10.3, previous_quarter: 8.2, competitor: 8.7 },
                    { name: 'Dairy', current_quarter: 8.1, previous_quarter: 7.3, target: 8.5, competitor: 6.9 },
                    { name: 'Personal Care', current_quarter: 7.9, previous_quarter: 6.5, competitor: 6.4 },
                    { name: 'Household', current_quarter: 9.4, previous_quarter: 7.8, competitor: 7.6 },
                    { name: 'Confectionery', current_quarter: 12.5, previous_quarter: 10.3, competitor: 10.8 }
                ]
            }
        ]
    }
    // Second card removed due to space constraints
];

/**
 * Brand awareness insight data
 */
const brandAwarenessInsight: InsightData[] = [
    {
        id: 2,
        title: "Shift towards digital channels is resulting in increased brand awareness score",
        kpis: [
            {
                id: 3,
                label: "Digital Channel Impact",
                chartTitle: "Brand Awareness by Channel Type",
                chartType: "bar",
                chartData: [
                    { name: 'Social Media', value: 85, growth: '+15%' },
                    { name: 'Display Ads', value: 72, growth: '+8%' },
                    { name: 'Email', value: 68, growth: '+5%' },
                    { name: 'Search', value: 78, growth: '+12%' },
                    { name: 'Content', value: 65, growth: '+7%' },
                    { name: 'Influencer', value: 82, growth: '+18%' }
                ]
            },
            {
                id: 4,
                label: "Brand Awareness Score",
                chartTitle: "Brand Awareness Score Trend",
                chartType: "line",
                chartData: [
                    { name: 'Jan', value: 54, social_reach: 1200000 },
                    { name: 'Feb', value: 58, social_reach: 1450000 },
                    { name: 'Mar', value: 62, social_reach: 1680000 },
                    { name: 'Apr', value: 65, social_reach: 1920000 },
                    { name: 'May', value: 69, social_reach: 2150000 },
                    { name: 'Jun', value: 71, social_reach: 2380000 },
                    { name: 'Jul', value: 73, social_reach: 2580000 },
                    { name: 'Aug', value: 75, social_reach: 2780000 }
                ]
            }
        ]
    },
    {
        id: 21,
        title: "Sentiment score among males over 65 lags behind competitors",
        kpis: [
            {
                id: 31,
                label: "Demographic Sentiment",
                chartTitle: "Sentiment Score by Age Group and Gender",
                chartType: "stacked",
                chartData: [
                    { age: '18-24', male: 78, female: 82, other: 80 },
                    { age: '25-34', male: 75, female: 79, other: 77 },
                    { age: '35-44', male: 72, female: 74, other: 73 },
                    { age: '45-54', male: 68, female: 70, other: 69 },
                    { age: '55-64', male: 62, female: 65, other: 63 },
                    { age: '65+', male: 55, female: 61, other: 58 }
                ]
            },
            {
                id: 41,
                label: "Competitor Comparison",
                chartTitle: "Senior Male Demographic: Us vs Competitors",
                chartType: "line",
                chartData: [
                    { month: 'Jan', our_score: 55, comp_a: 65, comp_b: 62, industry_avg: 61 },
                    { month: 'Feb', our_score: 56, comp_a: 66, comp_b: 63, industry_avg: 62 },
                    { month: 'Mar', our_score: 57, comp_a: 67, comp_b: 64, industry_avg: 63 },
                    { month: 'Apr', our_score: 58, comp_a: 67, comp_b: 64, industry_avg: 63 },
                    { month: 'May', our_score: 59, comp_a: 68, comp_b: 65, industry_avg: 64 },
                    { month: 'Jun', our_score: 60, comp_a: 68, comp_b: 65, industry_avg: 64 }
                ]
            }
        ]
    }
];

/**
 * Market performance insight data
 */
const marketPerformanceInsight: InsightData[] = [
    {
        id: 5,
        title: "My customer base is shifting but it's unclear whether customer preferences are shifting",
        kpis: [
            {
                id: 6,
                label: "Age Demographics",
                chartTitle: "Brand X Shopping Cart Conversions by Age Group",
                chartType: "bar",
                chartData: [
                    { name: '18-24', this_year: 35.5, last_year: 28, conversion_rate: 4.2, cart_value: 850 },
                    { name: '25-34', this_year: 42.1, last_year: 38.2, conversion_rate: 5.1, cart_value: 1250 },
                    { name: '35-44', this_year: 38.8, last_year: 45.6, conversion_rate: 4.8, cart_value: 1480 },
                    { name: '45-54', this_year: 30.0, last_year: 42.1, conversion_rate: 3.9, cart_value: 1380 },
                    { name: '55+', this_year: 25.9, last_year: 18.0, conversion_rate: 3.2, cart_value: 920 }
                ]
            },
            {
                id: 7,
                label: "Geographic Distribution",
                chartTitle: "Customer Distribution for Sales Events by Location",
                chartType: "stacked",
                chartData: [
                    { period: 'Q1', urban: 45, tier_2: 32, tier_3: 18, rural: 5 },
                    { period: 'Q2', urban: 43, tier_2: 34, tier_3: 17, rural: 6 },
                    { period: 'Q3', urban: 42, tier_2: 35, tier_3: 16, rural: 7 },
                    { period: 'Q4', urban: 40, tier_2: 36, tier_3: 16, rural: 8 }
                ]
            },
            {
                id: 8,
                label: "Product Preferences",
                chartTitle: "Product Category Distribution by Consumer Segments",
                chartType: "stacked",
                chartData: [
                    { segment: 'Premium', electronics: 42, fashion: 28, home: 18, beauty: 12 },
                    { segment: 'Mid-range', electronics: 35, fashion: 42, home: 15, beauty: 8 },
                    { segment: 'Budget', electronics: 22, fashion: 30, home: 38, beauty: 10 },
                    { segment: 'Value', electronics: 18, fashion: 25, home: 42, beauty: 15 }
                ]
            }
        ]
    },
    {
        id: 51,
        title: "Stop TV marketing in Tier II/III cities",
        kpis: [
            {
                id: 61,
                label: "Marketing ROI",
                chartTitle: "TV Campaign ROI by Region Type",
                chartType: "bar",
                chartData: [
                    { region: 'Metro', roi: 3.8, spend: 1250000, conversions: 48500 },
                    { region: 'Tier I', roi: 3.2, spend: 980000, conversions: 32450 },
                    { region: 'Tier II', roi: 1.4, spend: 720000, conversions: 10350 },
                    { region: 'Tier III', roi: 0.8, spend: 480000, conversions: 3950 },
                    { region: 'Rural', roi: 0.6, spend: 320000, conversions: 1850 }
                ]
            },
            {
                id: 71,
                label: "Channel Performance",
                chartTitle: "Marketing Channel Performance by City Tier",
                chartType: "stacked",
                chartData: [
                    { channel: 'TV', metro: 3.8, tier_1: 3.2, tier_2: 1.4, tier_3: 0.8 },
                    { channel: 'Digital', metro: 4.2, tier_1: 3.8, tier_2: 3.5, tier_3: 2.8 },
                    { channel: 'Print', metro: 2.1, tier_1: 2.4, tier_2: 2.6, tier_3: 1.9 },
                    { channel: 'Radio', metro: 2.8, tier_1: 3.0, tier_2: 2.4, tier_3: 1.1 },
                    { channel: 'OOH', metro: 2.5, tier_1: 2.2, tier_2: 1.8, tier_3: 1.0 }
                ]
            },
            {
                id: 81,
                label: "Customer Acquisition Cost",
                chartTitle: "CAC by Marketing Channel and Region",
                chartType: "bar",
                chartData: [
                    { region: 'Metro', tv: 850, digital: 420, print: 680, radio: 520 },
                    { region: 'Tier I', tv: 920, digital: 450, print: 650, radio: 540 },
                    { region: 'Tier II', tv: 1850, digital: 520, print: 720, radio: 680 },
                    { region: 'Tier III', tv: 2450, digital: 580, print: 750, radio: 720 }
                ]
            }
        ]
    }
]

/**
 * Customer engagement insight data
 */
const customerEngagementInsight: InsightData[] = [
    {
        id: 8,
        title: "Collaboration with more brands increased the attractiveness of the catalogue",
        kpis: [
            {
                id: 9,
                label: "Brand Partners",
                chartTitle: "Number of Brand Partners in Catalogue",
                chartType: "stacked",
                chartData: [
                    { month: 'Jan', premium: 28, standard: 45, basic: 38, total: 111 },
                    { month: 'Feb', premium: 32, standard: 48, basic: 42, total: 122 },
                    { month: 'Mar', premium: 35, standard: 52, basic: 45, total: 132 },
                    { month: 'Apr', premium: 38, standard: 55, basic: 48, total: 141 },
                    { month: 'May', premium: 42, standard: 58, basic: 52, total: 152 },
                    { month: 'Jun', premium: 45, standard: 62, basic: 55, total: 162 }
                ]
            },
            {
                id: 10,
                label: "Catalogue Engagement",
                chartTitle: "Catalogue Browse Time Trend",
                chartType: "area",
                chartData: [
                    { month: 'Jan', browse_time: 7.2, page_views: 4.5, conversion: 2.8, bounce_rate: 32 },
                    { month: 'Feb', browse_time: 7.4, page_views: 4.8, conversion: 3.1, bounce_rate: 30 },
                    { month: 'Mar', browse_time: 7.5, page_views: 5.2, conversion: 3.4, bounce_rate: 28 },
                    { month: 'Apr', browse_time: 7.8, page_views: 5.5, conversion: 3.6, bounce_rate: 27 },
                    { month: 'May', browse_time: 8.1, page_views: 5.8, conversion: 3.9, bounce_rate: 25 },
                    { month: 'Jun', browse_time: 8.2, page_views: 6.1, conversion: 4.2, bounce_rate: 24 }
                ]
            }
        ]
    },
    {
        id: 81,
        title: "New loyalty programs are highly effective with our customer-base",
        kpis: [
            {
                id: 91,
                label: "Loyalty Program Enrollment",
                chartTitle: "Monthly Loyalty Program Sign-ups",
                chartType: "stacked",
                chartData: [
                    { name: 'Jan', new: 1250, upgrades: 320, referrals: 180, churn: 95 },
                    { name: 'Feb', new: 1580, upgrades: 380, referrals: 220, churn: 105 },
                    { name: 'Mar', new: 2150, upgrades: 420, referrals: 280, churn: 120 },
                    { name: 'Apr', new: 2480, upgrades: 520, referrals: 350, churn: 135 },
                    { name: 'May', new: 3120, upgrades: 580, referrals: 420, churn: 145 }
                ]
            },
            {
                id: 101,
                label: "Customer Lifetime Value",
                chartTitle: "CLV: Loyalty vs Non-Loyalty Customers",
                chartType: "stacked",
                chartData: [
                    { name: 'Q1', loyalty: 3500, non_loyalty: 1800, premium_loyalty: 4500, first_time: 1500, returning: 3000, retention_rate: 85 },
                    { name: 'Q2', loyalty: 4200, non_loyalty: 1950, premium_loyalty: 5200, first_time: 1800, returning: 3500, retention_rate: 87 },
                    { name: 'Q3', loyalty: 4800, non_loyalty: 2200, premium_loyalty: 5800, first_time: 2200, returning: 4200, retention_rate: 89 },
                    { name: 'Q4', loyalty: 5500, non_loyalty: 2400, premium_loyalty: 6500, first_time: 2800, returning: 4800, retention_rate: 92 }
                ]
            },
            {
                id: 111,
                label: "Program Engagement",
                chartTitle: "Loyalty Program Activity by Customer Segment",
                chartType: "stacked",
                chartData: [
                    { name: 'Premium Brands', loyalty: 65, non_loyalty: 42, new: 18, avg_spend: 2800, frequency: 3.2 },
                    { name: 'Mid-tier Brands', loyalty: 25, non_loyalty: 38, new: 19, avg_spend: 1500, frequency: 2.8 },
                    { name: 'Budget Brands', loyalty: 10, non_loyalty: 20, new: 27, avg_spend: 800, frequency: 2.1 }
                ]
            }
        ]
    },
    {
        id: 82,
        title: "$10 movie voucher and $5 ice cream vouchers increased redemptions",
        kpis: [
            {
                id: 92,
                label: "Voucher Redemption",
                chartTitle: "Voucher Redemption Rate by Type",
                chartType: "stacked",
                chartData: [
                    { name: 'Jan', movie: 520, ice_cream: 380, dining: 290, retail: 210, repeat_rate: 28, avg_basket: 1250 },
                    { name: 'Feb', movie: 550, ice_cream: 410, dining: 310, retail: 230, repeat_rate: 32, avg_basket: 1350 },
                    { name: 'Mar', movie: 780, ice_cream: 630, dining: 340, retail: 250, repeat_rate: 35, avg_basket: 1480 },
                    { name: 'Apr', movie: 980, ice_cream: 820, dining: 390, retail: 280, repeat_rate: 38, avg_basket: 1520 },
                    { name: 'May', movie: 1150, ice_cream: 970, dining: 420, retail: 310, repeat_rate: 42, avg_basket: 1680 }
                ]
            },
            {
                id: 102,
                label: "Popular Vouchers",
                chartTitle: "Voucher Performance Metrics",
                chartType: "stacked",
                chartData: [
                    { name: 'Movie Tickets', redemption: 42, satisfaction: 4.5, repeat_purchase: 68, revenue_impact: 15200 },
                    { name: 'Ice Cream', redemption: 28, satisfaction: 4.3, repeat_purchase: 72, revenue_impact: 8500 },
                    { name: 'Fast Food', redemption: 15, satisfaction: 4.1, repeat_purchase: 58, revenue_impact: 6200 },
                    { name: 'Coffee', redemption: 8, satisfaction: 4.0, repeat_purchase: 62, revenue_impact: 3800 },
                    { name: 'Retail', redemption: 7, satisfaction: 3.8, repeat_purchase: 45, revenue_impact: 4200 }
                ]
            }
        ]
    }
];

export {
    colors,
    decisionStatsData,
    topDecisionsData,
    salesData,
    productPerformanceData,
    barChartData,
    gaugeData,
    lineChartData,
    areaChartData,
    ctrData,
    ctrColors,
    conversionData,
    brandSentimentData,
    positiveData,
    negativeData,
    brandColors,
    stackedBrandColors,
    sentimentColors,
    customerSentimentData,
    competitorGrowthData,
    marketShareTimelineData,
    marketShareInsight,
    brandAwarenessInsight,
    marketPerformanceInsight,
    customerEngagementInsight
};


