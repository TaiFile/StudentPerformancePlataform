import { BrainCircuit, Code } from 'lucide-react';
import { InsightCard } from '../../../shared/components/InsightCard';
import type { InsightData } from '../../../shared/types';

export function AiInsightsSidebar({ insights }: { insights: InsightData[] }) {
    return (
        <aside className="flex flex-col rounded-xl bg-gradient-to-b from-primary to-primary-dark p-5 text-white shadow-lg">
            {/* Header */}
            <div className="mb-5 flex items-center gap-2">
                <BrainCircuit className="h-5 w-5" />
                <div>
                    <h3 className="text-base font-bold">Insights da IA</h3>
                    <p className="text-xs text-white/70">
                        Análises preditivas e recomendações
                    </p>
                </div>
            </div>

            {/* Insight cards */}
            <div className="flex flex-col gap-3">
                {insights.map((insight) => (
                    <InsightCard key={insight.id} data={insight} />
                ))}
            </div>

            {/* Priority Actions */}
            <div className="mt-5 rounded-lg bg-white/10 p-4 backdrop-blur-sm">
                <div className="mb-3 flex items-center gap-2">
                    <Code className="h-4 w-4" />
                    <h4 className="text-sm font-bold">Ações Prioritárias</h4>
                </div>
                <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-xs text-white/80">
                        <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-blue-400 text-[10px] font-bold text-white">
                            i
                        </span>
                        Workshop de System Design para 18 estudantes
                    </li>
                    <li className="flex items-start gap-2 text-xs text-white/80">
                        <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-blue-400 text-[10px] font-bold text-white">
                            i
                        </span>
                        Programa de recuperação acadêmica para alunos com 3+ backlogs
                    </li>
                    <li className="flex items-start gap-2 text-xs text-white/80">
                        <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-blue-400 text-[10px] font-bold text-white">
                            i
                        </span>
                        Curso complementar de ML Knowledge
                    </li>
                </ul>
            </div>
        </aside>
    );
}
