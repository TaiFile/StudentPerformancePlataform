import { Header } from '../../shared/components/Header';
import { KpiCard } from '../../shared/components/KpiCard';
import { ChartCard } from '../../shared/components/ChartCard';
import { StudentTable } from '../../shared/components/StudentTable';
import { SkillsRadarChart } from './components/SkillsRadarChart';
import { CgpaDistributionChart } from './components/CgpaDistributionChart';
import { BacklogsImpactChart } from './components/BacklogsImpactChart';
import { ActivitiesImpactChart } from './components/ActivitiesImpactChart';
import { SkillGapsChart } from './components/SkillGapsChart';
import { AiInsightsSidebar } from './components/AiInsightsSidebar';
import {
    kpiData,
    skillScores,
    cgpaDistribution,
    backlogImpact,
    activityImpact,
    skillGaps,
    insights,
    students,
} from './data/mockData';
import { Filter } from 'lucide-react';

export function DashboardPage() {
    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="mx-auto max-w-[1600px] px-4 py-6 md:px-6">
                {/* KPI Cards */}
                <section className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {kpiData.map((kpi) => (
                        <KpiCard key={kpi.title} data={kpi} />
                    ))}
                </section>

                {/* Main content: Charts + AI Sidebar */}
                <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_340px]">
                    {/* Charts area */}
                    <div className="flex flex-col gap-6">
                        {/* Row 1: Radar + CGPA Distribution */}
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                            <ChartCard
                                title="Competências Médias da Turma"
                                subtitle="Análise radar de skills técnicas"
                            >
                                <SkillsRadarChart data={skillScores} />
                            </ChartCard>

                            <ChartCard
                                title="Distribuição de CGPA"
                                subtitle="Quantidade de estudantes por faixa"
                            >
                                <CgpaDistributionChart data={cgpaDistribution} />
                            </ChartCard>
                        </div>

                        {/* Row 2: Backlogs + Activities Impact */}
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                            <ChartCard
                                title="Impacto de Backlogs no Placement"
                                subtitle="Relação entre dependências e colocação"
                            >
                                <BacklogsImpactChart data={backlogImpact} />
                            </ChartCard>

                            <ChartCard
                                title="Impacto de Atividades no Placement"
                                subtitle="Correlação entre experiências e colocação"
                            >
                                <ActivitiesImpactChart data={activityImpact} />
                            </ChartCard>
                        </div>

                        {/* Row 3: Skill Gaps */}
                        <ChartCard
                            title="Gargalos de Skills — Áreas Críticas"
                            subtitle="Skills com menor performance média e maior número de estudantes com dificuldade"
                        >
                            <div className="flex items-center justify-end pb-2">
                                <button className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-text-secondary transition hover:bg-background">
                                    <Filter className="h-3 w-3" />
                                    Filtrar
                                </button>
                            </div>
                            <SkillGapsChart data={skillGaps} />
                        </ChartCard>

                        {/* Student Table */}
                        <StudentTable students={students} />
                    </div>

                    {/* AI Insights Sidebar */}
                    <div className="xl:sticky xl:top-20 xl:h-fit">
                        <AiInsightsSidebar insights={insights} />
                    </div>
                </div>
            </main>
        </div>
    );
}
