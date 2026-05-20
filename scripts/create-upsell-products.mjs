// One-off script: creates the 3 upsell Products + Prices in Stripe (test mode).
// Idempotent: looks up existing products by metadata.innerscore_upsell_slot before creating.
// Run with: node scripts/create-upsell-products.mjs

import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import Stripe from 'stripe';

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const ENV_PATH = path.join(ROOT, '.env.local');

const envText = readFileSync(ENV_PATH, 'utf8');
const envMap = Object.fromEntries(
  envText
    .split('\n')
    .filter((line) => line.trim() && !line.trim().startsWith('#'))
    .map((line) => {
      const idx = line.indexOf('=');
      return [line.slice(0, idx).trim(), line.slice(idx + 1).trim()];
    }),
);

const stripeKey = envMap.STRIPE_SECRET_KEY;
if (!stripeKey) throw new Error('STRIPE_SECRET_KEY missing in .env.local');
if (!stripeKey.startsWith('sk_test_')) {
  throw new Error('Refusing to run: STRIPE_SECRET_KEY is not a test key');
}

const stripe = new Stripe(stripeKey);

const UPSELLS = [
  {
    slot: 1,
    envKey: 'STRIPE_UPSELL_1_PRICE',
    name: 'Guía de crecimiento emocional: ¡Encuentra tu mejor versión!',
    description:
      'Material complementario para profundizar en tu inteligencia emocional con ejercicios y herramientas prácticas.',
  },
  {
    slot: 2,
    envKey: 'STRIPE_UPSELL_2_PRICE',
    name: 'Orientación y crecimiento profesional con IE',
    description:
      'Guía completa para aplicar la inteligencia emocional a tu carrera profesional y desarrollo laboral.',
  },
  {
    slot: 3,
    envKey: 'STRIPE_UPSELL_3_PRICE',
    name: 'Guía de autoestima emocional: ¡Crea un yo más fuerte!',
    description:
      'Herramientas y prácticas para reforzar tu autoestima desde la inteligencia emocional.',
  },
];

const newEnvLines = {};

for (const upsell of UPSELLS) {
  // Idempotency: find existing product by metadata
  const search = await stripe.products.search({
    query: `metadata['innerscore_upsell_slot']:'${upsell.slot}'`,
    limit: 1,
  });

  let product = search.data[0];
  if (product) {
    console.log(`[slot ${upsell.slot}] Found existing product ${product.id}`);
  } else {
    product = await stripe.products.create({
      name: upsell.name,
      description: upsell.description,
      metadata: {
        innerscore_upsell_slot: String(upsell.slot),
      },
    });
    console.log(`[slot ${upsell.slot}] Created product ${product.id}`);
  }

  // Find or create the 0.99 EUR one-time price
  const prices = await stripe.prices.list({
    product: product.id,
    active: true,
    limit: 10,
  });
  let price = prices.data.find(
    (p) =>
      p.currency === 'eur' &&
      p.unit_amount === 99 &&
      p.type === 'one_time',
  );

  if (price) {
    console.log(`[slot ${upsell.slot}] Found existing price ${price.id}`);
  } else {
    price = await stripe.prices.create({
      product: product.id,
      currency: 'eur',
      unit_amount: 99,
      nickname: `Upsell ${upsell.slot} — 0,99 €`,
    });
    console.log(`[slot ${upsell.slot}] Created price ${price.id}`);
  }

  newEnvLines[upsell.envKey] = price.id;
}

// Append or update env vars in .env.local
let updatedEnv = envText.endsWith('\n') ? envText : envText + '\n';
for (const [key, value] of Object.entries(newEnvLines)) {
  const re = new RegExp(`^${key}=.*$`, 'm');
  if (re.test(updatedEnv)) {
    updatedEnv = updatedEnv.replace(re, `${key}=${value}`);
    console.log(`Updated ${key} in .env.local`);
  } else {
    updatedEnv += `${key}=${value}\n`;
    console.log(`Appended ${key} to .env.local`);
  }
}
writeFileSync(ENV_PATH, updatedEnv);

console.log('\nDone. Upsell price IDs:');
for (const [key, value] of Object.entries(newEnvLines)) {
  console.log(`  ${key}=${value}`);
}
