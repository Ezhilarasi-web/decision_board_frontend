import { memo } from "react";
import { CirclePacking } from "@nivo/circle-packing";
import { ChartErrorBoundary } from "@/components/decision_dashboards/chartWrapperComponents";

const MemoizedCirclePacking = memo(CirclePacking);

export const fallbackData = {
    "name": "Product Distribution",
    "color": "hsl(48, 70%, 50%)",
    "children": [
        {
            "name": "Supermarkets",
            "color": "hsl(282, 70%, 50%)",
            "children": [
                {
                    "name": "Perishables",
                    "color": "hsl(277, 70%, 50%)",
                    "children": [
                        {
                            "name": "Vegetables",
                            "color": "hsl(210, 70%, 50%)",
                            "loc": 651
                        },
                        {
                            "name": "Fruits",
                            "color": "hsl(19, 70%, 50%)",
                            "loc": 109594
                        },
                        {
                            "name": "Dairy",
                            "color": "hsl(240, 70%, 50%)",
                            "loc": 46864
                        },
                        {
                            "name": "Meat",
                            "color": "hsl(359, 70%, 50%)",
                            "loc": 195317
                        }
                    ]
                },
                {
                    "name": "Non-Perishables",
                    "color": "hsl(83, 70%, 50%)",
                    "children": [
                        {
                            "name": "Processed Goods",
                            "color": "hsl(307, 70%, 50%)",
                            "children": [
                                {
                                    "name": "Canned Goods",
                                    "color": "hsl(186, 70%, 50%)",
                                    "children": [
                                        {
                                            "name": "Category A",
                                            "color": "hsl(122, 70%, 50%)",
                                            "loc": 52676
                                        },
                                        {
                                            "name": "Category B",
                                            "color": "hsl(166, 70%, 50%)",
                                            "loc": 38501
                                        },
                                        {
                                            "name": "Category C",
                                            "color": "hsl(107, 70%, 50%)",
                                            "loc": 134226
                                        }
                                    ]
                                },
                                {
                                    "name": "Household Items",
                                    "color": "hsl(354, 70%, 50%)",
                                    "loc": 125436
                                },
                                {
                                    "name": "Personal Care",
                                    "color": "hsl(201, 70%, 50%)",
                                    "loc": 118881
                                }
                            ]
                        },
                        {
                            "name": "Miscellaneous",
                            "color": "hsl(84, 70%, 50%)",
                            "loc": 141132
                        }
                    ]
                }
            ]
        },
        {
            "name": "Wholesale Distribution",
            "color": "hsl(73, 70%, 50%)",
            "children": [
                {
                    "name": "Local Wholesalers",
                    "color": "hsl(71, 70%, 50%)",
                    "loc": 173051
                },
                {
                    "name": "International Wholesalers",
                    "color": "hsl(318, 70%, 50%)",
                    "loc": 180008
                }
            ]
        },
        {
            "name": "Direct-to-Consumer",
            "color": "hsl(268, 70%, 50%)",
            "children": [
                {
                    "name": "Online Sales",
                    "color": "hsl(296, 70%, 50%)",
                    "loc": 129464
                },
                {
                    "name": "Company Outlets",
                    "color": "hsl(357, 70%, 50%)",
                    "loc": 21904
                },
                {
                    "name": "Pop-up Stores",
                    "color": "hsl(107, 70%, 50%)",
                    "loc": 89473
                },
                {
                    "name": "Mobile Retail",
                    "color": "hsl(28, 70%, 50%)",
                    "loc": 140190
                },
                {
                    "name": "Direct Orders",
                    "color": "hsl(239, 70%, 50%)",
                    "loc": 116835
                },
                {
                    "name": "Catalog Orders",
                    "color": "hsl(39, 70%, 50%)",
                    "loc": 139433
                },
                {
                    "name": "Subscription Boxes",
                    "color": "hsl(167, 70%, 50%)",
                    "loc": 91153
                }
            ]
        },
        {
            "name": "Export Channels",
            "color": "hsl(306, 70%, 50%)",
            "children": [
                {
                    "name": "North America",
                    "color": "hsl(88, 70%, 50%)",
                    "loc": 28951
                },
                {
                    "name": "Europe",
                    "color": "hsl(295, 70%, 50%)",
                    "loc": 133745
                },
                {
                    "name": "Asia",
                    "color": "hsl(141, 70%, 50%)",
                    "loc": 90567
                },
                {
                    "name": "South America",
                    "color": "hsl(341, 70%, 50%)",
                    "loc": 49806
                },
                {
                    "name": "Africa",
                    "color": "hsl(203, 70%, 50%)",
                    "loc": 79984
                }
            ]
        },
        {
            "name": "Regional Distribution",
            "color": "hsl(279, 70%, 50%)",
            "children": [
                {
                    "name": "North Region",
                    "color": "hsl(352, 70%, 50%)",
                    "loc": 170121
                },
                {
                    "name": "South Region",
                    "color": "hsl(214, 70%, 50%)",
                    "loc": 154512
                },
                {
                    "name": "East Region",
                    "color": "hsl(178, 70%, 50%)",
                    "loc": 46665
                },
                {
                    "name": "West Region",
                    "color": "hsl(108, 70%, 50%)",
                    "loc": 127876
                },
                {
                    "name": "Central Region",
                    "color": "hsl(81, 70%, 50%)",
                    "loc": 78250
                },
                {
                    "name": "Northeast",
                    "color": "hsl(263, 70%, 50%)",
                    "loc": 151722
                },
                {
                    "name": "Northwest",
                    "color": "hsl(280, 70%, 50%)",
                    "loc": 94422
                },
                {
                    "name": "Southeast",
                    "color": "hsl(56, 70%, 50%)",
                    "loc": 133690
                },
                {
                    "name": "Southwest",
                    "color": "hsl(265, 70%, 50%)",
                    "loc": 16822
                },
                {
                    "name": "Urban",
                    "color": "hsl(356, 70%, 50%)",
                    "loc": 127991
                },
                {
                    "name": "Rural",
                    "color": "hsl(194, 70%, 50%)",
                    "loc": 84918
                },
                {
                    "name": "Suburban",
                    "color": "hsl(218, 70%, 50%)",
                    "loc": 73704
                },
                {
                    "name": "Other Regions",
                    "color": "hsl(19, 70%, 50%)",
                    "loc": 140359
                }
            ]
        },
        {
            "name": "In-Store Distribution",
            "color": "hsl(14, 70%, 50%)",
            "children": [
                {
                    "name": "Big Box",
                    "color": "hsl(314, 70%, 50%)",
                    "loc": 25088
                },
                {
                    "name": "Convenience",
                    "color": "hsl(337, 70%, 50%)",
                    "loc": 115126
                },
                {
                    "name": "Specialty",
                    "color": "hsl(307, 70%, 50%)",
                    "loc": 136418
                },
                {
                    "name": "Discount",
                    "color": "hsl(125, 70%, 50%)",
                    "loc": 65122
                },
                {
                    "name": "Boutique",
                    "color": "hsl(183, 70%, 50%)",
                    "loc": 135246
                },
                {
                    "name": "Flagship",
                    "color": "hsl(67, 70%, 50%)",
                    "loc": 81165
                },
                {
                    "name": "Department",
                    "color": "hsl(14, 70%, 50%)",
                    "loc": 80573
                },
                {
                    "name": "Outlet",
                    "color": "hsl(163, 70%, 50%)",
                    "loc": 4358
                },
                {
                    "name": "Pop-up",
                    "color": "hsl(278, 70%, 50%)",
                    "loc": 143966
                }
            ]
        },
        {
            "name": "Other Channels",
            "color": "hsl(112, 70%, 50%)",
            "children": [
                {
                    "name": "Direct Partnerships",
                    "color": "hsl(355, 70%, 50%)",
                    "children": [
                        {
                            "name": "Franchises",
                            "color": "hsl(147, 70%, 50%)",
                            "loc": 55241
                        },
                        {
                            "name": "Licensing",
                            "color": "hsl(16, 70%, 50%)",
                            "loc": 95811
                        },
                        {
                            "name": "Dropshipping",
                            "color": "hsl(154, 70%, 50%)",
                            "loc": 15334
                        },
                        {
                            "name": "Third-Party Retailers",
                            "color": "hsl(283, 70%, 50%)",
                            "loc": 165208
                        }
                    ]
                },
                {
                    "name": "Distributor Networks",
                    "color": "hsl(137, 70%, 50%)",
                    "loc": 50110
                },
                {
                    "name": "Miscellaneous Channels",
                    "color": "hsl(193, 70%, 50%)",
                    "children": [
                        {
                            "name": "Local Distributors",
                            "color": "hsl(86, 70%, 50%)",
                            "loc": 20525
                        },
                        {
                            "name": "Regional Partners",
                            "color": "hsl(344, 70%, 50%)",
                            "children": [
                                {
                                    "name": "Partner A",
                                    "color": "hsl(307, 70%, 50%)",
                                    "loc": 47916
                                },
                                {
                                    "name": "Partner B",
                                    "color": "hsl(115, 70%, 50%)",
                                    "loc": 23234
                                },
                                {
                                    "name": "Partner C",
                                    "color": "hsl(7, 70%, 50%)",
                                    "loc": 180596
                                },
                                {
                                    "name": "Partner D",
                                    "color": "hsl(169, 70%, 50%)",
                                    "loc": 9268
                                }
                            ]
                        },
                        {
                            "name": "Independent Retailers",
                            "color": "hsl(61, 70%, 50%)",
                            "children": [
                                {
                                    "name": "Retailer A",
                                    "color": "hsl(217, 70%, 50%)",
                                    "loc": 104379
                                },
                                {
                                    "name": "Retailer B",
                                    "color": "hsl(107, 70%, 50%)",
                                    "loc": 10505
                                },
                                {
                                    "name": "Retailer C",
                                    "color": "hsl(82, 70%, 50%)",
                                    "loc": 134707
                                },
                                {
                                    "name": "Retailer D",
                                    "color": "hsl(132, 70%, 50%)",
                                    "loc": 69061
                                },
                                {
                                    "name": "Retailer E",
                                    "color": "hsl(229, 70%, 50%)",
                                    "loc": 97491
                                },
                                {
                                    "name": "Retailer F",
                                    "color": "hsl(239, 70%, 50%)",
                                    "loc": 154164
                                },
                                {
                                    "name": "Retailer G",
                                    "color": "hsl(296, 70%, 50%)",
                                    "loc": 190200
                                },
                                {
                                    "name": "Retailer H",
                                    "color": "hsl(255, 70%, 50%)",
                                    "loc": 177796
                                },
                                {
                                    "name": "Retailer I",
                                    "color": "hsl(78, 70%, 50%)",
                                    "loc": 25826
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
}

export const SafeCirclePacking = ({ data, ...props }: any) => {
    return (
        <ChartErrorBoundary>
            <MemoizedCirclePacking data={data || fallbackData} {...props}
                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                id="name"
                value="loc"
                colors={{ scheme: 'nivo' }}
                childColor={{
                    from: 'color',
                    modifiers: [
                        [
                            'brighter',
                            0.4
                        ]
                    ]
                }}
                padding={4}
                enableLabels={true}
                labelsFilter={n => 2 === n.node.depth}
                labelsSkipRadius={10}
                labelTextColor="#000000"
                borderWidth={1}
                borderColor={{
                    from: 'color',
                    modifiers: [
                        [
                            'darker',
                            0.5
                        ]
                    ]
                }}
                defs={[
                    {
                        id: 'lines',
                        type: 'patternLines',
                        background: 'none',
                        color: 'inherit',
                        rotation: -45,
                        lineWidth: 5,
                        spacing: 8
                    }
                ]}
                fill={[
                    {
                        match: {
                            depth: 1
                        },
                        id: 'lines'
                    }
                ]}
            />
        </ChartErrorBoundary>
    );
};

