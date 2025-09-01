import { memo } from "react";
import { Chord } from "@nivo/chord";
import { ChartErrorBoundary } from "@/components/decision_dashboards/chartWrapperComponents";

const MemoizedChord = memo(Chord);

export const fallbackData = [
    [
        459,
        202,
        49,
        242,
        9
    ],
    [
        1597,
        426,
        434,
        1262,
        204
    ],
    [
        208,
        59,
        11,
        241,
        399
    ],
    [
        394,
        406,
        276,
        262,
        147
    ],
    [
        1654,
        366,
        8,
        122,
        393
    ]
]

export const SafeChord = ({ data, ...props }: any) => {
    return (
        <ChartErrorBoundary>
            <MemoizedChord data={data || fallbackData} {...props}
                keys={['In-Store', 'Email Channel 2', 'Phone Channel 1', 'Phone Channel 2', 'Email Channel 1']}
                margin={{ top: 60, right: 60, bottom: 90, left: 60 }}
                valueFormat=".2f"
                padAngle={0.02}
                innerRadiusRatio={0.96}
                innerRadiusOffset={0.02}
                inactiveArcOpacity={0.25}
                arcBorderColor={{
                    from: 'color',
                    modifiers: [
                        [
                            'darker',
                            0.6
                        ]
                    ]
                }}
                activeRibbonOpacity={0.75}
                inactiveRibbonOpacity={0.25}
                ribbonBorderColor={{
                    from: 'color',
                    modifiers: [
                        [
                            'darker',
                            0.6
                        ]
                    ]
                }}
                labelRotation={-90}
                labelTextColor={{
                    from: 'color',
                    modifiers: [
                        [
                            'darker',
                            1
                        ]
                    ]
                }}
                colors={{ scheme: 'nivo' }}
                motionConfig="stiff"
                legends={[
                    {
                        anchor: 'bottom',
                        direction: 'row',
                        justify: false,
                        translateX: 0,
                        translateY: 70,
                        itemWidth: 80,
                        itemHeight: 14,
                        itemsSpacing: 30,
                        itemTextColor: '#000000',
                        itemDirection: 'left-to-right',
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
