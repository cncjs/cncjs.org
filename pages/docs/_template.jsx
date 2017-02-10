import React from 'react';
import { Link } from 'react-router';
import Breakpoint from 'components/Breakpoint';
import Contributors from 'components/Contributors';
import find from 'lodash/find';
import { prefixLink } from 'gatsby-helpers';
import { config } from '../../config';
import typography from '../../utils/typography';

const { rhythm } = typography;

module.exports = React.createClass({
    propTypes () {
        return {
            route: React.PropTypes.object
        }
    },
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    handleTopicChange(e) {
        return this.context.router.push(e.target.value);
    },
    render() {
        const childPages = config.docPages.map((p) => {
            const page = find(this.props.route.pages, (_p) => _p.path === p);
            const active = prefixLink(page.path) === this.props.location.pathname;
            return {
                path: page.path,
                active: active,
                title: page.data.title,
                contributors: page.data.contributors || []
            };
        });
        const activePage = find(childPages, { active: true });
        const docOptions = childPages.map((child) =>
            <option
                key={prefixLink(child.path)}
                value={prefixLink(child.path)}
            >
                {child.title}
            </option>
        );
        const docPages = childPages.map((child) => {
            const isActive = prefixLink(child.path) === this.props.location.pathname;
            return (
                <li
                    key={child.path}
                    style={{
                        marginBottom: rhythm(1/2),
                    }}
                >
                    <Link
                        to={prefixLink(child.path)}
                        style={{
                            textDecoration: 'none',
                        }}
                    >
                        {isActive ? <strong>{child.title}</strong> : child.title}
                    </Link>
                </li>
            );
        });

        return (
            <div>
                <Breakpoint mobile>
                    <div
                        style={{
                            overflowY: 'auto',
                            paddingRight: `calc(${rhythm(1/2)} - 1px)`,
                            position: 'absolute',
                            width: `calc(${rhythm(8)} - 1px)`,
                            borderRight: '1px solid lightgrey',
                        }}
                    >
                        <ul
                            style={{
                                listStyle: 'none',
                                marginLeft: 0,
                                marginTop: rhythm(1/2),
                            }}
                        >
                            {docPages}
                        </ul>
                    </div>
                    <div
                        style={{
                            padding: `0 ${rhythm(1)}`,
                            paddingLeft: `calc(${rhythm(8)} + ${rhythm(1)})`,
                        }}
                    >
                        {this.props.children}
                        {activePage.contributors.length > 0 &&
                            <div>
                                <hr />
                                <h3>Contributors</h3>
                                <Contributors contributors={activePage.contributors} />
                            </div>
                        }
                    </div>
                </Breakpoint>
                <Breakpoint>
                    <strong>Topics:</strong>
                    {' '}
                    <select
                        defaultValue={this.props.location.pathname}
                        onChange={this.handleTopicChange}
                    >
                        {docOptions}
                    </select>
                    <br />
                    <br />
                    {this.props.children}
                </Breakpoint>
            </div>
        );
    }
});
