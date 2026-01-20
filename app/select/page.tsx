import Link from "next/link";
import index from "@/data/index.json";

export const dynamic = "force-static";

export default function SelectPage() {
  const region = index.regions.find(r => r.id === "zakarpattia") ?? index.regions[0];

  return (
    <main className="container">
      <div className="row" style={{ alignItems: "flex-end" }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 28 }}>Обери місто</h1>
          <p className="muted" style={{ marginTop: 6 }}>{region.title}</p>
        </div>
        <Link className="btn2" href="/">На головну</Link>
      </div>

      <div className="grid grid2" style={{ marginTop: 14 }}>
        {region.cities.map((c) => (
          <Link key={c.id} className="card" href={`/${region.id}/${c.id}`} style={{ textDecoration: "none" }}>
            <div style={{ fontWeight: 900, fontSize: 16 }}>{c.title}</div>
            <div className="muted small" style={{ marginTop: 8 }}>Перейти до вибору черги →</div>
          </Link>
        ))}
      </div>
    </main>
  );
}
