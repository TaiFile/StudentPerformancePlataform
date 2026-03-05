import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import type { ActivityImpact } from '../../../shared/types';

export function ActivitiesImpactChart({ data }: { data: ActivityImpact[] }) {
    return (
        <ResponsiveContainer width="100%" height={280}>
            <BarChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis
                    dataKey="activity"
                    tick={{ fontSize: 11, fill: '#64748b' }}
                    axisLine={{ stroke: '#e2e8f0' }}
                />
                <YAxis
                    tick={{ fontSize: 11, fill: '#64748b' }}
                    axisLine={{ stroke: '#e2e8f0' }}
                    domain={[0, 100]}
                />
                <Tooltip
                    contentStyle={{
                        borderRadius: '8px',
                        border: '1px solid #e2e8f0',
                        fontSize: '12px',
                    }}
                />
                <Legend
                    wrapperStyle={{ fontSize: '11px' }}
                    formatter={(value) => (
                        <span style={{ color: '#64748b' }}>{value}</span>
                    )}
                />
                <Bar
                    dataKey="placed"
                    name="Placed (%)"
                    fill="#3b82f6"
                    radius={[4, 4, 0, 0]}
                    barSize={24}
                />
                <Bar
                    dataKey="notPlaced"
                    name="Not Placed (%)"
                    fill="#f59e0b"
                    radius={[4, 4, 0, 0]}
                    barSize={24}
                />
            </BarChart>
        </ResponsiveContainer>
    );
}
