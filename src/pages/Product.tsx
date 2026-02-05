import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export function Product() {
  const { slug } = useParams();

  return (
    <>
      <Helmet>
        <title>Product | Gil-Son Gear</title>
      </Helmet>
      <div className="container-xl py-16">
        <h1 className="section-title-display">PRODUCT</h1>
        <p className="mt-4 text-text-dark-secondary">Product details for: {slug}</p>
      </div>
    </>
  );
}
