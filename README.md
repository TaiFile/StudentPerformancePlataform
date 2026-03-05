<p align="center">
  <h1 align="center">🎓 Edumetrics AI</h1>
  <p align="center">
    <strong>Plataforma de Análise Preditiva e Diagnóstico de Desempenho Acadêmico</strong>
  </p>
  <p align="center">
    <a href="#-funcionalidades">Funcionalidades</a> •
    <a href="#%EF%B8%8F-arquitetura">Arquitetura</a> •
    <a href="#-tech-stack">Tech Stack</a> •
    <a href="#-como-executar">Como Executar</a> •
    <a href="#-estrutura-do-projeto">Estrutura</a> •
    <a href="#-dataset">Dataset</a>
  </p>
</p>

---

## 💡 O Conceito

A **Edumetrics AI** é uma plataforma full-stack que transforma dados brutos de desempenho estudantil em **insights acionáveis**. Diferente de boletins tradicionais, a plataforma atua na **causa raiz** do baixo desempenho — utilizando Machine Learning para diagnosticar a origem dos erros dos alunos e prever riscos de reprovação **antes** do final do semestre.

> *"O aluno está errando por falta de esforço ou por uma lacuna específica em um pré-requisito da disciplina?"*

---

## 🚀 Funcionalidades

### 🔬 Diagnóstico de Padrões de Erro
Algoritmos de **Clustering (K-Means)** segmentam alunos em perfis de aprendizado — como *Dificuldade Conceitual*, *Falta de Engajamento* ou *Defasagem de Base* — permitindo intervenções específicas para cada grupo.

### 📊 Análise de Correlação Multidimensional
Identifica quais variáveis socioeconômicas e comportamentais (tempo de estudo, frequência, acesso a recursos) mais impactam o desempenho em matérias específicas.

### ⚠️ Predição de Risco Acadêmico
Modelo de **Classificação** que calcula a probabilidade de um estudante falhar em um tópico específico, habilitando intervenções pedagógicas precoces.

### 📈 Dashboard de Visualização Estratégica
Interface intuitiva com **gráficos de radar** (comparativo de competências) e **mapas de calor** de desempenho, facilitando a leitura de dados complexos para estudantes e professores.

---

## 🏗️ Arquitetura

```
┌──────────────┐     ┌──────────────────┐     ┌─────────────────┐
│   Frontend   │────▶│   Backend (API)  │────▶│   Data Science  │
│   React/Next │     │   Spring Boot    │     │   Python / ML   │
└──────────────┘     └───────┬──────────┘     └─────────────────┘
                             │
                     ┌───────▼──────────┐
                     │   PostgreSQL     │
                     │   (via Docker)   │
                     └──────────────────┘
```

| Camada | Responsabilidade |
|---|---|
| **Frontend** | Dashboards interativos de alta performance focados em UX de dados |
| **Backend** | API robusta para processamento, integração com modelos de ML e entrega dos dados via JSON |
| **Data Science** | Limpeza de dados, análise exploratória, treinamento e inferência dos modelos de IA |
| **Infra** | Containerização com Docker para reprodutibilidade e escalabilidade |

---

## 🛠 Tech Stack

| Área | Tecnologias |
|---|---|
| **Backend** | Java 21, Spring Boot 3.5, Spring Data JPA, Spring Security, Flyway, MapStruct, Lombok |
| **Banco de Dados** | PostgreSQL |
| **Data Science** | Python, Pandas, Scikit-Learn, Matplotlib, Seaborn |
| **Infra** | Docker, Docker Compose |
| **Documentação** | Springdoc OpenAPI (Swagger UI) |

---

## 🚀 Como Executar

### Pré-requisitos

- Java 21+
- Maven 3.9+
- Docker & Docker Compose
- Node.js 18+ (frontend)

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/EduMetricsIA.git
cd EduMetricsIA/StudentPerformancePlataform
```

### 2. Configure as variáveis de ambiente

```bash
cp SpringBoot/.env.example SpringBoot/.env
# Edite o .env com suas credenciais
```

### 3. Suba o banco com Docker

```bash
cd SpringBoot
docker compose up -d
```

### 4. Execute o backend

```bash
mvn spring-boot:run
```

A API estará disponível em `http://localhost:3000/api`  
Swagger UI em `http://localhost:3000/api/swagger-ui.html`

---

## 📁 Estrutura do Projeto

```
StudentPerformancePlataform/
├── SpringBoot/                         # Backend API
│   ├── src/main/java/com/demo/
│   │   ├── common/                     # Configurações e exceções globais
│   │   ├── domain/                     # Entidades, enums e repositórios
│   │   │   ├── entity/
│   │   │   │   └── StudentPlacement.java
│   │   │   ├── enums/
│   │   │   │   ├── Branch.java
│   │   │   │   └── CollegeTier.java
│   │   │   └── repository/
│   │   │       └── StudentPlacementRepository.java
│   │   ├── features/                   # Vertical slices (funcionalidades)
│   │   └── infrastructure/             # Segurança, storage, integrações
│   ├── src/main/resources/
│   │   ├── db/migration/               # Migrations Flyway
│   │   └── application.yml
│   ├── docker-compose.yml
│   ├── Dockerfile
│   └── pom.xml
└── student_placement_synthetic.csv     # Dataset base (100k registros)
```

---

## 📊 Dataset

O projeto utiliza o dataset **Student Placement Synthetic** com **100.000 registros** contendo as seguintes variáveis:

| Variável | Descrição | Tipo |
|---|---|---|
| `branch` | Curso de engenharia (CSE, ECE, EE, ME, CE, IT, Chemical) | Categórica |
| `college_tier` | Nível da faculdade (Tier-1, Tier-2, Tier-3) | Categórica |
| `cgpa` | Nota média acumulada | Numérica |
| `backlogs` | Número de reprovações pendentes | Inteiro |
| `coding_skills` | Habilidade em programação (0-10) | Numérica |
| `dsa_score` | Score em estrutura de dados e algoritmos (0-10) | Numérica |
| `aptitude_score` | Score de aptidão (0-100) | Numérica |
| `communication_skills` | Habilidade de comunicação (0-10) | Numérica |
| `ml_knowledge` | Conhecimento em ML (0-10) | Numérica |
| `system_design` | Conhecimento em design de sistemas (0-10) | Numérica |
| `internships` | Número de estágios | Inteiro |
| `projects_count` | Número de projetos | Inteiro |
| `certifications` | Número de certificações | Inteiro |
| `hackathons` | Participações em hackathons | Inteiro |
| `open_source_contributions` | Contribuições open source | Inteiro |
| `extracurriculars` | Atividades extracurriculares | Inteiro |
| `placement_status` | Status de colocação (0 = Não, 1 = Sim) | Binário |
| `salary_package_lpa` | Pacote salarial em LPA (se colocado) | Numérica |

---

## 📝 Licença

Este projeto é desenvolvido para fins acadêmicos e de portfólio.

---

<p align="center">
  Feito com ❤️ para transformar a educação com dados e inteligência artificial.
</p>
