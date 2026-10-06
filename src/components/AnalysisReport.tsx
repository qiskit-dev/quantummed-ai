import {
  FileText,
  AlertTriangle,
  CheckCircle2,
  Info,
  ChevronDown,
  ChevronUp,
  Stethoscope,
} from 'lucide-react';
import { useState } from 'react';
import type { DemoImage } from '@/data/content';

interface AnalysisReportProps {
  selectedDemo: DemoImage | null;
  topPrediction: { label: string; confidence: number };
  qubits: number;
}

interface Finding {
  region: string;
  finding: string;
  confidence: number;
  severity: 'normal' | 'low' | 'moderate' | 'high';
}

function getReportData(
  demoId: string | null,
  topPrediction: { label: string; confidence: number },
  qubits: number,
) {
  const findings: Finding[] = demoId === 'D'
    ? [
        { region: 'Right Upper Lung Field', finding: 'Small focal opacity detected near the apical region', confidence: 72.4, severity: 'moderate' },
        { region: 'Left Lung Field', finding: 'Clear lung fields, no consolidations or effusions', confidence: 88.1, severity: 'normal' },
        { region: 'Cardiac Silhouette', finding: 'Heart size within normal limits, cardiothoracic ratio 0.48', confidence: 91.2, severity: 'normal' },
        { region: 'Costophrenic Angles', finding: 'Both costophrenic angles are sharp and clear', confidence: 85.6, severity: 'normal' },
        { region: 'Mediastinum', finding: 'No mediastinal widening, trachea midline', confidence: 82.3, severity: 'normal' },
        { region: 'Bony Thorax', finding: 'No rib fractures or lytic lesions apparent', confidence: 76.9, severity: 'normal' },
      ]
    : demoId === 'A'
    ? [
        { region: 'Cellular Distribution', finding: 'High cellular density with atypical morphology detected', confidence: 64.6, severity: 'moderate' },
        { region: 'Tissue Architecture', finding: 'Disrupted tissue pattern in central region', confidence: 58.2, severity: 'low' },
        { region: 'Nuclear Features', finding: 'Irregular nuclear shapes and enlarged nuclei observed', confidence: 61.3, severity: 'moderate' },
        { region: 'Mitotic Activity', finding: 'Elevated mitotic count compared to baseline', confidence: 55.7, severity: 'low' },
        { region: 'Stroma Region', finding: 'Normal stromal composition detected', confidence: 78.4, severity: 'normal' },
      ]
    : demoId === 'B'
    ? [
        { region: 'Central Tissue Mass', finding: 'Dense tissue region with possible anomaly', confidence: 71.2, severity: 'moderate' },
        { region: 'Peripheral Zones', finding: 'Normal tissue layering and structure', confidence: 84.5, severity: 'normal' },
        { region: 'Boundary Regions', finding: 'Well-defined tissue boundaries observed', confidence: 79.1, severity: 'normal' },
        { region: 'Density Gradient', finding: 'Slight asymmetry in tissue density distribution', confidence: 52.3, severity: 'low' },
      ]
    : demoId === 'C'
    ? [
        { region: 'Optic Disc', finding: 'Optic disc appearance within normal limits', confidence: 87.3, severity: 'normal' },
        { region: 'Macular Region', finding: 'Foveal reflex diminished, possible early changes', confidence: 63.8, severity: 'moderate' },
        { region: 'Vascular Pattern', finding: 'Micro-aneurysms detected in temporal arcades', confidence: 60.4, severity: 'moderate' },
        { region: 'Peripheral Retina', finding: 'No peripheral lesions or tears detected', confidence: 81.2, severity: 'normal' },
        { region: 'Vessel Caliber', finding: 'Mild venous dilation observed', confidence: 54.6, severity: 'low' },
      ]
    : [
        { region: 'Primary Analysis Region', finding: 'Focal pattern deviation detected in central field', confidence: 56.1, severity: 'moderate' },
        { region: 'Peripheral Scan Area', finding: 'Regional features within expected variance', confidence: 72.4, severity: 'normal' },
        { region: 'Structural Integrity', finding: 'Overall structure appears intact', confidence: 81.3, severity: 'normal' },
        { region: 'Anomaly Assessment', finding: 'Minor irregularities warrant further review', confidence: 48.7, severity: 'low' },
      ];

  const modality = demoId === 'D' ? 'Chest Radiograph (X-Ray)' :
    demoId === 'A' ? 'Histology Slide' :
    demoId === 'B' ? 'MRI Slice' :
    demoId === 'C' ? 'Retinal Fundus Image' :
    'Uploaded Medical Image';

  const recommendation = topPrediction.confidence > 60
    ? 'The model has identified features that may warrant review by a qualified specialist. This is a simulated result and should not be used for clinical decision-making.'
    : topPrediction.confidence > 30
    ? 'The model shows moderate confidence in the findings. Further imaging or clinical correlation may be beneficial. This is a simulated result only.'
    : 'The model shows lower confidence in these findings. Additional imaging or clinical context would be needed for meaningful assessment. This is a simulated result only.';

  const severityCounts = findings.reduce(
    (acc, f) => {
      acc[f.severity] = (acc[f.severity] ?? 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  return { findings, modality, recommendation, severityCounts, qubits };
}

const severityConfig = {
  normal: { color: 'text-qm-accent', bg: 'bg-qm-accent/10', border: 'border-qm-accent/20', icon: CheckCircle2, label: 'Normal' },
  low: { color: 'text-qm-primary', bg: 'bg-qm-primary/10', border: 'border-qm-primary/20', icon: Info, label: 'Low Significance' },
  moderate: { color: 'text-amber-400', bg: 'bg-amber-400/10', border: 'border-amber-400/20', icon: AlertTriangle, label: 'Moderate' },
  high: { color: 'text-red-400', bg: 'bg-red-400/10', border: 'border-red-400/20', icon: AlertTriangle, label: 'High Priority' },
};

export function AnalysisReport({ selectedDemo, topPrediction, qubits }: AnalysisReportProps) {
  const [expanded, setExpanded] = useState(true);
  const report = getReportData(selectedDemo?.id ?? null, topPrediction, qubits);

  return (
    <div className="glass-card p-5 border-qm-primary/20 animate-fade-in">
      {/* Header */}
      <button
        onClick={() => setExpanded(e => !e)}
        className="w-full flex items-center gap-2 mb-1"
      >
        <FileText className="w-5 h-5 text-qm-primary" />
        <h3 className="text-sm font-mono text-qm-text tracking-wide text-left flex-1">
          Detailed Analysis Report
        </h3>
        {expanded ? (
          <ChevronUp className="w-4 h-4 text-qm-dim" />
        ) : (
          <ChevronDown className="w-4 h-4 text-qm-dim" />
        )}
      </button>

      {expanded && (
        <div className="mt-4 space-y-4">
          {/* Study info */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            <div className="glass-card p-2.5">
              <span className="text-qm-dim block">Modality</span>
              <span className="text-qm-text font-mono text-[11px]">{report.modality}</span>
            </div>
            <div className="glass-card p-2.5">
              <span className="text-qm-dim block">Image Source</span>
              <span className="text-qm-text font-mono text-[11px]">
                {selectedDemo ? 'Demo Dataset' : 'User Upload'}
              </span>
            </div>
            <div className="glass-card p-2.5">
              <span className="text-qm-dim block">Qubits Used</span>
              <span className="text-qm-text font-mono text-[11px]">{qubits}Q</span>
            </div>
            <div className="glass-card p-2.5">
              <span className="text-qm-dim block">Pipeline</span>
              <span className="text-qm-text font-mono text-[11px]">Hybrid QC-NN</span>
            </div>
          </div>

          {/* Impression summary */}
          <div className="glass-card p-4 border-l-2 border-l-qm-primary/40">
            <div className="flex items-center gap-2 mb-2">
              <Stethoscope className="w-4 h-4 text-qm-primary" />
              <span className="text-xs font-mono text-qm-text font-semibold">Impression</span>
            </div>
            <p className="text-xs text-qm-muted leading-relaxed">
              The hybrid quantum-classical model has completed analysis of the{' '}
              {report.modality.toLowerCase()}. The primary finding is{' '}
              <span className="text-qm-text font-semibold">"{topPrediction.label}"</span>{' '}
              with a simulated confidence of{' '}
              <span className="text-qm-text font-semibold">{topPrediction.confidence.toFixed(1)}%</span>.
              Below is a regional breakdown of detected features.
            </p>
          </div>

          {/* Findings list */}
          <div>
            <p className="text-xs font-mono text-qm-dim mb-2">Regional Findings</p>
            <div className="space-y-2">
              {report.findings.map((finding, i) => {
                const cfg = severityConfig[finding.severity];
                const Icon = cfg.icon;
                return (
                  <div
                    key={i}
                    className={`glass-card p-3 border ${cfg.border} animate-fade-in`}
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`shrink-0 w-7 h-7 rounded-lg ${cfg.bg} flex items-center justify-center`}>
                        <Icon className={`w-3.5 h-3.5 ${cfg.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className="text-xs font-mono text-qm-text font-semibold truncate">
                            {finding.region}
                          </span>
                          <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${cfg.bg} ${cfg.color} shrink-0`}>
                            {cfg.label}
                          </span>
                        </div>
                        <p className="text-xs text-qm-muted leading-relaxed">{finding.finding}</p>
                        <div className="mt-2 flex items-center gap-2">
                          <div className="flex-1 h-1 bg-qm-surface rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all duration-700 ${
                                finding.severity === 'normal' ? 'bg-qm-accent' :
                                finding.severity === 'low' ? 'bg-qm-primary' :
                                finding.severity === 'moderate' ? 'bg-amber-400' :
                                'bg-red-400'
                              }`}
                              style={{ width: `${finding.confidence}%`, transitionDelay: `${i * 80}ms` }}
                            />
                          </div>
                          <span className="text-[10px] font-mono text-qm-dim w-10 text-right shrink-0">
                            {finding.confidence.toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Severity summary */}
          <div className="glass-card p-3">
            <p className="text-xs font-mono text-qm-dim mb-2">Finding Summary</p>
            <div className="flex flex-wrap gap-2">
              {(['normal', 'low', 'moderate', 'high'] as const).map(sev => {
                const count = report.severityCounts[sev] ?? 0;
                if (count === 0) return null;
                const cfg = severityConfig[sev];
                return (
                  <span
                    key={sev}
                    className={`text-[10px] font-mono px-2 py-1 rounded ${cfg.bg} ${cfg.color}`}
                  >
                    {count} {cfg.label}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Recommendation */}
          <div className="glass-card p-4 border-l-2 border-l-amber-400/40">
            <div className="flex items-center gap-2 mb-2">
              <Info className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-mono text-qm-text font-semibold">Simulated Recommendation</span>
            </div>
            <p className="text-xs text-qm-muted leading-relaxed">{report.recommendation}</p>
          </div>

          {/* Disclaimer */}
          <div className="flex items-start gap-2 px-3 py-2 rounded-lg bg-qm-secondary/10 border border-qm-secondary/20">
            <AlertTriangle className="w-4 h-4 text-qm-secondary shrink-0 mt-0.5" />
            <p className="text-[11px] text-qm-muted leading-relaxed">
              This report is entirely simulated for demonstration purposes. No real medical
              diagnosis is being performed. The findings, confidences, and recommendations are
              generated from hardcoded data and do not reflect any actual analysis of the image.
              Never use this tool for medical decisions.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
