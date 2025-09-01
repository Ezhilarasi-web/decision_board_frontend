import { memo } from "react";
import { SwarmPlot } from "@nivo/swarmplot";
import { ChartErrorBoundary } from "@/components/decision_dashboards/chartWrapperComponents";

const MemoizedSwarmPlot = memo(SwarmPlot);

export const fallbackData = [
    {
        "id": "0.0",
        "group": "group A",
        "price": 237,
        "volume": 19
    },
    {
        "id": "0.1",
        "group": "group A",
        "price": 469,
        "volume": 5
    },
    {
        "id": "0.2",
        "group": "group A",
        "price": 447,
        "volume": 9
    },
    {
        "id": "0.3",
        "group": "group A",
        "price": 408,
        "volume": 11
    },
    {
        "id": "0.4",
        "group": "group A",
        "price": 204,
        "volume": 5
    },
    {
        "id": "0.5",
        "group": "group A",
        "price": 293,
        "volume": 18
    },
    {
        "id": "0.6",
        "group": "group A",
        "price": 115,
        "volume": 14
    },
    {
        "id": "0.7",
        "group": "group A",
        "price": 70,
        "volume": 19
    },
    {
        "id": "0.8",
        "group": "group A",
        "price": 6,
        "volume": 20
    },
    {
        "id": "0.9",
        "group": "group A",
        "price": 464,
        "volume": 12
    },
    {
        "id": "0.10",
        "group": "group A",
        "price": 311,
        "volume": 11
    },
    {
        "id": "0.11",
        "group": "group A",
        "price": 125,
        "volume": 6
    },
    {
        "id": "0.12",
        "group": "group A",
        "price": 110,
        "volume": 18
    },
    {
        "id": "0.13",
        "group": "group A",
        "price": 5,
        "volume": 13
    },
    {
        "id": "0.14",
        "group": "group A",
        "price": 343,
        "volume": 6
    },
    {
        "id": "0.15",
        "group": "group A",
        "price": 172,
        "volume": 15
    },
    {
        "id": "0.16",
        "group": "group A",
        "price": 418,
        "volume": 12
    },
    {
        "id": "0.17",
        "group": "group A",
        "price": 454,
        "volume": 17
    },
    {
        "id": "0.18",
        "group": "group A",
        "price": 215,
        "volume": 4
    },
    {
        "id": "0.19",
        "group": "group A",
        "price": 153,
        "volume": 20
    },
    {
        "id": "0.20",
        "group": "group A",
        "price": 420,
        "volume": 12
    },
    {
        "id": "0.21",
        "group": "group A",
        "price": 256,
        "volume": 7
    },
    {
        "id": "0.22",
        "group": "group A",
        "price": 201,
        "volume": 16
    },
    {
        "id": "0.23",
        "group": "group A",
        "price": 158,
        "volume": 19
    },
    {
        "id": "0.24",
        "group": "group A",
        "price": 451,
        "volume": 20
    },
    {
        "id": "0.25",
        "group": "group A",
        "price": 431,
        "volume": 8
    },
    {
        "id": "0.26",
        "group": "group A",
        "price": 279,
        "volume": 9
    },
    {
        "id": "0.27",
        "group": "group A",
        "price": 4,
        "volume": 8
    },
    {
        "id": "0.28",
        "group": "group A",
        "price": 217,
        "volume": 18
    },
    {
        "id": "0.29",
        "group": "group A",
        "price": 79,
        "volume": 13
    },
    {
        "id": "0.30",
        "group": "group A",
        "price": 168,
        "volume": 12
    },
    {
        "id": "0.31",
        "group": "group A",
        "price": 234,
        "volume": 16
    },
    {
        "id": "0.32",
        "group": "group A",
        "price": 158,
        "volume": 19
    },
    {
        "id": "0.33",
        "group": "group A",
        "price": 329,
        "volume": 12
    },
    {
        "id": "0.34",
        "group": "group A",
        "price": 248,
        "volume": 17
    },
    {
        "id": "0.35",
        "group": "group A",
        "price": 222,
        "volume": 7
    },
    {
        "id": "0.36",
        "group": "group A",
        "price": 444,
        "volume": 6
    },
    {
        "id": "0.37",
        "group": "group A",
        "price": 95,
        "volume": 10
    },
    {
        "id": "0.38",
        "group": "group A",
        "price": 393,
        "volume": 4
    },
    {
        "id": "0.39",
        "group": "group A",
        "price": 409,
        "volume": 14
    },
    {
        "id": "0.40",
        "group": "group A",
        "price": 112,
        "volume": 18
    },
    {
        "id": "0.41",
        "group": "group A",
        "price": 408,
        "volume": 6
    },
    {
        "id": "0.42",
        "group": "group A",
        "price": 173,
        "volume": 10
    },
    {
        "id": "0.43",
        "group": "group A",
        "price": 80,
        "volume": 17
    },
    {
        "id": "0.44",
        "group": "group A",
        "price": 124,
        "volume": 15
    },
    {
        "id": "0.45",
        "group": "group A",
        "price": 441,
        "volume": 15
    },
    {
        "id": "0.46",
        "group": "group A",
        "price": 262,
        "volume": 19
    },
    {
        "id": "0.47",
        "group": "group A",
        "price": 184,
        "volume": 11
    },
    {
        "id": "0.48",
        "group": "group A",
        "price": 310,
        "volume": 15
    },
    {
        "id": "0.49",
        "group": "group A",
        "price": 247,
        "volume": 10
    },
    {
        "id": "0.50",
        "group": "group A",
        "price": 51,
        "volume": 9
    },
    {
        "id": "0.51",
        "group": "group A",
        "price": 262,
        "volume": 9
    },
    {
        "id": "0.52",
        "group": "group A",
        "price": 193,
        "volume": 19
    },
    {
        "id": "0.53",
        "group": "group A",
        "price": 193,
        "volume": 5
    },
    {
        "id": "0.54",
        "group": "group A",
        "price": 155,
        "volume": 9
    },
    {
        "id": "0.55",
        "group": "group A",
        "price": 153,
        "volume": 16
    },
    {
        "id": "0.56",
        "group": "group A",
        "price": 362,
        "volume": 16
    },
    {
        "id": "0.57",
        "group": "group A",
        "price": 470,
        "volume": 8
    },
    {
        "id": "0.58",
        "group": "group A",
        "price": 236,
        "volume": 8
    },
    {
        "id": "0.59",
        "group": "group A",
        "price": 383,
        "volume": 13
    },
    {
        "id": "0.60",
        "group": "group A",
        "price": 478,
        "volume": 14
    },
    {
        "id": "0.61",
        "group": "group A",
        "price": 13,
        "volume": 18
    },
    {
        "id": "0.62",
        "group": "group A",
        "price": 398,
        "volume": 17
    },
    {
        "id": "0.63",
        "group": "group A",
        "price": 330,
        "volume": 4
    },
    {
        "id": "0.64",
        "group": "group A",
        "price": 293,
        "volume": 17
    },
    {
        "id": "1.0",
        "group": "group B",
        "price": 448,
        "volume": 17
    },
    {
        "id": "1.1",
        "group": "group B",
        "price": 200,
        "volume": 12
    },
    {
        "id": "1.2",
        "group": "group B",
        "price": 344,
        "volume": 20
    },
    {
        "id": "1.3",
        "group": "group B",
        "price": 412,
        "volume": 9
    },
    {
        "id": "1.4",
        "group": "group B",
        "price": 292,
        "volume": 7
    },
    {
        "id": "1.5",
        "group": "group B",
        "price": 402,
        "volume": 20
    },
    {
        "id": "1.6",
        "group": "group B",
        "price": 240,
        "volume": 20
    },
    {
        "id": "1.7",
        "group": "group B",
        "price": 259,
        "volume": 14
    },
    {
        "id": "1.8",
        "group": "group B",
        "price": 299,
        "volume": 7
    },
    {
        "id": "1.9",
        "group": "group B",
        "price": 302,
        "volume": 9
    },
    {
        "id": "1.10",
        "group": "group B",
        "price": 177,
        "volume": 9
    },
    {
        "id": "1.11",
        "group": "group B",
        "price": 107,
        "volume": 11
    },
    {
        "id": "1.12",
        "group": "group B",
        "price": 53,
        "volume": 14
    },
    {
        "id": "1.13",
        "group": "group B",
        "price": 393,
        "volume": 14
    },
    {
        "id": "1.14",
        "group": "group B",
        "price": 113,
        "volume": 16
    },
    {
        "id": "1.15",
        "group": "group B",
        "price": 358,
        "volume": 14
    },
    {
        "id": "1.16",
        "group": "group B",
        "price": 230,
        "volume": 8
    },
    {
        "id": "1.17",
        "group": "group B",
        "price": 329,
        "volume": 5
    },
    {
        "id": "1.18",
        "group": "group B",
        "price": 57,
        "volume": 17
    },
    {
        "id": "1.19",
        "group": "group B",
        "price": 399,
        "volume": 9
    },
    {
        "id": "1.20",
        "group": "group B",
        "price": 394,
        "volume": 12
    },
    {
        "id": "1.21",
        "group": "group B",
        "price": 153,
        "volume": 16
    },
    {
        "id": "1.22",
        "group": "group B",
        "price": 258,
        "volume": 13
    },
    {
        "id": "1.23",
        "group": "group B",
        "price": 498,
        "volume": 14
    },
    {
        "id": "1.24",
        "group": "group B",
        "price": 100,
        "volume": 15
    },
    {
        "id": "1.25",
        "group": "group B",
        "price": 274,
        "volume": 4
    },
    {
        "id": "1.26",
        "group": "group B",
        "price": 265,
        "volume": 8
    },
    {
        "id": "1.27",
        "group": "group B",
        "price": 85,
        "volume": 13
    },
    {
        "id": "1.28",
        "group": "group B",
        "price": 373,
        "volume": 19
    },
    {
        "id": "1.29",
        "group": "group B",
        "price": 343,
        "volume": 9
    },
    {
        "id": "1.30",
        "group": "group B",
        "price": 138,
        "volume": 18
    },
    {
        "id": "1.31",
        "group": "group B",
        "price": 341,
        "volume": 13
    },
    {
        "id": "1.32",
        "group": "group B",
        "price": 336,
        "volume": 14
    },
    {
        "id": "1.33",
        "group": "group B",
        "price": 55,
        "volume": 14
    },
    {
        "id": "1.34",
        "group": "group B",
        "price": 476,
        "volume": 4
    },
    {
        "id": "1.35",
        "group": "group B",
        "price": 428,
        "volume": 8
    },
    {
        "id": "1.36",
        "group": "group B",
        "price": 88,
        "volume": 15
    },
    {
        "id": "1.37",
        "group": "group B",
        "price": 156,
        "volume": 10
    },
    {
        "id": "1.38",
        "group": "group B",
        "price": 363,
        "volume": 5
    },
    {
        "id": "1.39",
        "group": "group B",
        "price": 464,
        "volume": 18
    },
    {
        "id": "1.40",
        "group": "group B",
        "price": 197,
        "volume": 15
    },
    {
        "id": "1.41",
        "group": "group B",
        "price": 273,
        "volume": 7
    },
    {
        "id": "1.42",
        "group": "group B",
        "price": 415,
        "volume": 9
    },
    {
        "id": "1.43",
        "group": "group B",
        "price": 204,
        "volume": 19
    },
    {
        "id": "1.44",
        "group": "group B",
        "price": 389,
        "volume": 10
    },
    {
        "id": "1.45",
        "group": "group B",
        "price": 320,
        "volume": 10
    },
    {
        "id": "1.46",
        "group": "group B",
        "price": 479,
        "volume": 15
    },
    {
        "id": "1.47",
        "group": "group B",
        "price": 34,
        "volume": 13
    },
    {
        "id": "1.48",
        "group": "group B",
        "price": 388,
        "volume": 11
    },
    {
        "id": "1.49",
        "group": "group B",
        "price": 489,
        "volume": 20
    },
    {
        "id": "1.50",
        "group": "group B",
        "price": 117,
        "volume": 10
    },
    {
        "id": "2.0",
        "group": "group C",
        "price": 277,
        "volume": 15
    },
    {
        "id": "2.1",
        "group": "group C",
        "price": 8,
        "volume": 5
    },
    {
        "id": "2.2",
        "group": "group C",
        "price": 102,
        "volume": 9
    },
    {
        "id": "2.3",
        "group": "group C",
        "price": 229,
        "volume": 13
    },
    {
        "id": "2.4",
        "group": "group C",
        "price": 107,
        "volume": 7
    },
    {
        "id": "2.5",
        "group": "group C",
        "price": 391,
        "volume": 9
    },
    {
        "id": "2.6",
        "group": "group C",
        "price": 366,
        "volume": 19
    },
    {
        "id": "2.7",
        "group": "group C",
        "price": 59,
        "volume": 5
    },
    {
        "id": "2.8",
        "group": "group C",
        "price": 248,
        "volume": 10
    },
    {
        "id": "2.9",
        "group": "group C",
        "price": 166,
        "volume": 11
    },
    {
        "id": "2.10",
        "group": "group C",
        "price": 83,
        "volume": 9
    },
    {
        "id": "2.11",
        "group": "group C",
        "price": 359,
        "volume": 10
    },
    {
        "id": "2.12",
        "group": "group C",
        "price": 95,
        "volume": 14
    },
    {
        "id": "2.13",
        "group": "group C",
        "price": 259,
        "volume": 6
    },
    {
        "id": "2.14",
        "group": "group C",
        "price": 160,
        "volume": 12
    },
    {
        "id": "2.15",
        "group": "group C",
        "price": 478,
        "volume": 12
    },
    {
        "id": "2.16",
        "group": "group C",
        "price": 464,
        "volume": 12
    },
    {
        "id": "2.17",
        "group": "group C",
        "price": 457,
        "volume": 11
    },
    {
        "id": "2.18",
        "group": "group C",
        "price": 4,
        "volume": 9
    },
    {
        "id": "2.19",
        "group": "group C",
        "price": 44,
        "volume": 6
    },
    {
        "id": "2.20",
        "group": "group C",
        "price": 347,
        "volume": 10
    },
    {
        "id": "2.21",
        "group": "group C",
        "price": 211,
        "volume": 18
    },
    {
        "id": "2.22",
        "group": "group C",
        "price": 469,
        "volume": 14
    },
    {
        "id": "2.23",
        "group": "group C",
        "price": 387,
        "volume": 11
    },
    {
        "id": "2.24",
        "group": "group C",
        "price": 56,
        "volume": 20
    },
    {
        "id": "2.25",
        "group": "group C",
        "price": 472,
        "volume": 10
    },
    {
        "id": "2.26",
        "group": "group C",
        "price": 432,
        "volume": 5
    },
    {
        "id": "2.27",
        "group": "group C",
        "price": 159,
        "volume": 6
    },
    {
        "id": "2.28",
        "group": "group C",
        "price": 334,
        "volume": 12
    },
    {
        "id": "2.29",
        "group": "group C",
        "price": 339,
        "volume": 14
    },
    {
        "id": "2.30",
        "group": "group C",
        "price": 186,
        "volume": 12
    },
    {
        "id": "2.31",
        "group": "group C",
        "price": 488,
        "volume": 7
    },
    {
        "id": "2.32",
        "group": "group C",
        "price": 2,
        "volume": 20
    },
    {
        "id": "2.33",
        "group": "group C",
        "price": 133,
        "volume": 15
    },
    {
        "id": "2.34",
        "group": "group C",
        "price": 178,
        "volume": 19
    },
    {
        "id": "2.35",
        "group": "group C",
        "price": 272,
        "volume": 12
    },
    {
        "id": "2.36",
        "group": "group C",
        "price": 125,
        "volume": 20
    },
    {
        "id": "2.37",
        "group": "group C",
        "price": 195,
        "volume": 11
    },
    {
        "id": "2.38",
        "group": "group C",
        "price": 404,
        "volume": 17
    },
    {
        "id": "2.39",
        "group": "group C",
        "price": 433,
        "volume": 13
    },
    {
        "id": "2.40",
        "group": "group C",
        "price": 409,
        "volume": 5
    },
    {
        "id": "2.41",
        "group": "group C",
        "price": 295,
        "volume": 13
    },
    {
        "id": "2.42",
        "group": "group C",
        "price": 338,
        "volume": 15
    },
    {
        "id": "2.43",
        "group": "group C",
        "price": 260,
        "volume": 10
    },
    {
        "id": "2.44",
        "group": "group C",
        "price": 19,
        "volume": 19
    },
    {
        "id": "2.45",
        "group": "group C",
        "price": 135,
        "volume": 11
    },
    {
        "id": "2.46",
        "group": "group C",
        "price": 468,
        "volume": 13
    },
    {
        "id": "2.47",
        "group": "group C",
        "price": 469,
        "volume": 9
    },
    {
        "id": "2.48",
        "group": "group C",
        "price": 371,
        "volume": 11
    },
    {
        "id": "2.49",
        "group": "group C",
        "price": 302,
        "volume": 4
    },
    {
        "id": "2.50",
        "group": "group C",
        "price": 127,
        "volume": 16
    },
    {
        "id": "2.51",
        "group": "group C",
        "price": 307,
        "volume": 12
    },
    {
        "id": "2.52",
        "group": "group C",
        "price": 298,
        "volume": 14
    },
    {
        "id": "2.53",
        "group": "group C",
        "price": 202,
        "volume": 15
    },
    {
        "id": "2.54",
        "group": "group C",
        "price": 454,
        "volume": 20
    },
    {
        "id": "2.55",
        "group": "group C",
        "price": 279,
        "volume": 19
    },
    {
        "id": "2.56",
        "group": "group C",
        "price": 190,
        "volume": 13
    },
    {
        "id": "2.57",
        "group": "group C",
        "price": 340,
        "volume": 5
    },
    {
        "id": "2.58",
        "group": "group C",
        "price": 284,
        "volume": 11
    },
    {
        "id": "2.59",
        "group": "group C",
        "price": 137,
        "volume": 16
    },
    {
        "id": "2.60",
        "group": "group C",
        "price": 368,
        "volume": 19
    },
    {
        "id": "2.61",
        "group": "group C",
        "price": 477,
        "volume": 14
    },
    {
        "id": "2.62",
        "group": "group C",
        "price": 426,
        "volume": 5
    }
]

export const SafeSwarmPlot = ({ data, ...props }: any) => {
    return (
        <ChartErrorBoundary>
            <MemoizedSwarmPlot data={data || fallbackData} {...props}
                groups={['group A', 'group B', 'group C']}
                identity="id"
                value="price"
                valueFormat="$.2f"
                valueScale={{ type: 'linear', min: 0, max: 500, reverse: false }}
                size={{
                    key: 'volume',
                    values: [
                        4,
                        20
                    ],
                    sizes: [
                        6,
                        20
                    ]
                }}
                forceStrength={4}
                simulationIterations={100}
                borderColor={{
                    from: 'color',
                    modifiers: [
                        [
                            'darker',
                            0.6
                        ],
                        [
                            'opacity',
                            0.5
                        ]
                    ]
                }}
                margin={{ top: 80, right: 100, bottom: 80, left: 100 }}
                axisTop={{
                    orient: 'top',
                    tickSize: 10,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'group if vertical, price if horizontal',
                    legendPosition: 'middle',
                    legendOffset: -46,
                    truncateTickAt: 0
                }}
                axisRight={{
                    orient: 'right',
                    tickSize: 10,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'price if vertical, group if horizontal',
                    legendPosition: 'middle',
                    legendOffset: 76,
                    truncateTickAt: 0
                }}
                axisBottom={{
                    orient: 'bottom',
                    tickSize: 10,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'group if vertical, price if horizontal',
                    legendPosition: 'middle',
                    legendOffset: 46,
                    truncateTickAt: 0
                }}
                axisLeft={{
                    orient: 'left',
                    tickSize: 10,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'price if vertical, group if horizontal',
                    legendPosition: 'middle',
                    legendOffset: -76,
                    truncateTickAt: 0
                }} />
        </ChartErrorBoundary>
    );
};

