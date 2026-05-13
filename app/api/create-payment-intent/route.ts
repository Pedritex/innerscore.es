import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: Request) {
  try {
    const { email, answers, result } = await request.json();

    if (!email || typeof email !== 'string') {
      return Response.json({ error: 'Missing email' }, { status: 400 });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: 999,
      currency: 'gbp',
      payment_method_types: ['card'],
      receipt_email: email,
      description: 'InnerScore — Full EQ Report',
      metadata: {
        email,
        answers: JSON.stringify(answers ?? []),
        result: JSON.stringify(result ?? null),
      },
    });

    return Response.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return Response.json({ error: message }, { status: 400 });
  }
}
