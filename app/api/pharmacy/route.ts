import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { medicineName = 'Metformin 500mg', pharmacyName = 'Apollo Pharmacy (Main Road)' } = await req.json();

    // Simulated realistic multi-turn pharmacy confirmation dialogue
    const transcript = [
      {
        id: '1',
        speaker: 'system',
        text: `Dialing ${pharmacyName}... Call connected in DEMO MODE.`,
        time: '00:01',
      },
      {
        id: '2',
        speaker: 'bot',
        text: `Hello, this is ElderCare AI calling on behalf of Demo User. Could you please confirm if ${medicineName} is in stock?`,
        time: '00:04',
      },
      {
        id: '3',
        speaker: 'pharmacist',
        text: `Good morning! Yes, checking inventory... Yes, we have ${medicineName} in stock (Strip of 10 tablets, ₹38.50).`,
        time: '00:09',
      },
      {
        id: '4',
        speaker: 'bot',
        text: `Thank you for confirming. Could you hold one strip for patient pickup today?`,
        time: '00:13',
      },
      {
        id: '5',
        speaker: 'pharmacist',
        text: `Certainly! Reserved under Demo Patient ID. We are open until 10:30 PM.`,
        time: '00:17',
      },
      {
        id: '6',
        speaker: 'system',
        text: `Call completed. Availability confirmed. (SIMULATED PROTOTYPE)`,
        time: '00:20',
      },
    ];

    return NextResponse.json({
      success: true,
      medicine: medicineName,
      pharmacy: pharmacyName,
      status: 'available',
      price: '₹38.50',
      packSize: 'Strip of 10 tablets',
      transcript,
    });
  } catch (error) {
    console.error('Pharmacy API route error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to simulate pharmacy call' },
      { status: 500 }
    );
  }
}
