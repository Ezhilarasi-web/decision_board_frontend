import { memo } from "react";
import { Radar } from "@nivo/radar";
import { ChartErrorBoundary } from "@/components/decision_dashboards/chartWrapperComponents";

const MemoizedRadar = memo(Radar);

export const fallbackData = [
    {
        "taste": "Awareness",
        "consumer lighting A": 85,
        "consumer lighting B": 70,
        "consumer lighting C": 90
    },
    {
        "taste": "Consideration",
        "consumer lighting A": 75,
        "consumer lighting B": 65,
        "consumer lighting C": 80
    },
    {
        "taste": "Preference",
        "consumer lighting A": 60,
        "consumer lighting B": 55,
        "consumer lighting C": 65
    },
    {
        "taste": "Purchase",
        "consumer lighting A": 50,
        "consumer lighting B": 45,
        "consumer lighting C": 55
    },
    {
        "taste": "Loyalty",
        "consumer lighting A": 40,
        "consumer lighting B": 35,
        "consumer lighting C": 45
    }
]

export const SafeRadar = ({ data, ...props }: any) => {
    return (
        <ChartErrorBoundary>
            <MemoizedRadar data={data || fallbackData} {...props}
                keys={['consumer lighting A', 'consumer lighting B', 'consumer lighting C']}
                indexBy="taste"
                valueFormat=">-.2f"
                margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
                borderColor={{ from: 'color' }}
                gridLabelOffset={36}
                dotSize={10}
                dotColor={{ theme: 'background' }}
                dotBorderWidth={2}
                colors={{ scheme: 'nivo' }}
                blendMode="multiply"
                motionConfig="wobbly"
                legends={[
                    {
                        anchor: 'top-left',
                        direction: 'column',
                        translateX: -50,
                        translateY: -40,
                        itemWidth: 80,
                        itemHeight: 20,
                        itemTextColor: '#000000',
                        symbolSize: 12,
                        symbolShape: 'circle',
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
