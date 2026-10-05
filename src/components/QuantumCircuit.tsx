import { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, Atom } from 'lucide-react';

interface Gate {
  type: 'H' | 'Ry' | 'CNOT' | 'X' | 'M';
  label: string;
  col: number;
  row: number;
  target?: number;
}

interface QuantumCircuitProps {
  qubits: number;
  onRun?: () => void;
  className?: string;
  autoRunKey?: number;
}

export function QuantumCircuit({ qubits, onRun, className = '', autoRunKey }: QuantumCircuitProps) {
  const [running, setRunning] = useState(false);
  const [activeCol, setActiveCol] = useState(-1);
  const [measured, setMeasured] = useState(false);

  const gates: Gate[] = [];
  for (let i = 0; i < qubits; i++) {
    gates.push({ type: 'H', label: 'H', col: 0, row: i });
    gates.push({ type: 'Ry', label: 'Ry(θ)', col: 1, row: i });
    // CNOT chain: qubit i controls qubit i+1
    if (i < qubits - 1) {
      gates.push({ type: 'CNOT', label: '●', col: 2, row: i, target: i + 1 });
    }
    gates.push({ type: 'M', label: 'M', col: 3, row: i });
  }

  const runCircuit = () => {
    if (running) return;
    setRunning(true);
    setMeasured(false);
    onRun?.();

    const cols = [0, 1, 2, 3];
    cols.forEach((c, idx) => {
      setTimeout(() => {
        setActiveCol(c);
        if (idx === cols.length - 1) {
          setTimeout(() => {
            setMeasured(true);
            setRunning(false);
            setActiveCol(-1);
          }, 500);
        }
      }, idx * 600);
    });
  };

  const reset = () => {
    setRunning(false);
    setActiveCol(-1);
    setMeasured(false);
  };

  useEffect(() => {
    reset();
  }, [qubits]);

  const runCircuitRef = useRef(runCircuit);
  runCircuitRef.current = runCircuit;

  useEffect(() => {
    if (autoRunKey !== undefined && autoRunKey > 0) {
      runCircuitRef.current();
    }
  }, [autoRunKey]);

  const numCols = 4;
  const colWidth = 80;
  const rowHeight = 50;
  const padding = 40;
  const width = padding * 2 + numCols * colWidth;
  const height = padding + qubits * rowHeight + 20;

  const gateColors: Record<string, string> = {
    H: '#00E5FF',
    Ry: '#7C5CFF',
    CNOT: '#00FFD0',
    X: '#00FFD0',
    M: '#FFB347',
  };

  return (
    <div className={`glass-card p-4 sm:p-6 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Atom className="w-5 h-5 text-qm-primary" />
          <h4 className="text-sm font-mono text-qm-text tracking-wide">Quantum Circuit</h4>
        </div>
        <div className="flex gap-2">
          <button
            onClick={runCircuit}
            disabled={running}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-qm-primary/15 text-qm-primary border border-qm-primary/30 hover:bg-qm-primary/25 transition-colors disabled:opacity-50"
          >
            <Play className="w-3.5 h-3.5" />
            {running ? 'Running...' : 'Run Circuit'}
          </button>
          <button
            onClick={reset}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg glass-card text-qm-muted hover:text-qm-text transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>
        </div>
      </div>

      <div className="overflow-x-auto scrollbar-thin">
        <svg width={width} height={height} className="mx-auto">
          {/* Qubit lines */}
          {Array.from({ length: qubits }).map((_, i) => {
            const y = padding + i * rowHeight + rowHeight / 2;
            return (
              <g key={`line-${i}`}>
                <text
                  x={10}
                  y={y + 4}
                  fill="#8B9DC3"
                  fontSize={12}
                  fontFamily="JetBrains Mono, monospace"
                >
                  q{i}
                </text>
                <line
                  x1={padding}
                  y1={y}
                  x2={width - padding}
                  y2={y}
                  stroke={activeCol >= 0 ? '#1A2350' : '#1A2350'}
                  strokeWidth={2}
                />
                {/* Active line glow */}
                {activeCol >= 0 && (
                  <line
                    x1={padding + activeCol * colWidth + colWidth / 2}
                    y1={y}
                    x2={width - padding}
                    y2={y}
                    stroke="#00E5FF"
                    strokeWidth={2}
                    opacity={0.3}
                  />
                )}
              </g>
            );
          })}

          {/* Gates */}
          {gates.map((gate, idx) => {
            const x = padding + gate.col * colWidth + colWidth / 2;
            const y = padding + gate.row * rowHeight + rowHeight / 2;
            const isActive = activeCol === gate.col;
            const color = gateColors[gate.type] ?? '#00E5FF';

            return (
              <g key={`gate-${idx}`} style={{ transition: 'all 0.3s ease' }}>
                {/* CNOT connection line */}
                {gate.type === 'CNOT' && gate.target !== undefined && (
                  <line
                    x1={x}
                    y1={y}
                    x2={x}
                    y2={padding + gate.target * rowHeight + rowHeight / 2}
                    stroke={isActive ? '#00FFD0' : '#1A2350'}
                    strokeWidth={2}
                    opacity={isActive ? 1 : 0.5}
                  />
                )}
                {/* CNOT target (X gate) */}
                {gate.type === 'CNOT' && gate.target !== undefined && (
                  <circle
                    cx={x}
                    cy={padding + gate.target * rowHeight + rowHeight / 2}
                    r={isActive ? 10 : 8}
                    fill="none"
                    stroke={isActive ? '#00FFD0' : '#1A2350'}
                    strokeWidth={2}
                    style={{ transition: 'all 0.3s ease' }}
                  />
                )}
                {gate.type === 'CNOT' && gate.target !== undefined && (
                  <line
                    x1={x - 6}
                    y1={padding + gate.target * rowHeight + rowHeight / 2}
                    x2={x + 6}
                    y2={padding + gate.target * rowHeight + rowHeight / 2}
                    stroke={isActive ? '#00FFD0' : '#1A2350'}
                    strokeWidth={2}
                  />
                )}
                {gate.type === 'CNOT' && gate.target !== undefined && (
                  <line
                    x1={x}
                    y1={padding + gate.target * rowHeight + rowHeight / 2 - 6}
                    x2={x}
                    y2={padding + gate.target * rowHeight + rowHeight / 2 + 6}
                    stroke={isActive ? '#00FFD0' : '#1A2350'}
                    strokeWidth={2}
                  />
                )}

                {/* CNOT control dot */}
                {gate.type === 'CNOT' && (
                  <circle
                    cx={x}
                    cy={y}
                    r={isActive ? 7 : 5}
                    fill={isActive ? '#00FFD0' : '#1A2350'}
                    style={{ transition: 'all 0.3s ease' }}
                  />
                )}

                {/* Regular gates */}
                {gate.type !== 'CNOT' && (
                  <>
                    <rect
                      x={x - 22}
                      y={y - 16}
                      width={44}
                      height={32}
                      rx={6}
                      fill={isActive ? `${color}30` : `${color}15`}
                      stroke={color}
                      strokeWidth={isActive ? 2 : 1}
                      style={{
                        transition: 'all 0.3s ease',
                        filter: isActive ? `drop-shadow(0 0 8px ${color}80)` : 'none',
                      }}
                    />
                    <text
                      x={x}
                      y={y + 4}
                      textAnchor="middle"
                      fill={color}
                      fontSize={gate.type === 'Ry' ? 10 : 12}
                      fontFamily="JetBrains Mono, monospace"
                      fontWeight={600}
                    >
                      {gate.label}
                    </text>
                  </>
                )}
              </g>
            );
          })}

          {/* Measurement indicators */}
          {measured &&
            Array.from({ length: qubits }).map((_, i) => {
              const x = padding + 3 * colWidth + colWidth / 2;
              const y = padding + i * rowHeight + rowHeight / 2;
              return (
                <circle
                  key={`measured-${i}`}
                  cx={x}
                  cy={y}
                  r={4}
                  fill="#FFB347"
                  opacity={0.8}
                  className="animate-pulse-glow"
                />
              );
            })}
        </svg>
      </div>

      <p className="mt-3 text-[10px] font-mono text-qm-dim text-center">
        SIMULATED · {qubits} qubit{qubits > 1 ? 's' : ''} · Hadamard + Ry + Entanglement + Measurement
      </p>
    </div>
  );
}
