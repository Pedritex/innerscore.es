'use client';

import { useEffect, useState } from 'react';

const STORAGE_KEY = 'innerscore_streak';
const WEEK_LABELS = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];

type Streak = {
  count: number;
  lastVisitDate: string;
  visitedThisWeek: boolean[];
  weekStartDate: string;
};

function todayKey(d = new Date()): string {
  return d.toISOString().slice(0, 10);
}

function mondayOf(date: Date): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  const day = d.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diff);
  return d;
}

function dayIndexFromMonday(d = new Date()): number {
  const day = d.getDay();
  return day === 0 ? 6 : day - 1;
}

function loadStreak(): Streak {
  if (typeof window === 'undefined') {
    return {
      count: 0,
      lastVisitDate: '',
      visitedThisWeek: [false, false, false, false, false, false, false],
      weekStartDate: '',
    };
  }
  const today = new Date();
  const today_iso = todayKey(today);
  const monday_iso = todayKey(mondayOf(today));
  const dayIdx = dayIndexFromMonday(today);

  const raw = localStorage.getItem(STORAGE_KEY);
  let parsed: Streak | null = null;
  if (raw) {
    try {
      parsed = JSON.parse(raw) as Streak;
    } catch {
      parsed = null;
    }
  }

  if (!parsed) {
    const fresh: Streak = {
      count: 1,
      lastVisitDate: today_iso,
      visitedThisWeek: Array.from({ length: 7 }, (_, i) => i === dayIdx),
      weekStartDate: monday_iso,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
    return fresh;
  }

  // If we crossed into a new week, reset the visited-this-week array.
  if (parsed.weekStartDate !== monday_iso) {
    parsed.visitedThisWeek = [false, false, false, false, false, false, false];
    parsed.weekStartDate = monday_iso;
  }

  if (parsed.lastVisitDate === today_iso) {
    parsed.visitedThisWeek[dayIdx] = true;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
    return parsed;
  }

  // Streak continuation: visited yesterday → +1; otherwise reset to 1.
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterday_iso = todayKey(yesterday);

  if (parsed.lastVisitDate === yesterday_iso) {
    parsed.count += 1;
  } else {
    parsed.count = 1;
  }

  parsed.lastVisitDate = today_iso;
  parsed.visitedThisWeek[dayIdx] = true;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
  return parsed;
}

export default function StreakWidget() {
  const [streak, setStreak] = useState<Streak | null>(null);

  useEffect(() => {
    setStreak(loadStreak());
  }, []);

  if (!streak) {
    return (
      <div
        className="rounded-2xl bg-white p-6"
        style={{ border: '1px solid #e8d5c8' }}
      >
        <div className="h-6 w-24 animate-pulse rounded bg-[#f1ebe5]" />
      </div>
    );
  }

  const todayIdx = dayIndexFromMonday();

  return (
    <div
      className="rounded-2xl bg-white p-6"
      style={{
        border: '1px solid #e8d5c8',
        boxShadow: '0 10px 24px rgba(15,23,42,0.04)',
      }}
    >
      <div className="flex items-center gap-3">
        <span
          className="flex h-10 w-10 items-center justify-center rounded-full text-white"
          style={{ backgroundColor: '#ea580c' }}
          aria-hidden
        >
          <FlameIcon />
        </span>
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-[#64748b]">
            Racha diaria
          </p>
          <p className="font-display text-2xl font-bold text-[#0f172a]">
            {streak.count} {streak.count === 1 ? 'día' : 'días'}
          </p>
        </div>
      </div>

      <ul className="mt-5 grid grid-cols-7 gap-1.5">
        {WEEK_LABELS.map((label, i) => {
          const visited = streak.visitedThisWeek[i];
          const isToday = i === todayIdx;
          return (
            <li key={`${label}-${i}`} className="flex flex-col items-center gap-1.5">
              <span className="text-[10px] font-semibold text-[#94a3b8]">
                {label}
              </span>
              <span
                className="flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold"
                style={{
                  backgroundColor: visited
                    ? '#ea580c'
                    : isToday
                      ? '#ffffff'
                      : '#fdf6f0',
                  color: visited ? '#ffffff' : isToday ? '#0f172a' : '#94a3b8',
                  border: isToday ? '1.5px solid #ea580c' : '1px solid #e8d5c8',
                }}
              >
                {visited ? '✓' : ''}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function FlameIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 17v0a2.5 2.5 0 0 0 2.5-2.5c0-1.5-2-3-2-3s-2-1-2-3a2 2 0 0 1 2-2c.93 0 1.78.55 2.21 1.39C13.7 7.16 13.5 5 12 3.5c4 0 7 4 7 9a7 7 0 0 1-14 0c0-1.81.54-3.35 1.36-4.55C7 9.81 7.5 11 7.5 11" />
    </svg>
  );
}
