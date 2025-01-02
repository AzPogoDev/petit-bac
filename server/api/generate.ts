import { H3Event } from 'h3'
import OpenAI from 'openai'

export default defineEventHandler(async (event: H3Event) => {
  try {
    const { letter } = await readBody(event)

    const openai = new OpenAI({
      apiKey: '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'
    })

    const prompt = `Donne-moi exactement une réponse pour chaque catégorie commençant par la lettre "${letter}" :
    - Un prénom
    - Un légume ou un fruit
    - Un pays
    - Un objet
    - Un animal
    - Une personnalité
    Réponds uniquement au format JSON avec les clés: prenom, legume, pays, objet, animal, personnality`

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'user' as const,
          content: prompt
        }
      ],
      response_format: { type: 'json_object' as const }
    })

    const content = completion.choices[0].message.content
    return content ? JSON.parse(content) : null

  } catch (error) {
    console.error('OpenAI Error:', error)
    throw createError({
      statusCode: 500,
      message: error instanceof Error ? error.message : 'Erreur lors de la génération des réponses'
    })
  }
})