import type { ForecastData } from "@/api/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
import { ResponsiveContainer } from "recharts";
import { format } from "date-fns";

interface HourlyTemperatureProps {
    data: ForecastData;
}

const HourlyTemperature = ({ data }: HourlyTemperatureProps) => {

    const chartData = data.list.slice(0, 8).map((item) => ({
        time: format(new Date(item.dt), "ha"),
        temp: Math.round(item.main.temp),
        feels_like: Math.round(item.main.feels_like),
    }))

    return (
        <Card className="flex-1">
            <CardHeader>
                <CardTitle>Hourly Temperature</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[200px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartData}>
                            <XAxis dataKey="time"
                                stroke="#888888"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                            />
                            <YAxis
                                stroke="#888888"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(value) => `${value}°`}
                            />
                            <Tooltip
                                content={({ active, payload }) => {
                                    if (active && payload && payload.length) {
                                        return (
                                            <div className="rounded-lg border bg-background shadow-md p-2">
                                                <div className="grid grid-cols-2 gap-2">
                                                    <div className="flex flex-col">
                                                        <span>Temperature</span>
                                                        <span>{payload[0].value}°C</span>
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span>Feels like</span>
                                                        <span>{payload[1].value}°C</span>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    }
                                }}
                            />
                            <Line
                                type="monotone"
                                dataKey="temp"
                                stroke="#2563eb"
                                strokeWidth={2}
                                dot={false}
                            />
                            <Line
                                type="monotone"
                                dataKey="feels_like"
                                stroke="#64748b"
                                strokeWidth={2}
                                dot={false}
                                strokeDasharray="5 5"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
};

export default HourlyTemperature;
