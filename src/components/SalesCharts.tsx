'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, LineChart, Line, ResponsiveContainer } from 'recharts';
import { TrendingUp, BarChart3, PieChart as PieChartIcon, Activity } from 'lucide-react';

interface MonthlySalesData {
  month: string;
  sales: number;
  target: number;
}

interface RegionSalesData {
  region: string;
  sales: number;
  color: string;
}

interface ProductTrendData {
  month: string;
  productA: number;
  productB: number;
  productC: number;
  productD: number;
}

const mockMonthlySalesData: MonthlySalesData[] = [
  { month: 'Jan', sales: 95000, target: 100000 },
  { month: 'Feb', sales: 108000, target: 105000 },
  { month: 'Mar', sales: 125000, target: 110000 },
  { month: 'Apr', sales: 118000, target: 115000 },
  { month: 'May', sales: 135000, target: 120000 },
  { month: 'Jun', sales: 142000, target: 125000 },
  { month: 'Jul', sales: 138000, target: 130000 },
  { month: 'Aug', sales: 155000, target: 135000 },
  { month: 'Sep', sales: 148000, target: 140000 },
  { month: 'Oct', sales: 162000, target: 145000 },
  { month: 'Nov', sales: 158000, target: 150000 },
  { month: 'Dec', sales: 175000, target: 155000 }
];

const mockRegionSalesData: RegionSalesData[] = [
  { region: 'North America', sales: 450000, color: '#3b82f6' },
  { region: 'Europe', sales: 380000, color: '#10b981' },
  { region: 'Asia Pacific', sales: 280000, color: '#f59e0b' },
  { region: 'Latin America', sales: 90000, color: '#ef4444' },
  { region: 'Middle East & Africa', sales: 50000, color: '#8b5cf6' }
];

const mockProductTrendData: ProductTrendData[] = [
  { month: 'Jan', productA: 35000, productB: 28000, productC: 22000, productD: 15000 },
  { month: 'Feb', productA: 38000, productB: 30000, productC: 24000, productD: 16000 },
  { month: 'Mar', productA: 42000, productB: 35000, productC: 28000, productD: 20000 },
  { month: 'Apr', productA: 40000, productB: 32000, productC: 26000, productD: 18000 },
  { month: 'May', productA: 45000, productB: 38000, productC: 30000, productD: 22000 },
  { month: 'Jun', productA: 48000, productB: 40000, productC: 32000, productD: 22000 },
  { month: 'Jul', productA: 46000, productB: 39000, productC: 31000, productD: 22000 },
  { month: 'Aug', productA: 52000, productB: 43000, productC: 34000, productD: 26000 },
  { month: 'Sep', productA: 50000, productB: 41000, productC: 33000, productD: 24000 },
  { month: 'Oct', productA: 55000, productB: 45000, productC: 36000, productD: 26000 },
  { month: 'Nov', productA: 53000, productB: 44000, productC: 35000, productD: 26000 },
  { month: 'Dec', productA: 58000, productB: 48000, productC: 38000, productD: 31000 }
];

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
        <p className="text-sm font-medium">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {formatCurrency(entry.value)}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const PieTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
        <p className="text-sm font-medium">{data.region}</p>
        <p className="text-sm">{formatCurrency(data.sales)}</p>
        <p className="text-xs text-muted-foreground">
          {((data.sales / mockRegionSalesData.reduce((sum, item) => sum + item.sales, 0)) * 100).toFixed(1)}%
        </p>
      </div>
    );
  }
  return null;
};

export default function SalesCharts() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Monthly Sales vs Target - Bar Chart */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Monthly Sales vs Target</CardTitle>
          <BarChart3 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockMonthlySalesData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis 
                  dataKey="month" 
                  tick={{ fontSize: 12 }}
                  axisLine={{ stroke: 'currentColor', opacity: 0.3 }}
                />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  axisLine={{ stroke: 'currentColor', opacity: 0.3 }}
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar 
                  dataKey="sales" 
                  fill="hsl(var(--primary))" 
                  name="Actual Sales"
                  radius={[2, 2, 0, 0]}
                />
                <Bar 
                  dataKey="target" 
                  fill="hsl(var(--accent))" 
                  name="Target"
                  radius={[2, 2, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Regional Sales Distribution - Pie Chart */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Sales by Region</CardTitle>
          <PieChartIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={mockRegionSalesData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ region, percentage }) => `${region} (${percentage}%)`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="sales"
                >
                  {mockRegionSalesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<PieTooltip />} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Product Sales Trends - Line Chart */}
      <Card className="lg:col-span-2">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Product Sales Trends</CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockProductTrendData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis 
                  dataKey="month" 
                  tick={{ fontSize: 12 }}
                  axisLine={{ stroke: 'currentColor', opacity: 0.3 }}
                />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  axisLine={{ stroke: 'currentColor', opacity: 0.3 }}
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="productA" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  name="Product A"
                  dot={{ r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="productB" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  name="Product B"
                  dot={{ r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="productC" 
                  stroke="#f59e0b" 
                  strokeWidth={2}
                  name="Product C"
                  dot={{ r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="productD" 
                  stroke="#ef4444" 
                  strokeWidth={2}
                  name="Product D"
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
