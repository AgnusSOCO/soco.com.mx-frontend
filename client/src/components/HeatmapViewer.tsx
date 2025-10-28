import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect, useRef } from "react";
import { Flame } from "lucide-react";

interface HeatmapPoint {
  x: number;
  y: number;
  intensity: number;
}

export default function HeatmapViewer() {
  const [selectedPath, setSelectedPath] = useState<string>("/");
  const [selectedEventType, setSelectedEventType] = useState<string>("click");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { data: topPages } = trpc.analytics.getTopPages.useQuery({ limit: 20 });
  const { data: heatmapData } = trpc.analytics.getHeatmapData.useQuery({
    path: selectedPath,
    eventType: selectedEventType,
  });

  useEffect(() => {
    if (!heatmapData || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    canvas.width = 1200;
    canvas.height = 2400;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background
    ctx.fillStyle = "#1a1a1a";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Group points by proximity to create intensity map
    const points: HeatmapPoint[] = [];
    const gridSize = 50;
    const grid: Map<string, number> = new Map();

    heatmapData.forEach((point) => {
      if (point.x === null || point.y === null) return;
      const gridX = Math.floor(point.x / gridSize);
      const gridY = Math.floor(point.y / gridSize);
      const key = `${gridX},${gridY}`;
      grid.set(key, (grid.get(key) || 0) + 1);
    });

    // Convert grid to points with intensity
    const maxIntensity = Math.max(...Array.from(grid.values()));
    grid.forEach((count, key) => {
      const [gridX, gridY] = key.split(",").map(Number);
      points.push({
        x: gridX * gridSize + gridSize / 2,
        y: gridY * gridSize + gridSize / 2,
        intensity: count / maxIntensity,
      });
    });

    // Draw heatmap
    points.forEach((point) => {
      const radius = 40;
      const gradient = ctx.createRadialGradient(point.x, point.y, 0, point.x, point.y, radius);

      // Color based on intensity (blue -> cyan -> yellow -> red)
      if (point.intensity < 0.25) {
        gradient.addColorStop(0, `rgba(0, 100, 255, ${point.intensity * 2})`);
        gradient.addColorStop(1, "rgba(0, 100, 255, 0)");
      } else if (point.intensity < 0.5) {
        gradient.addColorStop(0, `rgba(0, 200, 255, ${point.intensity * 2})`);
        gradient.addColorStop(1, "rgba(0, 200, 255, 0)");
      } else if (point.intensity < 0.75) {
        gradient.addColorStop(0, `rgba(255, 200, 0, ${point.intensity})`);
        gradient.addColorStop(1, "rgba(255, 200, 0, 0)");
      } else {
        gradient.addColorStop(0, `rgba(255, 50, 0, ${point.intensity})`);
        gradient.addColorStop(1, "rgba(255, 50, 0, 0)");
      }

      ctx.fillStyle = gradient;
      ctx.fillRect(point.x - radius, point.y - radius, radius * 2, radius * 2);
    });

    // Draw grid overlay
    ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
    ctx.lineWidth = 1;
    for (let x = 0; x < canvas.width; x += 100) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += 100) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }
  }, [heatmapData]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Flame className="h-5 w-5 text-orange-500" />
          Heatmap Visualization
        </CardTitle>
        <CardDescription>
          Visual representation of user interactions on your pages
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="text-sm font-medium mb-2 block">Page</label>
            <Select value={selectedPath} onValueChange={setSelectedPath}>
              <SelectTrigger>
                <SelectValue placeholder="Select a page" />
              </SelectTrigger>
              <SelectContent>
                {topPages?.map((page) => (
                  <SelectItem key={page.path} value={page.path}>
                    {page.path} ({page.views} views)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex-1">
            <label className="text-sm font-medium mb-2 block">Event Type</label>
            <Select value={selectedEventType} onValueChange={setSelectedEventType}>
              <SelectTrigger>
                <SelectValue placeholder="Select event type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="click">Clicks</SelectItem>
                <SelectItem value="move">Mouse Movements</SelectItem>
                <SelectItem value="scroll">Scrolls</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="border rounded-lg overflow-hidden bg-muted">
          <div className="relative">
            <canvas
              ref={canvasRef}
              className="w-full h-auto"
              style={{ maxHeight: "600px", objectFit: "contain" }}
            />
            {(!heatmapData || heatmapData.length === 0) && (
              <div className="absolute inset-0 flex items-center justify-center bg-background/80">
                <p className="text-muted-foreground">
                  No heatmap data available for this page and event type
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-blue-500" />
              <span className="text-muted-foreground">Low</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-cyan-500" />
              <span className="text-muted-foreground">Medium</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-yellow-500" />
              <span className="text-muted-foreground">High</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-red-500" />
              <span className="text-muted-foreground">Very High</span>
            </div>
          </div>
          <span className="text-muted-foreground">
            {heatmapData?.length || 0} data points
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

