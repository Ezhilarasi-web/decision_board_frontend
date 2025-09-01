import { memo } from "react";
import { Waffle } from "@nivo/waffle";
import { ChartErrorBoundary } from "@/components/decision_dashboards/chartWrapperComponents";

const MemoizedWaffle = memo(Waffle);

export const fallbackData = [
    {
        "id": "males (>45)",
        "label": "Males (>45)",
        "value": 8.983985067039702
    },
    {
        "id": "males (25-45)",
        "label": "Males (25-45)",
        "value": 16.051868327629077
    },
    {
        "id": "males (<25)",
        "label": "Males (<25)",
        "value": 31.61970298477291
    }
]

export const SafeWaffle = ({ data, ...props }: any) => {
    return (
        <ChartErrorBoundary>
            <MemoizedWaffle data={data || fallbackData} {...props}
                total={100}
                rows={18}
                columns={14}
                padding={1}
                valueFormat=".2f"
                margin={{ top: 10, right: 10, bottom: 10, left: 120 }}
                colors={{ scheme: 'nivo' }}
                borderRadius={3}
                borderColor={{
                    from: 'color',
                    modifiers: [
                        [
                            'darker',
                            0.3
                        ]
                    ]
                }}
                motionStagger={2}
                legends={[
                    {
                        anchor: 'top-left',
                        direction: 'column',
                        justify: false,
                        translateX: -100,
                        translateY: 0,
                        itemsSpacing: 4,
                        itemWidth: 100,
                        itemHeight: 20,
                        itemDirection: 'left-to-right',
                        itemOpacity: 1,
                        itemTextColor: '#000000',
                        symbolSize: 20,
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemTextColor: '#000000',
                                    itemBackground: '#f7fafb'
                                }
                            }
                        ]
                    }
                ]} />
        </ChartErrorBoundary>
    );
};

