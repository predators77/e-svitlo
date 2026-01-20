"use client";

import { useEffect, useMemo, useState } from "react";
import { Slot, getCurrentSlot, formatCountdown, findNextChange } from "@/lib/schedule";

function nowMinLocal(): number {
  const d = new Date();
  return d.getHours() * 60 + d.getMinutes();
}

export default function TimerClient({ slots }: { slots: Slot[] }) {
  const [nowMin, setNowMin] = useState<number>(() => nowMinLocal());

  useEffect(() => {
    const t = setInterval(() => setNowMin(nowMinLocal()), 1000);
    return () => clearInterval(t);
  }, []);

  const current = useMemo(() => getCurrentSlot(slots, nowMin), [slots, nowMin]);
  const next = useMemo(() => findNextChange(slots, nowMin), [slots, nowMin]);

  const status = current.slot.off ? "❌ Світла немає" : "✅ Світло є";
  const countdown = formatCountdown(nowMin, current.endsAtMin);

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <div className="row" style={{ flexWrap: "wrap" }}>
        <div style={{ fontSize: 18, fontWeight: 900 }}>{status}</div>
        <div className="kpi">До зміни: {countdown}</div>
      </div>

      <div className="muted small">
        Поточний слот: <b>{current.slot.from}–{current.slot.to}</b>
      </div>

      {next && (
        <div className="muted small">
          Наступна зміна: <b>{next.at}</b> ({next.nextOff ? "буде ❌ без світла" : "буде ✅ світло"}{next.tomorrow ? ", завтра" : ""})
        </div>
      )}

      <div className="muted small">Час береться з твого пристрою.</div>
    </div>
  );
}
