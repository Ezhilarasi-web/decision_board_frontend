import { memo } from "react";
import { Marimekko } from "@nivo/marimekko";
import { ChartErrorBoundary } from "@/components/decision_dashboards/chartWrapperComponents";

const MemoizedMarimekko = memo(Marimekko);

export const fallbackData = [
    {
        "statement": "it's good",
        "participation": 19,
        "stronglyAgree": 23,
        "agree": 4,
        "disagree": 5,
        "stronglyDisagree": 13
    },
    {
        "statement": "it's sweet",
        "participation": 10,
        "stronglyAgree": 15,
        "agree": 1,
        "disagree": 22,
        "stronglyDisagree": 27
    },
    {
        "statement": "it's spicy",
        "participation": 6,
        "stronglyAgree": 7,
        "agree": 22,
        "disagree": 27,
        "stronglyDisagree": 5
    },
    {
        "statement": "worth eating",
        "participation": 8,
        "stronglyAgree": 25,
        "agree": 16,
        "disagree": 19,
        "stronglyDisagree": 16
    },
    {
        "statement": "worth buying",
        "participation": 22,
        "stronglyAgree": 19,
        "agree": 6,
        "disagree": 4,
        "stronglyDisagree": 26
    }
]

export const SafeMarimekko = ({ data, ...props }: any) => {
    return (
        <ChartErrorBoundary>
            <MemoizedMarimekko data={data || fallbackData} {...props}
                id="statement"
                value="participation"
                dimensions={[
                    {
                        id: 'disagree strongly',
                        value: 'stronglyDisagree'
                    },
                    {
                        id: 'disagree',
                        value: 'disagree'
                    },
                    {
                        id: 'agree',
                        value: 'agree'
                    },
                    {
                        id: 'agree strongly',
                        value: 'stronglyAgree'
                    }
                ]}
                innerPadding={9}
                axisTop={null}
                axisRight={{
                    orient: 'right',
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: '',
                    legendOffset: 0,
                    truncateTickAt: 0
                }}
                axisBottom={{
                    orient: 'bottom',
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'participation',
                    legendOffset: 36,
                    legendPosition: 'middle',
                    truncateTickAt: 0
                }}
                axisLeft={{
                    orient: 'left',
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'opinions',
                    legendOffset: -40,
                    legendPosition: 'middle',
                    truncateTickAt: 0
                }}
                margin={{ top: 40, right: 80, bottom: 100, left: 80 }}
                colors={{ scheme: 'spectral' }}
                borderWidth={1}
                borderColor={{
                    from: 'color',
                    modifiers: [
                        [
                            'darker',
                            0.2
                        ]
                    ]
                }}
                defs={[
                    {
                        id: 'lines',
                        type: 'patternLines',
                        background: 'rgba(0, 0, 0, 0)',
                        color: 'inherit',
                        rotation: -45,
                        lineWidth: 4,
                        spacing: 8
                    }
                ]}
                fill={[
                    {
                        match: {
                            id: 'agree strongly'
                        },
                        id: 'lines'
                    },
                    {
                        match: {
                            id: 'disagree strongly'
                        },
                        id: 'lines'
                    }
                ]}
                legends={[
                    {
                        anchor: 'bottom',
                        direction: 'row',
                        justify: false,
                        translateX: 0,
                        translateY: 80,
                        itemsSpacing: 0,
                        itemWidth: 140,
                        itemHeight: 18,
                        itemTextColor: '#000000',
                        itemDirection: 'right-to-left',
                        itemOpacity: 1,
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
                ]}
            />
        </ChartErrorBoundary>
    );
};

