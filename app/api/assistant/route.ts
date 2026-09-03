import { NextRequest, NextResponse } from 'next/server';
import { generateElderCareResponse } from '@/lib/gemini';
import { Language, Medicine } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      prompt,
      language = 'te',
      medicines = [],
      imageBase64,
      imageMimeType = 'image/jpeg',
      conversationHistory = [],
    } = body;

    const response = await generateElderCareResponse({
      prompt: prompt || 'Identify and guide on this medicine',
      language: language as Language,
      medicines: medicines as Medicine[],
      imageBase64,
      imageMimeType,
      conversationHistory,
    });

    return NextResponse.json(response);
  } catch (error) {
    console.error('API assistant route error:', error);
    return NextResponse.json(
      {
        language: 'en',
        answer: 'Sorry, I had trouble processing that. Please try again or tap the emergency button if you need urgent help.',
        warningLevel: 'none',
        needsProfessionalHelp: false,
        emergencyAvailable: true,
        speechText: 'Sorry, please try again.',
      },
      { status: 200 }
    );
  }
}
