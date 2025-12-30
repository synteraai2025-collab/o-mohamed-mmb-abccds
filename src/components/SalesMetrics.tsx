'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, MapPin, Package, DollarSign } from 'lucide-react';

interface SalesData {
  totalSales: number;
  salesByRegion: {
    region: string;
    sales: number;
    percentage: number;
  }[];
  salesByProduct: {
    product: string;
    sales: number;
    percentage: number;
  }[];
}

const mockSalesData: SalesData = {
  totalSales: 1250000,
  salesByRegion: [
    { region: 'North America', sales: 450000, percentage: 36 },
    { region: 'Europe', sales: 380000, percentage: 30.4 },
    { region: 'Asia Pacific', sales: 280000, percentage: 22.4 },
    { region: 'Latin America', sales: 90000, percentage: 7.2 },
    { region: 'Middle East & Africa', sales: 50000, percentage: 4 }
  ],
  salesByProduct: [
    { product: 'Product A', sales: 420000, percentage: 33.6 },
    { product: 'Product B', sales: 350000, percentage: 28 },
    { product: 'Product C', sales: 280000, percentage: 22.4 },
    { product: 'Product D', sales: 200000, percentage: 16 }
  ]
};

export default function SalesMetrics() {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {/* Total Sales Card */}
      <Card className="col-span-full lg:col-span-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(mockSalesData.totalSales)}</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-green-600 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              +12.5% from last month
            </span>
          </p>
        </CardContent>
      </Card>

      {/* Sales by Region Card */}
      <Card className="col-span-full md:col-span-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Sales by Region</CardTitle>
          <MapPin className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockSalesData.salesByRegion.map((region) => (
              <div key={region.region} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span className="text-sm font-medium">{region.region}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold">{formatCurrency(region.sales)}</div>
                  <div className="text-xs text-muted-foreground">{region.percentage}%</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Sales by Product Card */}
      <Card className="col-span-full md:col-span-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Sales by Product</CardTitle>
          <Package className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockSalesData.salesByProduct.map((product) => (
              <div key={product.product} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-accent"></div>
                  <span className="text-sm font-medium">{product.product}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold">{formatCurrency(product.sales)}</div>
                  <div className="text-xs text-muted-foreground">{product.percentage}%</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
