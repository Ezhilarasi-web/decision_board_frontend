import { memo } from "react";
import { GeoMap } from "@nivo/geo";
import { ChartErrorBoundary } from "@/components/decision_dashboards/chartWrapperComponents";

const MemoizedGeoMap = memo(GeoMap);

export const SafeGeoMap = ({ data, ...props }: any) => {
    return (
        <ChartErrorBoundary>
            <MemoizedGeoMap {...props}
                features="/* please have a look at the description for usage */"
                margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                projectionTranslation={[0.5, 0.5]}
                projectionRotation={[0, 0, 0]}
                fillColor="#eeeeee"
                borderWidth={0.5}
                borderColor="#333333"
                enableGraticule={true}
                graticuleLineColor="#666666"
            />
        </ChartErrorBoundary>
    );
};

