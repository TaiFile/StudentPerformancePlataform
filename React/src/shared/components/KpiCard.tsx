import { Users, Briefcase, GraduationCap, AlertTriangle } from 'lucide-react';
import type { KpiData } from '../types';

const iconMap = {
    students: Users,
    placement: Briefcase,
    cgpa: GraduationCap,
    risk: AlertTriangle,
};

export function KpiCard({ data }: { data: KpiData }) {
    const Icon = iconMap[data.icon];

    return (
        <div className="rounded-xl border border-border bg-surface p-5 shadow-sm transition hover:shadow-md">
            <div className="mb-3 flex items-center gap-2 text-text-secondary">
                <Icon className="h-4 w-4" />
                <span className="text-sm font-medium">{data.title}</span>
            </div>

            <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-text-primary">
                    {data.value}
                </span>
                {data.badge && (
                    <span className="rounded-full bg-success/15 px-2.5 py-0.5 text-xs font-semibold text-success">
                        {data.badge}
                    </span>
                )}
            </div>

            {data.progress !== undefined && (
                <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-background">
                    <div
                        className="h-full rounded-full bg-success transition-all duration-500"
                        style={{ width: `${data.progress}%` }}
                    />
                </div>
            )}

            {data.trend && (
                <p className="mt-2 text-xs text-success">↗ {data.trend}</p>
            )}

            {data.subtitle && !data.trend && (
                <p className="mt-2 text-xs text-text-secondary">{data.subtitle}</p>
            )}
        </div>
    );
}
