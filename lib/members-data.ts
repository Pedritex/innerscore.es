import { redirect } from 'next/navigation';
import { createServerSupabase } from './supabase-server';
import { supabaseAdmin } from './supabase';
import type { QuizResult } from '@/types';

export type MemberData = {
  email: string;
  result: QuizResult;
  archetype: string;
  archetypeKey: ArchetypeKey;
  isEvolved: boolean;
};

export type ArchetypeKey =
  | 'observador'
  | 'ancla'
  | 'impulsor'
  | 'empatico'
  | 'conector';

const ARCHETYPE_TO_KEY: Record<string, ArchetypeKey> = {
  'El Observador': 'observador',
  'El Ancla': 'ancla',
  'El Impulsor': 'impulsor',
  'El Empático': 'empatico',
  'El Conector': 'conector',
};

function normalizeArchetype(name: string): {
  key: ArchetypeKey;
  isEvolved: boolean;
} {
  const trimmed = name.replace(/\s+Evolucionad[oa]$/, '');
  const isEvolved = trimmed !== name;
  const key = ARCHETYPE_TO_KEY[trimmed] ?? 'observador';
  return { key, isEvolved };
}

/**
 * Loads the authenticated member's purchase row. Redirects to /login or /
 * if anything is missing, so any page using this can rely on the return value.
 */
export async function loadMemberOrRedirect(): Promise<MemberData> {
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !user.email) {
    redirect('/login');
  }

  const { data: row } = await supabaseAdmin
    .from('purchases')
    .select('email, result')
    .eq('email', user.email)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (!row || !row.result) {
    redirect('/');
  }

  const result = row.result as QuizResult;
  const archetype = result.archetype ?? 'El Observador';
  const { key, isEvolved } = normalizeArchetype(archetype);

  return {
    email: row.email,
    result,
    archetype,
    archetypeKey: key,
    isEvolved,
  };
}
