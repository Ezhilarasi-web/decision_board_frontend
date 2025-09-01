import { memo } from "react";
import { TreeMap } from "@nivo/treemap";
import { ChartErrorBoundary } from "@/components/decision_dashboards/chartWrapperComponents";

const MemoizedTreeMap = memo(TreeMap);

export const fallbackData = {
    "name": "Social Media Impact",
    "color": "hsl(101, 70%, 50%)",
    "children": [
        {
            "name": "Organic Engagement",
            "color": "hsl(126, 70%, 50%)",
            "children": [
                {
                    "name": "Facebook",
                    "color": "hsl(36, 70%, 50%)",
                    "children": [
                        {
                            "name": "Likes",
                            "color": "hsl(98, 70%, 50%)",
                            "loc": 20000
                        },
                        {
                            "name": "Shares",
                            "color": "hsl(170, 70%, 50%)",
                            "loc": 30000
                        },
                        {
                            "name": "Comments",
                            "color": "hsl(283, 70%, 50%)",
                            "loc": 25000
                        },
                        {
                            "name": "Views",
                            "color": "hsl(340, 70%, 50%)",
                            "loc": 40000
                        }
                    ]
                },
                {
                    "name": "Instagram",
                    "color": "hsl(104, 70%, 50%)",
                    "children": [
                        {
                            "name": "Reels",
                            "color": "hsl(314, 70%, 50%)",
                            "children": [
                                {
                                    "name": "Video Ads",
                                    "color": "hsl(70, 70%, 50%)",
                                    "children": [
                                        {
                                            "name": "Engagement",
                                            "color": "hsl(152, 70%, 50%)",
                                            "loc": 15000
                                        },
                                        {
                                            "name": "Clicks",
                                            "color": "hsl(239, 70%, 50%)",
                                            "loc": 10000
                                        },
                                        {
                                            "name": "Conversions",
                                            "color": "hsl(270, 70%, 50%)",
                                            "loc": 8000
                                        }
                                    ]
                                },
                                {
                                    "name": "Carousels",
                                    "color": "hsl(230, 70%, 50%)",
                                    "loc": 22000
                                },
                                {
                                    "name": "IGTV",
                                    "color": "hsl(100, 70%, 50%)",
                                    "loc": 18000
                                }
                            ]
                        },
                        {
                            "name": "Influencer Mentions",
                            "color": "hsl(94, 70%, 50%)",
                            "loc": 12000
                        }
                    ]
                }
            ]
        },
        {
            "name": "Paid Reach",
            "color": "hsl(293, 70%, 50%)",
            "children": [
                {
                    "name": "Facebook Ads",
                    "color": "hsl(140, 70%, 50%)",
                    "loc": 50000
                },
                {
                    "name": "Instagram Ads",
                    "color": "hsl(118, 70%, 50%)",
                    "loc": 45000
                }
            ]
        },
        {
            "name": "User-Generated Content",
            "color": "hsl(213, 70%, 50%)",
            "children": [
                {
                    "name": "Comments",
                    "color": "hsl(25, 70%, 50%)",
                    "loc": 30000
                },
                {
                    "name": "Reviews",
                    "color": "hsl(277, 70%, 50%)",
                    "loc": 25000
                },
                {
                    "name": "Shares",
                    "color": "hsl(282, 70%, 50%)",
                    "loc": 40000
                },
                {
                    "name": "Mentions",
                    "color": "hsl(181, 70%, 50%)",
                    "loc": 35000
                },
                {
                    "name": "Tags",
                    "color": "hsl(216, 70%, 50%)",
                    "loc": 20000
                },
                {
                    "name": "Posts",
                    "color": "hsl(54, 70%, 50%)",
                    "loc": 50000
                },
                {
                    "name": "Replies",
                    "color": "hsl(131, 70%, 50%)",
                    "loc": 15000
                }
            ]
        },
        {
            "name": "Referral Traffic",
            "color": "hsl(191, 70%, 50%)",
            "children": [
                {
                    "name": "Blog Posts",
                    "color": "hsl(89, 70%, 50%)",
                    "loc": 22000
                },
                {
                    "name": "Forums",
                    "color": "hsl(179, 70%, 50%)",
                    "loc": 18000
                },
                {
                    "name": "Reviews",
                    "color": "hsl(135, 70%, 50%)",
                    "loc": 16000
                },
                {
                    "name": "News",
                    "color": "hsl(107, 70%, 50%)",
                    "loc": 25000
                },
                {
                    "name": "Affiliate",
                    "color": "hsl(290, 70%, 50%)",
                    "loc": 30000
                }
            ]
        },
        {
            "name": "Content Performance",
            "color": "hsl(205, 70%, 50%)",
            "children": [
                {
                    "name": "Video Views",
                    "color": "hsl(339, 70%, 50%)",
                    "loc": 45000
                },
                {
                    "name": "Article Reads",
                    "color": "hsl(250, 70%, 50%)",
                    "loc": 40000
                },
                {
                    "name": "Time Spent",
                    "color": "hsl(198, 70%, 50%)",
                    "loc": 35000
                },
                {
                    "name": "Bounce Rate",
                    "color": "hsl(308, 70%, 50%)",
                    "loc": 30000
                },
                {
                    "name": "CTR",
                    "color": "hsl(9, 70%, 50%)",
                    "loc": 28000
                },
                {
                    "name": "Conversion Rate",
                    "color": "hsl(12, 70%, 50%)",
                    "loc": 26000
                },
                {
                    "name": "Engagement Rate",
                    "color": "hsl(151, 70%, 50%)",
                    "loc": 24000
                },
                {
                    "name": "Shares per Post",
                    "color": "hsl(78, 70%, 50%)",
                    "loc": 22000
                },
                {
                    "name": "Comments per Post",
                    "color": "hsl(75, 70%, 50%)",
                    "loc": 20000
                },
                {
                    "name": "Likes per Post",
                    "color": "hsl(300, 70%, 50%)",
                    "loc": 21000
                },
                {
                    "name": "Followers Growth",
                    "color": "hsl(154, 70%, 50%)",
                    "loc": 23000
                },
                {
                    "name": "Profile Visits",
                    "color": "hsl(288, 70%, 50%)",
                    "loc": 19000
                },
                {
                    "name": "Mentions per Post",
                    "color": "hsl(165, 70%, 50%)",
                    "loc": 17000
                }
            ]
        },
        {
            "name": "Sentiment Analysis",
            "color": "hsl(299, 70%, 50%)",
            "children": [
                {
                    "name": "Positive",
                    "color": "hsl(324, 70%, 50%)",
                    "loc": 60000
                },
                {
                    "name": "Neutral",
                    "color": "hsl(127, 70%, 50%)",
                    "loc": 50000
                },
                {
                    "name": "Negative",
                    "color": "hsl(172, 70%, 50%)",
                    "loc": 40000
                },
                {
                    "name": "Mixed",
                    "color": "hsl(305, 70%, 50%)",
                    "loc": 30000
                },
                {
                    "name": "Overall Score",
                    "color": "hsl(224, 70%, 50%)",
                    "loc": 45000
                },
                {
                    "name": "Volatility",
                    "color": "hsl(91, 70%, 50%)",
                    "loc": 35000
                },
                {
                    "name": "Reach",
                    "color": "hsl(49, 70%, 50%)",
                    "loc": 38000
                },
                {
                    "name": "Clarity",
                    "color": "hsl(360, 70%, 50%)",
                    "loc": 32000
                },
                {
                    "name": "Consistency",
                    "color": "hsl(9, 70%, 50%)",
                    "loc": 28000
                }
            ]
        },
        {
            "name": "Overall Campaign",
            "color": "hsl(48, 70%, 50%)",
            "children": [
                {
                    "name": "Demographics",
                    "color": "hsl(213, 70%, 50%)",
                    "children": [
                        {
                            "name": "Age Distribution",
                            "color": "hsl(118, 70%, 50%)",
                            "loc": 15000
                        },
                        {
                            "name": "Gender Distribution",
                            "color": "hsl(256, 70%, 50%)",
                            "loc": 20000
                        },
                        {
                            "name": "Income Levels",
                            "color": "hsl(336, 70%, 50%)",
                            "loc": 18000
                        },
                        {
                            "name": "Geographic Reach",
                            "color": "hsl(203, 70%, 50%)",
                            "loc": 22000
                        }
                    ]
                },
                {
                    "name": "Competitor Benchmark",
                    "color": "hsl(199, 70%, 50%)",
                    "loc": 25000
                },
                {
                    "name": "Historical Trend",
                    "color": "hsl(269, 70%, 50%)",
                    "children": [
                        {
                            "name": "Q1",
                            "color": "hsl(299, 70%, 50%)",
                            "loc": 30000
                        },
                        {
                            "name": "Q2",
                            "color": "hsl(339, 70%, 50%)",
                            "children": [
                                {
                                    "name": "Social Media",
                                    "color": "hsl(347, 70%, 50%)",
                                    "loc": 15000
                                },
                                {
                                    "name": "TV",
                                    "color": "hsl(129, 70%, 50%)",
                                    "loc": 16000
                                },
                                {
                                    "name": "Radio",
                                    "color": "hsl(344, 70%, 50%)",
                                    "loc": 14000
                                },
                                {
                                    "name": "Print",
                                    "color": "hsl(338, 70%, 50%)",
                                    "loc": 13000
                                }
                            ]
                        },
                        {
                            "name": "Q3",
                            "color": "hsl(51, 70%, 50%)",
                            "children": [
                                {
                                    "name": "Digital",
                                    "color": "hsl(192, 70%, 50%)",
                                    "loc": 17000
                                },
                                {
                                    "name": "Outdoor",
                                    "color": "hsl(93, 70%, 50%)",
                                    "loc": 18000
                                },
                                {
                                    "name": "Email",
                                    "color": "hsl(354, 70%, 50%)",
                                    "loc": 19000
                                },
                                {
                                    "name": "Direct Mail",
                                    "color": "hsl(29, 70%, 50%)",
                                    "loc": 20000
                                },
                                {
                                    "name": "Search",
                                    "color": "hsl(187, 70%, 50%)",
                                    "loc": 21000
                                },
                                {
                                    "name": "Affiliate",
                                    "color": "hsl(251, 70%, 50%)",
                                    "loc": 22000
                                },
                                {
                                    "name": "Referral",
                                    "color": "hsl(136, 70%, 50%)",
                                    "loc": 23000
                                },
                                {
                                    "name": "SMS",
                                    "color": "hsl(15, 70%, 50%)",
                                    "loc": 24000
                                },
                                {
                                    "name": "Push Notifications",
                                    "color": "hsl(256, 70%, 50%)",
                                    "loc": 25000
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
}

export const SafeTreeMap = ({ data, ...props }: any) => {
    return (
        <ChartErrorBoundary>
            <MemoizedTreeMap data={data || fallbackData} {...props}
                identity="name"
                value="loc"
                valueFormat=".02s"
                margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
                labelSkipSize={12}
                labelTextColor="#000000"
                parentLabelTextColor="#000000"
                borderColor={{
                    from: 'color',
                    modifiers: [
                        [
                            'darker',
                            0.1
                        ]
                    ]
                }} />
        </ChartErrorBoundary>
    );
};
