import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    ResponsiveContainer,
    Tooltip,
} from 'recharts';
import type { SkillScore } from '../../../shared/types';

export function SkillsRadarChart({ data }: { data: SkillScore[] }) {
    return (
        <ResponsiveContainer width="100%" height={280}>
            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis
                    dataKey="skill"
                    tick={{ fontSize: 11, fill: '#64748b' }}
                />
                <PolarRadiusAxis
                    angle={30}
                    domain={[0, 100]}
                    tick={{ fontSize: 10, fill: '#94a3b8' }}
                />
                <Tooltip
                    contentStyle={{
                        borderRadius: '8px',
                        border: '1px solid #e2e8f0',
                        fontSize: '12px',
                    }}
                />
                <Radar
                    name="Média"
                    dataKey="value"
                    stroke="#6C3FF5"
                    fill="#6C3FF5"
                    fillOpacity={0.2}
                    strokeWidth={2}
                />
            </RadarChart>
        </ResponsiveContainer>
    );
}
