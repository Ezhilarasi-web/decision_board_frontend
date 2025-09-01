import * as React from 'react';

// Define proper SVG prop types
type SvgProps = React.SVGProps<SVGSVGElement> & {
  title?: string;
};

const SvgrMock = React.forwardRef<SVGSVGElement, SvgProps>((props, ref) => 
  React.createElement('svg', { ref, 'data-testid': 'svg-mock', ...props })
);

// Add display name for debugging
SvgrMock.displayName = 'SvgrMock';

export const ReactComponent = SvgrMock;
export default SvgrMock;