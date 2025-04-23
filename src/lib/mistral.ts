import { MistralClient } from 'mistralai'

const client = new MistralClient(process.env.MISTRAL_API_KEY!)

const systemPrompt = `You are an AI assistant for a food business in the Middle East. 
Your task is to:
1. Detect the intent of customer messages (e.g., delivery, menu, pricing, hours)
2. Generate appropriate responses in the same language/dialect as the customer
3. Support both Arabic (Gulf/Levantine) and English

Common intents to detect:
- delivery_inquiry: Questions about delivery service
- menu_request: Requests for menu or specific items
- pricing: Questions about prices
- hours: Questions about operating hours
- location: Questions about physical location
- reservation: Requests for table booking`

export async function detectIntent(message: string) {
  const response = await client.chat({
    model: 'mistral-medium',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: `Detect the intent of this message: ${message}` }
    ]
  })

  const intent = response.choices[0].message.content.toLowerCase()
  
  const intentMap = {
    'delivery': 'delivery_inquiry',
    'menu': 'menu_request',
    'price': 'pricing',
    'hours': 'hours',
    'location': 'location',
    'reservation': 'reservation'
  }

  const detectedIntent = Object.entries(intentMap).find(([key]) => 
    intent.includes(key)
  )?.[1] || 'unknown'

  return {
    intent: detectedIntent,
    confidence: 0.95
  }
}

export async function generateResponse(
  message: string,
  intent: string,
  language: string = 'auto',
  dialect?: string
) {
  const prompt = `Generate a response to this ${language} message in the same language and dialect.
  Message: ${message}
  Detected Intent: ${intent}
  ${dialect ? `Dialect: ${dialect}` : ''}
  
  The response should be:
  1. Friendly and professional
  2. In the same language/dialect as the customer
  3. Include relevant emojis
  4. Be concise but informative`

  const response = await client.chat({
    model: 'mistral-medium',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: prompt }
    ]
  })

  return response.choices[0].message.content
}

export async function processMessage(message: string) {
  const intentResult = await detectIntent(message)
  const response = await generateResponse(message, intentResult.intent)
  
  return {
    intent: intentResult.intent,
    response,
    confidence: intentResult.confidence
  }
} 