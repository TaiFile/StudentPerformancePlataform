import type {
    KpiData,
    SkillScore,
    CgpaRange,
    BacklogImpact,
    ActivityImpact,
    SkillGap,
    InsightData,
    StudentRow,
} from '../../../shared/types';

export const kpiData: KpiData[] = [
    {
        title: 'Total de Estudantes',
        value: '250',
        subtitle: '',
        icon: 'students',
        trend: '+12% vs ano anterior',
    },
    {
        title: 'Taxa de Placement',
        value: '72%',
        subtitle: '',
        icon: 'placement',
        badge: '180 colocados',
        progress: 72,
    },
    {
        title: 'CGPA Médio',
        value: '7.6',
        subtitle: '/10',
        icon: 'cgpa',
        trend: '+0.4 vs semestre anterior',
    },
    {
        title: 'Alto Risco (Not Placed)',
        value: '70',
        subtitle: 'Estudantes com risco > 60%',
        icon: 'risk',
        badge: '28%',
    },
];

export const skillScores: SkillScore[] = [
    { skill: 'Coding Skills', value: 65, fullMark: 100 },
    { skill: 'DSA Score', value: 58, fullMark: 100 },
    { skill: 'Aptitude', value: 72, fullMark: 100 },
    { skill: 'Communication', value: 60, fullMark: 100 },
    { skill: 'ML Knowledge', value: 45, fullMark: 100 },
    { skill: 'System Design', value: 38, fullMark: 100 },
];

export const cgpaDistribution: CgpaRange[] = [
    { range: '< 6.0', count: 3, color: '#ef4444' },
    { range: '6.0-7.0', count: 5.5, color: '#f97316' },
    { range: '7.0-8.0', count: 8, color: '#f59e0b' },
    { range: '8.0-9.0', count: 9.5, color: '#10b981' },
    { range: '≥ 9.0', count: 12, color: '#22c55e' },
];

export const backlogImpact: BacklogImpact[] = [
    { group: '0', placed: 82, notPlaced: 10 },
    { group: '1-2', placed: 60, notPlaced: 38 },
    { group: '3-4', placed: 25, notPlaced: 75 },
    { group: '5+', placed: 8, notPlaced: 90 },
];

export const activityImpact: ActivityImpact[] = [
    { activity: 'Internships', placed: 85, notPlaced: 55 },
    { activity: 'Projects', placed: 78, notPlaced: 50 },
    { activity: 'Certifications', placed: 72, notPlaced: 52 },
    { activity: 'Extracurriculars', placed: 68, notPlaced: 45 },
];

export const skillGaps: SkillGap[] = [
    { skill: 'System Design', gap: 1.8, color: '#ef4444' },
    { skill: 'ML Knowledge', gap: 1.7, color: '#ef4444' },
    { skill: 'Communication', gap: 1.5, color: '#10b981' },
    { skill: 'DSA Score', gap: 1.2, color: '#f59e0b' },
    { skill: 'Aptitude', gap: 1.0, color: '#f59e0b' },
    { skill: 'Coding Skills', gap: 0.8, color: '#10b981' },
];

export const insights: InsightData[] = [
    {
        id: '1',
        title: 'Déficit Crítico em System Design',
        description:
            'A IA detectou que 60% dos estudantes não colocados têm score abaixo de 50 em System Design. Recomenda-se workshop intensivo.',
        severity: 'critical',
        affectedCount: 18,
    },
    {
        id: '2',
        title: 'Correlação: Backlogs vs Placement',
        description:
            'Estudantes com 3+ backlogs têm 75% menos chance de placement. Priorizar recuperação acadêmica.',
        severity: 'critical',
        affectedCount: 8,
    },
    {
        id: '3',
        title: 'Internships = Forte Preditor',
        description:
            'Estudantes com 2+ internships têm 85% de taxa de placement. Incentivar programas de estágio.',
        severity: 'positive',
        affectedCount: 15,
    },
    {
        id: '4',
        title: 'Gap em ML Knowledge',
        description:
            'Apenas 35% dos estudantes têm ML Knowledge > 60. Cursos complementares são recomendados.',
        severity: 'warning',
        affectedCount: 20,
    },
];

export const students: StudentRow[] = [
    {
        id: 'STU-001',
        branch: 'CSE',
        cgpa: 8.52,
        backlogs: 0,
        risk: 15,
        status: 'Placed',
    },
    {
        id: 'STU-002',
        branch: 'ECE',
        cgpa: 7.31,
        backlogs: 1,
        risk: 42,
        status: 'Placed',
    },
    {
        id: 'STU-003',
        branch: 'ME',
        cgpa: 6.12,
        backlogs: 3,
        risk: 78,
        status: 'Not Placed',
    },
    {
        id: 'STU-004',
        branch: 'IT',
        cgpa: 8.91,
        backlogs: 0,
        risk: 8,
        status: 'Placed',
    },
    {
        id: 'STU-005',
        branch: 'CE',
        cgpa: 5.67,
        backlogs: 2,
        risk: 85,
        status: 'Not Placed',
    },
    {
        id: 'STU-006',
        branch: 'CSE',
        cgpa: 7.88,
        backlogs: 0,
        risk: 22,
        status: 'Placed',
    },
    {
        id: 'STU-007',
        branch: 'Chemical',
        cgpa: 6.45,
        backlogs: 1,
        risk: 61,
        status: 'Not Placed',
    },
    {
        id: 'STU-008',
        branch: 'EE',
        cgpa: 9.13,
        backlogs: 0,
        risk: 5,
        status: 'Placed',
    },
];
