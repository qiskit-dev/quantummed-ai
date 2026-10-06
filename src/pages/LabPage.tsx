import { useState, useRef, useCallback } from 'react';
import {
  Upload,
  Image as ImageIcon,
  Play,
  RotateCcw,
  CheckCircle2,
  Loader2,
  Cpu,
  Atom,
  Target,
  Activity,
  Gauge,
  Microscope,
  Waves,
  BarChart3,
} from 'lucide-react';
import { QuantumCircuit } from '@/components/QuantumCircuit';
import { FeatureMap } from '@/components/FeatureMap';
import { DisclaimerBanner } from '@/components/DisclaimerBanner';
import { MedicalImageRenderer } from '@/components/MedicalImageRenderer';
import { AnalysisReport } from '@/components/AnalysisReport';
import { demoImages, analysisSteps } from '@/data/content';
import type { DemoImage } from '@/data/content';

type AnalysisState = 'idle' | 'running' | 'complete';

interface StepProgress {
  [key: string]: number;
}

export function LabPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedDemo, setSelectedDemo] = useState<DemoImage | null>(null);
  const [qubits, setQubits] = useState(6);
  const [analysisState, setAnalysisState] = useState<AnalysisState>('idle');
  const [currentStep, setCurrentStep] = useState(-1);
  const [stepProgress, setStepProgress] = useState<StepProgress>({});
  const [circuitTrigger, setCircuitTrigger] = useState(0);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach(t => clearTimeout(t));
    timersRef.current = [];
  }, []);

  const reset = useCallback(() => {
    clearTimers();
    setAnalysisState('idle');
    setCurrentStep(-1);
    setStepProgress({});
  }, [clearTimers]);

  const runAnalysis = useCallback(() => {
    if (!selectedDemo && !selectedImage) return;
    clearTimers();
    setAnalysisState('running');
    setCurrentStep(-1);
    setStepProgress({});

    analysisSteps.forEach((_, idx) => {
      const timer = setTimeout(() => {
        setCurrentStep(idx);
        setStepProgress(prev => ({ ...prev, [analysisSteps[idx].id]: 0 }));

        const progressInterval = setInterval(() => {
          setStepProgress(prev => {
            const current = prev[analysisSteps[idx].id] ?? 0;
            if (current >= 100) {
              clearInterval(progressInterval);
              return prev;
            }
            return { ...prev, [analysisSteps[idx].id]: Math.min(100, current + 10) };
          });
        }, 80);

        if (idx === 3) {
          setCircuitTrigger(c => c + 1);
        }

        if (idx === analysisSteps.length - 1) {
          const finalTimer = setTimeout(() => {
            setAnalysisState('complete');
          }, 800);
          timersRef.current.push(finalTimer);
        }
      }, idx * 1200);
      timersRef.current.push(timer);
    });
  }, [selectedDemo, selectedImage, clearTimers]);

  const handleFileSelect = useCallback((file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = e => {
        setSelectedImage(e.target?.result as string);
        setSelectedDemo(null);
        reset();
      };
      reader.readAsDataURL(file);
    }
  }, [reset]);

  const openFilePicker = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  }, []);

  const handleDemoSelect = useCallback((demo: DemoImage) => {
    setSelectedDemo(demo);
    setSelectedImage(null);
    reset();
  }, [reset]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  }, [handleFileSelect]);

  const hasImage = selectedImage || selectedDemo;
  const allPredictions = selectedDemo?.predictions ?? [
    { label: 'Normal Study', confidence: 18.4 },
    { label: 'Inflammatory Pattern', confidence: 25.5 },
    { label: 'Focal Opacity Detected', confidence: 56.1 },
  ];
  const topPrediction = allPredictions.reduce((a, b) => (a.confidence > b.confidence ? a : b));

  // Generate probability distribution from the selected demo
  const demoFeatures = selectedDemo?.features ?? [0.82, 0.61, 0.74, 0.42, 0.68, 0.31, 0.55, 0.47];
  const probStates = Array.from({ length: 8 }, (_, i) => {
    const state = i.toString(2).padStart(3, '0');
    const baseProb = demoFeatures[i % demoFeatures.length];
    const normalized = baseProb / demoFeatures.reduce((a, b) => a + b, 0);
    return { state, probability: parseFloat(normalized.toFixed(3)) };
  });
  const probMax = Math.max(...probStates.map(p => p.probability), 0.01);

  return (
    <div className="min-h-screen pt-8 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-qm-text tracking-tight mb-3">
            Quantum Diagnostics Lab
          </h1>
          <p className="text-sm text-qm-muted max-w-2xl">
            Upload an image or select a demo biomedical image to run a simulated hybrid quantum-classical analysis pipeline.
            Watch each stage execute step by step — from classical preprocessing through quantum encoding to a prediction.
          </p>
          <div className="mt-4">
            <DisclaimerBanner />
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left: Upload / Image */}
          <div className="space-y-4">
            <div className="glass-card p-6">
              <h3 className="text-sm font-mono text-qm-text tracking-wide mb-4">Biomedical Image Input</h3>

              {/* Upload area */}
              {!hasImage && (
                <div
                  onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={handleDrop}
                  onClick={openFilePicker}
                  className={`relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
                    dragOver
                      ? 'border-qm-primary bg-qm-primary/5'
                      : 'border-qm-border hover:border-qm-primary/40'
                  }`}
                >
                  <Upload className="w-10 h-10 text-qm-dim mx-auto mb-3" />
                  <p className="text-sm text-qm-text font-medium mb-1">Drag & drop a biomedical image</p>
                  <p className="text-xs text-qm-dim">or click to browse</p>
                  <p className="text-xs text-qm-dim mt-2">Supported: JPG, PNG, TIFF, DICOM (simulated)</p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    onChange={e => {
                      const file = e.target.files?.[0];
                      if (file) handleFileSelect(file);
                    }}
                  />
                </div>
              )}

              {/* Preview */}
              {hasImage && (
                <div className="relative">
                  <div className="relative aspect-square rounded-xl overflow-hidden border border-qm-border bg-qm-bg">
                    {selectedImage && (
                      <img src={selectedImage} alt="Uploaded preview" className="w-full h-full object-cover" />
                    )}
                    {selectedDemo && (
                      <MedicalImageRenderer
                        demo={selectedDemo}
                        scanning={analysisState === 'running'}
                      />
                    )}
                    {/* Scan animation overlay */}
                    {analysisState === 'running' && (
                      <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-qm-primary to-transparent animate-scan" />
                      </div>
                    )}
                    {/* Analysis complete overlay */}
                    {analysisState === 'complete' && (
                      <div className="absolute inset-0 border-2 border-qm-accent/40 rounded-xl pointer-events-none" />
                    )}
                  </div>

                  <div className="mt-3 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <ImageIcon className="w-4 h-4 text-qm-primary shrink-0" />
                      <span className="text-xs font-mono text-qm-muted truncate">
                        {selectedDemo ? selectedDemo.modality : 'Uploaded image'}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <button
                        onClick={openFilePicker}
                        className="text-xs text-qm-primary hover:text-qm-accent transition-colors"
                      >
                        Upload New
                      </button>
                      <button
                        onClick={() => { setSelectedImage(null); setSelectedDemo(null); reset(); }}
                        className="text-xs text-qm-dim hover:text-qm-text transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  {/* Image metadata when a demo is selected */}
                  {selectedDemo && (
                    <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                      <div className="glass-card p-2">
                        <span className="text-qm-dim block">Modality</span>
                        <span className="text-qm-text font-mono">{selectedDemo.modality}</span>
                      </div>
                      <div className="glass-card p-2">
                        <span className="text-qm-dim block">Resolution</span>
                        <span className="text-qm-text font-mono">224 × 224</span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Demo images */}
              <div className="mt-4">
                <p className="text-xs font-mono text-qm-dim mb-2">Or use a simulated biomedical image:</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {demoImages.map(demo => (
                    <button
                      key={demo.id}
                      onClick={() => handleDemoSelect(demo)}
                      className={`p-2 rounded-lg border text-center transition-all ${
                        selectedDemo?.id === demo.id
                          ? 'border-qm-primary bg-qm-primary/10'
                          : 'border-qm-border hover:border-qm-primary/40'
                      }`}
                    >
                      <div className="w-full aspect-square rounded mb-1 overflow-hidden bg-qm-bg">
                        <MedicalImageRenderer demo={demo} />
                      </div>
                      <span className="text-[10px] font-mono text-qm-muted block">{demo.label}</span>
                      <span className="text-[9px] text-qm-dim block">{demo.pattern}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Action buttons */}
              <div className="mt-4 flex gap-2">
                <button
                  onClick={runAnalysis}
                  disabled={!hasImage || analysisState === 'running'}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-qm-primary to-qm-secondary text-qm-bg font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-40"
                >
                  {analysisState === 'running' ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Analyzing...</>
                  ) : (
                    <><Play className="w-4 h-4" /> Run Analysis</>
                  )}
                </button>
                <button
                  onClick={reset}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg glass-card text-qm-muted hover:text-qm-text text-sm transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset
                </button>
              </div>
            </div>

            {/* Feature heatmap — shows during/after analysis */}
            {(analysisState === 'running' || analysisState === 'complete') && hasImage && (
              <div className="glass-card p-4 animate-fade-in">
                <div className="flex items-center gap-2 mb-3">
                  <Waves className="w-4 h-4 text-qm-primary" />
                  <h3 className="text-sm font-mono text-qm-text tracking-wide">Classical Feature Heatmap</h3>
                  <span className="ml-auto text-[10px] font-mono text-qm-secondary px-2 py-0.5 rounded bg-qm-secondary/10">
                    SIMULATED
                  </span>
                </div>
                <div className="grid grid-cols-8 gap-0.5 rounded-lg overflow-hidden">
                  {Array.from({ length: 64 }).map((_, i) => {
                    const features = selectedDemo?.features ?? [0.82, 0.61, 0.74, 0.42, 0.68, 0.31, 0.55, 0.47];
                    const val = features[i % features.length];
                    const intensity = currentStep >= 1 ? val : 0;
                    return (
                      <div
                        key={i}
                        className="aspect-square rounded-sm transition-all duration-500"
                        style={{
                          background: `rgba(0, 229, 255, ${intensity * 0.6})`,
                          transitionDelay: `${i * 15}ms`,
                        }}
                      />
                    );
                  })}
                </div>
                <p className="mt-2 text-[10px] font-mono text-qm-dim text-center">
                  Spatial activation map from classical feature extractor (simulated)
                </p>
              </div>
            )}
          </div>

          {/* Right: Analysis panel */}
          <div className="space-y-4">
            {/* Model status */}
            <div className="glass-card p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-mono text-qm-text tracking-wide">Model Status</h3>
                <div className="flex items-center gap-2">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      analysisState === 'running' ? 'bg-qm-accent animate-pulse' :
                      analysisState === 'complete' ? 'bg-qm-accent' : 'bg-qm-dim'
                    }`}
                  />
                  <span className="text-xs font-mono text-qm-muted">
                    {analysisState === 'idle' ? 'Ready' : analysisState === 'running' ? 'Processing' : 'Complete'}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="glass-card p-2.5">
                  <span className="text-qm-dim block">Model</span>
                  <span className="text-qm-text font-mono">Hybrid QC-NN</span>
                </div>
                <div className="glass-card p-2.5">
                  <span className="text-qm-dim block">Qubits</span>
                  <span className="text-qm-text font-mono">{qubits}</span>
                </div>
                <div className="glass-card p-2.5">
                  <span className="text-qm-dim block">Circuit Depth</span>
                  <span className="text-qm-text font-mono">3 layers</span>
                </div>
                <div className="glass-card p-2.5">
                  <span className="text-qm-dim block">Encoding</span>
                  <span className="text-qm-text font-mono">Angle</span>
                </div>
              </div>
            </div>

            {/* Progress steps */}
            <div className="glass-card p-4">
              <h3 className="text-sm font-mono text-qm-text tracking-wide mb-3">Analysis Pipeline</h3>
              <div className="space-y-3">
                {analysisSteps.map((step, idx) => {
                  const progress = stepProgress[step.id] ?? 0;
                  const isActive = currentStep === idx;
                  const isDone = progress >= 100;
                  const isPending = currentStep < idx;

                  return (
                    <div key={step.id} className="flex items-center gap-3">
                      <div className="shrink-0">
                        {isDone ? (
                          <CheckCircle2 className="w-4 h-4 text-qm-accent" />
                        ) : isActive ? (
                          <Loader2 className="w-4 h-4 text-qm-primary animate-spin" />
                        ) : (
                          <div className={`w-4 h-4 rounded-full border ${isPending ? 'border-qm-border' : 'border-qm-dim'}`} />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className={`text-xs font-mono ${isActive || isDone ? 'text-qm-text' : 'text-qm-dim'}`}>
                            {step.label}
                          </span>
                          <span className={`text-xs font-mono ${isDone ? 'text-qm-accent' : isActive ? 'text-qm-primary' : 'text-qm-dim'}`}>
                            {Math.round(progress)}%
                          </span>
                        </div>
                        <div className="h-1.5 bg-qm-surface rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-qm-primary to-qm-secondary transition-all duration-100"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                        {isActive && (
                          <p className="text-[10px] text-qm-dim mt-1 animate-fade-in">{step.description}</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quantum circuit — auto-runs during analysis */}
            <QuantumCircuit
              qubits={qubits}
              autoRunKey={circuitTrigger}
            />

            {/* Qubit selector */}
            <div className="glass-card p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-mono text-qm-text tracking-wide">Circuit Configuration</h3>
                <span className="text-xs font-mono text-qm-primary">{qubits} qubits</span>
              </div>
              <div className="flex gap-2">
                {[4, 5, 6, 7, 8].map(n => (
                  <button
                    key={n}
                    onClick={() => setQubits(n)}
                    className={`flex-1 py-2 rounded-lg text-xs font-mono transition-all ${
                      qubits === n
                        ? 'bg-qm-primary/15 text-qm-primary border border-qm-primary/30'
                        : 'glass-card text-qm-muted hover:text-qm-text'
                    }`}
                  >
                    {n}Q
                  </button>
                ))}
              </div>
            </div>

            {/* Feature map */}
            <FeatureMap
              animate={analysisState === 'complete' || (currentStep >= 2 && analysisState === 'running')}
              features={selectedDemo?.features}
            />

            {/* Prediction result */}
            {analysisState === 'complete' && hasImage && (
              <div className="glass-card p-6 border-qm-accent/30 qm-glow animate-fade-in">
                <div className="flex items-center gap-2 mb-4">
                  <Target className="w-5 h-5 text-qm-accent" />
                  <h3 className="text-sm font-mono text-qm-text tracking-wide">Prediction Result</h3>
                  <span className="ml-auto text-[10px] font-mono text-qm-secondary px-2 py-0.5 rounded bg-qm-secondary/10 border border-qm-secondary/20">
                    SIMULATED
                  </span>
                </div>

                {/* Top prediction */}
                <div className="glass-card p-4 mb-4 border-qm-primary/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono text-qm-dim">Top Classification</span>
                    <Microscope className="w-4 h-4 text-qm-primary" />
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-xl font-bold text-qm-text">{topPrediction.label}</p>
                    <p className="text-xl font-bold qm-gradient-text">{topPrediction.confidence.toFixed(1)}%</p>
                  </div>
                  <div className="mt-2 h-2 bg-qm-surface rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-qm-primary to-qm-accent transition-all duration-1000"
                      style={{ width: `${topPrediction.confidence}%` }}
                    />
                  </div>
                </div>

                {/* Multi-class breakdown */}
                <p className="text-xs font-mono text-qm-dim mb-2">All Class Probabilities</p>
                <div className="space-y-2 mb-4">
                  {allPredictions.map((pred, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="text-xs text-qm-muted w-28 sm:w-32 shrink-0 truncate">{pred.label}</span>
                      <div className="flex-1 h-4 bg-qm-surface rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-1000 ${
                            pred === topPrediction
                              ? 'bg-gradient-to-r from-qm-primary to-qm-accent'
                              : 'bg-qm-border'
                          }`}
                          style={{ width: `${pred.confidence}%`, transitionDelay: `${i * 200}ms` }}
                        />
                      </div>
                      <span className="text-xs font-mono text-qm-muted w-12 text-right shrink-0">
                        {pred.confidence.toFixed(1)}%
                      </span>
                    </div>
                  ))}
                </div>

                {/* Quantum measurement distribution */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <BarChart3 className="w-4 h-4 text-qm-primary" />
                    <span className="text-xs font-mono text-qm-dim">Quantum Measurement Distribution</span>
                  </div>
                  <div className="flex items-end gap-1 h-24 px-2">
                    {probStates.map((p, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1">
                        <div className="w-full flex items-end h-full">
                          <div
                            className="w-full rounded-t bg-gradient-to-t from-qm-primary/40 to-qm-primary transition-all duration-700"
                            style={{
                              height: `${(p.probability / probMax) * 100}%`,
                              transitionDelay: `${i * 80}ms`,
                            }}
                          />
                        </div>
                        <span className="text-[9px] font-mono text-qm-dim">{p.state}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Summary stats */}
                <div className="pt-4 border-t border-qm-border/30 grid grid-cols-3 gap-3 text-xs">
                  <div className="flex items-center gap-1.5">
                    <Atom className="w-3.5 h-3.5 text-qm-primary" />
                    <div>
                      <span className="text-qm-dim block">Quantum Encoding</span>
                      <span className="text-qm-text font-mono">Completed</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5 text-qm-secondary" />
                    <div>
                      <span className="text-qm-dim block">Variational Circuit</span>
                      <span className="text-qm-text font-mono">{qubits} qubits</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Gauge className="w-3.5 h-3.5 text-qm-accent" />
                    <div>
                      <span className="text-qm-dim block">Model</span>
                      <span className="text-qm-text font-mono">Hybrid QC-Vision</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-2 px-3 py-2 rounded-lg bg-qm-secondary/10 border border-qm-secondary/20">
                  <Activity className="w-4 h-4 text-qm-secondary shrink-0" />
                  <p className="text-xs text-qm-muted">
                    This is a simulated research demonstration. No real medical diagnosis is being performed.
                  </p>
                </div>
              </div>
            )}

            {/* Detailed analysis report */}
            {analysisState === 'complete' && hasImage && (
              <AnalysisReport
                selectedDemo={selectedDemo}
                topPrediction={topPrediction}
                qubits={qubits}
              />
            )}
          </div>
        </div>

        {/* Bottom disclaimer */}
        <div className="mt-8">
          <DisclaimerBanner variant="card" />
        </div>
      </div>
    </div>
  );
}
