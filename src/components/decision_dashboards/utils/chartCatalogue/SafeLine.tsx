import { memo } from "react";
import { Line } from "@nivo/line";
import { ChartErrorBoundary } from "@/components/decision_dashboards/chartWrapperComponents";

const MemoizedLine = memo(Line);

export const fallbackData = [
    {
        "id": "japan",
        "color": "hsl(38, 70%, 50%)",
        "data": [
            {
                "x": "TV",
                "y": 150
            },
            {
                "x": "Digital",
                "y": 120
            },
            {
                "x": "Print",
                "y": 80
            },
            {
                "x": "Outdoor",
                "y": 130
            },
            {
                "x": "Radio",
                "y": 90
            },
            {
                "x": "Social Media",
                "y": 160
            },
            {
                "x": "Email",
                "y": 110
            },
            {
                "x": "Influencer",
                "y": 170
            },
            {
                "x": "Event",
                "y": 95
            },
            {
                "x": "In-store",
                "y": 140
            },
            {
                "x": "Direct Mail",
                "y": 100
            },
            {
                "x": "Referral",
                "y": 125
            }
        ]
    },
    {
        "id": "france",
        "color": "hsl(43, 70%, 50%)",
        "data": [
            {
                "x": "TV",
                "y": 160
            },
            {
                "x": "Digital",
                "y": 130
            },
            {
                "x": "Print",
                "y": 85
            },
            {
                "x": "Outdoor",
                "y": 140
            },
            {
                "x": "Radio",
                "y": 95
            },
            {
                "x": "Social Media",
                "y": 165
            },
            {
                "x": "Email",
                "y": 115
            },
            {
                "x": "Influencer",
                "y": 175
            },
            {
                "x": "Event",
                "y": 105
            },
            {
                "x": "In-store",
                "y": 145
            },
            {
                "x": "Direct Mail",
                "y": 110
            },
            {
                "x": "Referral",
                "y": 135
            }
        ]
    },
    {
        "id": "us",
        "color": "hsl(127, 70%, 50%)",
        "data": [
            {
                "x": "TV",
                "y": 155
            },
            {
                "x": "Digital",
                "y": 125
            },
            {
                "x": "Print",
                "y": 90
            },
            {
                "x": "Outdoor",
                "y": 135
            },
            {
                "x": "Radio",
                "y": 100
            },
            {
                "x": "Social Media",
                "y": 170
            },
            {
                "x": "Email",
                "y": 120
            },
            {
                "x": "Influencer",
                "y": 180
            },
            {
                "x": "Event",
                "y": 110
            },
            {
                "x": "In-store",
                "y": 150
            },
            {
                "x": "Direct Mail",
                "y": 105
            },
            {
                "x": "Referral",
                "y": 130
            }
        ]
    },
    {
        "id": "germany",
        "color": "hsl(353, 70%, 50%)",
        "data": [
            {
                "x": "TV",
                "y": 145
            },
            {
                "x": "Digital",
                "y": 115
            },
            {
                "x": "Print",
                "y": 75
            },
            {
                "x": "Outdoor",
                "y": 125
            },
            {
                "x": "Radio",
                "y": 85
            },
            {
                "x": "Social Media",
                "y": 155
            },
            {
                "x": "Email",
                "y": 105
            },
            {
                "x": "Influencer",
                "y": 165
            },
            {
                "x": "Event",
                "y": 90
            },
            {
                "x": "In-store",
                "y": 135
            },
            {
                "x": "Direct Mail",
                "y": 95
            },
            {
                "x": "Referral",
                "y": 120
            }
        ]
    },
    {
        "id": "norway",
        "color": "hsl(25, 70%, 50%)",
        "data": [
            {
                "x": "TV",
                "y": 165
            },
            {
                "x": "Digital",
                "y": 135
            },
            {
                "x": "Print",
                "y": 95
            },
            {
                "x": "Outdoor",
                "y": 150
            },
            {
                "x": "Radio",
                "y": 105
            },
            {
                "x": "Social Media",
                "y": 175
            },
            {
                "x": "Email",
                "y": 125
            },
            {
                "x": "Influencer",
                "y": 185
            },
            {
                "x": "Event",
                "y": 115
            },
            {
                "x": "In-store",
                "y": 155
            },
            {
                "x": "Direct Mail",
                "y": 110
            },
            {
                "x": "Referral",
                "y": 140
            }
        ]
    }
]

export const SafeLine = ({ data, ...props }: any) => {
    return (
        <ChartErrorBoundary>
            <MemoizedLine data={data || fallbackData} {...props}
                margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                xScale={{ type: 'point' }}
                yScale={{
                    type: 'linear',
                    min: 'auto',
                    max: 'auto',
                    stacked: true,
                    reverse: false
                }}
                yFormat=" >-.2f"
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'geography',
                    legendOffset: 36,
                    legendPosition: 'middle',
                    truncateTickAt: 0
                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'incremental USD (millions) per channel',
                    legendOffset: -40,
                    legendPosition: 'middle',
                    truncateTickAt: 0
                }}
                pointSize={10}
                pointColor={{ theme: 'background' }}
                pointBorderWidth={2}
                pointBorderColor={{ from: 'serieColor' }}
                pointLabel="data.yFormatted"
                pointLabelYOffset={-12}
                enableTouchCrosshair={true}
                useMesh={true}
                legends={[
                    {
                        anchor: 'bottom-right',
                        direction: 'column',
                        justify: false,
                        translateX: 100,
                        translateY: 0,
                        itemsSpacing: 0,
                        itemDirection: 'left-to-right',
                        itemWidth: 80,
                        itemHeight: 20,
                        itemOpacity: 0.75,
                        symbolSize: 12,
                        symbolShape: 'circle',
                        symbolBorderColor: 'rgba(0, 0, 0, .5)',
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemBackground: 'rgba(0, 0, 0, .03)',
                                    itemOpacity: 1
                                }
                            }
                        ]
                    }
                ]} />
        </ChartErrorBoundary>
    );
};

