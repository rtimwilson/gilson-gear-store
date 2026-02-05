import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export function Category() {
  const { category } = useParams();
  const categoryName = category ? category.charAt(0).toUpperCase() + category.slice(1) : 'Category';

  return (
    <>
      <Helmet>
        <title>{categoryName} | Gil-Son Gear</title>
      </Helmet>
      <div className="container-xl py-16">
        <h1 className="section-title-display">{categoryName?.toUpperCase()}</h1>
        <p className="mt-4 text-text-dark-secondary">Coming soon — browse {categoryName} products.</p>
      </div>
    </>
  );
}
