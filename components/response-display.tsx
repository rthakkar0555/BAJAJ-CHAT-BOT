'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, XCircle, HelpCircle, IndianRupee, Sparkles, FileText, Clock } from 'lucide-react'
import { AIResponse } from '@/app/page'
import { motion } from 'framer-motion'

interface ResponseDisplayProps {
  response: AIResponse
}

export function ResponseDisplay({ response }: ResponseDisplayProps) {
  const getDecisionIcon = (decision: string) => {
    switch (decision) {
      case 'Approved':
        return <CheckCircle className="w-6 h-6 text-green-600" />
      case 'Rejected':
        return <XCircle className="w-6 h-6 text-red-600" />
      case 'Not Sure':
        return <HelpCircle className="w-6 h-6 text-yellow-600" />
      default:
        return null
    }
  }

  const getDecisionColor = (decision: string) => {
    switch (decision) {
      case 'Approved':
        return 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 text-green-800'
      case 'Rejected':
        return 'bg-gradient-to-r from-red-50 to-rose-50 border-red-200 text-red-800'
      case 'Not Sure':
        return 'bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-200 text-yellow-800'
      default:
        return 'bg-gradient-to-r from-gray-50 to-slate-50 border-gray-200 text-gray-800'
    }
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Card className="p-8 bg-white/95 backdrop-blur-md border-2 border-[#9AC8CD] shadow-xl rounded-2xl">
        <motion.div variants={itemVariants} className="flex items-center space-x-3 mb-8">
          <div className="p-3 bg-gradient-to-r from-[#0E46A3] to-[#1E0342] rounded-xl">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-[#1E0342]">AI Analysis Result</h3>
            <p className="text-[#0E46A3] text-sm">Powered by advanced document intelligence</p>
          </div>
        </motion.div>

        <div className="space-y-8">
          {/* Decision */}
          <motion.div 
            variants={itemVariants}
            className={`p-6 rounded-2xl border-2 shadow-lg ${getDecisionColor(response.decision)}`}
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="p-2 bg-white/80 rounded-lg">
                {getDecisionIcon(response.decision)}
              </div>
              <div>
                <span className="text-2xl font-bold">Decision: {response.decision}</span>
                {response.amount && (
                  <div className="flex items-center space-x-2 mt-2">
                    <div className="p-1 bg-white/80 rounded">
                      <IndianRupee className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-xl font-semibold text-green-700">{response.amount}</span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Justification */}
          <motion.div variants={itemVariants} className="bg-gradient-to-r from-[#E1F7F5] to-[#9AC8CD]/30 p-6 rounded-2xl border-2 border-[#9AC8CD] shadow-lg">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-white/80 rounded-lg">
                <FileText className="w-5 h-5 text-[#0E46A3]" />
              </div>
              <h4 className="text-lg font-semibold text-[#1E0342]">Justification</h4>
            </div>
            <p className="text-[#0E46A3] leading-relaxed text-base">{response.justification}</p>
          </motion.div>

          {/* Matched Clauses */}
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-[#0E46A3] to-[#1E0342] rounded-lg">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-[#1E0342]">Matched Clauses</h4>
            </div>
            
            <div className="grid gap-4">
              {response.matchedClauses.map((clause, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-white p-6 rounded-xl border-2 border-[#9AC8CD] shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex items-start justify-between mb-3">
                    <Badge 
                      variant="outline" 
                      className="bg-gradient-to-r from-[#E1F7F5] to-[#9AC8CD]/50 text-[#0E46A3] border-[#9AC8CD] font-semibold"
                    >
                      {Math.round(clause.confidence * 100)}% match
                    </Badge>
                  </div>
                  <p className="text-[#1E0342] italic leading-relaxed text-base">
                    "{clause.text}"
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Metadata */}
          <motion.div variants={itemVariants} className="pt-6 border-t-2 border-[#9AC8CD]">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                <span>Analysis completed at {new Date().toLocaleTimeString()}</span>
              </div>
              <Badge variant="outline" className="bg-gradient-to-r from-[#E1F7F5] to-[#9AC8CD]/50 text-[#0E46A3] border-[#9AC8CD] font-semibold">
                Semantic Analysis
              </Badge>
            </div>
          </motion.div>
        </div>
      </Card>
    </motion.div>
  )
}
