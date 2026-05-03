import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, mobileNumber, service } = body as {
      name: string;
      mobileNumber: string;
      service: string;
    };

    const savedService = service?.trim() || 'resume';

    if (!name || !mobileNumber) {
      return NextResponse.json(
        { error: 'Missing enquiry name or mobile number' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('enquiry_popup')
      .insert([
        {
          name,
          mobile_number: mobileNumber,
          service: savedService,
        },
      ])
      .select('id, name, mobile_number, service, created_at')
      .single();

    if (error) {
      console.error('Supabase enquiry insert error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Enquiry API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unexpected error' },
      { status: 500 }
    );
  }
}
