import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Upload, Sparkles } from 'lucide-react';
import '@n8n/chat/style.css';
import { createChat } from '@n8n/chat';
import { config } from '@/lib/config';

interface N8nChatWidgetProps {
  disabled?: boolean;
}

export const N8nChatWidget = ({ disabled = false }: N8nChatWidgetProps) => {
	const chatContainerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
    //
		if (chatContainerRef.current && !disabled) {
			createChat({
				webhookUrl: config.n8n.chatWebhook,
				target: chatContainerRef.current,
        mode:"fullscreen",
        defaultLanguage: 'en',
        initialMessages:["ask me about the insurance quary!!👋👋👋"],
        i18n: {
          en: {
            title: 'Bajaj Insurance Q&A',
            subtitle: "LLM Quary retrival bot",
            footer: '',
            closeButtonTooltip: "",
            getStarted: 'New Conversation',
            inputPlaceholder: 'Type your question.. end press enter',
          },
        },
			});
		}
	}, [disabled]);

	if (disabled) {
		return (
			<motion.div
				initial={{ opacity: 0, scale: 0.95 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.5 }}
				className="flex flex-col items-center justify-center h-[800px] bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border-2 border-dashed border-gray-300 shadow-lg"
			>
				<motion.div 
					className="p-4 bg-gradient-to-r from-[#0E46A3] to-[#1E0342] rounded-2xl mb-6"
					whileHover={{ scale: 1.1, rotate: 5 }}
					transition={{ duration: 0.3 }}
				>
					<Upload className="w-8 h-8 text-white" />
				</motion.div>
				<div className="text-center space-y-3">
					<h3 className="text-xl font-bold text-gray-700">Chat will be available after document upload</h3>
					<p className="text-sm text-gray-500 max-w-xs">Please upload a document first to start asking questions about your policy</p>
				</div>
			</motion.div>
		);
	}

	return (
		<div 
			ref={chatContainerRef} 
			className="w-full h-[800px] border-2 border-[#9AC8CD] rounded-2xl overflow-hidden shadow-lg bg-white"
		/>
	);
};