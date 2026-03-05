export interface KpiData {
    title: string;
    value: string | number;
    subtitle: string;
    icon: 'students' | 'placement' | 'cgpa' | 'risk';
    badge?: string;
    progress?: number;
    trend?: string;
}

export interface StudentRow {
    id: string;
    branch: string;
    cgpa: number;
    backlogs: number;
    risk: number;
    status: 'Placed' | 'Not Placed';
}

export interface InsightData {
    id: string;
    title: string;
    description: string;
    severity: 'critical' | 'warning' | 'positive';
    affectedCount: number;
}

export interface SkillScore {
    skill: string;
    value: number;
    fullMark: number;
}

export interface CgpaRange {
    range: string;
    count: number;
    color: string;
}

export interface BacklogImpact {
    group: string;
    placed: number;
    notPlaced: number;
}

export interface ActivityImpact {
    activity: string;
    placed: number;
    notPlaced: number;
}

export interface SkillGap {
    skill: string;
    gap: number;
    color: string;
}
