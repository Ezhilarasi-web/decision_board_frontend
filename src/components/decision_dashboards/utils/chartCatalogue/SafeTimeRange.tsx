import { memo } from "react";
import { TimeRange } from "@nivo/calendar";
import { ChartErrorBoundary } from "@/components/decision_dashboards/chartWrapperComponents";

const MemoizedTimeRange = memo(TimeRange);

export const fallbackData = [
    {
        "value": 200,
        "day": "2018-05-02"
    },
    {
        "value": 126,
        "day": "2018-07-18"
    },
    {
        "value": 63,
        "day": "2018-06-20"
    },
    {
        "value": 192,
        "day": "2018-07-20"
    },
    {
        "value": 360,
        "day": "2018-08-06"
    },
    {
        "value": 215,
        "day": "2018-07-07"
    },
    {
        "value": 199,
        "day": "2018-07-13"
    },
    {
        "value": 387,
        "day": "2018-08-02"
    },
    {
        "value": 163,
        "day": "2018-05-03"
    },
    {
        "value": 186,
        "day": "2018-04-11"
    },
    {
        "value": 348,
        "day": "2018-04-08"
    },
    {
        "value": 184,
        "day": "2018-05-27"
    },
    {
        "value": 378,
        "day": "2018-05-07"
    },
    {
        "value": 154,
        "day": "2018-06-17"
    },
    {
        "value": 249,
        "day": "2018-05-08"
    },
    {
        "value": 294,
        "day": "2018-04-07"
    },
    {
        "value": 192,
        "day": "2018-07-17"
    },
    {
        "value": 27,
        "day": "2018-06-15"
    },
    {
        "value": 258,
        "day": "2018-06-18"
    },
    {
        "value": 207,
        "day": "2018-05-22"
    },
    {
        "value": 181,
        "day": "2018-07-29"
    },
    {
        "value": 5,
        "day": "2018-06-29"
    },
    {
        "value": 205,
        "day": "2018-08-04"
    },
    {
        "value": 149,
        "day": "2018-08-03"
    },
    {
        "value": 281,
        "day": "2018-06-03"
    },
    {
        "value": 358,
        "day": "2018-07-11"
    },
    {
        "value": 68,
        "day": "2018-05-05"
    },
    {
        "value": 43,
        "day": "2018-06-21"
    },
    {
        "value": 84,
        "day": "2018-04-06"
    },
    {
        "value": 224,
        "day": "2018-05-17"
    },
    {
        "value": 171,
        "day": "2018-05-12"
    },
    {
        "value": 116,
        "day": "2018-07-14"
    },
    {
        "value": 177,
        "day": "2018-07-06"
    },
    {
        "value": 212,
        "day": "2018-08-08"
    },
    {
        "value": 187,
        "day": "2018-06-24"
    },
    {
        "value": 361,
        "day": "2018-07-04"
    },
    {
        "value": 308,
        "day": "2018-06-06"
    },
    {
        "value": 296,
        "day": "2018-05-24"
    },
    {
        "value": 173,
        "day": "2018-05-21"
    },
    {
        "value": 264,
        "day": "2018-04-16"
    },
    {
        "value": 233,
        "day": "2018-05-31"
    },
    {
        "value": 345,
        "day": "2018-07-30"
    },
    {
        "value": 72,
        "day": "2018-05-06"
    },
    {
        "value": 256,
        "day": "2018-08-10"
    },
    {
        "value": 327,
        "day": "2018-04-04"
    },
    {
        "value": 331,
        "day": "2018-04-15"
    },
    {
        "value": 277,
        "day": "2018-04-19"
    },
    {
        "value": 258,
        "day": "2018-04-18"
    },
    {
        "value": 201,
        "day": "2018-07-01"
    },
    {
        "value": 62,
        "day": "2018-08-11"
    },
    {
        "value": 123,
        "day": "2018-07-26"
    },
    {
        "value": 35,
        "day": "2018-06-13"
    },
    {
        "value": 205,
        "day": "2018-06-26"
    },
    {
        "value": 33,
        "day": "2018-07-27"
    },
    {
        "value": 144,
        "day": "2018-07-15"
    },
    {
        "value": 121,
        "day": "2018-05-16"
    },
    {
        "value": 235,
        "day": "2018-06-08"
    },
    {
        "value": 168,
        "day": "2018-06-02"
    },
    {
        "value": 263,
        "day": "2018-06-28"
    },
    {
        "value": 239,
        "day": "2018-04-26"
    },
    {
        "value": 355,
        "day": "2018-07-24"
    },
    {
        "value": 114,
        "day": "2018-04-23"
    },
    {
        "value": 312,
        "day": "2018-05-29"
    },
    {
        "value": 13,
        "day": "2018-06-04"
    },
    {
        "value": 93,
        "day": "2018-07-09"
    },
    {
        "value": 201,
        "day": "2018-07-10"
    },
    {
        "value": 175,
        "day": "2018-07-25"
    },
    {
        "value": 312,
        "day": "2018-05-15"
    },
    {
        "value": 292,
        "day": "2018-04-03"
    },
    {
        "value": 339,
        "day": "2018-07-23"
    },
    {
        "value": 150,
        "day": "2018-07-22"
    },
    {
        "value": 275,
        "day": "2018-07-12"
    },
    {
        "value": 296,
        "day": "2018-04-14"
    },
    {
        "value": 292,
        "day": "2018-06-01"
    },
    {
        "value": 139,
        "day": "2018-06-05"
    },
    {
        "value": 190,
        "day": "2018-04-01"
    },
    {
        "value": 346,
        "day": "2018-07-08"
    },
    {
        "value": 230,
        "day": "2018-04-27"
    },
    {
        "value": 184,
        "day": "2018-04-25"
    },
    {
        "value": 62,
        "day": "2018-08-01"
    },
    {
        "value": 397,
        "day": "2018-05-09"
    },
    {
        "value": 57,
        "day": "2018-05-23"
    },
    {
        "value": 308,
        "day": "2018-07-05"
    },
    {
        "value": 212,
        "day": "2018-05-04"
    },
    {
        "value": 8,
        "day": "2018-04-10"
    },
    {
        "value": 374,
        "day": "2018-05-25"
    }
]

export const SafeTimeRange = ({ data, ...props }: any) => {
    return (
        <ChartErrorBoundary>
            <MemoizedTimeRange data={data || fallbackData} {...props}
                from="2018-04-01"
                to="2018-08-12"
                emptyColor="#eeeeee"
                colors={['#61cdbb', '#97e3d5', '#e8c1a0', '#f47560']}
                margin={{ top: 40, right: 40, bottom: 100, left: 40 }}
                dayBorderWidth={2}
                dayBorderColor="#ffffff"
                legends={[
                    {
                        anchor: 'bottom-right',
                        direction: 'row',
                        justify: false,
                        itemCount: 4,
                        itemWidth: 42,
                        itemHeight: 36,
                        itemsSpacing: 14,
                        itemDirection: 'right-to-left',
                        translateX: -60,
                        translateY: -60,
                        symbolSize: 20
                    }
                ]} />
        </ChartErrorBoundary>
    );
};
