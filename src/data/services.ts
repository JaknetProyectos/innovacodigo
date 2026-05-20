import { getOptimizedUrl } from "@/lib/images"

export interface Service {
    id: number;
    nombre: string;
    precio: number;
    descripcion: string;
    imagen: string;
}

export const SingleServicesSpanish = [
    {
        id: 5,
        nombre: "Diagnóstico inicial de datos",
        precio: 5000,
        descripcion: "Servicio: evaluación del estado actual de datos y recomendaciones.",
        imagen: getOptimizedUrl(
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71"
        )
    },
    {
        id: 6,
        nombre: "Software SaaS de encuestas + análisis",
        precio: 6000,
        descripcion: "Servicio: plataforma de encuestas con reportes automáticos.",
        imagen: getOptimizedUrl(
            "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40"
        )
    },
    {
        id: 7,
        nombre: "Análisis estadístico a la medida",
        precio: 7000,
        descripcion: "Servicio: análisis estadístico personalizado con interpretación de resultados.",
        imagen: getOptimizedUrl(
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f"
        )
    },
    {
        id: 8,
        nombre: "Dashboard / BI en la nube",
        precio: 10000,
        descripcion: "Servicio: visualización de datos, KPI, reportes y actualizaciones automáticas.",
        imagen: getOptimizedUrl(
            "https://images.unsplash.com/photo-1552664730-d307ca884978"
        )
    },
    {
        id: 9,
        nombre: "Consultoría + plataforma de seguimiento",
        precio: 12000,
        descripcion: "Servicio: consultoría continua con panel de seguimiento.",
        imagen: getOptimizedUrl(
            "https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
        )
    },
    {
        id: 10,
        nombre: "Modelos predictivos / machine learning ligero",
        precio: 15000,
        descripcion: "Servicio: modelos predictivos básicos para proyecciones y tendencias.",
        imagen: getOptimizedUrl(
            "https://images.unsplash.com/photo-1485827404703-89b55fcc595e"
        )
    },
]

export const DataServicesSpanish = [
    {
        id: 11,
        nombre: "Data Premium Pro",
        precio: 25000,
        descripcion: "2 modelos predictivos (machine learning ligero) + actualizaciones + soporte + análisis estadístico + consultoría estratégica.",
        imagen: getOptimizedUrl(
            "https://images.unsplash.com/photo-1498050108023-c5249f4df085"
        )
    },
    {
        id: 7,
        nombre: "Insights Continuos",
        precio: 18000,
        descripcion: "Dashboard en la nube + 1 reporte + 1 KPI + actualización automática + integración con base de datos + análisis estadístico bajo demanda + soporte.",
        imagen: getOptimizedUrl(
            "https://images.unsplash.com/photo-1504384308090-c894fdcc538d"
        )
    },
    {
        id: 4,
        nombre: "Visión 360 Data",
        precio: 12000,
        descripcion: "Dashboard en la nube + 1 reporte + 1 KPI + actualización automática + integración con base de datos.",
        imagen: getOptimizedUrl(
            "https://images.unsplash.com/photo-1552664730-d307ca884978"
        )
    },
    {
        id: 3,
        nombre: "Encuesta Inteligente",
        precio: 8500,
        descripcion: "Plataforma SaaS de encuestas + análisis (gráficos, segmentación, exportación) + creación de 5 encuestas.",
        imagen: getOptimizedUrl(
            "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40"
        )
    },
    {
        id: 1,
        nombre: "Data Start 3K",
        precio: 3000,
        descripcion: "Mini-dashboard básico (1 vista). Carga de datos manual (1 archivo).",
        imagen: getOptimizedUrl(
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71"
        )
    },
    {
        id: 2,
        nombre: "Analítica Esencial 5K",
        precio: 5000,
        descripcion: "Dashboard con 2 vistas de BI. Integración con 1 fuente de datos (Excel, Google Sheets o CSV).",
        imagen: getOptimizedUrl(
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f"
        )
    },
    {
        id: 5,
        nombre: "Estratega de Datos",
        precio: 15000,
        descripcion: "Consultoría + plataforma + acompañamiento para interpretar datos + acciones + dashboard básico.",
        imagen: getOptimizedUrl(
            "https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
        )
    },
    {
        id: 6,
        nombre: "Operaciones Óptimas",
        precio: 17000,
        descripcion: "BI + dashboard + KPI operacional + análisis estadístico + recomendaciones operativas.",
        imagen: getOptimizedUrl(
            "https://images.unsplash.com/photo-1516321318423-f06f85e504b3"
        )
    },
    {
        id: 8,
        nombre: "Marketing Metrics Master",
        precio: 19000,
        descripcion: "Panel para KPI de marketing y ventas + análisis predictivo de demanda + 1 reporte automatizado.",
        imagen: getOptimizedUrl(
            "https://images.unsplash.com/photo-1533750516457-a7f992034fec"
        )
    },
    {
        id: 9,
        nombre: "Predicción Plus",
        precio: 20000,
        descripcion: "2 modelos predictivos (machine learning ligero) + dashboard + actualizaciones + soporte.",
        imagen: getOptimizedUrl(
            "https://images.unsplash.com/photo-1485827404703-89b55fcc595e"
        )
    },
    {
        id: 10,
        nombre: "Growth Inteligente",
        precio: 22000,
        descripcion: "7 encuestas, dashboard, análisis estadístico, predicción de retención o churn, consultoría de crecimiento.",
        imagen: getOptimizedUrl(
            "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a"
        )
    },
    {
        id: 12,
        nombre: "Corporativo Data Scale",
        precio: 35000,
        descripcion: "Solución integral: BI + modelado predictivo + análisis estadístico + 10 encuestas + consultoría estratégica + soporte dedicado.",
        imagen: getOptimizedUrl(
            "https://images.unsplash.com/photo-1519389950473-47ba0277781c"
        )
    }
]

export const SingleServicesEnglish = [
    {
        id: 5,
        nombre: "Initial Data Diagnosis",
        precio: 5000,
        descripcion: "Service: evaluation of the current state of data and recommendations.",
        imagen: getOptimizedUrl(
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71"
        )
    },
    {
        id: 6,
        nombre: "Survey SaaS Software + Analytics",
        precio: 6000,
        descripcion: "Service: survey platform with automated reports.",
        imagen: getOptimizedUrl(
            "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40"
        )
    },
    {
        id: 7,
        nombre: "Custom Statistical Analysis",
        precio: 7000,
        descripcion: "Service: personalized statistical analysis with result interpretation.",
        imagen: getOptimizedUrl(
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f"
        )
    },
    {
        id: 8,
        nombre: "Cloud Dashboard / BI",
        precio: 10000,
        descripcion: "Service: data visualization, KPIs, reports, and automatic updates.",
        imagen: getOptimizedUrl(
            "https://images.unsplash.com/photo-1552664730-d307ca884978"
        )
    },
    {
        id: 9,
        nombre: "Consulting + Monitoring Platform",
        precio: 12000,
        descripcion: "Service: ongoing consulting with monitoring dashboard.",
        imagen: getOptimizedUrl(
            "https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
        )
    },
    {
        id: 10,
        nombre: "Predictive Models / Lightweight Machine Learning",
        precio: 15000,
        descripcion: "Service: basic predictive models for forecasts and trends.",
        imagen: getOptimizedUrl(
            "https://images.unsplash.com/photo-1485827404703-89b55fcc595e"
        )
    },
]

export const DataServicesEnglish = [
    {
        id: 11,
        nombre: "Data Premium Pro",
        precio: 25000,
        descripcion: "2 predictive models (lightweight machine learning) + updates + support + statistical analysis + strategic consulting.",
        imagen: getOptimizedUrl(
            "https://images.unsplash.com/photo-1498050108023-c5249f4df085"
        )
    },
    {
        id: 7,
        nombre: "Continuous Insights",
        precio: 18000,
        descripcion: "Cloud dashboard + 1 report + 1 KPI + automatic updates + database integration + on-demand statistical analysis + support.",
        imagen: getOptimizedUrl(
            "https://images.unsplash.com/photo-1504384308090-c894fdcc538d"
        )
    },
    {
        id: 4,
        nombre: "360 Data Vision",
        precio: 12000,
        descripcion: "Cloud dashboard + 1 report + 1 KPI + automatic updates + database integration.",
        imagen: getOptimizedUrl(
            "https://images.unsplash.com/photo-1552664730-d307ca884978"
        )
    },
    {
        id: 3,
        nombre: "Smart Survey",
        precio: 8500,
        descripcion: "Survey SaaS platform + analytics (charts, segmentation, export tools) + creation of 5 surveys.",
        imagen: getOptimizedUrl(
            "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40"
        )
    },
    {
        id: 1,
        nombre: "Data Start 3K",
        precio: 3000,
        descripcion: "Basic mini-dashboard (1 view). Manual data upload (1 file).",
        imagen: getOptimizedUrl(
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71"
        )
    },
    {
        id: 2,
        nombre: "Essential Analytics 5K",
        precio: 5000,
        descripcion: "Dashboard with 2 BI views. Integration with 1 data source (Excel, Google Sheets, or CSV).",
        imagen: getOptimizedUrl(
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f"
        )
    },
    {
        id: 5,
        nombre: "Data Strategist",
        precio: 15000,
        descripcion: "Consulting + platform + guidance for interpreting data + actions + basic dashboard.",
        imagen: getOptimizedUrl(
            "https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
        )
    },
    {
        id: 6,
        nombre: "Optimal Operations",
        precio: 17000,
        descripcion: "BI + dashboard + operational KPI + statistical analysis + operational recommendations.",
        imagen: getOptimizedUrl(
            "https://images.unsplash.com/photo-1516321318423-f06f85e504b3"
        )
    },
    {
        id: 8,
        nombre: "Marketing Metrics Master",
        precio: 19000,
        descripcion: "Marketing and sales KPI dashboard + predictive demand analysis + 1 automated report.",
        imagen: getOptimizedUrl(
            "https://images.unsplash.com/photo-1533750516457-a7f992034fec"
        )
    },
    {
        id: 9,
        nombre: "Prediction Plus",
        precio: 20000,
        descripcion: "2 predictive models (lightweight machine learning) + dashboard + updates + support.",
        imagen: getOptimizedUrl(
            "https://images.unsplash.com/photo-1485827404703-89b55fcc595e"
        )
    },
    {
        id: 10,
        nombre: "Smart Growth",
        precio: 22000,
        descripcion: "7 surveys, dashboard, statistical analysis, retention or churn prediction, growth consulting.",
        imagen: getOptimizedUrl(
            "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a"
        )
    },
    {
        id: 12,
        nombre: "Corporate Data Scale",
        precio: 35000,
        descripcion: "Comprehensive solution: BI + predictive modeling + statistical analysis + 10 surveys + strategic consulting + dedicated support.",
        imagen: getOptimizedUrl(
            "https://images.unsplash.com/photo-1519389950473-47ba0277781c"
        )
    }
]

