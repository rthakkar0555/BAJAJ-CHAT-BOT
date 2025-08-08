'use client'

import { CheckCircle, Loader2 } from 'lucide-react'
import { UploadStage } from '@/app/page'

interface StatusProgressProps {
  stage: UploadStage
  type: 'upload'
}

const uploadSteps = [
  { key: 'uploading', label: 'Uploading file...' },
  { key: 'analyzing', label: 'Analyzing the document...' },
  { key: 'embedding', label: 'Creating vector embeddings...' },
  { key: 'storing', label: 'Storing in vector database...' },
  { key: 'complete', label: '✅ Document uploaded and ready!' }
]

export function StatusProgress({ stage, type }: StatusProgressProps) {
  const steps = uploadSteps
  const currentStepIndex = steps.findIndex(step => step.key === stage)

  return (
    <div className="space-y-3">
      {steps.map((step, index) => {
        const isActive = index === currentStepIndex
        const isCompleted = index < currentStepIndex
        const isCurrent = index === currentStepIndex

        return (
          <div
            key={step.key}
            className={`flex items-center space-x-3 p-3 rounded-lg transition-all ${
              isActive || isCompleted
                ? 'bg-[#E1F7F5] border border-[#9AC8CD]'
                : 'bg-gray-50 border border-gray-200'
            }`}
          >
            <div className="flex-shrink-0">
              {isCompleted ? (
                <CheckCircle className="w-5 h-5 text-green-600" />
              ) : isCurrent ? (
                <Loader2 className="w-5 h-5 text-[#0E46A3] animate-spin" />
              ) : (
                <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
              )}
            </div>
            <span
              className={`text-sm font-medium ${
                isActive || isCompleted ? 'text-[#1E0342]' : 'text-gray-500'
              }`}
            >
              {step.label}
            </span>
          </div>
        )
      })}
    </div>
  )
}
