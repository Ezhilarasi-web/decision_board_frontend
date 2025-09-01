import { memo } from "react";
import { Stream } from "@nivo/stream";
import { ChartErrorBoundary } from "@/components/decision_dashboards/chartWrapperComponents";

const MemoizedStream = memo(Stream);

export const fallbackData = [
    {
        "Heating A": 114,
        "Heating B": 60,
        "Heating C": 119,
        "Heating D": 180,
        "Heating E": 67,
        "Competitor": 39
    },
    {
        "Heating A": 178,
        "Heating B": 55,
        "Heating C": 159,
        "Heating D": 176,
        "Heating E": 73,
        "Competitor": 146
    },
    {
        "Heating A": 149,
        "Heating B": 183,
        "Heating C": 161,
        "Heating D": 22,
        "Heating E": 163,
        "Competitor": 152
    },
    {
        "Heating A": 38,
        "Heating B": 148,
        "Heating C": 114,
        "Heating D": 102,
        "Heating E": 120,
        "Competitor": 57
    },
    {
        "Heating A": 128,
        "Heating B": 149,
        "Heating C": 111,
        "Heating D": 168,
        "Heating E": 104,
        "Competitor": 20
    },
    {
        "Heating A": 160,
        "Heating B": 74,
        "Heating C": 65,
        "Heating D": 168,
        "Heating E": 121,
        "Competitor": 66
    },
    {
        "Heating A": 168,
        "Heating B": 125,
        "Heating C": 51,
        "Heating D": 132,
        "Heating E": 156,
        "Competitor": 122
    },
    {
        "Heating A": 40,
        "Heating B": 55,
        "Heating C": 99,
        "Heating D": 22,
        "Heating E": 173,
        "Competitor": 58
    },
    {
        "Heating A": 87,
        "Heating B": 19,
        "Heating C": 26,
        "Heating D": 62,
        "Heating E": 31,
        "Competitor": 110
    }
]

export const SafeStream = ({ data, ...props }: any) => {
    return (
        <ChartErrorBoundary>
            <MemoizedStream data={data || fallbackData} {...props}
                keys={[
                    'Heating A',
                    'Heating B',
                    'Heating C',
                    'Heating D',
                    'Heating E',
                    'Competitor'
                ]}
                margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    orient: 'bottom',
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: '',
                    legendOffset: 36,
                    truncateTickAt: 0
                }}
                axisLeft={{
                    orient: 'left',
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: '',
                    legendOffset: -40,
                    truncateTickAt: 0
                }}
                enableGridX={true}
                enableGridY={false}
                offsetType="silhouette"
                colors={{ scheme: 'nivo' }}
                fillOpacity={0.85}
                borderColor={{ theme: 'background' }}
                defs={[
                    {
                        id: 'dots',
                        type: 'patternDots',
                        background: 'inherit',
                        color: '#2c998f',
                        size: 4,
                        padding: 2,
                        stagger: true
                    },
                    {
                        id: 'squares',
                        type: 'patternSquares',
                        background: 'inherit',
                        color: '#e4c912',
                        size: 6,
                        padding: 2,
                        stagger: true
                    }
                ]}
                fill={[
                    {
                        match: {
                            id: 'Heating E'
                        },
                        id: 'dots'
                    },
                    {
                        match: {
                            id: 'Heating C'
                        },
                        id: 'squares'
                    }
                ]}
                dotSize={8}
                dotColor={{ from: 'color' }}
                dotBorderWidth={2}
                dotBorderColor={{
                    from: 'color',
                    modifiers: [
                        [
                            'darker',
                            0.7
                        ]
                    ]
                }}
                legends={[
                    {
                        anchor: 'bottom-right',
                        direction: 'column',
                        translateX: 100,
                        itemWidth: 80,
                        itemHeight: 20,
                        itemTextColor: '#000000',
                        symbolSize: 12,
                        symbolShape: 'circle',
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemTextColor: '#000000'
                                }
                            }
                        ]
                    }
                ]} />
        </ChartErrorBoundary>
    );
};

