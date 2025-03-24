import type { WeatherData } from "@/api/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { format } from "date-fns";
import { Sunrise, Sunset, Compass, Gauge } from "lucide-react";
interface WeatherDetailsProps {
    data: WeatherData;
}

const WeatherDetails = ({ data }: WeatherDetailsProps) => {
    const { wind, main, sys } = data;

    const formatTime = (timestamp: number) => {
        return format(new Date(timestamp * 1000), "h:mm a");
    }

    const getWindDirection = (degree: number) => {
        const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
        return directions[Math.round(((degree %= 360) < 0 ? degree + 360 : degree) / 45) % 8];
    }

    const details = [
        {
            title: "Wind Direction",
            value: `${getWindDirection(wind.deg)} (${wind.speed}°)`,
            icon: Compass,
            color: "text-green-500",
        },
        {
            title: "Pressure",
            value: `${main.pressure} hPa`,
            icon: Gauge,
            color: "text-purple-500",
        },
        {
            title: "Sunrise",
            value: formatTime(sys.sunrise),
            icon: Sunrise,
            color: "text-orange-500",
        },
        {
            title: "Sunset",
            value: formatTime(sys.sunset),
            icon: Sunset,
            color: "text-blue-500",
        }
    ]

    return (
        <Card>
            <CardHeader>
                <CardTitle>Weather Details</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid gap-6 sm:grid-cols-2 ">
                    {details.map((detail) => (
                        <div key={detail.title} className="flex items-center gap-3 rounded-lg border p-4">
                            <detail.icon className={`w-5 h-5 ${detail.color}`} />
                            <div>
                                <p className="text-sm font-medium leading-none">{detail.title}</p>
                                <p className="text-sm text-muted-foreground">{detail.value}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

export default WeatherDetails;
