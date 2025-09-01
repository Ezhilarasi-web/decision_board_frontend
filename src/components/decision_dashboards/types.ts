// Types for dashboard data structures
export interface KPIValue {
  id: string;
  name: string;
  value: number;
  trend?: number;
  unit?: string;
}

export interface ChartData {
  type: string;
  data: any;
}

export interface DashboardTileData {
  id: string;
  title: string;
  kpis: KPIValue[];
  chart?: ChartData;
  section: string;
}

export interface DashboardSection {
  id: string;
  title: string;
  tiles: DashboardTileData[];
}

// Interface for section-specific colors
export interface SectionPalette {
  main: string;
  light: string;
  dark: string;
  gradient: {
    start: string;
    end: string;
  };
  accent: string;
  border: string;
  chartColors: string[];
}