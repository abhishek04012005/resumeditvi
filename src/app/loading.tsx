export default function Loading() {
  return (
    <main className="skeleton-page">
      <section className="skeleton-hero">
        <div className="skeleton-row">
          <div className="skeleton-block skeleton-title" />
          <div className="skeleton-block skeleton-subtitle" />
          <div className="skeleton-block skeleton-text" />
          <div className="skeleton-block skeleton-button" />
        </div>
        <div className="skeleton-block skeleton-hero-image" />
      </section>

      <section className="skeleton-section">
        <div className="skeleton-section-heading" />
        <div className="skeleton-grid">
          {Array.from({ length: 4 }).map((_, index) => (
            <article className="skeleton-card" key={index}>
              <div className="skeleton-block skeleton-card-title" />
              <div className="skeleton-block skeleton-card-text" />
              <div className="skeleton-block skeleton-card-text short" />
            </article>
          ))}
        </div>
      </section>

      <section className="skeleton-section">
        <div className="skeleton-section-heading" />
        <div className="skeleton-rows">
          {Array.from({ length: 3 }).map((_, index) => (
            <div className="skeleton-row-card" key={index}>
              <div className="skeleton-block skeleton-row-title" />
              <div className="skeleton-block skeleton-row-text" />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
