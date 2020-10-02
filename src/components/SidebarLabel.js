import React, { Fragment, useEffect, useState } from 'react';
import classnames from 'classnames';

import css from './SidebarLabel.module.css';

const SidebarLabel = ({ label, children, secondary }) => {
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    !label && setExpanded(true);
  }, [label]);

  return (
    <div
      className={classnames(
        css.root,
        { [css.secondaryLabel]: secondary },
        { [css.expanded]: expanded },
        { [css.noLabel]: !label }
      )}>
      <button
        className={css.button}
        onClick={() => setExpanded((expanded) => !expanded)}>
        {!secondary ? (
          <h3 className={css.label}>{label}</h3>
        ) : (
          <Fragment>
            {label && (
              <div className={css.secondaryWrapper}>
                <div className={css.expandButton}>
                  <span>{expanded ? '−' : '+'}</span>
                </div>
                <h4 className={css.label}>{label}</h4>
              </div>
            )}
          </Fragment>
        )}
      </button>
      {expanded && children}
    </div>
  );
};

export default SidebarLabel;
