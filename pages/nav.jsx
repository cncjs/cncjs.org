import classNames from 'classnames';
import React, { Component, PropTypes } from 'react';
import { prefixLink } from 'gatsby-helpers';
import config from '../config';

export default class extends Component {
    state = {
        collapseIn: false
    };

    render() {
        return (
            <nav className="navbar navbar-inverse" style={{ borderRadius: 0 }}>
                <div className="container">
                    <div className="navbar-header">
                        <button
                            type="button"
                            className="navbar-toggle collapsed"
                            data-toggle="collapse"
                            onClick={() => {
                                this.setState({ collapseIn: !this.state.collapseIn });
                            }}
                        >
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar" />
                            <span className="icon-bar" />
                            <span className="icon-bar" />
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
                    <div
                        className={classNames(
                            'collapse',
                            'navbar-collapse',
                            { 'in': this.state.collapseIn }
                        )}
                    >
                        <div className="nav navbar-right">
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}
