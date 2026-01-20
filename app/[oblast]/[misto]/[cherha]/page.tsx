import Link from "next/link";

type Params = {
  oblast: string;
  misto: string;
};

export default async function CityPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { oblast, misto } = await params;

  const data = await import(
    `@/data/schedules/${oblast}/${misto}.json`
  ).then((m) => m.default);

  const queues = Object.keys(data.queues || {});

  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: 24 }}>
      <h1 style={{ fontSize: 28, marginBottom: 8 }}>{data.city}</h1>

      <p style={{ opacity: 0.7, marginBottom: 16 }}>
        Оберіть чергу відключення
      </p>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        {queues.map((q) => (
          <Link
            key={q}
            href={`/${oblast}/${misto}/${q}`}
            style={{
              padding: "10px 14px",
              borderRadius: 10,
              border: "1px solid #ddd",
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            {q.replace("cherha-", "Черга ")}
          </Link>
        ))}
      </div>

      <div style={{ marginTop: 20 }}>
        <Link href="/select">← Назад до вибору міста</Link>
      </div>
    </main>
  );
}
