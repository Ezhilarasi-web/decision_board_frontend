import { memo } from "react";
import { Bullet } from "@nivo/bullet";
import { ChartErrorBoundary } from "@/components/decision_dashboards/chartWrapperComponents";

const MemoizedBullet = memo(Bullet);

export const fallbackData = [
    {
        "id": "packaging 1",
        "ranges": [
            101,
            7,
            77,
            0,
            120
        ],
        "measures": [
            56
        ],
        "markers": [
            87
        ]
    },
    {
        "id": "packaging 2",
        "ranges": [
            0.9813543841493247,
            0.5206856842517531,
            0.9291720681697102,
            0,
            2
        ],
        "measures": [
            0.01472336903846782,
            0.02027531637947444
        ],
        "markers": [
            1.8710733822547057
        ]
    },
    {
        "id": "packaging 3",
        "ranges": [
            38,
            33,
            16,
            27,
            6,
            68,
            0,
            80
        ],
        "measures": [
            23
        ],
        "markers": [
            72
        ]
    },
    {
        "id": "packaging 4",
        "ranges": [
            70260,
            258514,
            73162,
            0,
            500000
        ],
        "measures": [
            156388,
            270918
        ],
        "markers": [
            494227
        ]
    },
    {
        "id": "packaging 5",
        "ranges": [
            1,
            2,
            2,
            0,
            11
        ],
        "measures": [
            3
        ],
        "markers": [
            10.787194291371762,
            9.874600653248626
        ]
    }
]

export const SafeBullet = ({ data, ...props }: any) => {
    return (
        <ChartErrorBoundary>
            <MemoizedBullet data={data || fallbackData} {...props}
                margin={{ top: 50, right: 90, bottom: 50, left: 90 }}
                spacing={46}
                titleAlign="start"
                titleOffsetX={-70}
                measureSize={0.2} />
        </ChartErrorBoundary>
    );
};
