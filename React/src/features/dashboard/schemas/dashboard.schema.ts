import { z } from 'zod';

export const studentFilterSchema = z.object({
    branch: z.string().optional(),
    collegeTier: z.string().optional(),
    search: z.string().optional(),
});

export type StudentFilter = z.infer<typeof studentFilterSchema>;

export const branchOptions = [
    'Todos os Branches',
    'CSE',
    'ECE',
    'EE',
    'ME',
    'CE',
    'IT',
    'Chemical',
] as const;

export const tierOptions = [
    'Todos os Tiers',
    'Tier-1',
    'Tier-2',
    'Tier-3',
] as const;
