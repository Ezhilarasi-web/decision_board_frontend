import { memo } from "react";
import { Bar } from "@nivo/bar";
import { ChartErrorBoundary } from "@/components/decision_dashboards/chartWrapperComponents";

const MemoizedBar = memo(Bar);

export const fallbackData = [
    {
        "country": "AD",
        "beverage 6": 69,
        "beverage 6Color": "hsl(84, 70%, 50%)",
        "beverage 5": 27,
        "beverage 5Color": "hsl(114, 70%, 50%)",
        "beverage 4": 87,
        "beverage 4Color": "hsl(312, 70%, 50%)",
        "beverage 3": 108,
        "beverage 3Color": "hsl(93, 70%, 50%)",
        "beverage 2": 146,
        "beverage 2Color": "hsl(165, 70%, 50%)",
        "beverage 1": 96,
        "beverage 1Color": "hsl(275, 70%, 50%)"
    },
    {
        "country": "AE",
        "beverage 6": 33,
        "beverage 6Color": "hsl(34, 70%, 50%)",
        "beverage 5": 59,
        "beverage 5Color": "hsl(189, 70%, 50%)",
        "beverage 4": 156,
        "beverage 4Color": "hsl(113, 70%, 50%)",
        "beverage 3": 141,
        "beverage 3Color": "hsl(173, 70%, 50%)",
        "beverage 2": 144,
        "beverage 2Color": "hsl(188, 70%, 50%)",
        "beverage 1": 132,
        "beverage 1Color": "hsl(293, 70%, 50%)"
    },
    {
        "country": "AF",
        "beverage 6": 50,
        "beverage 6Color": "hsl(44, 70%, 50%)",
        "beverage 5": 38,
        "beverage 5Color": "hsl(106, 70%, 50%)",
        "beverage 4": 85,
        "beverage 4Color": "hsl(199, 70%, 50%)",
        "beverage 3": 28,
        "beverage 3Color": "hsl(180, 70%, 50%)",
        "beverage 2": 59,
        "beverage 2Color": "hsl(27, 70%, 50%)",
        "beverage 1": 64,
        "beverage 1Color": "hsl(63, 70%, 50%)"
    },
    {
        "country": "AG",
        "beverage 6": 169,
        "beverage 6Color": "hsl(70, 70%, 50%)",
        "beverage 5": 131,
        "beverage 5Color": "hsl(266, 70%, 50%)",
        "beverage 4": 107,
        "beverage 4Color": "hsl(81, 70%, 50%)",
        "beverage 3": 67,
        "beverage 3Color": "hsl(352, 70%, 50%)",
        "beverage 2": 5,
        "beverage 2Color": "hsl(290, 70%, 50%)",
        "beverage 1": 134,
        "beverage 1Color": "hsl(100, 70%, 50%)"
    },
    {
        "country": "AI",
        "beverage 6": 113,
        "beverage 6Color": "hsl(359, 70%, 50%)",
        "beverage 5": 63,
        "beverage 5Color": "hsl(294, 70%, 50%)",
        "beverage 4": 23,
        "beverage 4Color": "hsl(336, 70%, 50%)",
        "beverage 3": 136,
        "beverage 3Color": "hsl(320, 70%, 50%)",
        "beverage 2": 198,
        "beverage 2Color": "hsl(173, 70%, 50%)",
        "beverage 1": 123,
        "beverage 1Color": "hsl(236, 70%, 50%)"
    },
    {
        "country": "AL",
        "beverage 6": 185,
        "beverage 6Color": "hsl(4, 70%, 50%)",
        "beverage 5": 30,
        "beverage 5Color": "hsl(186, 70%, 50%)",
        "beverage 4": 76,
        "beverage 4Color": "hsl(288, 70%, 50%)",
        "beverage 3": 77,
        "beverage 3Color": "hsl(13, 70%, 50%)",
        "beverage 2": 161,
        "beverage 2Color": "hsl(286, 70%, 50%)",
        "beverage 1": 16,
        "beverage 1Color": "hsl(34, 70%, 50%)"
    },
    {
        "country": "AM",
        "beverage 6": 105,
        "beverage 6Color": "hsl(312, 70%, 50%)",
        "beverage 5": 159,
        "beverage 5Color": "hsl(352, 70%, 50%)",
        "beverage 4": 6,
        "beverage 4Color": "hsl(276, 70%, 50%)",
        "beverage 3": 197,
        "beverage 3Color": "hsl(16, 70%, 50%)",
        "beverage 2": 175,
        "beverage 2Color": "hsl(28, 70%, 50%)",
        "beverage 1": 40,
        "beverage 1Color": "hsl(155, 70%, 50%)"
    }
]

export const SafeBar = ({ data, ...props }: any) => {
    return (
        <ChartErrorBoundary>
            <MemoizedBar data={data || fallbackData} {...props}
                keys={[
                    'beverage 6',
                    'beverage 5',
                    'beverage 4',
                    'beverage 3',
                    'beverage 2',
                    'beverage 1'
                ]}
                indexBy="country"
                margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                padding={0.3}
                valueScale={{ type: 'linear' }}
                indexScale={{ type: 'band', round: true }}
                colors={{ scheme: 'nivo' }}
                defs={[
                    {
                        id: 'dots',
                        type: 'patternDots',
                        background: 'inherit',
                        color: '#38bcb2',
                        size: 4,
                        padding: 1,
                        stagger: true
                    },
                    {
                        id: 'lines',
                        type: 'patternLines',
                        background: 'inherit',
                        color: '#eed312',
                        rotation: -45,
                        lineWidth: 6,
                        spacing: 10
                    }
                ]}
                fill={[
                    {
                        match: {
                            id: 'beverage 2'
                        },
                        id: 'dots'
                    },
                    {
                        match: {
                            id: 'beverage 4'
                        },
                        id: 'lines'
                    }
                ]}
                borderColor={{
                    from: 'color',
                    modifiers: [
                        [
                            'darker',
                            1.6
                        ]
                    ]
                }}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'country',
                    legendPosition: 'middle',
                    legendOffset: 32,
                    truncateTickAt: 0
                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'food',
                    legendPosition: 'middle',
                    legendOffset: -40,
                    truncateTickAt: 0
                }}
                labelSkipWidth={12}
                labelSkipHeight={12}
                labelTextColor={{
                    from: 'color',
                    modifiers: [
                        [
                            'darker',
                            1.6
                        ]
                    ]
                }}
                legends={[
                    {
                        dataFrom: 'keys',
                        anchor: 'bottom-right',
                        direction: 'column',
                        justify: false,
                        translateX: 120,
                        translateY: 0,
                        itemsSpacing: 2,
                        itemWidth: 100,
                        itemHeight: 20,
                        itemDirection: 'left-to-right',
                        itemOpacity: 0.85,
                        symbolSize: 20,
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemOpacity: 1
                                }
                            }
                        ]
                    }
                ]}
                role="application"
                ariaLabel="Nivo bar chart demo"
                barAriaLabel={e => e.id + ": " + e.formattedValue + " in country: " + e.indexValue}

            />
        </ChartErrorBoundary>
    );
};


