import { AlertCircle } from 'lucide-react';
import type { InsightData } from '../types';

const severityStyles = {
    critical: {
        border: 'border-l-danger',
        titleColor: 'text-danger',
        iconColor: 'text-danger',
    },
    warning: {
        border: 'border-l-warning',
        titleColor: 'text-warning',
        iconColor: 'text-warning',
    },
    positive: {
        border: 'border-l-success',
        titleColor: 'text-success',
        iconColor: 'text-success',
    },
};

export function InsightCard({ data }: { data: InsightData }) {
    const styles = severityStyles[data.severity];

    return (
        <div
            className={`rounded-lg border-l-4 bg-white p-4 ${styles.border} transition hover:shadow-sm`}
        >
            <div className="mb-1 flex items-center justify-between">
                <h4 className={`text-sm font-bold ${styles.titleColor}`}>
                    {data.title}
                </h4>
                <AlertCircle className={`h-4 w-4 ${styles.iconColor}`} />
            </div>
            <p className="mb-3 text-xs leading-relaxed text-slate-600">
                {data.description}
            </p>
            <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500">
                    {data.affectedCount} estudantes afetados
                </span>
                <button className="text-xs font-semibold text-slate-700 transition hover:text-primary">
                    Ver detalhes
                </button>
            </div>
        </div>
    );
}
