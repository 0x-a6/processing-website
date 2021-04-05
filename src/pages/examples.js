import React, { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { graphql } from 'gatsby';
import { useIntl } from 'react-intl';
import classnames from 'classnames';

import Donate from '../components/character/Donate';
import ExamplesList from '../components/ExamplesList';
import Layout from '../components/Layout';
import FilterBar from '../components/FilterBar';

import { useTree, useFilteredTree } from '../hooks';
import { usePreparedExamples } from '../hooks/examples';

import grid from '../styles/grid.module.css';
import css from '../styles/pages/examples.module.css';

const Examples = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const intl = useIntl();

  const examples = usePreparedExamples(data.examples.nodes, data.images.nodes);
  const tree = useTree(examples);
  const filtered = useFilteredTree(tree, searchTerm);

  return (
    <Layout>
      <Helmet>
        <title>Examples</title>
      </Helmet>
      <div className={classnames(grid.grid, css.root)}>
        <Donate />
        <h1 className={grid.col}>Examples</h1>
        <h3 className={grid.col}>
          {intl.formatMessage({ id: 'examplesIntro' })}
        </h3>
        <FilterBar
          placeholder={intl.formatMessage({ id: 'examplesFilter' })}
          onChange={(e) => setSearchTerm(e.target.value)}
          onClick={(e) => setSearchTerm('')}
          searchTerm={searchTerm}
          large
        />
        <ExamplesList tree={filtered} />
      </div>
    </Layout>
  );
};

export default Examples;

export const query = graphql`
  query {
    examples: allFile(
      filter: {
        sourceInstanceName: { eq: "examples" }
        fields: { lang: { eq: "en" } }
        relativeDirectory: { regex: "/^((?!data).)*$/" }
      }
      sort: { order: ASC, fields: relativeDirectory }
    ) {
      nodes {
        name
        relativeDirectory
        childJson {
          name
          title
        }
      }
    }
    images: allFile(
      filter: {
        sourceInstanceName: { eq: "examples" }
        extension: { regex: "/(jpg)|(jpeg)|(png)|(gif)/" }
        relativeDirectory: { regex: "/^((?!data).)*$/" }
      }
    ) {
      nodes {
        name
        relativeDirectory
        childImageSharp {
          fluid(maxWidth: 400) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  }
`;
