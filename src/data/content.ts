import {
  Microscope,
  Brain,
  Atom,
  Scan,
  Layers,
  CircuitBoard,
  Activity,
  Target,
  Cpu,
  Network,
  Eye,
} from 'lucide-react';

export type LucideIcon = typeof Microscope;

export interface PipelineStage {
  id: number;
  title: string;
  short: string;
  description: string;
  icon: LucideIcon;
  detail: string;
}

export const pipelineStages: PipelineStage[] = [
  {
    id: 0,
    title: 'Medical Image',
    short: 'Input',
    description: 'A biomedical image enters the pipeline for research analysis.',
    icon: Scan,
    detail: 'Images are acquired from research datasets. No real patient data is used in this prototype.',
  },
  {
    id: 1,
    title: 'Preprocessing',
    short: 'Prepare',
    description: 'The image is resized, normalized, and prepared for feature extraction.',
    icon: Layers,
    detail: 'Standard preprocessing includes resizing to 224×224, pixel normalization to [0,1], and contrast enhancement.',
  },
  {
    id: 2,
    title: 'Classical Feature Extraction',
    short: 'Extract',
    description: 'A pre-trained CNN extracts spatial and statistical features from the image.',
    icon: Eye,
    detail: 'A classical convolutional neural network processes the image to produce a high-dimensional feature vector.',
  },
  {
    id: 3,
    title: 'Feature Reduction',
    short: 'Reduce',
    description: 'High-dimensional features are reduced to a manageable size for quantum encoding.',
    icon: Network,
    detail: 'PCA or learned dimensionality reduction compresses features to match the number of available qubits.',
  },
  {
    id: 4,
    title: 'Quantum Feature Encoding',
    short: 'Encode',
    description: 'Selected features are mapped into quantum states using angle encoding.',
    icon: Atom,
    detail: 'Each feature value is encoded as a rotation angle on a quantum gate, preparing a superposition state.',
  },
  {
    id: 5,
    title: 'Variational Quantum Circuit',
    short: 'Process',
    description: 'A parameterized quantum circuit processes the encoded quantum information.',
    icon: CircuitBoard,
    detail: 'Layers of entangling gates and single-qubit rotations transform the quantum state. Parameters are learned during training.',
  },
  {
    id: 6,
    title: 'Classical Neural Network',
    short: 'Combine',
    description: 'Quantum measurement results are fed into a classical network for final prediction.',
    icon: Cpu,
    detail: 'A classical optimizer adjusts circuit parameters using gradient-based methods. The hybrid loop iterates.',
  },
  {
    id: 7,
    title: 'Prediction',
    short: 'Output',
    description: 'The hybrid system produces a research prediction for evaluation.',
    icon: Target,
    detail: 'The final output is a classification probability. All outputs are simulated for this demonstration.',
  },
];

export interface ProblemCard {
  title: string;
  description: string;
  icon: LucideIcon;
}

export const problemCards: ProblemCard[] = [
  {
    title: 'High-Dimensional Data',
    description: 'Biomedical images contain complex spatial and statistical patterns across thousands of dimensions.',
    icon: Layers,
  },
  {
    title: 'Early Detection',
    description: 'Subtle disease indicators may be difficult to identify consistently, even for experienced specialists.',
    icon: Microscope,
  },
  {
    title: 'Computational Complexity',
    description: 'Advanced machine-learning models can require substantial computational resources as data grows.',
    icon: Cpu,
  },
];

export interface HowItWorksStep {
  step: string;
  title: string;
  description: string;
  icon: LucideIcon;
  detail: string;
}

export const howItWorksSteps: HowItWorksStep[] = [
  {
    step: '01',
    title: 'Acquire',
    description: 'A biomedical image enters the pipeline from a research dataset.',
    icon: Scan,
    detail: 'Images are sourced from publicly available medical research datasets. No real patient data is used.',
  },
  {
    step: '02',
    title: 'Preprocess',
    description: 'The image is normalized, resized, and prepared for analysis.',
    icon: Layers,
    detail: 'Pixel values are normalized to [0,1], images are resized to a standard resolution, and noise is reduced.',
  },
  {
    step: '03',
    title: 'Extract',
    description: 'A classical model extracts useful visual features from the image.',
    icon: Eye,
    detail: 'A pre-trained CNN (e.g., ResNet) extracts a feature vector capturing spatial patterns and textures.',
  },
  {
    step: '04',
    title: 'Encode',
    description: 'Selected features are mapped into quantum states via angle encoding.',
    icon: Atom,
    detail: 'Feature values are scaled to [0, π] and applied as rotation angles on Ry gates, creating quantum superpositions.',
  },
  {
    step: '05',
    title: 'Optimize',
    description: 'A variational quantum circuit processes the encoded information.',
    icon: CircuitBoard,
    detail: 'Parameterized gates with trainable weights transform the quantum state. A classical optimizer tunes the parameters.',
  },
  {
    step: '06',
    title: 'Predict',
    description: 'The hybrid system produces a research prediction.',
    icon: Target,
    detail: 'Quantum measurements are combined with classical post-processing to produce a classification output.',
  },
  {
    step: '07',
    title: 'Evaluate',
    description: 'Performance is compared against classical baselines.',
    icon: Activity,
    detail: 'Metrics like accuracy, precision, recall, and F1 score are computed. All results in this demo are simulated.',
  },
];

export interface ComparisonMetric {
  metric: string;
  classical: string;
  hybrid: string;
}

export const comparisonMetrics: ComparisonMetric[] = [
  {
    metric: 'Feature Representation',
    classical: 'Fixed feature maps in high-dimensional classical space',
    hybrid: 'Quantum feature maps mapping data to exponentially large Hilbert space',
  },
  {
    metric: 'Model Architecture',
    classical: 'CNN + fully connected layers',
    hybrid: 'CNN feature extractor + variational quantum circuit + classical output',
  },
  {
    metric: 'Optimization',
    classical: 'Standard gradient descent (backpropagation)',
    hybrid: 'Hybrid loop: classical optimizer updates quantum circuit parameters via parameter-shift rules',
  },
  {
    metric: 'Inference Workflow',
    classical: 'Forward pass through neural network',
    hybrid: 'Classical preprocessing → quantum circuit execution → classical post-processing',
  },
  {
    metric: 'Hardware Requirements',
    classical: 'GPUs / TPUs with high memory',
    hybrid: 'GPUs for classical part + quantum processor or simulator for circuit execution',
  },
  {
    metric: 'Research Potential',
    classical: 'Mature field with well-understood limitations',
    hybrid: 'Emerging field — quantum advantage for medical imaging is an open research question',
  },
];

export interface ResearchTopic {
  title: string;
  description: string;
  icon: LucideIcon;
}

export const researchTopics: ResearchTopic[] = [
  {
    title: 'Quantum Feature Maps',
    description: 'Mapping classical data into quantum states may allow access to patterns that are hard to capture classically.',
    icon: Atom,
  },
  {
    title: 'Variational Quantum Circuits',
    description: 'Parameterized circuits with trainable gates form the core of near-term quantum machine learning.',
    icon: CircuitBoard,
  },
  {
    title: 'Parameterized Quantum Circuits',
    description: 'Circuits with adjustable gate angles that are optimized classically, enabling hybrid training loops.',
    icon: Network,
  },
  {
    title: 'Hybrid Optimization',
    description: 'Classical optimizers tune quantum circuit parameters, combining the strengths of both paradigms.',
    icon: Cpu,
  },
  {
    title: 'Quantum Kernels',
    description: 'Quantum kernel methods estimate inner products in quantum feature space for classification tasks.',
    icon: Brain,
  },
  {
    title: 'Dimensionality Reduction',
    description: 'Reducing feature dimensions to match available qubits is a key practical challenge.',
    icon: Layers,
  },
  {
    title: 'Biomedical Imaging',
    description: 'Medical images contain rich spatial information that may benefit from quantum-enhanced representations.',
    icon: Microscope,
  },
  {
    title: 'Quantum ML Research',
    description: 'An active research field exploring whether quantum computation can improve machine learning tasks.',
    icon: Activity,
  },
];

export const researchQuestions: string[] = [
  'Can quantum feature maps represent biomedical patterns more efficiently than classical methods?',
  'Can hybrid architectures improve classification performance under constrained data conditions?',
  'How does model performance change with increasing circuit depth and qubit count?',
  'What are the practical limitations of current quantum hardware for medical imaging tasks?',
  'Can quantum kernels offer advantages for high-dimensional biomedical feature spaces?',
  'How sensitive are variational quantum circuits to noise and decoherence in practice?',
];

export interface DemoImage {
  id: string;
  label: string;
  pattern: string;
  description: string;
  modality: string;
  predictions: { label: string; confidence: number }[];
  features: number[];
}

export const demoImages: DemoImage[] = [
  {
    id: 'A',
    label: 'Demo Pattern A',
    pattern: 'Cellular Texture',
    description: 'Simulated cellular texture — histology-style',
    modality: 'Simulated Histology Slide',
    predictions: [
      { label: 'Normal Tissue', confidence: 12.3 },
      { label: 'Benign Pattern', confidence: 23.1 },
      { label: 'Atypical Cells', confidence: 64.6 },
    ],
    features: [0.82, 0.61, 0.74, 0.42, 0.68, 0.31, 0.55, 0.47],
  },
  {
    id: 'B',
    label: 'Demo Pattern B',
    pattern: 'Tissue Structure',
    description: 'Simulated tissue structure — MRI-style',
    modality: 'Simulated MRI Slice',
    predictions: [
      { label: 'Normal Scan', confidence: 78.4 },
      { label: 'Low Confidence', confidence: 14.2 },
      { label: 'Anomaly Detected', confidence: 7.4 },
    ],
    features: [0.45, 0.72, 0.38, 0.61, 0.29, 0.54, 0.67, 0.43],
  },
  {
    id: 'C',
    label: 'Demo Pattern C',
    pattern: 'Neural Network',
    description: 'Simulated neural network — retinal scan style',
    modality: 'Simulated Retinal Fundus',
    predictions: [
      { label: 'Healthy Retina', confidence: 8.1 },
      { label: 'Mild Abnormality', confidence: 31.5 },
      { label: 'Moderate Pattern', confidence: 60.4 },
    ],
    features: [0.71, 0.39, 0.58, 0.83, 0.46, 0.62, 0.35, 0.51],
  },
  {
    id: 'D',
    label: 'Demo Pattern D',
    pattern: 'Chest X-Ray',
    description: 'Simulated chest radiograph — X-ray style',
    modality: 'Simulated Chest X-Ray',
    predictions: [
      { label: 'Normal Study', confidence: 9.8 },
      { label: 'Inflammatory Pattern', confidence: 26.3 },
      { label: 'Focal Opacity Detected', confidence: 63.9 },
    ],
    features: [0.68, 0.55, 0.79, 0.41, 0.63, 0.37, 0.48, 0.52],
  },
];

export interface AnalysisStep {
  id: string;
  label: string;
  description: string;
}

export const analysisSteps: AnalysisStep[] = [
  { id: 'preprocess', label: 'Classical Preprocessing', description: 'Resizing and normalizing input image' },
  { id: 'extract', label: 'Feature Extraction', description: 'CNN extracting visual features' },
  { id: 'encode', label: 'Quantum Encoding', description: 'Angle encoding features into quantum states' },
  { id: 'circuit', label: 'Variational Inference', description: 'Quantum circuit processing encoded state' },
  { id: 'predict', label: 'Prediction', description: 'Hybrid model producing classification' },
];

export interface MetricData {
  metric: string;
  value: number;
  description: string;
}

export const modelMetrics: MetricData[] = [
  { metric: 'Accuracy', value: 87.4, description: 'Simulated — not from real clinical data' },
  { metric: 'Precision', value: 84.2, description: 'Simulated — not from real clinical data' },
  { metric: 'Recall', value: 89.1, description: 'Simulated — not from real clinical data' },
  { metric: 'F1 Score', value: 86.6, description: 'Simulated — not from real clinical data' },
  { metric: 'ROC-AUC', value: 91.3, description: 'Simulated — not from real clinical data' },
  { metric: 'Specificity', value: 82.8, description: 'Simulated — not from real clinical data' },
];

// Simulated training loss data (30 epochs)
export const trainingLossData = Array.from({ length: 30 }, (_, i) => {
  const epoch = i + 1;
  const trainLoss = 1.8 * Math.exp(-0.12 * epoch) + 0.08 + (Math.random() - 0.5) * 0.03;
  const valLoss = 1.9 * Math.exp(-0.1 * epoch) + 0.12 + (Math.random() - 0.5) * 0.04;
  return {
    epoch,
    training: parseFloat(trainLoss.toFixed(4)),
    validation: parseFloat(valLoss.toFixed(4)),
  };
});

// Simulated accuracy comparison over epochs
export const accuracyData = Array.from({ length: 30 }, (_, i) => {
  const epoch = i + 1;
  const classical = 75 + 15 * (1 - Math.exp(-0.1 * epoch)) + (Math.random() - 0.5) * 1.5;
  const hybrid = 65 + 22 * (1 - Math.exp(-0.08 * epoch)) + (Math.random() - 0.5) * 1.8;
  return {
    epoch,
    classical: parseFloat(Math.min(90, classical).toFixed(1)),
    hybrid: parseFloat(Math.min(92, hybrid).toFixed(1)),
  };
});

// Simulated model comparison radar data
export const modelComparisonData = [
  { metric: 'Accuracy', classical: 82, hybrid: 87 },
  { metric: 'Precision', classical: 80, hybrid: 84 },
  { metric: 'Recall', classical: 83, hybrid: 89 },
  { metric: 'F1 Score', classical: 81, hybrid: 86 },
  { metric: 'ROC-AUC', classical: 85, hybrid: 91 },
  { metric: 'Efficiency', classical: 78, hybrid: 72 },
];

// Simulated quantum measurement probabilities for 3 qubits (8 states)
export const probabilityData = [
  { state: '000', probability: 0.31 },
  { state: '001', probability: 0.18 },
  { state: '010', probability: 0.21 },
  { state: '011', probability: 0.12 },
  { state: '100', probability: 0.09 },
  { state: '101', probability: 0.05 },
  { state: '110', probability: 0.03 },
  { state: '111', probability: 0.01 },
];

// Simulated feature vectors
export const featureVectorData = [
  { feature: 'Feature 01', value: 0.82, label: 'f₁' },
  { feature: 'Feature 02', value: 0.61, label: 'f₂' },
  { feature: 'Feature 03', value: 0.74, label: 'f₃' },
  { feature: 'Feature 04', value: 0.42, label: 'f₄' },
  { feature: 'Feature 05', value: 0.68, label: 'f₅' },
  { feature: 'Feature 06', value: 0.31, label: 'f₆' },
  { feature: 'Feature 07', value: 0.55, label: 'f₇' },
  { feature: 'Feature 08', value: 0.47, label: 'f₈' },
];

export interface TimelineStep {
  step: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export const hackathonTimeline: TimelineStep[] = [
  {
    step: '01',
    title: 'Problem',
    description: 'Identified the challenge of high-dimensional biomedical image analysis.',
    icon: Target,
  },
  {
    step: '02',
    title: 'Research',
    description: 'Studied quantum machine learning literature and variational circuits.',
    icon: Brain,
  },
  {
    step: '03',
    title: 'Hybrid Architecture',
    description: 'Designed a classical-quantum pipeline for image feature processing.',
    icon: Network,
  },
  {
    step: '04',
    title: 'Prototype',
    description: 'Built an interactive demonstration of the hybrid pipeline.',
    icon: CircuitBoard,
  },
  {
    step: '05',
    title: 'Evaluation',
    description: 'Compared hybrid approach against classical baselines using simulated metrics.',
    icon: Activity,
  },
];

export const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Lab', path: '/lab' },
  { label: 'How It Works', path: '/how-it-works' },
  { label: 'Architecture', path: '/architecture' },
  { label: 'Results', path: '/results' },
  { label: 'Research', path: '/research' },
  { label: 'About', path: '/about' },
];
