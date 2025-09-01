import { memo } from "react";
import { Sankey } from "@nivo/sankey";
import { ChartErrorBoundary } from "@/components/decision_dashboards/chartWrapperComponents";

const MemoizedSankey = memo(Sankey);

export const fallbackData = {
    "nodes": [
        {
            "id": "Electronics",
            "nodeColor": "hsl(315, 70%, 50%)"
        },
        {
            "id": "Clothing",
            "nodeColor": "hsl(293, 70%, 50%)"
        },
        {
            "id": "Home & Kitchen",
            "nodeColor": "hsl(86, 70%, 50%)"
        },
        {
            "id": "Books",
            "nodeColor": "hsl(287, 70%, 50%)"
        },
        {
            "id": "Toys",
            "nodeColor": "hsl(242, 70%, 50%)"
        },
        {
            "id": "Groceries",
            "nodeColor": "hsl(274, 70%, 50%)"
        }
    ],
    "links": [
        {
            "source": "Clothing",
            "target": "Toys",
            "value": 87
        },
        {
            "source": "Clothing",
            "target": "Electronics",
            "value": 55
        },
        {
            "source": "Clothing",
            "target": "Home & Kitchen",
            "value": 141
        },
        {
            "source": "Clothing",
            "target": "Books",
            "value": 18
        },
        {
            "source": "Clothing",
            "target": "Groceries",
            "value": 198
        },
        {
            "source": "Toys",
            "target": "Books",
            "value": 164
        },
        {
            "source": "Toys",
            "target": "Groceries",
            "value": 117
        },
        {
            "source": "Toys",
            "target": "Electronics",
            "value": 71
        },
        {
            "source": "Groceries",
            "target": "Home & Kitchen",
            "value": 34
        },
        {
            "source": "Home & Kitchen",
            "target": "Electronics",
            "value": 80
        },
        {
            "source": "Home & Kitchen",
            "target": "Books",
            "value": 62
        }
    ]
}

export const SafeSankey = ({ data, ...props }: any) => {
    return (
        <ChartErrorBoundary>
            <MemoizedSankey data={data || fallbackData} {...props}
                margin={{ top: 40, right: 160, bottom: 40, left: 50 }}
                align="justify"
                colors={{ scheme: 'category10' }}
                nodeOpacity={1}
                nodeHoverOthersOpacity={0.35}
                nodeThickness={18}
                nodeSpacing={24}
                nodeBorderWidth={0}
                nodeBorderColor={{
                    from: 'color',
                    modifiers: [
                        [
                            'darker',
                            0.8
                        ]
                    ]
                }}
                nodeBorderRadius={3}
                linkOpacity={0.5}
                linkHoverOthersOpacity={0.1}
                linkContract={3}
                enableLinkGradient={true}
                labelPosition="outside"
                labelOrientation="vertical"
                labelPadding={16}
                labelTextColor={{
                    from: 'color',
                    modifiers: [
                        [
                            'darker',
                            1
                        ]
                    ]
                }}
                legends={[
                    {
                        anchor: 'bottom-right',
                        direction: 'column',
                        translateX: 130,
                        itemWidth: 100,
                        itemHeight: 14,
                        itemDirection: 'right-to-left',
                        itemsSpacing: 2,
                        itemTextColor: '#000000',
                        symbolSize: 14,
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemTextColor: '#000'
                                }
                            }
                        ]
                    }
                ]} />
        </ChartErrorBoundary>
    );
};
