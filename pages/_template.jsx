import classNames from 'classnames';
import React from 'react';
import { Link } from 'react-router';
import { prefixLink } from 'gatsby-helpers';
import includes from 'underscore.string/include';
import { colors, activeColors } from '../utils/colors';
import typography from '../utils/typography';
import { config } from '../config';

// Import styles.
import 'css/main.css';
import 'css/github.css';

module.exports = React.createClass({
    propTypes() {
        return {
            children: React.PropTypes.object
        };
    },
    render() {
        const docsActive = includes(this.props.location.pathname, '/docs/');
        const projectsActive = includes(this.props.location.pathname, '/projects/');

        return (
            <div>
                <nav className="navbar navbar-inverse" style={{ borderRadius: 0 }}>
                    <div className="container">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="" aria-expanded="false">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            <a
                                className="navbar-brand"
                                href={prefixLink('/')}
                                style={{
                                    fontSize: 24,
                                    padding: '5px 0 5px 15px'
                                }}
                            >
                                <img
                                    alt="brand"
                                    src={prefixLink('/logo.png')}
                                    style={{
                                        display: 'inline-block',
                                        width: 40,
                                        height: 40,
                                        marginRight: 8
                                    }}
                                    title={config.siteTitle}
                                />
                                {config.siteTitle}
                            </a>
                        </div>
                        <div className="collapse navbar-collapse">
                            <ul className="nav navbar-nav navbar-right">
                                <li
                                    className={classNames(
                                        { 'active': docsActive }
                                    )}
                                >
                                    <Link
                                        to={prefixLink('/docs/')}
                                    >
                                        Documentation
                                    </Link>
                                </li>
                                <li
                                    className={classNames(
                                        { 'active': projectsActive }
                                    )}
                                >
                                    <Link
                                        to={prefixLink('/projects/')}
                                    >
                                        Projects
                                    </Link>
                                </li>
                                <li>
                                    <a href="https://github.com/cncjs/cncjs">
                                        <i className="fa fa-fw fa-github" style={{ fontSize: 16, marginRight: 5 }} />
                                        GitHub
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <div className="container">
                    {this.props.children}
                </div>
            </div>
        );
    }
});
