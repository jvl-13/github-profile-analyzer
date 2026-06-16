import React from "react";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer
} from "recharts";

export default function LineChartComponent({
    commitTrend = []
}) {
    //console.log(commitTrend);

    return (
        
        <div
            className="
                bg-slate-900
                p-6
                rounded-2xl
                h-[350px]
            "
        >

            <h3
                className="
                    mb-4
                    text-xl
                    font-semibold
                "
            >
                Monthly Commit Activity
            </h3>

            <ResponsiveContainer
                width="100%"
                height="90%"
            >

                <LineChart
                    data={commitTrend}
                >

                    <CartesianGrid
                        strokeDasharray="3 3"
                    />

                    <XAxis
                        dataKey="month"
                    />

                    <YAxis />

                    <Tooltip />

                    <Line
                        type="monotone"
                        dataKey="commits"
                        stroke="#3B82F6"
                        strokeWidth={3}
                        animationDuration={1500}
                    />

                </LineChart>

            </ResponsiveContainer>

        </div>
    );
}