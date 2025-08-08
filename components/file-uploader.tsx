'use client'

import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Button } from '@/components/ui/button'
import { Upload, FileText, CheckCircle, Sparkles, FileIcon } from 'lucide-react'
import { motion } from 'framer-motion'

interface FileUploaderProps {
  onFileUpload: (file: File) => void
  uploadedFile: File | null
  disabled: boolean
}

export function FileUploader({ onFileUpload, uploadedFile, disabled }: FileUploaderProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onFileUpload(acceptedFiles[0])
    }
  }, [onFileUpload])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'message/rfc822': ['.eml']
    },
    multiple: false,
    disabled
  })

  if (uploadedFile) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-center space-x-4 p-6 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl shadow-lg"
      >
        <div className="p-3 bg-green-500 rounded-xl">
          <CheckCircle className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <p className="font-bold text-green-800 text-lg">{uploadedFile.name}</p>
          <p className="text-sm text-green-600">
            {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB • Ready for analysis
          </p>
        </div>
        <div className="p-2 bg-green-100 rounded-lg">
          <Sparkles className="w-5 h-5 text-green-600" />
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 ${
          isDragActive
            ? 'border-[#0E46A3] bg-gradient-to-r from-[#E1F7F5] to-[#9AC8CD]/30 scale-105 shadow-lg'
            : 'border-[#9AC8CD] hover:border-[#0E46A3] hover:bg-gradient-to-r hover:from-[#E1F7F5] hover:to-[#9AC8CD]/30 hover:scale-[1.02] hover:shadow-md'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center space-y-6">
          <motion.div 
            className="w-20 h-20 bg-gradient-to-r from-[#0E46A3] to-[#1E0342] rounded-2xl flex items-center justify-center shadow-lg"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.3 }}
          >
            <Upload className="w-10 h-10 text-white" />
          </motion.div>
          
          <div className="space-y-3">
            <h3 className="text-xl font-bold text-[#1E0342]">
              Upload Policy Document
            </h3>
            <p className="text-[#0E46A3] text-base">
              {isDragActive
                ? 'Drop your document here...'
                : 'Drag & drop your document here, or click to browse'}
            </p>
          </div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              variant="outline" 
              className="border-2 border-[#0E46A3] text-[#0E46A3] hover:bg-[#0E46A3] hover:text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300"
              disabled={disabled}
            >
              <FileText className="w-5 h-5 mr-2" />
              Choose File
            </Button>
          </motion.div>

          <div className="bg-gradient-to-r from-[#E1F7F5] to-[#9AC8CD]/30 p-4 rounded-xl border border-[#9AC8CD]">
            <p className="text-sm font-semibold text-[#1E0342] mb-2">📄 Supported Formats:</p>
            <div className="flex items-center justify-center space-x-4 text-xs text-[#0E46A3]">
              <div className="flex items-center space-x-1">
                <FileIcon className="w-3 h-3" />
                <span>PDF</span>
              </div>
              <div className="flex items-center space-x-1">
                <FileIcon className="w-3 h-3" />
                <span>DOCX</span>
              </div>
              <div className="flex items-center space-x-1">
                <FileIcon className="w-3 h-3" />
                <span>Email</span>
              </div>
            </div>
            <p className="text-xs text-[#0E46A3] mt-2">Max file size: 10MB</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
