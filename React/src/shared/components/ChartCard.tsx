import { Download } from 'lucide-react';
import type { ReactNode } from 'react';

interface ChartCardProps {
    title: string;
    subtitle: string;
    children: ReactNode;
    showDownload?: boolean;
}

export function ChartCard({
    title,
    subtitle,
    children,
    showDownload = true,
}: ChartCardProps) {
    return (
        <div className="flex flex-col rounded-xl border border-border bg-surface p-5 shadow-sm">
            <div className="mb-4 flex items-start justify-between">
                <div>
                    <h3 className="text-base font-bold text-text-primary">{title}</h3>
                    <p className="text-sm text-text-secondary">{subtitle}</p>
                </div>
                {showDownload && (
                    <button className="rounded-lg p-2 text-text-secondary transition hover:bg-background hover:text-text-primary">
                        <Download className="h-4 w-4" />
                    </button>
                )}
            </div>
            <div className="min-h-0 flex-1">{children}</div>
        </div>
    );
}
