import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Activity, Users, Eye, MousePointer, Monitor, Globe } from "lucide-react";
import { useState, useEffect } from "react";
import HeatmapViewer from "@/components/HeatmapViewer";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

export default function AnalyticsDashboard() {
  const [dateRange, setDateRange] = useState<{ startDate?: Date; endDate?: Date }>({});

  const { data: summary, isLoading: summaryLoading } = trpc.analytics.getSummary.useQuery(dateRange);
  const { data: topPages, isLoading: pagesLoading } = trpc.analytics.getTopPages.useQuery({ limit: 10, ...dateRange });
  const { data: deviceStats, isLoading: deviceLoading } = trpc.analytics.getDeviceStats.useQuery(dateRange);
  const { data: browserStats, isLoading: browserLoading } = trpc.analytics.getBrowserStats.useQuery(dateRange);
  const { data: recentSessions, isLoading: sessionsLoading } = trpc.analytics.getRecentSessions.useQuery({ limit: 50 });

  const deviceChartData = deviceStats?.map((stat) => ({
    name: stat.device || "Unknown",
    value: Number(stat.count),
  })) || [];

  const browserChartData = browserStats?.map((stat) => ({
    name: stat.browser || "Unknown",
    value: Number(stat.count),
  })) || [];

  const topPagesChartData = topPages?.map((page) => ({
    name: page.path,
    views: Number(page.views),
  })) || [];

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Monitor your website's performance and user behavior</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Sessions</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {summaryLoading ? "..." : summary?.totalSessions.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground mt-1">Unique visitor sessions</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Pageviews</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {summaryLoading ? "..." : summary?.totalPageviews.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground mt-1">Pages viewed by visitors</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Events</CardTitle>
              <MousePointer className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {summaryLoading ? "..." : summary?.totalEvents.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground mt-1">User interactions tracked</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="heatmap">Heatmap</TabsTrigger>
            <TabsTrigger value="devices">Devices & Browsers</TabsTrigger>
            <TabsTrigger value="sessions">Recent Sessions</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Top Pages */}
            <Card>
              <CardHeader>
                <CardTitle>Top Pages</CardTitle>
                <CardDescription>Most visited pages on your website</CardDescription>
              </CardHeader>
              <CardContent>
                {pagesLoading ? (
                  <div className="h-[300px] flex items-center justify-center">Loading...</div>
                ) : (
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={topPagesChartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="views" fill="#0ea5e9" />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="heatmap" className="space-y-6">
            <HeatmapViewer />
          </TabsContent>

          <TabsContent value="devices" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Device Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Monitor className="h-5 w-5" />
                    Device Distribution
                  </CardTitle>
                  <CardDescription>Breakdown of devices used by visitors</CardDescription>
                </CardHeader>
                <CardContent>
                  {deviceLoading ? (
                    <div className="h-[300px] flex items-center justify-center">Loading...</div>
                  ) : (
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={deviceChartData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={(entry) => `${entry.name}: ${entry.value}`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {deviceChartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  )}
                </CardContent>
              </Card>

              {/* Browser Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    Browser Distribution
                  </CardTitle>
                  <CardDescription>Breakdown of browsers used by visitors</CardDescription>
                </CardHeader>
                <CardContent>
                  {browserLoading ? (
                    <div className="h-[300px] flex items-center justify-center">Loading...</div>
                  ) : (
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={browserChartData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={(entry) => `${entry.name}: ${entry.value}`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {browserChartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="sessions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Sessions</CardTitle>
                <CardDescription>Latest visitor sessions on your website</CardDescription>
              </CardHeader>
              <CardContent>
                {sessionsLoading ? (
                  <div className="h-[300px] flex items-center justify-center">Loading...</div>
                ) : (
                  <div className="space-y-4">
                    {recentSessions?.map((session) => (
                      <div
                        key={session.id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium">{session.device || "Unknown"}</span>
                            <span className="text-sm text-muted-foreground">•</span>
                            <span className="text-sm text-muted-foreground">{session.browser || "Unknown"}</span>
                            <span className="text-sm text-muted-foreground">•</span>
                            <span className="text-sm text-muted-foreground">{session.os || "Unknown"}</span>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {session.landingPage || "/"} • {session.city || session.country || "Unknown location"}
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(session.createdAt).toLocaleString()}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

