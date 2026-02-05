import { Helmet } from 'react-helmet-async';

export function Shop() {
  return (
    <>
      <Helmet>
        <title>Shop All Products | Gil-Son Gear</title>
      </Helmet>
      <div className="container-xl py-16">
        <h1 className="section-title-display">SHOP ALL</h1>
        <p className="mt-4 text-text-dark-secondary">Coming soon — browse all Gil-Son merchandise.</p>
      </div>
    </>
  );
}
