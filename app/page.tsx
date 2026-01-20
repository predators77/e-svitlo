import Link from "next/link";

export default function Home() {
  return (
    <main className="container">
      <div className="card">
        <h1 style={{ fontSize: 34, margin: 0 }}>Чи є світло? ⚡</h1>
        <p className="muted" style={{ marginTop: 8 }}>
          MVP-сервіс для Закарпаття: обери місто та чергу — побачиш статус зараз, таймер до зміни та розклад.
        </p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 14 }}>
          <Link className="btn" href="/select">Обрати місто</Link>
          <Link className="btn2" href="/zakarpattia/svalyava/cherha-1">Швидкий приклад (Свалява)</Link>
        </div>
        <div className="hr" />
        <p className="muted small" style={{ margin: 0 }}>
          Примітка: можливі аварійні відключення поза графіком. Оновлюй сторінку та перевіряй офіційні джерела.
        </p>
      </div>
    </main>
  );
}
