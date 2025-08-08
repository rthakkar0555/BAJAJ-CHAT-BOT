'use client'

import { useState, useEffect } from 'react'
import { FileUploader } from '@/components/file-uploader'
import { StatusProgress } from '@/components/status-progress'
import { N8nChatWidget } from '@/components/n8n-chat-widget'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ErrorDisplay } from '@/components/error-display'
import { NetworkStatus } from '@/components/network-status'
import { motion } from 'framer-motion'
import { Sparkles, FileText, MessageCircle, Zap, Shield, Brain } from 'lucide-react'
import { config } from '@/lib/config'

export type UploadStage = 'idle' | 'uploading' | 'analyzing' | 'embedding' | 'storing' | 'complete'

export interface AIResponse {
  decision: string
  justification: string
  matchedClauses: { text: string; confidence: number }[]
  amount?: string
}

export default function DocumentIntelligenceAssistant() {
  const [uploadStage, setUploadStage] = useState<UploadStage>('idle')
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [isOnline, setIsOnline] = useState(true)
  const [isApiLoading, setIsApiLoading] = useState(false)
  const [documentId, setDocumentId] = useState<string | null>(null)

  // Network status detection
  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  const handleFileUpload = async (file: File) => {
    setIsApiLoading(true)
    setUploadedFile(file)
    setUploadStage('uploading')
    setUploadError(null)

    try {
      // Create FormData for file upload
      const formData = new FormData()
      formData.append('file', file)
      formData.append('fileName', file.name)
      formData.append('fileSize', file.size.toString())
      formData.append('fileType', file.type)

      // Simulate upload process stages with realistic timing
      const stages: UploadStage[] = ['uploading', 'analyzing', 'embedding', 'storing']
      const stageDurations = [1000, 2000, 1500, 1000]

      for (let i = 0; i < stages.length; i++) {
        setUploadStage(stages[i])
        await new Promise(resolve => setTimeout(resolve, stageDurations[i]))
      }

      // Make actual API call to your file upload webhook
      const response = await fetch(config.n8n.fileUploadWebhook, {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.status} ${response.statusText}`)
      }

      const result = await response.json()
      console.log('Upload successful:', result)
      
      // Store document ID or reference for chat context
      setDocumentId(result.documentId || Date.now().toString())
      setUploadStage('complete')
      setIsApiLoading(false)
    } catch (error) {
      console.error('Upload error:', error)
      setUploadStage('idle')
      setUploadedFile(null)
      setUploadError(error instanceof Error ? error.message : 'Upload failed. Please try again.')
      setIsApiLoading(false)
    }
  }

  const handleChatMessage = (message: string) => {
    console.log('User sent message:', message)
    // You can add additional logic here if needed
  }

  const handleChatResponse = (response: any) => {
    console.log('Bot response:', response)
    // You can add additional logic here if needed
  }

  const features = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: "Query-Based Retrieval",
      description: "Advanced LLM-powered document search and retrieval system"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "AI Answer Generator",
      description: "Intelligent response generation using Large Language Models"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Semantic Search",
      description: "Context-aware document analysis and intelligent matching"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E1F7F5] via-[#9AC8CD] to-[#0E46A3]/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-[#0E46A3] to-[#1E0342] rounded-2xl">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-[#1E0342] to-[#0E46A3] bg-clip-text text-transparent">
              Document Intelligence Assistant
            </h1>
          </div>
          <p className="text-[#0E46A3] text-xl max-w-2xl mx-auto">
            AI-powered insights from your insurance and legal documents with advanced semantic analysis
          </p>
          <div className="mt-4 p-4 bg-gradient-to-r from-yellow-50 to-amber-50 border-2 border-yellow-200 rounded-2xl max-w-2xl mx-auto">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-yellow-500 rounded-lg">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-yellow-800 font-semibold">⏱️ Please wait 2-3 minutes for LLM response</p>
                <p className="text-yellow-600 text-sm">Our AI takes time to analyze your document and generate accurate responses</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Features */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid md:grid-cols-3 gap-6 mb-12"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
            >
              <Card className="p-6 bg-white/80 backdrop-blur-sm border-2 border-[#9AC8CD] hover:shadow-xl transition-all duration-300 text-center">
                <div className="p-3 bg-gradient-to-r from-[#0E46A3] to-[#1E0342] rounded-xl w-fit mx-auto mb-4">
                  <div className="text-white">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-[#1E0342] mb-2">{feature.title}</h3>
                <p className="text-[#0E46A3] text-sm">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Left Column - Upload and Status */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            {/* Stage 1: Document Upload */}
            <Card className="p-8 bg-white/90 backdrop-blur-md border-2 border-[#9AC8CD] shadow-xl rounded-2xl">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-3 bg-gradient-to-r from-[#0E46A3] to-[#1E0342] rounded-xl">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-[#1E0342]">Upload Document</h2>
              </div>
              
              <FileUploader 
                onFileUpload={handleFileUpload}
                uploadedFile={uploadedFile}
                disabled={uploadStage !== 'idle' && uploadStage !== 'complete'}
              />
              
              {uploadStage !== 'idle' && uploadStage !== 'complete' && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-8"
                >
                  <StatusProgress 
                    stage={uploadStage}
                    type="upload"
                  />
                </motion.div>
              )}

              {uploadStage === 'complete' && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-500 rounded-lg">
                      <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <span className="text-green-800 font-bold text-lg">
                        ✅ Document uploaded and ready for analysis!
                      </span>
                      <p className="text-green-600 text-sm mt-1">
                        You can now ask questions about your document in the chat.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </Card>

            {/* Upload Error Display */}
            {uploadError && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <ErrorDisplay
                  title="Upload Failed"
                  message={uploadError}
                  onRetry={() => {
                    setUploadError(null)
                    setUploadStage('idle')
                    setUploadedFile(null)
                  }}
                />
              </motion.div>
            )}

            {/* Instructions */}
            <Card className="p-8 bg-white/70 backdrop-blur-sm border-2 border-[#9AC8CD] shadow-lg rounded-2xl">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-3 bg-gradient-to-r from-[#0E46A3] to-[#1E0342] rounded-xl">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#1E0342]">How to Use</h3>
              </div>
              
              <div className="space-y-4 text-[#0E46A3]">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-[#0E46A3] text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                  <p>Upload your insurance or legal document (PDF, DOCX, or Email)</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-[#0E46A3] text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                  <p>Wait for the document to be processed and analyzed</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-[#0E46A3] text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                  <p>Use the chat interface to ask questions about your document</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-[#0E46A3] text-white rounded-full flex items-center justify-center text-sm font-bold">4</div>
                  <p>Get AI-powered insights and structured responses</p>
                </div>
              </div>
              
                             <div className="mt-6 p-6 bg-gradient-to-r from-[#E1F7F5] to-[#9AC8CD]/30 rounded-2xl border border-[#9AC8CD]">
                 <p className="text-[#1E0342] font-semibold mb-3">💡 Example Queries:</p>
                 <ul className="text-[#0E46A3] space-y-2">
                   <li className="flex items-center space-x-2">
                     <div className="w-2 h-2 bg-[#0E46A3] rounded-full"></div>
                     <span>"46M, knee surgery, Pune, 3-month policy"</span>
                   </li>
                   <li className="flex items-center space-x-2">
                     <div className="w-2 h-2 bg-[#0E46A3] rounded-full"></div>
                     <span>"35F, maternity coverage, Mumbai, 1-year policy"</span>
                   </li>
                   <li className="flex items-center space-x-2">
                     <div className="w-2 h-2 bg-[#0E46A3] rounded-full"></div>
                     <span>"28M, dental procedures, Bangalore, 6-month policy"</span>
                   </li>
                 </ul>
               </div>
               
               <div className="mt-4 p-4 bg-gradient-to-r from-red-50 to-rose-50 border-2 border-red-200 rounded-xl">
                 <div className="flex items-center space-x-2">
                   <div className="p-1 bg-red-500 rounded">
                     <Sparkles className="w-4 h-4 text-white" />
                   </div>
                   <div>
                     <p className="text-red-800 font-semibold">⚠️ Important Note:</p>
                     <p className="text-red-600 text-sm">Please wait 1-2 minutes for AI to generate accurate responses after asking your question.</p>
                   </div>
                 </div>
               </div>
            </Card>
          </motion.div>

          {/* Right Column - N8N Chat Widget */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="space-y-6"
          >
            <Card className="p-8 bg-white/90 backdrop-blur-md border-2 border-[#9AC8CD] shadow-xl rounded-2xl">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-3 bg-gradient-to-r from-[#0E46A3] to-[#1E0342] rounded-xl">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-[#1E0342]">Ask Your Questions</h2>
              </div>
              
              <N8nChatWidget disabled={uploadStage !== 'complete'} />
            </Card>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16 space-y-4"
        >
          <NetworkStatus isOnline={isOnline} isLoading={isApiLoading} />
          <Badge variant="outline" className="bg-white/80 text-[#1E0342] border-[#9AC8CD] font-semibold px-4 py-2">
            Powered by n8n + Advanced LLM
          </Badge>
        </motion.div>
      </div>
    </div>
  )
}
