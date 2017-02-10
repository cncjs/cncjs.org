import React from 'react';
import styles from './Contributors.module.css';

export default ({ contributors }) => {
    if (!contributors.length) {
        return <noscript />;
    }

    return (
        <div className={styles.contributors}>
            <div className={styles.contributors__list}>
            {
            contributors.map(contributor => (
                <a
                    key={contributor}
                    className={styles.contributor}
                    href={`https://github.com/${contributor}`}
                >
                    <img src={ `https://github.com/${contributor}.png?size=90` } />
                    <span className={styles.contributor__name}> {contributor}</span>
                </a>
            ))
            }
            </div>
        </div>
    );
};
