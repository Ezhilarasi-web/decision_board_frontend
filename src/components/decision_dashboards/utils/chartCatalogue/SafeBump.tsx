import { memo } from "react";
import { Bump } from "@nivo/bump";
import { ChartErrorBoundary } from "@/components/decision_dashboards/chartWrapperComponents";

const MemoizedBump = memo(Bump);

export const fallbackData = [
    {
        "id": "japan",
        "color": "hsl(145, 70%, 50%)",
        "data": [
            {
                "x": "TV",
                "y": 247
            },
            {
                "x": "Digital",
                "y": 58
            },
            {
                "x": "Social Media",
                "y": 139
            },
            {
                "x": "Radio",
                "y": 67
            },
            {
                "x": "Print",
                "y": 248
            },
            {
                "x": "Email",
                "y": 32
            },
            {
                "x": "SEO",
                "y": 79
            },
            {
                "x": "PPC",
                "y": 103
            },
            {
                "x": "Affiliate",
                "y": 170
            },
            {
                "x": "Referral",
                "y": 34
            },
            {
                "x": "In-store",
                "y": 162
            },
            {
                "x": "Other",
                "y": 76
            }
        ]
    },
    {
        "id": "france",
        "color": "hsl(272, 70%, 50%)",
        "data": [
            {
                "x": "TV",
                "y": 98
            },
            {
                "x": "Digital",
                "y": 181
            },
            {
                "x": "Social Media",
                "y": 178
            },
            {
                "x": "Radio",
                "y": 127
            },
            {
                "x": "Print",
                "y": 127
            },
            {
                "x": "Email",
                "y": 277
            },
            {
                "x": "SEO",
                "y": 288
            },
            {
                "x": "PPC",
                "y": 2
            },
            {
                "x": "Affiliate",
                "y": 296
            },
            {
                "x": "Referral",
                "y": 225
            },
            {
                "x": "In-store",
                "y": 89
            },
            {
                "x": "Other",
                "y": 255
            }
        ]
    },
    {
        "id": "us",
        "color": "hsl(231, 70%, 50%)",
        "data": [
            {
                "x": "TV",
                "y": 60
            },
            {
                "x": "Digital",
                "y": 123
            },
            {
                "x": "Social Media",
                "y": 247
            },
            {
                "x": "Radio",
                "y": 128
            },
            {
                "x": "Print",
                "y": 126
            },
            {
                "x": "Email",
                "y": 114
            },
            {
                "x": "SEO",
                "y": 47
            },
            {
                "x": "PPC",
                "y": 64
            },
            {
                "x": "Affiliate",
                "y": 193
            },
            {
                "x": "Referral",
                "y": 262
            },
            {
                "x": "In-store",
                "y": 115
            },
            {
                "x": "Other",
                "y": 207
            }
        ]
    },
    {
        "id": "germany",
        "color": "hsl(175, 70%, 50%)",
        "data": [
            {
                "x": "TV",
                "y": 102
            },
            {
                "x": "Digital",
                "y": 142
            },
            {
                "x": "Social Media",
                "y": 58
            },
            {
                "x": "Radio",
                "y": 2
            },
            {
                "x": "Print",
                "y": 109
            },
            {
                "x": "Email",
                "y": 235
            },
            {
                "x": "SEO",
                "y": 99
            },
            {
                "x": "PPC",
                "y": 182
            },
            {
                "x": "Affiliate",
                "y": 103
            },
            {
                "x": "Referral",
                "y": 184
            },
            {
                "x": "In-store",
                "y": 206
            },
            {
                "x": "Other",
                "y": 29
            }
        ]
    },
    {
        "id": "norway",
        "color": "hsl(121, 70%, 50%)",
        "data": [
            {
                "x": "TV",
                "y": 72
            },
            {
                "x": "Digital",
                "y": 281
            },
            {
                "x": "Social Media",
                "y": 37
            },
            {
                "x": "Radio",
                "y": 61
            },
            {
                "x": "Print",
                "y": 86
            },
            {
                "x": "Email",
                "y": 209
            },
            {
                "x": "SEO",
                "y": 262
            },
            {
                "x": "PPC",
                "y": 165
            },
            {
                "x": "Affiliate",
                "y": 140
            },
            {
                "x": "Referral",
                "y": 236
            },
            {
                "x": "In-store",
                "y": 34
            },
            {
                "x": "Other",
                "y": 25
            }
        ]
    }
]

export const SafeBump = ({ data, ...props }: any) => {
    return (
        <ChartErrorBoundary>
            <MemoizedBump data={data || fallbackData} {...props}
                colors={{ scheme: 'spectral' }}
                lineWidth={3}
                activeLineWidth={6}
                inactiveLineWidth={3}
                inactiveOpacity={0.15}
                pointSize={10}
                activePointSize={16}
                inactivePointSize={0}
                pointColor={{ theme: 'background' }}
                pointBorderWidth={3}
                activePointBorderWidth={3}
                pointBorderColor={{ from: 'serie.color' }}
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
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'ranking',
                    legendPosition: 'middle',
                    legendOffset: -40,
                    truncateTickAt: 0
                }}
                margin={{ top: 40, right: 100, bottom: 40, left: 60 }}
                axisRight={null} />
        </ChartErrorBoundary>
    );
};
