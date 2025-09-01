import React, { useState, useMemo } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { validateChartData } from './utils/chart-validators';
import { LazyChart } from './chartWrapperComponents';
import { motion } from 'framer-motion';
import { Table, BarChart2 } from 'lucide-react';
import { DashboardTileData, SectionPalette } from './types';

// Component for individual dashboard tiles
const DashboardTile: React.FC<{
  data: DashboardTileData;
  sectionPalette: SectionPalette;
  index: number;
}> = ({ data, sectionPalette, index }) => {
  const theme = useTheme();
  // State to track whether to show chart or table view
  const [viewMode, setViewMode] = useState<'chart' | 'table'>('chart');

  // Validate chart data if present
  const validatedChartData = useMemo(() => {
    if (!data.chart) return null;
    return validateChartData(data.chart.type, data.chart.data);
  }, [data.chart]);

  // Check if tile has no chart (chartType is 'none')
  const hasNoChart = useMemo(() => {
    return !data.chart || data.chart.type === 'none';
  }, [data.chart]);

  // Chart rendering function
  const renderChart = (type: string, chartData: any) => {
    if (type === 'none') return null;

    const commonProps = {
      margin: { top: 15, right: 15, bottom: 30, left: 45 }, // Reduced margins for larger chart area
      colors: sectionPalette.chartColors,
    };

    // Map chart types from dummyData to the correct format for LazyChart
    const chartTypeMap: Record<string, string> = {
      'line': 'line',
      'pie': 'pie',
      'radar': 'radar',
      'scatter-plot': 'scatter-plot',
      'treemap': 'treemap',
      'stream': 'stream',
      'bullet': 'bullet',
      'sunburst': 'sunburst',
      'calendar': 'calendar',
      'chord': 'chord',
      'waffle': 'waffle',
      'parallel-coordinates': 'parallel-coordinates',
      'sankey': 'sankey',
      'voronoi': 'voronoi',
      'radial-bar': 'radial-bar',
      'bump': 'bump',
      'network': 'network',
      'marimekko': 'marimekko',
      'tree': 'tree',
      'box-plot': 'box-plot',
      'heatmap': 'heatmap',
      'funnel': 'funnel',
      'choropleth': 'choropleth',
      'circle-packing': 'circle-packing',
      'bar': 'bar',
      'area-bump': 'area-bump',
      'time-range': 'time-range',
      'swarmplot': 'swarmplot',
      'geo-map': 'geo-map',
    };

    const mappedChartType = chartTypeMap[type] || type;

    const tileData = {
      id: 1,
      title: data.title,
      chartData: chartData,
      tileProps: commonProps,
      keys: [],
      indexBy: '',
      chart: null
    };

    // Pass the current viewMode to LazyChart
    return <LazyChart tile={tileData} chartType={mappedChartType} initialViewMode={viewMode} onViewModeChange={setViewMode} />;
  };

  // Determine gradient based on section and tile index
  const getGradient = () => {
    // Use the section palette gradients
    const { gradient } = sectionPalette;
    
    // Calculate angle based on index - rotates gradient as user scrolls down
    const angle = (45 + (index * 22.5) % 360);
    
    // Create gradient with dynamic angle
    return `linear-gradient(${angle}deg, ${gradient.start}, ${gradient.end})`;
  };
  
  // Get border color from section palette
  const getBorderColor = () => {
    return sectionPalette.border;
  };

  // Get highlight color for positive trends
  const getPositiveColor = () => {
    return '#1a9f47'; // Green that complements any palette
  };

  // Get highlight color for negative trends
  const getNegativeColor = () => {
    return '#e63946'; // Red that complements any palette
  };

  // Get KPI box border color based on section
  const getKpiBorderColor = () => {
    // Create a translucent version of the section accent color
    return `${sectionPalette.accent}30`;
  };

  // Get KPI box background color based on section
  const getKpiBackgroundColor = () => {
    // Create a very light version of the section accent color
    return `${sectionPalette.accent}10`;
  };

  // Toggle button to switch between chart and table views
  const ViewToggleButton = (
    <button
      onClick={() => setViewMode(viewMode === 'chart' ? 'table' : 'chart')}
      className={`flex items-center font-medium text-sm rounded-md px-2.5 py-1 ml-2 transition-colors ${
        viewMode === 'chart' 
          ? 'bg-slate-100 hover:bg-slate-200 text-slate-800' 
          : 'bg-indigo-100 hover:bg-indigo-200 text-indigo-800'
      }`}
      title={viewMode === 'chart' ? "View as table" : "View as chart"}
    >
      {viewMode === 'chart' ? (
        <>
          <Table className="w-4 h-4 mr-1.5" />
          <span>Table</span>
        </>
      ) : (
        <>
          <BarChart2 className="w-4 h-4 mr-1.5" />
          <span>Chart</span>
        </>
      )}
    </button>
  );

  return (
    <Paper
      elevation={1}
      sx={{
        p: 2.5,
        // Reduced height for tiles since KPI metrics row is removed
        height: hasNoChart ? { xs: 'auto', sm: 250 } : { xs: 'auto', sm: 610 },
        minHeight: hasNoChart ? 250 : 610,
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'white',
        background: getGradient(),
        overflow: 'hidden',
        borderRadius: '16px',
        backdropFilter: 'blur(8px)',
        border: `1px solid ${getBorderColor()}`,
        boxShadow: `0 4px 12px ${sectionPalette.main}15`,
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: `0 8px 20px ${sectionPalette.main}25`
        }
      }}
    >
      <div className="flex items-center justify-between mb-1">
        <Typography variant="h6" sx={{
          fontWeight: 'bold',
          color: sectionPalette.dark,
          letterSpacing: '-0.01em',
          fontSize: '1.1rem'
        }}>
          {data.title}
        </Typography>
        {!hasNoChart && data.chart && ViewToggleButton}
      </div>

      {/* Larger chart area - only render if chart type is not 'none' */}
      {!hasNoChart && data.chart && validatedChartData && (
        <Box sx={{
          flexGrow: 1,
          // Slightly increased height since KPI metrics row was removed
          height: { xs: 520, md: 530 },
          minHeight: 480,
          width: '100%',
          mt: 1,
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          borderRadius: '12px',
          border: `1px solid ${getKpiBorderColor()}`,
          '& > div': {
            margin: 'auto',
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            height: '100%'
          }
        }}>
          {renderChart(data.chart.type, validatedChartData.data)}
        </Box>
      )}
    </Paper>
  );
};

export default DashboardTile;