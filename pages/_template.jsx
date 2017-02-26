import classNames from 'classnames';
import React from 'react';
import { Link } from 'react-router';
import { prefixLink } from 'gatsby-helpers';
import trim from 'lodash/trim';
import includes from 'lodash/includes';
import GitHubButton from 'react-github-button';
import { colors, activeColors } from '../utils/colors';
import typography from '../utils/typography';
import { config } from '../config';
import Nav from './nav';

// Import styles.
import 'react-github-button/assets/style.css';
import 'css/main.css';
import 'css/github.css';
import 'css/page.css';

module.exports = React.createClass({
    propTypes() {
        return {
            children: React.PropTypes.object
        };
    },
    render() {
        const docsActive = includes(this.props.location.pathname, '/docs/');
        const projectsActive = includes(this.props.location.pathname, '/projects/');
        const path = trim(this.props.location.pathname, '/');
        const edit = `https://github.com/cncjs/cncjs.org/edit/master/pages/${path}/index.md`;

        return (
            <div>
                <Nav>
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
                            <div style={{ padding: 15, height: 50 }}>
                                <GitHubButton
                                    type="stargazers"
                                    namespace="cncjs"
                                    repo="cncjs"
                                />
                            </div>
                        </li>
                    </ul>
                </Nav>
                <div className="container" style={{ position: 'relative' }}>
                    <a
                        className="page__edit"
                        href={edit}
                    >
                        EDIT THIS PAGE
                        &nbsp;
                        <i className="fa fa-edit" />
                    </a>
                    {this.props.children}
                </div>
            </div>
        );
    }
});
