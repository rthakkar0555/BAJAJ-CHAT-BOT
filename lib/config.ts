export const config = {
  n8n: {
    fileUploadWebhook: process.env.NEXT_PUBLIC_N8N_FILE_UPLOAD_WEBHOOK || 'https://rishi0555.app.n8n.cloud/webhook/377af27e-a93c-428b-b802-1534a86a72bf',
    chatWebhook: process.env.NEXT_PUBLIC_N8N_CHAT_WEBHOOK || 'https://rishi0555.app.n8n.cloud/webhook/adc8a081-9993-40ff-9e5d-382ca996999b/chat'
  }
} 