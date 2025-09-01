import { memo } from "react";
import { ParallelCoordinates } from "@nivo/parallel-coordinates";
import { ChartErrorBoundary } from "@/components/decision_dashboards/chartWrapperComponents";

const MemoizedParallelCoordinates = memo(ParallelCoordinates);

export const fallbackData = [
    {
        "overallSatisfaction": 85,
        "customerService": 90,
        "productQuality": 88,
        "valueForMoney": 80,
        "id": "A"
    },
    {
        "overallSatisfaction": 75,
        "customerService": 85,
        "productQuality": 80,
        "valueForMoney": 70,
        "id": "B"
    },
    {
        "overallSatisfaction": 92,
        "customerService": 95,
        "productQuality": 91,
        "valueForMoney": 88,
        "id": "C"
    },
    {
        "overallSatisfaction": 68,
        "customerService": 70,
        "productQuality": 65,
        "valueForMoney": 60,
        "id": "D"
    },
    {
        "overallSatisfaction": 80,
        "customerService": 82,
        "productQuality": 78,
        "valueForMoney": 75,
        "id": "E"
    },
    {
        "overallSatisfaction": 60,
        "customerService": 65,
        "productQuality": 63,
        "valueForMoney": 58,
        "id": "F"
    },
    {
        "overallSatisfaction": 88,
        "customerService": 87,
        "productQuality": 90,
        "valueForMoney": 85,
        "id": "G"
    },
    {
        "overallSatisfaction": 82,
        "customerService": 80,
        "productQuality": 77,
        "valueForMoney": 79,
        "id": "H"
    },
    {
        "overallSatisfaction": 70,
        "customerService": 72,
        "productQuality": 68,
        "valueForMoney": 65,
        "id": "I"
    },
    {
        "overallSatisfaction": 90,
        "customerService": 88,
        "productQuality": 85,
        "valueForMoney": 84,
        "id": "J"
    }
]

export const SafeParallelCoordinates = ({ data, ...props }: any) => {
    return (
        <ChartErrorBoundary>
            <MemoizedParallelCoordinates data={data || fallbackData} {...props}
                variables={[
                    {
                        id: 'overallSatisfaction',
                        label: 'overall satisfaction',
                        value: 'overallSatisfaction',
                        min: 'auto',
                        max: 'auto',
                        ticksPosition: 'before',
                        legendPosition: 'start',
                        legendOffset: 20
                    },
                    {
                        id: 'customerService',
                        value: 'customerService',
                        min: 0,
                        max: 'auto',
                        ticksPosition: 'before',
                        legendPosition: 'start',
                        legendOffset: 20
                    },
                    {
                        id: 'productQuality',
                        value: 'productQuality',
                        min: 'auto',
                        max: 'auto',
                        legendPosition: 'start',
                        legendOffset: -20
                    },
                    {
                        id: 'valueForMoney',
                        value: 'valueForMoney',
                        min: 0,
                        max: 'auto',
                        legendPosition: 'start',
                        legendOffset: -20
                    }
                ]}
                margin={{ top: 50, right: 120, bottom: 50, left: 60 }}
                lineWidth={3}
                legends={[
                    {
                        anchor: 'right',
                        direction: 'column',
                        justify: false,
                        translateX: 100,
                        translateY: 0,
                        itemsSpacing: 2,
                        itemWidth: 60,
                        itemHeight: 20,
                        itemDirection: 'left-to-right',
                        itemOpacity: 1,
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
                ]} />
        </ChartErrorBoundary>
    );
};
