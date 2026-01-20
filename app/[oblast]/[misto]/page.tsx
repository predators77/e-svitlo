import Link from "next/link";
import type { Metadata } from "next";

type Params = { oblast: string; misto: string };

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const cityData = await import(`@/data/schedules/${params.oblast}/${params.misto}.json`).then(m => m.default);
  return {
    title: `${cityData.city} — графік відключення світла (черги)` ,
    description: `Обери чергу для міста ${cityData.city} і перевір статус світла та розклад.`
  };
}

export default async function CityPage({ params }: { params: Params }) {
  const data = await import(`@/data/schedules/${params.oblast}/${params.misto}.json`).then((m) => m.default);
  const queues = Object.keys(data.queues);

  return (
    <main className="container">
      <div className="row" style={{ alignItems: "flex-end" }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 28 }}>{data.city}</h1>
          <p className="muted small" style={{ marginTop: 6 }}>Оновлено: {new Date(data.updatedAt).toLocaleString("uk-UA")}</p>
        </div>
        <Link className="btn2" href="/select">Змінити місто</Link>
      </div>

      <div className="card" style={{ marginTop: 14 }}>
        <h2 style={{ margin: 0, fontSize: 18 }}>Обери чергу</h2>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 12 }}>
          {queues.map((q) => (
            <Link key={q} className="pill" href={`/${params.oblast}/${params.misto}/${q}`}>
              {q.replace("cherha-", "Черга ")}
            </Link>
          ))}
        </div>
      </div>

      <div className="card" style={{ marginTop: 12 }}>
        <p className="muted small" style={{ margin: 0 }}>
          Порада: збережи сторінку своєї черги в закладки. Далі додамо Telegram-бота зі сповіщеннями.
        </p>
      </div>
    </main>
  );
}
