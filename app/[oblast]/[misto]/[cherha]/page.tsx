import Link from "next/link";
import { Slot, getCurrentSlot, findNextChange } from "@/lib/schedule";

type Params = {
  oblast: string;
  misto: string;
  cherha: string;
};

export default async function QueuePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { oblast, misto, cherha } = await params;

  const data = await import(`@/data/schedules/${oblast}/${misto}.json`).then(
    (m) => m.default
  );

  const slots: Slot[] | undefined = data.queues?.[cherha];

  if (!slots) {
    return (
      <main style={{ padding: 24 }}>
        <h1>Черга не знайдена</h1>
        <Link href={`/${oblast}/${misto}`}>← Назад</Link>
      </main>
    );
  }

  const now = new Date();
  const nowMin = now.getHours() * 60 + now.getMinutes();

  const current = getCurrentSlot(slots, nowMin);
  const next = findNextChange(slots, nowMin);

  const isOff = current.slot.off;

  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: 24 }}>
      <h1 style={{ fontSize: 28, marginBottom: 8 }}>
        {data.city} — {cherha.replace("cherha-", "Черга ")}
      </h1>

      <p style={{ opacity: 0.7, marginBottom: 16 }}>
        Оновлено: {new Date(data.updatedAt).toLocaleString("uk-UA")}
      </p>

      <div
        style={{
          padding: 16,
          borderRadius: 14,
          border: "1px solid #ddd",
          background: isOff ? "#ffecec" : "#ecffef",
          marginBottom: 20,
        }}
      >
        <strong style={{ fontSize: 18 }}>
          {isOff ? "❌ Світла немає" : "✅ Світло є"}
        </strong>
        <div style={{ marginTop: 6 }}>
          Поточний інтервал: {current.slot.from} – {current.slot.to}
        </div>
        {next && (
          <div style={{ marginTop: 6 }}>
            Наступна зміна: {next.at} ({next.nextOff ? "буде ❌" : "буде ✅"}
            {next.tomorrow ? ", завтра" : ""})
          </div>
        )}
      </div>

      <h2 style={{ fontSize: 18, marginBottom: 10 }}>Розклад</h2>

      <div style={{ display: "grid", gap: 8 }}>
        {slots.map((s, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: 10,
              borderRadius: 10,
              border: "1px solid #eee",
            }}
          >
            <span>
              {s.from} – {s.to}
            </span>
            <strong>{s.off ? "❌ Вимкнення" : "✅ Світло"}</strong>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 20 }}>
        <Link href={`/${oblast}/${misto}`}>← Змінити чергу</Link>
      </div>
    </main>
  );
}
