import { memo } from "react";
import { Sunburst } from "@nivo/sunburst";
import { ChartErrorBoundary } from "@/components/decision_dashboards/chartWrapperComponents";

const MemoizedSunburst = memo(Sunburst);

export const fallbackData = {
    "name": "nivo",
    "color": "hsl(188, 70%, 50%)",
    "children": [
        {
            "name": "viz",
            "color": "hsl(9, 70%, 50%)",
            "children": [
                {
                    "name": "stack",
                    "color": "hsl(78, 70%, 50%)",
                    "children": [
                        {
                            "name": "cchart",
                            "color": "hsl(243, 70%, 50%)",
                            "loc": 197489
                        },
                        {
                            "name": "xAxis",
                            "color": "hsl(322, 70%, 50%)",
                            "loc": 126041
                        },
                        {
                            "name": "yAxis",
                            "color": "hsl(166, 70%, 50%)",
                            "loc": 151414
                        },
                        {
                            "name": "layers",
                            "color": "hsl(355, 70%, 50%)",
                            "loc": 77966
                        }
                    ]
                },
                {
                    "name": "ppie",
                    "color": "hsl(172, 70%, 50%)",
                    "children": [
                        {
                            "name": "chart",
                            "color": "hsl(162, 70%, 50%)",
                            "children": [
                                {
                                    "name": "pie",
                                    "color": "hsl(104, 70%, 50%)",
                                    "children": [
                                        {
                                            "name": "outline",
                                            "color": "hsl(80, 70%, 50%)",
                                            "loc": 161302
                                        },
                                        {
                                            "name": "slices",
                                            "color": "hsl(7, 70%, 50%)",
                                            "loc": 80482
                                        },
                                        {
                                            "name": "bbox",
                                            "color": "hsl(146, 70%, 50%)",
                                            "loc": 8503
                                        }
                                    ]
                                },
                                {
                                    "name": "donut",
                                    "color": "hsl(213, 70%, 50%)",
                                    "loc": 175499
                                },
                                {
                                    "name": "gauge",
                                    "color": "hsl(167, 70%, 50%)",
                                    "loc": 21524
                                }
                            ]
                        },
                        {
                            "name": "legends",
                            "color": "hsl(277, 70%, 50%)",
                            "loc": 90620
                        }
                    ]
                }
            ]
        },
        {
            "name": "colors",
            "color": "hsl(244, 70%, 50%)",
            "children": [
                {
                    "name": "rgb",
                    "color": "hsl(147, 70%, 50%)",
                    "loc": 125788
                },
                {
                    "name": "hsl",
                    "color": "hsl(301, 70%, 50%)",
                    "loc": 157250
                }
            ]
        },
        {
            "name": "utils",
            "color": "hsl(330, 70%, 50%)",
            "children": [
                {
                    "name": "randomize",
                    "color": "hsl(251, 70%, 50%)",
                    "loc": 105830
                },
                {
                    "name": "resetClock",
                    "color": "hsl(47, 70%, 50%)",
                    "loc": 184493
                },
                {
                    "name": "noop",
                    "color": "hsl(328, 70%, 50%)",
                    "loc": 30999
                },
                {
                    "name": "tick",
                    "color": "hsl(195, 70%, 50%)",
                    "loc": 65749
                },
                {
                    "name": "forceGC",
                    "color": "hsl(245, 70%, 50%)",
                    "loc": 173694
                },
                {
                    "name": "stackTrace",
                    "color": "hsl(203, 70%, 50%)",
                    "loc": 190045
                },
                {
                    "name": "dbg",
                    "color": "hsl(110, 70%, 50%)",
                    "loc": 97598
                }
            ]
        },
        {
            "name": "generators",
            "color": "hsl(101, 70%, 50%)",
            "children": [
                {
                    "name": "address",
                    "color": "hsl(230, 70%, 50%)",
                    "loc": 18108
                },
                {
                    "name": "city",
                    "color": "hsl(62, 70%, 50%)",
                    "loc": 71241
                },
                {
                    "name": "animal",
                    "color": "hsl(169, 70%, 50%)",
                    "loc": 2127
                },
                {
                    "name": "movie",
                    "color": "hsl(71, 70%, 50%)",
                    "loc": 117828
                },
                {
                    "name": "user",
                    "color": "hsl(154, 70%, 50%)",
                    "loc": 58754
                }
            ]
        },
        {
            "name": "set",
            "color": "hsl(228, 70%, 50%)",
            "children": [
                {
                    "name": "clone",
                    "color": "hsl(18, 70%, 50%)",
                    "loc": 75886
                },
                {
                    "name": "intersect",
                    "color": "hsl(336, 70%, 50%)",
                    "loc": 53252
                },
                {
                    "name": "merge",
                    "color": "hsl(54, 70%, 50%)",
                    "loc": 81041
                },
                {
                    "name": "reverse",
                    "color": "hsl(327, 70%, 50%)",
                    "loc": 154754
                },
                {
                    "name": "toArray",
                    "color": "hsl(211, 70%, 50%)",
                    "loc": 76962
                },
                {
                    "name": "toObject",
                    "color": "hsl(21, 70%, 50%)",
                    "loc": 93618
                },
                {
                    "name": "fromCSV",
                    "color": "hsl(255, 70%, 50%)",
                    "loc": 143528
                },
                {
                    "name": "slice",
                    "color": "hsl(185, 70%, 50%)",
                    "loc": 89730
                },
                {
                    "name": "append",
                    "color": "hsl(190, 70%, 50%)",
                    "loc": 182657
                },
                {
                    "name": "prepend",
                    "color": "hsl(219, 70%, 50%)",
                    "loc": 53937
                },
                {
                    "name": "shuffle",
                    "color": "hsl(294, 70%, 50%)",
                    "loc": 85999
                },
                {
                    "name": "pick",
                    "color": "hsl(157, 70%, 50%)",
                    "loc": 105612
                },
                {
                    "name": "plouc",
                    "color": "hsl(76, 70%, 50%)",
                    "loc": 146231
                }
            ]
        },
        {
            "name": "text",
            "color": "hsl(181, 70%, 50%)",
            "children": [
                {
                    "name": "trim",
                    "color": "hsl(91, 70%, 50%)",
                    "loc": 167272
                },
                {
                    "name": "slugify",
                    "color": "hsl(60, 70%, 50%)",
                    "loc": 58134
                },
                {
                    "name": "snakeCase",
                    "color": "hsl(187, 70%, 50%)",
                    "loc": 182767
                },
                {
                    "name": "camelCase",
                    "color": "hsl(309, 70%, 50%)",
                    "loc": 164960
                },
                {
                    "name": "repeat",
                    "color": "hsl(34, 70%, 50%)",
                    "loc": 67664
                },
                {
                    "name": "padLeft",
                    "color": "hsl(235, 70%, 50%)",
                    "loc": 50379
                },
                {
                    "name": "padRight",
                    "color": "hsl(95, 70%, 50%)",
                    "loc": 91354
                },
                {
                    "name": "sanitize",
                    "color": "hsl(123, 70%, 50%)",
                    "loc": 90038
                },
                {
                    "name": "ploucify",
                    "color": "hsl(274, 70%, 50%)",
                    "loc": 58331
                }
            ]
        },
        {
            "name": "misc",
            "color": "hsl(190, 70%, 50%)",
            "children": [
                {
                    "name": "greetings",
                    "color": "hsl(224, 70%, 50%)",
                    "children": [
                        {
                            "name": "hey",
                            "color": "hsl(330, 70%, 50%)",
                            "loc": 105235
                        },
                        {
                            "name": "HOWDY",
                            "color": "hsl(349, 70%, 50%)",
                            "loc": 120423
                        },
                        {
                            "name": "aloha",
                            "color": "hsl(78, 70%, 50%)",
                            "loc": 84682
                        },
                        {
                            "name": "AHOY",
                            "color": "hsl(123, 70%, 50%)",
                            "loc": 42983
                        }
                    ]
                },
                {
                    "name": "other",
                    "color": "hsl(32, 70%, 50%)",
                    "loc": 52046
                },
                {
                    "name": "path",
                    "color": "hsl(145, 70%, 50%)",
                    "children": [
                        {
                            "name": "pathA",
                            "color": "hsl(244, 70%, 50%)",
                            "loc": 66690
                        },
                        {
                            "name": "pathB",
                            "color": "hsl(204, 70%, 50%)",
                            "children": [
                                {
                                    "name": "pathB1",
                                    "color": "hsl(110, 70%, 50%)",
                                    "loc": 32281
                                },
                                {
                                    "name": "pathB2",
                                    "color": "hsl(150, 70%, 50%)",
                                    "loc": 93398
                                },
                                {
                                    "name": "pathB3",
                                    "color": "hsl(199, 70%, 50%)",
                                    "loc": 127821
                                },
                                {
                                    "name": "pathB4",
                                    "color": "hsl(260, 70%, 50%)",
                                    "loc": 47093
                                }
                            ]
                        },
                        {
                            "name": "pathC",
                            "color": "hsl(36, 70%, 50%)",
                            "children": [
                                {
                                    "name": "pathC1",
                                    "color": "hsl(66, 70%, 50%)",
                                    "loc": 171091
                                },
                                {
                                    "name": "pathC2",
                                    "color": "hsl(299, 70%, 50%)",
                                    "loc": 62330
                                },
                                {
                                    "name": "pathC3",
                                    "color": "hsl(166, 70%, 50%)",
                                    "loc": 132836
                                },
                                {
                                    "name": "pathC4",
                                    "color": "hsl(213, 70%, 50%)",
                                    "loc": 37477
                                },
                                {
                                    "name": "pathC5",
                                    "color": "hsl(96, 70%, 50%)",
                                    "loc": 108181
                                },
                                {
                                    "name": "pathC6",
                                    "color": "hsl(100, 70%, 50%)",
                                    "loc": 143018
                                },
                                {
                                    "name": "pathC7",
                                    "color": "hsl(47, 70%, 50%)",
                                    "loc": 189750
                                },
                                {
                                    "name": "pathC8",
                                    "color": "hsl(220, 70%, 50%)",
                                    "loc": 182044
                                },
                                {
                                    "name": "pathC9",
                                    "color": "hsl(57, 70%, 50%)",
                                    "loc": 169129
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
}

export const SafeSunburst = ({ data, ...props }: any) => {
    return (
        <ChartErrorBoundary>
            <MemoizedSunburst data={data || fallbackData} {...props}
                margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
                id="name"
                value="loc"
                cornerRadius={2}
                borderColor={{ theme: 'background' }}
                colors={{ scheme: 'nivo' }}
                childColor={{
                    from: 'color',
                    modifiers: [
                        [
                            'brighter',
                            0.1
                        ]
                    ]
                }}
                enableArcLabels={true}
                arcLabelsSkipAngle={10}
                arcLabelsTextColor="#000000" />
        </ChartErrorBoundary>
    );
};
