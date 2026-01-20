export type Slot = { from: string; to: string; off: boolean };

function toMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(":").map((x) => parseInt(x, 10));
  return h * 60 + m;
}

export function getCurrentSlot(slots: Slot[], nowMin: number) {
  const n = nowMin;

  for (const s of slots) {
    const a = toMinutes(s.from);
    const end = s.to === "24:00" ? 1440 : toMinutes(s.to);
    if (a <= n && n < end) return { slot: s, endsAtMin: end };
  }

  const first = slots[0];
  return { slot: first, endsAtMin: first.to === "24:00" ? 1440 : toMinutes(first.to) };
}

export function findNextChange(slots: Slot[], nowMin: number) {
  const { slot } = getCurrentSlot(slots, nowMin);

  for (let i = 0; i < slots.length; i++) {
    const s = slots[i];
    const a = toMinutes(s.from);
    const b = s.to === "24:00" ? 1440 : toMinutes(s.to);

    if (a <= nowMin && nowMin < b) {
      for (let j = i + 1; j < slots.length; j++) {
        if (slots[j].off !== slot.off) return { at: slots[j].from, nextOff: slots[j].off };
      }
      for (let j = 0; j < slots.length; j++) {
        if (slots[j].off !== slot.off) return { at: slots[j].from, nextOff: slots[j].off, tomorrow: true };
      }
      return null;
    }
  }
  return null;
}

export function formatCountdown(fromMin: number, toMin: number) {
  let diff = toMin - fromMin;
  if (diff < 0) diff += 1440;
  const h = Math.floor(diff / 60);
  const m = diff % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}
