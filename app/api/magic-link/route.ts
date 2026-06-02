import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET(request: Request) {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ?? new URL(request.url).origin;

  try {
    const url = new URL(request.url);
    const token = url.searchParams.get('token');
    if (!token) {
      return NextResponse.redirect(
        `${baseUrl}/login?magic_link_error=missing_token`,
      );
    }

    const { data: link, error: lookupError } = await supabaseAdmin
      .from('magic_links')
      .select('token, email, expires_at, used')
      .eq('token', token)
      .maybeSingle();

    if (lookupError || !link) {
      return NextResponse.redirect(
        `${baseUrl}/login?magic_link_error=invalid`,
      );
    }

    if (link.used) {
      return NextResponse.redirect(
        `${baseUrl}/login?magic_link_error=already_used`,
      );
    }

    if (new Date(link.expires_at).getTime() < Date.now()) {
      return NextResponse.redirect(
        `${baseUrl}/login?magic_link_error=expired`,
      );
    }

    // Conditional update so concurrent clicks can't both consume the token.
    const { data: claimed, error: updateError } = await supabaseAdmin
      .from('magic_links')
      .update({ used: true, used_at: new Date().toISOString() })
      .eq('token', token)
      .eq('used', false)
      .select('token');

    if (updateError || !claimed || claimed.length === 0) {
      return NextResponse.redirect(
        `${baseUrl}/login?magic_link_error=already_used`,
      );
    }

    // Ask Supabase to mint a real auth link for this email, then bounce the
    // user to it. Supabase handles the session cookie and final redirect.
    const { data: generated, error: generateError } =
      await supabaseAdmin.auth.admin.generateLink({
        type: 'magiclink',
        email: link.email,
        options: { redirectTo: `${baseUrl}/members` },
      });

    if (generateError || !generated?.properties?.action_link) {
      return NextResponse.redirect(
        `${baseUrl}/login?magic_link_error=auth_failed`,
      );
    }

    return NextResponse.redirect(generated.properties.action_link);
  } catch {
    return NextResponse.redirect(
      `${baseUrl}/login?magic_link_error=unexpected`,
    );
  }
}
