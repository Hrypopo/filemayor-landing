/**
 * Server-side "give me JSON" call for the AI proxy routes.
 *
 * Uses Claude when ANTHROPIC_API_KEY is set, otherwise Gemini when
 * GEMINI_API_KEY is set. Returns null when neither key is configured so
 * the route can answer 503 with a clear message.
 */

import Anthropic from '@anthropic-ai/sdk';

const GEMINI_MODEL = process.env.GEMINI_MODEL ?? 'gemini-2.0-flash';
const ANTHROPIC_MODEL = process.env.ANTHROPIC_MODEL ?? 'claude-opus-5-5';

export interface JsonRequest {
  /** Stable instructions. */
  system: string;
  /** Stable per-run context (e.g. the SOP) — cached across calls when possible. */
  context?: string;
  /** The per-call message. */
  user: string;
  /** JSON Schema the response must match (Claude enforces it; Gemini is asked). */
  schema?: Record<string, unknown>;
}

export class AiUnavailableError extends Error {}

export function aiConfigured(): boolean {
  return Boolean(process.env.ANTHROPIC_API_KEY || process.env.GEMINI_API_KEY);
}

function parseJson(text: string): unknown {
  const cleaned = text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```\s*$/, '').trim();
  return JSON.parse(cleaned);
}

async function viaClaude(req: JsonRequest): Promise<unknown> {
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  const system: Anthropic.Beta.BetaTextBlockParam[] = [{ type: 'text', text: req.system }];
  if (req.context) system.push({ type: 'text', text: req.context, cache_control: { type: 'ephemeral' } });

  const response = await client.beta.messages.create({
    model: ANTHROPIC_MODEL,
    max_tokens: 16000,
    betas: ['server-side-fallback-2026-07-01'],
    // Re-run a refused request on a fallback model instead of failing it.
    ...({ fallbacks: 'default' } as Record<string, unknown>),
    output_config: {
      effort: 'low',
      ...(req.schema ? { format: { type: 'json_schema', schema: req.schema } } : {}),
    },
    system,
    messages: [{ role: 'user', content: req.user }],
  } as Anthropic.Beta.MessageCreateParamsNonStreaming);

  if (response.stop_reason === 'refusal') throw new Error('The AI declined this request.');
  if (response.stop_reason === 'max_tokens') throw new Error('The AI response was cut off.');
  const text = response.content
    .filter((b): b is Anthropic.Beta.BetaTextBlock => b.type === 'text')
    .map((b) => b.text)
    .join('');
  return parseJson(text);
}

async function viaGemini(req: JsonRequest, key: string): Promise<unknown> {
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${encodeURIComponent(key)}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: req.context ? `${req.system}\n\n${req.context}` : req.system }] },
        contents: [{ role: 'user', parts: [{ text: req.user }] }],
        generationConfig: { temperature: 0.1, responseMimeType: 'application/json', maxOutputTokens: 8192 },
      }),
    },
  );
  if (!res.ok) throw new Error(`Gemini error ${res.status}`);
  const data = (await res.json()) as {
    candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
  };
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
  if (!text) throw new Error('Empty response from model');
  return parseJson(text);
}

/**
 * @param byokGeminiKey A user-supplied Gemini key (takes precedence; no server cost).
 */
export async function completeJson(req: JsonRequest, byokGeminiKey?: string | null): Promise<unknown> {
  if (byokGeminiKey) return viaGemini(req, byokGeminiKey);
  if (process.env.ANTHROPIC_API_KEY) return viaClaude(req);
  if (process.env.GEMINI_API_KEY) return viaGemini(req, process.env.GEMINI_API_KEY);
  throw new AiUnavailableError('AI service is not configured');
}
