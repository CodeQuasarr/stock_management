import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip
} from 'chart.js'

// Register ChartJS components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
)

export const defaultChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: 'bottom' as const
        }
    }
}

// Reusable chart data configurations
export const getLineChartConfig = (labels: string[], datasets: any[]) => ({
    labels,
    datasets: datasets.map(dataset => ({
        ...dataset,
        tension: 0.4
    }))
})

export const getBarChartConfig = (labels: string[], data: number[], label: string) => ({
    labels,
    datasets: [{
        label,
        data,
        backgroundColor: ['#2563EB', '#10B981', '#F59E0B', '#6B7280']
    }]
})
