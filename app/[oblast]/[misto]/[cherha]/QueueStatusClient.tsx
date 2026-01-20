"use client";

import { Slot, findNextChange, formatCountdown, getCurrentSlot } from "@/lib/schedule";
import { useEffect, useMemo, useState } from "react";

function nowMinLocal(): number {
  const d = new Date();
  return d.getHours() * 60 + d.getMinutes();
}

export default function QueueStatusClient({ slots }: { slots: Slot[] }) {
  const [nowMin, setNowMin] = useState<number>(() => nowMinLocal());

  useEffect(() => {
    const t = setInterval(() => setNowMin(nowMinLocal()), 1000);
    return () => clearInterval(t);
  }, []);

  const current = useMemo(() => getCurrentSlot(slots, nowMin), [slots, nowMin]);
  const next = useMemo(() => findNextChange(slots, nowMin), [slots, nowMin]);

  const statusText = current.slot.off ? "❌ Світла немає" : "✅ Світло є";
  const countdown = formatCountdown(nowMin, current.endsAtMin);

  return (
    <>
      <div style={{ fontSize: 18, fontWeight: 900, marginBottom: 8 }}>{statusText}</div>
      <div className="small" style={{ marginBottom: 10 }}>
        Поточний слот: <b>{current.slot.from}–{current.slot.to}</b>
      </div>
      <div className="badge">До зміни: {countdown}</div>
      {next && (
        <div className="small" style={{ marginTop: 10 }}>
          Наступна зміна: <b>{next.at}</b> ({next.nextOff ? "буде ❌ без світла" : "буде ✅ світло"}{next.tomorrow ? ", завтра" : ""})
        </div>
      )}
      <div className="small" style={{ marginTop: 10, opacity: 0.75 }}>
        Час береться з пристрою користувача (Європа/Київ).
      </div>
    </>
  );
}
