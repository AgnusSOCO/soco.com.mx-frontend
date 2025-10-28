import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, AreaChart, Area } from "recharts";
import { Activity, Users, Eye, MousePointer, Monitor, Globe, UserCheck, Clock, TrendingUp, Target } from "lucide-react";
import { useState } from "react";
import HeatmapViewer from "@/components/HeatmapViewer";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#FF6B9D", "#C084FC"];

export default function AnalyticsDashboardEnhanced() {
  const [dateRange, setDateRange] = useState<{ startDate?: Date; endDate?: Date }>({});

  const { data: summary, isLoading: summaryLoading } = trpc.analytics.getSummary.useQuery(dateRange);
  const { data: topPages, isLoading: pagesLoading } = trpc.analytics.getTopPages.useQuery({ limit: 10, ...dateRange });
  const { data: deviceStats, isLoading: deviceLoading } = trpc.analytics.getDeviceStats.useQuery(dateRange);
  const { data: browserStats, isLoading: browserLoading } = trpc.analytics.getBrowserStats.useQuery(dateRange);
  const { data: recentSessions, isLoading: sessionsLoading } = trpc.analytics.getRecentSessions.useQuery({ limit: 50 });

  // New queries for enhanced tracking
  const { data: returningVisitors } = trpc.analytics.getReturningVisitorStats.useQuery(dateRange);
  const { data: utmPerformance } = trpc.analytics.getUTMPerformance.useQuery(dateRange);
  const { data: timeOnPageStats } = trpc.analytics.getTimeOnPageStats.useQuery(dateRange);
  const { data: engagementMilestones } = trpc.analytics.getEngagementMilestones.useQuery(dateRange);

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

  // Returning vs New Visitors
  const visitorTypeData = returningVisitors ? [
    { name: "New Visitors", value: Number(returningVisitors.newVisitors), fill: "#0ea5e9" },
    { name: "Returning Visitors", value: Number(returningVisitors.returningVisitors), fill: "#10b981" },
  ] : [];

  // UTM Campaign Performance
  const utmChartData = utmPerformance?.map((utm: any) => ({
    campaign: utm.campaign || "Direct",
    sessions: Number(utm.sessions),
    source: utm.source || "N/A",
  })) || [];

  // Time on Page Distribution
  const timeDistributionData = timeOnPageStats?.map((stat: any) => ({
    range: stat.timeRange,
    count: Number(stat.count),
  })) || [];

  // Engagement Milestones
  const milestoneData = engagementMilestones?.map((m: any) => ({
    milestone: `${m.milestone}s`,
    users: Number(m.userCount),
  })) || [];

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Comprehensive insights into your website's performance and user behavior</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
              <CardTitle className="text-sm font-medium">Returning Visitors</CardTitle>
              <UserCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {returningVisitors ? returningVisitors.returningVisitors.toLocaleString() : "..."}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {returningVisitors && `${Math.round((Number(returningVisitors.returningVisitors) / (Number(returningVisitors.newVisitors) + Number(returningVisitors.returningVisitors))) * 100)}% return rate`}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Time on Page</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {timeOnPageStats && timeOnPageStats.length > 0 ? `${Math.round(timeOnPageStats.reduce((acc: number, stat: any) => acc + Number(stat.count), 0) / timeOnPageStats.length)}s` : "..."}
              </div>
              <p className="text-xs text-muted-foreground mt-1">Average engagement time</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="engagement">Engagement</TabsTrigger>
            <TabsTrigger value="utm">UTM Campaigns</TabsTrigger>
            <TabsTrigger value="heatmap">Heatmap</TabsTrigger>
            <TabsTrigger value="devices">Devices</TabsTrigger>
            <TabsTrigger value="sessions">Sessions</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Top Pages */}
              <Card>
                <CardHeader>
                  <CardTitle>Top Pages</CardTitle>
                  <CardDescription>Most visited pages on your website</CardDescription>
                </CardHeader>
                <CardContent>
                  {pagesLoading ? (
                    <div className="h-64 flex items-center justify-center">Loading...</div>
                  ) : (
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={topPagesChartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="views" fill="#0ea5e9" />
                      </BarChart>
                    </ResponsiveContainer>
                  )}
                </CardContent>
              </Card>

              {/* Visitor Type Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>Visitor Types</CardTitle>
                  <CardDescription>New vs Returning visitors</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={visitorTypeData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={100}
                        dataKey="value"
                      >
                        {visitorTypeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Engagement Tab */}
          <TabsContent value="engagement" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Time on Page Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>Time on Page Distribution</CardTitle>
                  <CardDescription>How long users spend on pages</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={timeDistributionData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="range" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="count" fill="#8b5cf6" name="Sessions" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Engagement Milestones */}
              <Card>
                <CardHeader>
                  <CardTitle>Engagement Milestones</CardTitle>
                  <CardDescription>Users reaching time thresholds</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={milestoneData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="milestone" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="users" stroke="#10b981" strokeWidth={2} name="Users" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* UTM Campaigns Tab */}
          <TabsContent value="utm" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>UTM Campaign Performance</CardTitle>
                <CardDescription>Traffic and conversions by campaign source</CardDescription>
              </CardHeader>
              <CardContent>
                {utmChartData.length === 0 ? (
                  <div className="h-64 flex items-center justify-center text-muted-foreground">
                    No UTM campaign data available yet
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={utmChartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="campaign" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="sessions" fill="#f59e0b" name="Sessions" />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </CardContent>
            </Card>

            {/* UTM Details Table */}
            {utmPerformance && utmPerformance.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Campaign Details</CardTitle>
                  <CardDescription>Detailed breakdown of UTM parameters</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">Campaign</th>
                          <th className="text-left p-2">Source</th>
                          <th className="text-left p-2">Medium</th>
                          <th className="text-right p-2">Sessions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {utmPerformance.map((utm: any, index: number) => (
                          <tr key={index} className="border-b">
                            <td className="p-2">{utm.campaign || "N/A"}</td>
                            <td className="p-2">{utm.source || "N/A"}</td>
                            <td className="p-2">{utm.medium || "N/A"}</td>
                            <td className="text-right p-2">{utm.sessions}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Heatmap Tab */}
          <TabsContent value="heatmap" className="space-y-6">
            <HeatmapViewer />
          </TabsContent>

          {/* Devices Tab */}
          <TabsContent value="devices" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Device Distribution</CardTitle>
                  <CardDescription>Traffic by device type</CardDescription>
                </CardHeader>
                <CardContent>
                  {deviceLoading ? (
                    <div className="h-64 flex items-center justify-center">Loading...</div>
                  ) : (
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={deviceChartData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={100}
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

              <Card>
                <CardHeader>
                  <CardTitle>Browser Distribution</CardTitle>
                  <CardDescription>Traffic by browser</CardDescription>
                </CardHeader>
                <CardContent>
                  {browserLoading ? (
                    <div className="h-64 flex items-center justify-center">Loading...</div>
                  ) : (
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={browserChartData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={100}
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

          {/* Sessions Tab */}
          <TabsContent value="sessions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Sessions</CardTitle>
                <CardDescription>Latest visitor sessions</CardDescription>
              </CardHeader>
              <CardContent>
                {sessionsLoading ? (
                  <div className="h-64 flex items-center justify-center">Loading...</div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">Time</th>
                          <th className="text-left p-2">Device</th>
                          <th className="text-left p-2">Browser</th>
                          <th className="text-left p-2">Landing Page</th>
                          <th className="text-left p-2">Referrer</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentSessions?.map((session) => (
                          <tr key={session.id} className="border-b">
                            <td className="p-2">{new Date(session.createdAt).toLocaleString()}</td>
                            <td className="p-2">{session.device || "Unknown"}</td>
                            <td className="p-2">{session.browser || "Unknown"}</td>
                            <td className="p-2">{session.landingPage || "/"}</td>
                            <td className="p-2 text-xs text-muted-foreground truncate max-w-xs">
                              {session.referrer || "Direct"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
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

