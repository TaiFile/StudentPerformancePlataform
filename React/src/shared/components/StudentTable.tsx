import type { StudentRow } from '../types';

export function StudentTable({ students }: { students: StudentRow[] }) {
    return (
        <div className="overflow-x-auto rounded-xl border border-border bg-surface shadow-sm">
            <div className="border-b border-border px-5 py-4">
                <h3 className="text-base font-bold text-text-primary">
                    Lista de Estudantes
                </h3>
                <p className="text-sm text-text-secondary">
                    Dados detalhados dos alunos com indicadores de risco
                </p>
            </div>
            <table className="w-full text-left text-sm">
                <thead>
                    <tr className="border-b border-border bg-background/60">
                        <th className="px-5 py-3 font-semibold text-text-secondary">ID</th>
                        <th className="px-5 py-3 font-semibold text-text-secondary">
                            Branch
                        </th>
                        <th className="px-5 py-3 font-semibold text-text-secondary">
                            CGPA
                        </th>
                        <th className="px-5 py-3 font-semibold text-text-secondary">
                            Backlogs
                        </th>
                        <th className="px-5 py-3 font-semibold text-text-secondary">
                            Risco (%)
                        </th>
                        <th className="px-5 py-3 font-semibold text-text-secondary">
                            Status
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((s) => (
                        <tr
                            key={s.id}
                            className="border-b border-border transition hover:bg-background/40"
                        >
                            <td className="px-5 py-3 font-medium text-text-primary">
                                {s.id}
                            </td>
                            <td className="px-5 py-3 text-text-secondary">{s.branch}</td>
                            <td className="px-5 py-3 font-medium text-text-primary">
                                {s.cgpa.toFixed(2)}
                            </td>
                            <td className="px-5 py-3 text-text-secondary">{s.backlogs}</td>
                            <td className="px-5 py-3">
                                <div className="flex items-center gap-2">
                                    <div className="h-2 w-20 overflow-hidden rounded-full bg-slate-100">
                                        <div
                                            className={`h-full rounded-full transition-all ${getRiskColor(s.risk)}`}
                                            style={{ width: `${s.risk}%` }}
                                        />
                                    </div>
                                    <span className="text-xs font-medium text-text-secondary">
                                        {s.risk}%
                                    </span>
                                </div>
                            </td>
                            <td className="px-5 py-3">
                                <StatusBadge status={s.status} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function StatusBadge({ status }: { status: 'Placed' | 'Not Placed' }) {
    const isPlaced = status === 'Placed';
    return (
        <span
            className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${isPlaced
                    ? 'bg-success/15 text-success'
                    : 'bg-danger/15 text-danger'
                }`}
        >
            {status}
        </span>
    );
}

function getRiskColor(risk: number): string {
    if (risk >= 70) return 'bg-danger';
    if (risk >= 40) return 'bg-warning';
    return 'bg-success';
}
