'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Send, Sparkles, MessageCircle } from 'lucide-react'
import { motion } from 'framer-motion'

interface ChatInterfaceProps {
  onQuery: (query: string) => void
  disabled: boolean
  placeholder: string
}

export function ChatInterface({ onQuery, disabled, placeholder }: ChatInterfaceProps) {
  const [query, setQuery] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim() && !disabled) {
      onQuery(query.trim())
      setQuery('')
    }
  }

  const quickExamples = [
    "What is the coverage limit for dental procedures?",
    "Is maternity covered under this policy?",
    "What are the waiting periods?",
    "Are pre-existing conditions covered?"
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-[#0E46A3] to-[#1E0342] rounded-lg blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
          <div className="relative">
            <Textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={placeholder}
              disabled={disabled}
              className="min-h-[120px] pr-16 border-2 border-[#9AC8CD] focus:border-[#0E46A3] focus:ring-4 focus:ring-[#0E46A3]/20 rounded-xl resize-none transition-all duration-300 bg-white/90 backdrop-blur-sm text-[#1E0342] placeholder:text-[#0E46A3]/60"
            />
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                type="submit"
                size="sm"
                disabled={!query.trim() || disabled}
                className="absolute bottom-4 right-4 bg-gradient-to-r from-[#0E46A3] to-[#1E0342] hover:from-[#1E0342] hover:to-[#0E46A3] text-white shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
              </Button>
            </motion.div>
          </div>
        </div>
      </form>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="space-y-3"
      >
        <div className="flex items-center space-x-2">
          <Sparkles className="w-4 h-4 text-[#0E46A3]" />
          <span className="text-sm font-semibold text-[#1E0342]">Quick Examples:</span>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {quickExamples.map((example, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.1, duration: 0.3 }}
            >
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setQuery(example)}
                disabled={disabled}
                className="w-full text-xs border-2 border-[#9AC8CD] text-[#0E46A3] hover:bg-[#E1F7F5] hover:border-[#0E46A3] transition-all duration-300 bg-white/80 backdrop-blur-sm hover:shadow-md"
              >
                <MessageCircle className="w-3 h-3 mr-1" />
                {example.split(' ').slice(0, 3).join(' ')}...
              </Button>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {disabled && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg"
        >
          <p className="text-sm text-yellow-800 text-center">
            ⏳ Please wait while the document is being processed...
          </p>
        </motion.div>
      )}
    </motion.div>
  )
}
