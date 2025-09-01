import { memo } from "react";
import { HeatMap } from "@nivo/heatmap";
import { ChartErrorBoundary } from "@/components/decision_dashboards/chartWrapperComponents";

const MemoizedHeatMap = memo(HeatMap);

export const fallbackData = [
    {
        "id": "Japan",
        "data": [
            {
                "x": "Beverages",
                "y": -20830
            },
            {
                "x": "Snacks",
                "y": 55464
            },
            {
                "x": "Hygiene",
                "y": -83003
            },
            {
                "x": "Cleaning",
                "y": 14595
            },
            {
                "x": "Baby Care",
                "y": -23359
            },
            {
                "x": "Pet Care",
                "y": 95866
            },
            {
                "x": "Pharmacy",
                "y": 62844
            },
            {
                "x": "Stationery",
                "y": 95143
            },
            {
                "x": "Others",
                "y": -23505
            }
        ]
    },
    {
        "id": "France",
        "data": [
            {
                "x": "Beverages",
                "y": 90336
            },
            {
                "x": "Snacks",
                "y": 77764
            },
            {
                "x": "Hygiene",
                "y": -29362
            },
            {
                "x": "Cleaning",
                "y": -70434
            },
            {
                "x": "Baby Care",
                "y": -27264
            },
            {
                "x": "Pet Care",
                "y": 44406
            },
            {
                "x": "Pharmacy",
                "y": -22863
            },
            {
                "x": "Stationery",
                "y": -53500
            },
            {
                "x": "Others",
                "y": 40643
            }
        ]
    },
    {
        "id": "US",
        "data": [
            {
                "x": "Beverages",
                "y": -73355
            },
            {
                "x": "Snacks",
                "y": 53712
            },
            {
                "x": "Hygiene",
                "y": -75403
            },
            {
                "x": "Cleaning",
                "y": -99742
            },
            {
                "x": "Baby Care",
                "y": -2591
            },
            {
                "x": "Pet Care",
                "y": -83490
            },
            {
                "x": "Pharmacy",
                "y": -56258
            },
            {
                "x": "Stationery",
                "y": -32665
            },
            {
                "x": "Others",
                "y": 63159
            }
        ]
    },
    {
        "id": "Germany",
        "data": [
            {
                "x": "Beverages",
                "y": 49132
            },
            {
                "x": "Snacks",
                "y": 27673
            },
            {
                "x": "Hygiene",
                "y": -45208
            },
            {
                "x": "Cleaning",
                "y": -10953
            },
            {
                "x": "Baby Care",
                "y": 12112
            },
            {
                "x": "Pet Care",
                "y": -75697
            },
            {
                "x": "Pharmacy",
                "y": -3959
            },
            {
                "x": "Stationery",
                "y": 54748
            },
            {
                "x": "Others",
                "y": 30862
            }
        ]
    },
    {
        "id": "Norway",
        "data": [
            {
                "x": "Beverages",
                "y": 15814
            },
            {
                "x": "Snacks",
                "y": -12291
            },
            {
                "x": "Hygiene",
                "y": 47938
            },
            {
                "x": "Cleaning",
                "y": 62544
            },
            {
                "x": "Baby Care",
                "y": -46265
            },
            {
                "x": "Pet Care",
                "y": 62624
            },
            {
                "x": "Pharmacy",
                "y": 91711
            },
            {
                "x": "Stationery",
                "y": 51008
            },
            {
                "x": "Others",
                "y": -90166
            }
        ]
    },
    {
        "id": "Iceland",
        "data": [
            {
                "x": "Beverages",
                "y": 85265
            },
            {
                "x": "Snacks",
                "y": -44981
            },
            {
                "x": "Hygiene",
                "y": -44790
            },
            {
                "x": "Cleaning",
                "y": -59402
            },
            {
                "x": "Baby Care",
                "y": 54300
            },
            {
                "x": "Pet Care",
                "y": 18480
            },
            {
                "x": "Pharmacy",
                "y": 80568
            },
            {
                "x": "Stationery",
                "y": 57376
            },
            {
                "x": "Others",
                "y": 3297
            }
        ]
    },
    {
        "id": "UK",
        "data": [
            {
                "x": "Beverages",
                "y": 97605
            },
            {
                "x": "Snacks",
                "y": 67897
            },
            {
                "x": "Hygiene",
                "y": 10956
            },
            {
                "x": "Cleaning",
                "y": 53245
            },
            {
                "x": "Baby Care",
                "y": 56447
            },
            {
                "x": "Pet Care",
                "y": -15477
            },
            {
                "x": "Pharmacy",
                "y": 80350
            },
            {
                "x": "Stationery",
                "y": 89741
            },
            {
                "x": "Others",
                "y": 41586
            }
        ]
    },
    {
        "id": "Vietnam",
        "data": [
            {
                "x": "Beverages",
                "y": 98235
            },
            {
                "x": "Snacks",
                "y": -86073
            },
            {
                "x": "Hygiene",
                "y": 28316
            },
            {
                "x": "Cleaning",
                "y": 70535
            },
            {
                "x": "Baby Care",
                "y": 20319
            },
            {
                "x": "Pet Care",
                "y": 82770
            },
            {
                "x": "Pharmacy",
                "y": 89353
            },
            {
                "x": "Stationery",
                "y": -79339
            },
            {
                "x": "Others",
                "y": -39518
            }
        ]
    }
]

export const SafeHeatmap = ({ data, ...props }: any) => {
    // Extract key prop if it exists to avoid React warning about spreading the key prop
    const { key, ...restProps } = props;
    
    return (
        <ChartErrorBoundary key={key} chartType="heatmap">
            <MemoizedHeatMap 
                data={data || fallbackData} 
                {...restProps}
                margin={{ top: 60, right: 90, bottom: 60, left: 90 }}
                valueFormat=">-.2s"
                axisTop={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: -90,
                    legend: '',
                    legendOffset: 46,
                    truncateTickAt: 0
                }}
                axisRight={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'country',
                    legendPosition: 'middle',
                    legendOffset: 70,
                    truncateTickAt: 0
                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'country',
                    legendPosition: 'middle',
                    legendOffset: -72,
                    truncateTickAt: 0
                }}
                colors={{
                    type: 'diverging',
                    scheme: 'red_yellow_blue',
                    divergeAt: 0.5,
                    minValue: -100000,
                    maxValue: 100000
                }}
                emptyColor="#000000"
                legends={[
                    {
                        anchor: 'bottom',
                        translateX: 0,
                        translateY: 30,
                        length: 400,
                        thickness: 8,
                        direction: 'row',
                        tickPosition: 'after',
                        tickSize: 3,
                        tickSpacing: 4,
                        tickOverlap: false,
                        tickFormat: '>-.2s',
                        title: 'Value →',
                        titleAlign: 'start',
                        titleOffset: 4
                    }
                ]} 
            />
        </ChartErrorBoundary>
    );
};
