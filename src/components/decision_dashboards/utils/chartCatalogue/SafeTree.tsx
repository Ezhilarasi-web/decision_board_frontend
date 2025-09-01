import { memo } from "react";
import { Tree } from "@nivo/tree";
import { ChartErrorBoundary } from "@/components/decision_dashboards/chartWrapperComponents";

const MemoizedTree = memo(Tree);

export const fallbackData = {
    "name": "Total Revenue",
    "color": "hsl(107, 70%, 50%)",
    "children": [
        {
            "name": "Core Products",
            "color": "hsl(166, 70%, 50%)",
            "children": [
                {
                    "name": "Hardware",
                    "color": "hsl(243, 70%, 50%)",
                    "children": [
                        {
                            "name": "Laptops",
                            "color": "hsl(147, 70%, 50%)",
                            "loc": 37914
                        },
                        {
                            "name": "Smartphones",
                            "color": "hsl(37, 70%, 50%)",
                            "loc": 183726
                        },
                        {
                            "name": "Tablets",
                            "color": "hsl(185, 70%, 50%)",
                            "loc": 112321
                        },
                        {
                            "name": "Wearables",
                            "color": "hsl(62, 70%, 50%)",
                            "loc": 64381
                        }
                    ]
                },
                {
                    "name": "Software",
                    "color": "hsl(99, 70%, 50%)",
                    "children": [
                        {
                            "name": "Applications",
                            "color": "hsl(194, 70%, 50%)",
                            "children": [
                                {
                                    "name": "Mobile Apps",
                                    "color": "hsl(285, 70%, 50%)",
                                    "children": [
                                        {
                                            "name": "Game Apps",
                                            "color": "hsl(50, 70%, 50%)",
                                            "loc": 91444
                                        },
                                        {
                                            "name": "Productivity Apps",
                                            "color": "hsl(329, 70%, 50%)",
                                            "loc": 7458
                                        },
                                        {
                                            "name": "Social Apps",
                                            "color": "hsl(201, 70%, 50%)",
                                            "loc": 80452
                                        }
                                    ]
                                },
                                {
                                    "name": "Desktop Apps",
                                    "color": "hsl(229, 70%, 50%)",
                                    "loc": 181597
                                },
                                {
                                    "name": "Cloud Services",
                                    "color": "hsl(163, 70%, 50%)",
                                    "loc": 41139
                                }
                            ]
                        },
                        {
                            "name": "Other Software",
                            "color": "hsl(250, 70%, 50%)",
                            "loc": 88750
                        }
                    ]
                }
            ]
        },
        {
            "name": "Accessories",
            "color": "hsl(141, 70%, 50%)",
            "children": [
                {
                    "name": "Watches",
                    "color": "hsl(11, 70%, 50%)",
                    "loc": 3408
                },
                {
                    "name": "Jewelry",
                    "color": "hsl(343, 70%, 50%)",
                    "loc": 115211
                }
            ]
        },
        {
            "name": "Services",
            "color": "hsl(19, 70%, 50%)",
            "children": [
                {
                    "name": "Consulting",
                    "color": "hsl(139, 70%, 50%)",
                    "loc": 132732
                },
                {
                    "name": "Warranty",
                    "color": "hsl(78, 70%, 50%)",
                    "loc": 145944
                },
                {
                    "name": "Support",
                    "color": "hsl(267, 70%, 50%)",
                    "loc": 102012
                },
                {
                    "name": "Installation",
                    "color": "hsl(195, 70%, 50%)",
                    "loc": 106112
                },
                {
                    "name": "Maintenance",
                    "color": "hsl(119, 70%, 50%)",
                    "loc": 83245
                },
                {
                    "name": "Training",
                    "color": "hsl(231, 70%, 50%)",
                    "loc": 68580
                },
                {
                    "name": "Extended Service",
                    "color": "hsl(256, 70%, 50%)",
                    "loc": 142616
                }
            ]
        },
        {
            "name": "Digital Products",
            "color": "hsl(270, 70%, 50%)",
            "children": [
                {
                    "name": "E-books",
                    "color": "hsl(174, 70%, 50%)",
                    "loc": 152111
                },
                {
                    "name": "Software Licenses",
                    "color": "hsl(101, 70%, 50%)",
                    "loc": 114330
                },
                {
                    "name": "Online Subscriptions",
                    "color": "hsl(320, 70%, 50%)",
                    "loc": 36306
                },
                {
                    "name": "Streaming Services",
                    "color": "hsl(104, 70%, 50%)",
                    "loc": 149836
                },
                {
                    "name": "Digital Marketing",
                    "color": "hsl(166, 70%, 50%)",
                    "loc": 172845
                }
            ]
        },
        {
            "name": "Distribution Channels",
            "color": "hsl(2, 70%, 50%)",
            "children": [
                {
                    "name": "Direct Sales",
                    "color": "hsl(127, 70%, 50%)",
                    "loc": 44962
                },
                {
                    "name": "Retail Partners",
                    "color": "hsl(12, 70%, 50%)",
                    "loc": 5057
                },
                {
                    "name": "E-commerce",
                    "color": "hsl(290, 70%, 50%)",
                    "loc": 196291
                },
                {
                    "name": "Wholesale",
                    "color": "hsl(103, 70%, 50%)",
                    "loc": 125511
                },
                {
                    "name": "Franchising",
                    "color": "hsl(308, 70%, 50%)",
                    "loc": 149151
                },
                {
                    "name": "Export",
                    "color": "hsl(20, 70%, 50%)",
                    "loc": 37862
                },
                {
                    "name": "Distributor Networks",
                    "color": "hsl(257, 70%, 50%)",
                    "loc": 83188
                },
                {
                    "name": "Online Marketplaces",
                    "color": "hsl(276, 70%, 50%)",
                    "loc": 196515
                },
                {
                    "name": "Subscription Boxes",
                    "color": "hsl(10, 70%, 50%)",
                    "loc": 99686
                },
                {
                    "name": "B2B Sales",
                    "color": "hsl(290, 70%, 50%)",
                    "loc": 4726
                },
                {
                    "name": "Third-Party Retail",
                    "color": "hsl(42, 70%, 50%)",
                    "loc": 175897
                },
                {
                    "name": "Pop-up Stores",
                    "color": "hsl(55, 70%, 50%)",
                    "loc": 85098
                },
                {
                    "name": "Others",
                    "color": "hsl(75, 70%, 50%)",
                    "loc": 121384
                }
            ]
        },
        {
            "name": "Marketing & Branding",
            "color": "hsl(329, 70%, 50%)",
            "children": [
                {
                    "name": "Campaigns",
                    "color": "hsl(287, 70%, 50%)",
                    "loc": 29867
                },
                {
                    "name": "Sponsorships",
                    "color": "hsl(95, 70%, 50%)",
                    "loc": 171871
                },
                {
                    "name": "Brand Partnerships",
                    "color": "hsl(158, 70%, 50%)",
                    "loc": 73329
                },
                {
                    "name": "Social Media Marketing",
                    "color": "hsl(186, 70%, 50%)",
                    "loc": 65111
                },
                {
                    "name": "Content Marketing",
                    "color": "hsl(301, 70%, 50%)",
                    "loc": 55084
                },
                {
                    "name": "PR & Events",
                    "color": "hsl(321, 70%, 50%)",
                    "loc": 2989
                },
                {
                    "name": "Influencer Marketing",
                    "color": "hsl(286, 70%, 50%)",
                    "loc": 44310
                },
                {
                    "name": "SEO & SEM",
                    "color": "hsl(65, 70%, 50%)",
                    "loc": 63130
                },
                {
                    "name": "Affiliate Marketing",
                    "color": "hsl(161, 70%, 50%)",
                    "loc": 81827
                }
            ]
        },
        {
            "name": "Other Revenue Streams",
            "color": "hsl(147, 70%, 50%)",
            "children": [
                {
                    "name": "Regional Revenue",
                    "color": "hsl(171, 70%, 50%)",
                    "children": [
                        {
                            "name": "North America",
                            "color": "hsl(348, 70%, 50%)",
                            "loc": 154094
                        },
                        {
                            "name": "Europe",
                            "color": "hsl(217, 70%, 50%)",
                            "loc": 141188
                        },
                        {
                            "name": "Asia",
                            "color": "hsl(85, 70%, 50%)",
                            "loc": 61999
                        },
                        {
                            "name": "Africa",
                            "color": "hsl(312, 70%, 50%)",
                            "loc": 180272
                        }
                    ]
                },
                {
                    "name": "Licensing Revenue",
                    "color": "hsl(235, 70%, 50%)",
                    "loc": 169091
                },
                {
                    "name": "Miscellaneous",
                    "color": "hsl(256, 70%, 50%)",
                    "children": [
                        {
                            "name": "R&D Income",
                            "color": "hsl(16, 70%, 50%)",
                            "loc": 115084
                        },
                        {
                            "name": "Investment Income",
                            "color": "hsl(349, 70%, 50%)",
                            "children": [
                                {
                                    "name": "Dividends",
                                    "color": "hsl(240, 70%, 50%)",
                                    "loc": 131266
                                },
                                {
                                    "name": "Interest",
                                    "color": "hsl(316, 70%, 50%)",
                                    "loc": 147946
                                },
                                {
                                    "name": "Capital Gains",
                                    "color": "hsl(239, 70%, 50%)",
                                    "loc": 28640
                                },
                                {
                                    "name": "Other Investments",
                                    "color": "hsl(88, 70%, 50%)",
                                    "loc": 113151
                                }
                            ]
                        },
                        {
                            "name": "Grants & Subsidies",
                            "color": "hsl(247, 70%, 50%)",
                            "children": [
                                {
                                    "name": "Government Grants",
                                    "color": "hsl(49, 70%, 50%)",
                                    "loc": 29182
                                },
                                {
                                    "name": "Research Grants",
                                    "color": "hsl(211, 70%, 50%)",
                                    "loc": 118501
                                },
                                {
                                    "name": "Subsidies",
                                    "color": "hsl(236, 70%, 50%)",
                                    "loc": 72629
                                },
                                {
                                    "name": "Tax Incentives",
                                    "color": "hsl(164, 70%, 50%)",
                                    "loc": 76925
                                },
                                {
                                    "name": "Innovation Funds",
                                    "color": "hsl(85, 70%, 50%)",
                                    "loc": 92549
                                },
                                {
                                    "name": "Community Grants",
                                    "color": "hsl(87, 70%, 50%)",
                                    "loc": 164373
                                },
                                {
                                    "name": "Educational Grants",
                                    "color": "hsl(336, 70%, 50%)",
                                    "loc": 45733
                                },
                                {
                                    "name": "Special Programs",
                                    "color": "hsl(71, 70%, 50%)",
                                    "loc": 148067
                                },
                                {
                                    "name": "Other Grants",
                                    "color": "hsl(200, 70%, 50%)",
                                    "loc": 173564
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
}

export const SafeTree = ({ data, ...props }: any) => {
    return (
        <ChartErrorBoundary>
            <MemoizedTree data={data || fallbackData} {...props}
                identity="name"
                activeNodeSize={24}
                inactiveNodeSize={12}
                nodeColor={{ scheme: 'tableau10' }}
                fixNodeColorAtDepth={1}
                linkThickness={2}
                activeLinkThickness={8}
                inactiveLinkThickness={2}
                linkColor={{
                    from: 'target.color',
                    modifiers: [
                        [
                            'opacity',
                            0.4
                        ]
                    ]
                }}
                margin={{ top: 90, right: 90, bottom: 90, left: 90 }}
                motionConfig="stiff"
                meshDetectionRadius={80} />
        </ChartErrorBoundary>
    );
};

