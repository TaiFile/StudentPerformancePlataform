import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell,
} from 'recharts';
import type { SkillGap } from '../../../shared/types';

export function SkillGapsChart({ data }: { data: SkillGap[] }) {
    return (
        <ResponsiveContainer width="100%" height={280}>
            <BarChart
                data={data}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
            >
                <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#f1f5f9"
                    horizontal={false}
                />
                <XAxis
                    type="number"
                    tick={{ fontSize: 11, fill: '#64748b' }}
                    axisLine={{ stroke: '#e2e8f0' }}
                    domain={[0, 2]}
                />
                <YAxis
                    type="category"
                    dataKey="skill"
                    tick={{ fontSize: 11, fill: '#64748b' }}
                    axisLine={{ stroke: '#e2e8f0' }}
                    width={90}
                />
                <Tooltip
                    contentStyle={{
                        borderRadius: '8px',
                        border: '1px solid #e2e8f0',
                        fontSize: '12px',
                    }}
                    formatter={(value) => [`${Number(value).toFixed(1)}`, 'Gap']}
                />
                <Bar dataKey="gap" radius={[0, 6, 6, 0]} barSize={20}>
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    );
}
