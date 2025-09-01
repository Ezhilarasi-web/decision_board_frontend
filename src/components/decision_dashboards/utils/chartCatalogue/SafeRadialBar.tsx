import { memo } from "react";
import { RadialBar } from "@nivo/radial-bar";
import { ChartErrorBoundary } from "@/components/decision_dashboards/chartWrapperComponents";

const MemoizedRadialBar = memo(RadialBar);

export const fallbackData = [
    {
        "id": "Product A",
        "color": "hsl(145, 70%, 50%)",
        "data": [
            {
                "x": "Sales",
                "y": 247
            },
            {
                "x": "Profit",
                "y": 58
            },
            {
                "x": "Growth",
                "y": 139
            },
            {
                "x": "Market Share",
                "y": 67
            },
            {
                "x": "Customer Satisfaction",
                "y": 248
            },
            {
                "x": "Return Rate",
                "y": 32
            },
            {
                "x": "Stock Turnover",
                "y": 79
            },
            {
                "x": "Brand Equity",
                "y": 103
            },
            {
                "x": "Innovation Score",
                "y": 170
            },
            {
                "x": "Distribution Reach",
                "y": 34
            },
            {
                "x": "Cost Efficiency",
                "y": 162
            },
            {
                "x": "ROI",
                "y": 76
            }
        ]
    },
    {
        "id": "Product B",
        "color": "hsl(272, 70%, 50%)",
        "data": [
            {
                "x": "Sales",
                "y": 98
            },
            {
                "x": "Profit",
                "y": 181
            },
            {
                "x": "Growth",
                "y": 178
            },
            {
                "x": "Market Share",
                "y": 127
            },
            {
                "x": "Customer Satisfaction",
                "y": 127
            },
            {
                "x": "Return Rate",
                "y": 277
            },
            {
                "x": "Stock Turnover",
                "y": 288
            },
            {
                "x": "Brand Equity",
                "y": 2
            },
            {
                "x": "Innovation Score",
                "y": 296
            },
            {
                "x": "Distribution Reach",
                "y": 225
            },
            {
                "x": "Cost Efficiency",
                "y": 89
            },
            {
                "x": "ROI",
                "y": 255
            }
        ]
    },
    {
        "id": "Product C",
        "color": "hsl(231, 70%, 50%)",
        "data": [
            {
                "x": "Sales",
                "y": 60
            },
            {
                "x": "Profit",
                "y": 123
            },
            {
                "x": "Growth",
                "y": 247
            },
            {
                "x": "Market Share",
                "y": 128
            },
            {
                "x": "Customer Satisfaction",
                "y": 126
            },
            {
                "x": "Return Rate",
                "y": 114
            },
            {
                "x": "Stock Turnover",
                "y": 47
            },
            {
                "x": "Brand Equity",
                "y": 64
            },
            {
                "x": "Innovation Score",
                "y": 193
            },
            {
                "x": "Distribution Reach",
                "y": 262
            },
            {
                "x": "Cost Efficiency",
                "y": 115
            },
            {
                "x": "ROI",
                "y": 207
            }
        ]
    },
    {
        "id": "Product D",
        "color": "hsl(175, 70%, 50%)",
        "data": [
            {
                "x": "Sales",
                "y": 102
            },
            {
                "x": "Profit",
                "y": 142
            },
            {
                "x": "Growth",
                "y": 58
            },
            {
                "x": "Market Share",
                "y": 2
            },
            {
                "x": "Customer Satisfaction",
                "y": 109
            },
            {
                "x": "Return Rate",
                "y": 235
            },
            {
                "x": "Stock Turnover",
                "y": 99
            },
            {
                "x": "Brand Equity",
                "y": 182
            },
            {
                "x": "Innovation Score",
                "y": 103
            },
            {
                "x": "Distribution Reach",
                "y": 184
            },
            {
                "x": "Cost Efficiency",
                "y": 206
            },
            {
                "x": "ROI",
                "y": 29
            }
        ]
    },
    {
        "id": "Product E",
        "color": "hsl(121, 70%, 50%)",
        "data": [
            {
                "x": "Sales",
                "y": 72
            },
            {
                "x": "Profit",
                "y": 281
            },
            {
                "x": "Growth",
                "y": 37
            },
            {
                "x": "Market Share",
                "y": 61
            },
            {
                "x": "Customer Satisfaction",
                "y": 86
            },
            {
                "x": "Return Rate",
                "y": 209
            },
            {
                "x": "Stock Turnover",
                "y": 262
            },
            {
                "x": "Brand Equity",
                "y": 165
            },
            {
                "x": "Innovation Score",
                "y": 140
            },
            {
                "x": "Distribution Reach",
                "y": 236
            },
            {
                "x": "Cost Efficiency",
                "y": 34
            },
            {
                "x": "ROI",
                "y": 25
            }
        ]
    }
]

export const SafeRadialBar = ({ data, ...props }: any) => {
    return (
        <ChartErrorBoundary>
            <MemoizedRadialBar data={data || fallbackData} {...props}
                valueFormat=">-.2f"
                padding={0.4}
                cornerRadius={2}
                margin={{ top: 40, right: 120, bottom: 40, left: 40 }}
                radialAxisStart={{ tickSize: 5, tickPadding: 5, tickRotation: 0 }}
                circularAxisOuter={{ tickSize: 5, tickPadding: 12, tickRotation: 0 }}
                legends={[
                    {
                        anchor: 'right',
                        direction: 'column',
                        justify: false,
                        translateX: 80,
                        translateY: 0,
                        itemsSpacing: 6,
                        itemDirection: 'left-to-right',
                        itemWidth: 100,
                        itemHeight: 18,
                        itemTextColor: '#000',
                        symbolSize: 18,
                        symbolShape: 'square',
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemTextColor: '#000'
                                }
                            }
                        ]
                    }
                ]} />
        </ChartErrorBoundary>
    );
};
