import Link from "next/link";
import type { Metadata } from "next";
import TimerClient from "./TimerClient";
import { Slot } from "@/lib/schedule";

type Params = { oblast: string; misto: string; cherha: string };

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const data = await import(`@/data/schedules/${params.oblast}/${params.misto}.json`).then(m => m.default);
  const qTitle = params.cherha.replace("cherha-", "Черга ");
  return {
    title: `${data.city} — ${qTitle}: чи є світло зараз`,
    description: `Перевірка світла зараз та графік відключення: ${data.city}, ${qTitle}.`
  };
}

export default async function QueuePage({ params }: { params: Params }) {
  const data = await import(`@/data/schedules/${params.oblast}/${params.misto}.json`).then((m) => m.default);
  const slots: Slot[] | undefined = data.queues?.[params.cherha];

  if (!slots) {
    return (
      <main className="container">
        <div className="card">
          <h1 style={{ margin: 0 }}>Черга не знайдена</h1>
          <p className="muted">Спробуй повернутися і обрати іншу чергу.</p>
          <Link className="btn2" href={`/${params.oblast}/${params.misto}`}>Назад</Link>
        </div>
      </main>
    );
  }

  const qTitle = params.cherha.replace("cherha-", "Черга ");

  return (
    <main className="container">
      <div className="row" style={{ alignItems: "flex-end" }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 28 }}>{data.city} — {qTitle}</h1>
          <p className="muted small" style={{ marginTop: 6 }}>Оновлено: {new Date(data.updatedAt).toLocaleString("uk-UA")}</p>
        </div>
        <Link className="btn2" href={`/${params.oblast}/${params.misto}`}>Змінити чергу</Link>
      </div>

      <div className="card" style={{ marginTop: 14 }}>
        <TimerClient slots={slots} />
      </div>

      <div className="card" style={{ marginTop: 12 }}>
        <h2 style={{ margin: 0, fontSize: 18 }}>Розклад</h2>
        <div className="grid" style={{ marginTop: 12 }}>
          {slots.map((s, i) => (
            <div key={i} className="row" style={{ padding: 12, borderRadius: 14, border: "1px solid var(--border)", background: "rgba(255,255,255,.03)" }}>
              <div style={{ fontWeight: 900 }}>{s.from}–{s.to}</div>
              <div className="muted">{s.off ? "❌ Вимкнення" : "✅ Є світло"}</div>
            </div>
          ))}
        </div>
        <div className="hr" />
        <p className="muted small" style={{ margin: 0 }}>
          Далі підключимо Telegram-бота: попередження за 30 хв до відключення + повідомлення про появу світла.
        </p>
      </div>

      <div style={{ marginTop: 14, display: "flex", gap: 12, flexWrap: "wrap" }}>
        <Link className="btn2" href="/select">До вибору міста</Link>
        <Link className="btn2" href="/">На головну</Link>
      </div>
    </main>
  );
}
