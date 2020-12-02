import React from 'react';
import classnames from 'classnames';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

const features = [
  {
    title: <>Developer Focused</>,
    imageUrl: 'img/coding-1294361.svg',
    description: (
      <>
        Barista is fundamentally a scanning tool to detect open source components,
        licenses and potential vulnerabilities.  Automatically create and maintain
        an open source bill of materials including multi-level dependencies.
      </>
    ),
  },
  {
    title: <>Customize business rules</>,
    imageUrl: 'img/bot-icon-2883144.png',
    description: (
      <>
        Barista admins determine which obligation(s) are associated with each
        license detected, and assign project approval status based on deployment
        model, applicable license(s), and documented vulnerabilities for detected
        dependencies.
      </>
    ),
  },
  {
    title: <>Cloud Native Architecture</>,
    imageUrl: 'img/cloud-4273197.svg',
    description: (
      <>
        Barista is designed for cloud native deployment environments allowing
        hosting flexibility and scalability on demand.
      </>
    ),
  },
];

function Feature({imageUrl, title, description}) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={classnames('col col--4', styles.feature)}>
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function Home() {
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <header className={classnames('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              className={classnames(
                'button button--outline button--secondary button--lg',
                styles.getStarted,
              )}
              to={useBaseUrl('docs/overview')}>
              Get Started
            </Link>
          </div>
        </div>
      </header>
      <main>
        {features && features.length && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </Layout>
  );
}

export default Home;
