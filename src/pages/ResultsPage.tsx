import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from 'recharts';
import { SectionHeader } from '@/components/SectionHeader';
import { DisclaimerBanner } from '@/components/DisclaimerBanner';
import { useCountUp } from '@/hooks';
import { useReveal } from '@/hooks';
import {
  modelMetrics,
  trainingLossData,
  accuracyData,
  modelComparisonData,
  probabilityData,
} from '@/data/content';
import { Activity, TrendingDown, BarChart3, Radar as RadarIcon, Gauge, Database } from 'lucide-react';

function MetricCard({ metric, value, description }: { metric: string; value: number; description: string }) {
  const animated = useCountUp(value, 1500, true);
  return (
    <div className="glass-card glass-card-hover p-5">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-mono text-qm-dim uppercase tracking-wider">{metric}</span>
        <Gauge className="w-4 h-4 text-qm-primary" />
      </div>
      <div className="text-2xl font-bold qm-gradient-text">
        {animated.toFixed(1)}%
      </div>
      <p className="text-[10px] text-qm-dim mt-1">{description}</p>
    </div>
  );
}

export function ResultsPage() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <div className="min-h-screen pt-8 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Results"
          title="Research Dashboard"
          subtitle="Simulated performance metrics for the hybrid quantum-classical model. All data is demonstration-only — not from real clinical evaluations."
        />

        {/* Disclaimer */}
        <div className="mb-8">
          <div className="flex items-center gap-2 px-4 py-3 rounded-lg bg-qm-secondary/10 border border-qm-secondary/20">
            <Database className="w-4 h-4 text-qm-secondary shrink-0" />
            <p className="text-sm text-qm-muted">
              <span className="text-qm-secondary font-semibold">DEMONSTRATION DATA: </span>
              All metrics below are simulated for educational purposes. They do not represent real clinical performance.
            </p>
          </div>
        </div>

        {/* Metric cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {modelMetrics.map((m) => (
            <MetricCard key={m.metric} {...m} />
          ))}
        </div>

        {/* Charts grid */}
        <div ref={ref} className="grid lg:grid-cols-2 gap-6">
          {/* Training vs Validation Loss */}
          <div className="glass-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingDown className="w-5 h-5 text-qm-primary" />
              <h3 className="text-sm font-mono text-qm-text tracking-wide">Training vs Validation Loss</h3>
              <span className="ml-auto text-[10px] font-mono text-qm-secondary px-2 py-0.5 rounded bg-qm-secondary/10">
                SIMULATED
              </span>
            </div>
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={trainingLossData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1A2350" opacity={0.3} />
                <XAxis dataKey="epoch" stroke="#5A6B9C" fontSize={12} />
                <YAxis stroke="#5A6B9C" fontSize={12} />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="training"
                  stroke="#00E5FF"
                  strokeWidth={2}
                  dot={false}
                  name="Training Loss"
                />
                <Line
                  type="monotone"
                  dataKey="validation"
                  stroke="#7C5CFF"
                  strokeWidth={2}
                  dot={false}
                  name="Validation Loss"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Accuracy comparison */}
          <div className="glass-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="w-5 h-5 text-qm-accent" />
              <h3 className="text-sm font-mono text-qm-text tracking-wide">Accuracy Over Epochs</h3>
              <span className="ml-auto text-[10px] font-mono text-qm-secondary px-2 py-0.5 rounded bg-qm-secondary/10">
                SIMULATED
              </span>
            </div>
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={accuracyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1A2350" opacity={0.3} />
                <XAxis dataKey="epoch" stroke="#5A6B9C" fontSize={12} />
                <YAxis stroke="#5A6B9C" fontSize={12} domain={[60, 95]} />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="classical"
                  stroke="#8B9DC3"
                  strokeWidth={2}
                  dot={false}
                  name="Classical ML"
                />
                <Line
                  type="monotone"
                  dataKey="hybrid"
                  stroke="#00FFD0"
                  strokeWidth={2}
                  dot={false}
                  name="Hybrid Quantum"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Model comparison radar */}
          <div className="glass-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <RadarIcon className="w-5 h-5 text-qm-secondary" />
              <h3 className="text-sm font-mono text-qm-text tracking-wide">Model Comparison</h3>
              <span className="ml-auto text-[10px] font-mono text-qm-secondary px-2 py-0.5 rounded bg-qm-secondary/10">
                SIMULATED
              </span>
            </div>
            <ResponsiveContainer width="100%" height={260}>
              <RadarChart data={modelComparisonData}>
                <PolarGrid stroke="#1A2350" />
                <PolarAngleAxis dataKey="metric" tick={{ fill: '#8B9DC3', fontSize: 11 }} />
                <PolarRadiusAxis domain={[0, 100]} tick={{ fill: '#5A6B9C', fontSize: 10 }} />
                <Radar
                  name="Classical"
                  dataKey="classical"
                  stroke="#8B9DC3"
                  fill="#8B9DC3"
                  fillOpacity={0.15}
                  strokeWidth={2}
                />
                <Radar
                  name="Hybrid Quantum"
                  dataKey="hybrid"
                  stroke="#00E5FF"
                  fill="#00E5FF"
                  fillOpacity={0.15}
                  strokeWidth={2}
                />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Probability distribution */}
          <div className="glass-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="w-5 h-5 text-qm-primary" />
              <h3 className="text-sm font-mono text-qm-text tracking-wide">Quantum Measurement Distribution</h3>
              <span className="ml-auto text-[10px] font-mono text-qm-secondary px-2 py-0.5 rounded bg-qm-secondary/10">
                SIMULATED
              </span>
            </div>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={probabilityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1A2350" opacity={0.3} />
                <XAxis dataKey="state" stroke="#5A6B9C" fontSize={12} />
                <YAxis stroke="#5A6B9C" fontSize={12} />
                <Tooltip />
                <Bar
                  dataKey="probability"
                  fill="#00E5FF"
                  name="Probability"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8">
          <DisclaimerBanner variant="card" />
        </div>
      </div>
    </div>
  );
}
