import { memo } from "react";
import { Choropleth } from "@nivo/geo";
import { ChartErrorBoundary } from "@/components/decision_dashboards/chartWrapperComponents";
import worldCountries from '../../../../assets/chart_data/world_countries.json';

const features = worldCountries.features;

const MemoizedChoropleth = memo(Choropleth);

export const fallbackData = [
    {
        "id": "AFG",
        "value": 29851
    },
    {
        "id": "AGO",
        "value": 112257
    },
    {
        "id": "ALB",
        "value": 456887
    },
    {
        "id": "ARE",
        "value": 353503
    },
    {
        "id": "ARG",
        "value": 640132
    },
    {
        "id": "ARM",
        "value": 36374
    },
    {
        "id": "ATA",
        "value": 376836
    },
    {
        "id": "ATF",
        "value": 820511
    },
    {
        "id": "AUT",
        "value": 82211
    },
    {
        "id": "AZE",
        "value": 432344
    },
    {
        "id": "BDI",
        "value": 990015
    },
    {
        "id": "BEL",
        "value": 709631
    },
    {
        "id": "BEN",
        "value": 600506
    },
    {
        "id": "BFA",
        "value": 754419
    },
    {
        "id": "BGD",
        "value": 338527
    },
    {
        "id": "BGR",
        "value": 185829
    },
    {
        "id": "BHS",
        "value": 290229
    },
    {
        "id": "BIH",
        "value": 180247
    },
    {
        "id": "BLR",
        "value": 399537
    },
    {
        "id": "BLZ",
        "value": 220
    },
    {
        "id": "BOL",
        "value": 326010
    },
    {
        "id": "BRN",
        "value": 848016
    },
    {
        "id": "BTN",
        "value": 624936
    },
    {
        "id": "BWA",
        "value": 364048
    },
    {
        "id": "CAF",
        "value": 958972
    },
    {
        "id": "CAN",
        "value": 250842
    },
    {
        "id": "CHE",
        "value": 698619
    },
    {
        "id": "CHL",
        "value": 38459
    },
    {
        "id": "CHN",
        "value": 53057
    },
    {
        "id": "CIV",
        "value": 62056
    },
    {
        "id": "CMR",
        "value": 63989
    },
    {
        "id": "COG",
        "value": 729180
    },
    {
        "id": "COL",
        "value": 120156
    },
    {
        "id": "CRI",
        "value": 38325
    },
    {
        "id": "CUB",
        "value": 174677
    },
    {
        "id": "-99",
        "value": 170287
    },
    {
        "id": "CYP",
        "value": 325966
    },
    {
        "id": "CZE",
        "value": 208409
    },
    {
        "id": "DEU",
        "value": 175969
    },
    {
        "id": "DJI",
        "value": 326748
    },
    {
        "id": "DNK",
        "value": 756496
    },
    {
        "id": "DOM",
        "value": 115033
    },
    {
        "id": "DZA",
        "value": 452429
    },
    {
        "id": "ECU",
        "value": 486385
    },
    {
        "id": "EGY",
        "value": 649052
    },
    {
        "id": "ERI",
        "value": 435786
    },
    {
        "id": "ESP",
        "value": 915969
    },
    {
        "id": "EST",
        "value": 877886
    },
    {
        "id": "ETH",
        "value": 225927
    },
    {
        "id": "FIN",
        "value": 339508
    },
    {
        "id": "FJI",
        "value": 942358
    },
    {
        "id": "FLK",
        "value": 969783
    },
    {
        "id": "FRA",
        "value": 353636
    },
    {
        "id": "GAB",
        "value": 778064
    },
    {
        "id": "GBR",
        "value": 753202
    },
    {
        "id": "GEO",
        "value": 62548
    },
    {
        "id": "GHA",
        "value": 421570
    },
    {
        "id": "GIN",
        "value": 980102
    },
    {
        "id": "GMB",
        "value": 536542
    },
    {
        "id": "GNB",
        "value": 795557
    },
    {
        "id": "GNQ",
        "value": 592882
    },
    {
        "id": "GRC",
        "value": 69533
    },
    {
        "id": "GTM",
        "value": 866122
    },
    {
        "id": "GUY",
        "value": 624669
    },
    {
        "id": "HND",
        "value": 586401
    },
    {
        "id": "HRV",
        "value": 274969
    },
    {
        "id": "HTI",
        "value": 40232
    },
    {
        "id": "HUN",
        "value": 60475
    },
    {
        "id": "IDN",
        "value": 430897
    },
    {
        "id": "IND",
        "value": 606192
    },
    {
        "id": "IRL",
        "value": 363054
    },
    {
        "id": "IRN",
        "value": 856739
    },
    {
        "id": "IRQ",
        "value": 867828
    },
    {
        "id": "ISL",
        "value": 849667
    },
    {
        "id": "ISR",
        "value": 970713
    },
    {
        "id": "ITA",
        "value": 823635
    },
    {
        "id": "JAM",
        "value": 164076
    },
    {
        "id": "JOR",
        "value": 707931
    },
    {
        "id": "JPN",
        "value": 923335
    },
    {
        "id": "KAZ",
        "value": 576745
    },
    {
        "id": "KEN",
        "value": 313230
    },
    {
        "id": "KGZ",
        "value": 777559
    },
    {
        "id": "KHM",
        "value": 909867
    },
    {
        "id": "OSA",
        "value": 709380
    },
    {
        "id": "KWT",
        "value": 676708
    },
    {
        "id": "LAO",
        "value": 739075
    },
    {
        "id": "LBN",
        "value": 853612
    },
    {
        "id": "LBR",
        "value": 171693
    },
    {
        "id": "LBY",
        "value": 962187
    },
    {
        "id": "LKA",
        "value": 746610
    },
    {
        "id": "LSO",
        "value": 488269
    },
    {
        "id": "LTU",
        "value": 886362
    },
    {
        "id": "LUX",
        "value": 148400
    },
    {
        "id": "LVA",
        "value": 484755
    },
    {
        "id": "MAR",
        "value": 503465
    },
    {
        "id": "MDA",
        "value": 352767
    },
    {
        "id": "MDG",
        "value": 946146
    },
    {
        "id": "MEX",
        "value": 279556
    },
    {
        "id": "MKD",
        "value": 607405
    },
    {
        "id": "MLI",
        "value": 162629
    },
    {
        "id": "MMR",
        "value": 448550
    },
    {
        "id": "MNE",
        "value": 339910
    },
    {
        "id": "MNG",
        "value": 460700
    },
    {
        "id": "MOZ",
        "value": 91553
    },
    {
        "id": "MRT",
        "value": 426701
    },
    {
        "id": "MWI",
        "value": 177301
    },
    {
        "id": "MYS",
        "value": 794403
    },
    {
        "id": "NAM",
        "value": 251276
    },
    {
        "id": "NCL",
        "value": 65939
    },
    {
        "id": "NER",
        "value": 907501
    },
    {
        "id": "NGA",
        "value": 905021
    },
    {
        "id": "NIC",
        "value": 19065
    },
    {
        "id": "NLD",
        "value": 777624
    },
    {
        "id": "NOR",
        "value": 248989
    },
    {
        "id": "NPL",
        "value": 16609
    },
    {
        "id": "NZL",
        "value": 700069
    },
    {
        "id": "OMN",
        "value": 187386
    },
    {
        "id": "PAK",
        "value": 500867
    },
    {
        "id": "PAN",
        "value": 43943
    },
    {
        "id": "PER",
        "value": 735117
    },
    {
        "id": "PHL",
        "value": 241314
    },
    {
        "id": "PNG",
        "value": 585579
    },
    {
        "id": "POL",
        "value": 343299
    },
    {
        "id": "PRI",
        "value": 965322
    },
    {
        "id": "PRT",
        "value": 538655
    },
    {
        "id": "PRY",
        "value": 198771
    },
    {
        "id": "QAT",
        "value": 3991
    },
    {
        "id": "ROU",
        "value": 816920
    },
    {
        "id": "RUS",
        "value": 559581
    },
    {
        "id": "RWA",
        "value": 97039
    },
    {
        "id": "ESH",
        "value": 389663
    },
    {
        "id": "SAU",
        "value": 958019
    },
    {
        "id": "SDN",
        "value": 563954
    },
    {
        "id": "SDS",
        "value": 455380
    },
    {
        "id": "SEN",
        "value": 991270
    },
    {
        "id": "SLB",
        "value": 491395
    },
    {
        "id": "SLE",
        "value": 911424
    },
    {
        "id": "SLV",
        "value": 686304
    },
    {
        "id": "ABV",
        "value": 384448
    },
    {
        "id": "SOM",
        "value": 498111
    },
    {
        "id": "SRB",
        "value": 737374
    },
    {
        "id": "SUR",
        "value": 877781
    },
    {
        "id": "SVK",
        "value": 207438
    },
    {
        "id": "SVN",
        "value": 762939
    },
    {
        "id": "SWZ",
        "value": 461572
    },
    {
        "id": "SYR",
        "value": 448026
    },
    {
        "id": "TCD",
        "value": 735582
    },
    {
        "id": "TGO",
        "value": 217557
    },
    {
        "id": "THA",
        "value": 775841
    },
    {
        "id": "TJK",
        "value": 350012
    },
    {
        "id": "TKM",
        "value": 246448
    },
    {
        "id": "TLS",
        "value": 729324
    },
    {
        "id": "TTO",
        "value": 21105
    },
    {
        "id": "TUN",
        "value": 108498
    },
    {
        "id": "TUR",
        "value": 88207
    },
    {
        "id": "TWN",
        "value": 177822
    },
    {
        "id": "TZA",
        "value": 431518
    },
    {
        "id": "UGA",
        "value": 946648
    },
    {
        "id": "UKR",
        "value": 439010
    },
    {
        "id": "URY",
        "value": 763606
    },
    {
        "id": "USA",
        "value": 879274
    },
    {
        "id": "UZB",
        "value": 128886
    },
    {
        "id": "VEN",
        "value": 335167
    },
    {
        "id": "VNM",
        "value": 785524
    },
    {
        "id": "VUT",
        "value": 311219
    },
    {
        "id": "PSE",
        "value": 877619
    },
    {
        "id": "YEM",
        "value": 948983
    },
    {
        "id": "ZAF",
        "value": 797842
    },
    {
        "id": "ZMB",
        "value": 185435
    },
    {
        "id": "ZWE",
        "value": 108005
    },
    {
        "id": "KOR",
        "value": 803992
    }
]

export const SafeChoropleth = ({ data, ...props }: any) => {
    return (
        <ChartErrorBoundary>
            <MemoizedChoropleth data={data || fallbackData} {...props}
                features={features}
                margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                colors="nivo"
                domain={[0, 1000000]}
                unknownColor="#666666"
                label="properties.name"
                valueFormat=".2s"
                projectionTranslation={[0.5, 0.5]}
                projectionRotation={[0, 0, 0]}
                enableGraticule={true}
                graticuleLineColor="#dddddd"
                borderWidth={0.5}
                borderColor="#152538"
                defs={[
                    {
                        id: 'dots',
                        type: 'patternDots',
                        background: 'inherit',
                        color: '#38bcb2',
                        size: 4,
                        padding: 1,
                        stagger: true
                    },
                    {
                        id: 'lines',
                        type: 'patternLines',
                        background: 'inherit',
                        color: '#eed312',
                        rotation: -45,
                        lineWidth: 6,
                        spacing: 10
                    },
                    {
                        id: 'gradient',
                        type: 'linearGradient',
                        colors: [
                            {
                                offset: 0,
                                color: '#000'
                            },
                            {
                                offset: 100,
                                color: 'inherit'
                            }
                        ]
                    }
                ]}
                fill={[
                    {
                        match: {
                            id: 'CAN'
                        },
                        id: 'dots'
                    },
                    {
                        match: {
                            id: 'CHN'
                        },
                        id: 'lines'
                    },
                    {
                        match: {
                            id: 'ATA'
                        },
                        id: 'gradient'
                    }
                ]}
                legends={[
                    {
                        anchor: 'bottom-left',
                        direction: 'column',
                        justify: true,
                        translateX: 20,
                        translateY: -100,
                        itemsSpacing: 0,
                        itemWidth: 94,
                        itemHeight: 18,
                        itemDirection: 'left-to-right',
                        itemTextColor: '#000000',
                        itemOpacity: 0.85,
                        symbolSize: 18,
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemTextColor: '#000000',
                                    itemOpacity: 1
                                }
                            }
                        ]
                    }
                ]} />
        </ChartErrorBoundary>
    );
};
