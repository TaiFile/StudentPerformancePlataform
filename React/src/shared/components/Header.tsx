import { Search, ChevronDown } from 'lucide-react';

export function Header() {
    return (
        <header className="sticky top-0 z-50 border-b border-border bg-surface shadow-sm">
            <div className="mx-auto flex items-center justify-between px-6 py-3">
                {/* Logo */}
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white">
                        <svg
                            width="22"
                            height="22"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <circle cx="12" cy="12" r="10" />
                            <path d="M12 6v6l4 2" />
                        </svg>
                    </div>
                    <div>
                        <h1 className="text-lg font-bold text-text-primary">
                            Edumetrics AI
                        </h1>
                        <p className="text-xs text-text-secondary">
                            Painel Administrativo · Análise de Placement
                        </p>
                    </div>
                </div>

                {/* Filters */}
                <div className="hidden items-center gap-3 md:flex">
                    <FilterDropdown label="Todos os Branches" />
                    <FilterDropdown label="Todos os Tiers" />
                </div>

                {/* Search */}
                <div className="hidden items-center gap-4 lg:flex">
                    <div className="relative">
                        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-text-secondary" />
                        <input
                            type="text"
                            placeholder="Buscar por ID, branch, competências..."
                            className="w-72 rounded-lg border border-border bg-background py-2 pr-4 pl-10 text-sm text-text-primary placeholder-text-secondary transition focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                        />
                    </div>
                </div>

                {/* User */}
                <div className="flex items-center gap-3">
                    <div className="hidden text-right sm:block">
                        <p className="text-sm font-semibold text-text-primary">
                            Coordenador
                        </p>
                        <p className="text-xs text-text-secondary">Admin Dashboard</p>
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-sm font-bold text-white">
                        AD
                    </div>
                </div>
            </div>
        </header>
    );
}

function FilterDropdown({ label }: { label: string }) {
    return (
        <button className="flex items-center gap-2 rounded-lg border border-border bg-surface px-4 py-2 text-sm font-medium text-text-primary transition hover:border-primary/40 hover:bg-background">
            {label}
            <ChevronDown className="h-4 w-4 text-text-secondary" />
        </button>
    );
}
