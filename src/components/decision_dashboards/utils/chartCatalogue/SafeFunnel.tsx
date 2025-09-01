import { memo } from "react";
import { Funnel } from "@nivo/funnel";
import { ChartErrorBoundary } from "@/components/decision_dashboards/chartWrapperComponents";

const MemoizedFunnel = memo(Funnel);

export const fallbackData = [
    {
        "id": "step_sent",
        "value": 100000,
        "label": "Sent"
    },
    {
        "id": "step_viewed",
        "value": 75000,
        "label": "Viewed"
    },
    {
        "id": "step_clicked",
        "value": 50000,
        "label": "Clicked"
    },
    {
        "id": "step_add_to_card",
        "value": 25000,
        "label": "Add To Card"
    },
    {
        "id": "step_purchased",
        "value": 15000,
        "label": "Purchased"
    }
]

export const SafeFunnel = ({ data, ...props }: any) => {
    return (
        <ChartErrorBoundary>
            <MemoizedFunnel data={data || fallbackData} {...props}
                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                valueFormat=">-.4s"
                colors={{ scheme: 'spectral' }}
                borderWidth={20}
                labelColor="#000000"
                beforeSeparatorLength={100}
                beforeSeparatorOffset={20}
                afterSeparatorLength={100}
                afterSeparatorOffset={20}
                currentPartSizeExtension={10}
                currentBorderWidth={40}
                motionConfig="wobbly"
            />
        </ChartErrorBoundary>
    );
};

