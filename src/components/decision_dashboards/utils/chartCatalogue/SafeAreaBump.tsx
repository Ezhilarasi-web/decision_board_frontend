import { memo } from "react";
import { AreaBump } from "@nivo/bump";
import { ChartErrorBoundary } from "@/components/decision_dashboards/chartWrapperComponents";

const MemoizedAreaBump = memo(AreaBump);

export const fallbackData = [
    {
        "id": "Top Shelf",
        "data": [
            {
                "x": "Week 1",
                "y": 25
            },
            {
                "x": "Week 2",
                "y": 23
            },
            {
                "x": "Week 3",
                "y": 15
            },
            {
                "x": "Week 4",
                "y": 25
            },
            {
                "x": "Week 5",
                "y": 14
            },
            {
                "x": "Week 6",
                "y": 24
            }
        ]
    },
    {
        "id": "Eye Level",
        "data": [
            {
                "x": "Week 1",
                "y": 15
            },
            {
                "x": "Week 2",
                "y": 13
            },
            {
                "x": "Week 3",
                "y": 10
            },
            {
                "x": "Week 4",
                "y": 14
            },
            {
                "x": "Week 5",
                "y": 12
            },
            {
                "x": "Week 6",
                "y": 20
            }
        ]
    },
    {
        "id": "Middle Shelf",
        "data": [
            {
                "x": "Week 1",
                "y": 17
            },
            {
                "x": "Week 2",
                "y": 24
            },
            {
                "x": "Week 3",
                "y": 20
            },
            {
                "x": "Week 4",
                "y": 11
            },
            {
                "x": "Week 5",
                "y": 26
            },
            {
                "x": "Week 6",
                "y": 15
            }
        ]
    },
    {
        "id": "Lower Shelf",
        "data": [
            {
                "x": "Week 1",
                "y": 29
            },
            {
                "x": "Week 2",
                "y": 19
            },
            {
                "x": "Week 3",
                "y": 17
            },
            {
                "x": "Week 4",
                "y": 21
            },
            {
                "x": "Week 5",
                "y": 14
            },
            {
                "x": "Week 6",
                "y": 13
            }
        ]
    },
    {
        "id": "Bottom Shelf",
        "data": [
            {
                "x": "Week 1",
                "y": 11
            },
            {
                "x": "Week 2",
                "y": 12
            },
            {
                "x": "Week 3",
                "y": 26
            },
            {
                "x": "Week 4",
                "y": 20
            },
            {
                "x": "Week 5",
                "y": 19
            },
            {
                "x": "Week 6",
                "y": 11
            }
        ]
    }
]


export const SafeAreaBump = ({ data, ...props }: any) => {
    return (
        <ChartErrorBoundary>
            <MemoizedAreaBump data={data || fallbackData} {...props}
                margin={{ top: 40, right: 100, bottom: 40, left: 100 }}
                spacing={8}
                colors={{ scheme: 'nivo' }}
                blendMode="multiply"
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
                            id: 'CoffeeScript'
                        },
                        id: 'dots'
                    },
                    {
                        match: {
                            id: 'TypeScript'
                        },
                        id: 'lines'
                    }
                ]}
                startLabel="id"
                endLabel="id"
                axisTop={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: '',
                    legendPosition: 'middle',
                    legendOffset: -36,
                    truncateTickAt: 0
                }}
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: '',
                    legendPosition: 'middle',
                    legendOffset: 32,
                    truncateTickAt: 0
                }}
            />
        </ChartErrorBoundary>
    );
};
