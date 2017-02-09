import React from 'react';
import DocumentTitle from 'react-document-title';
import { prefixLink } from 'gatsby-helpers';
import { TypographyStyle, GoogleFont } from 'react-typography';
import config from './config';
import typography from './utils/typography';
import { colors } from './utils/colors';

const BUILD_TIME = new Date().getTime();

module.exports = React.createClass({
    displayName: 'HTML',
    propTypes: {
        body: React.PropTypes.string
    },
    render () {
        const title = DocumentTitle.rewind();

        let css;
        if (process.env.NODE_ENV === 'production') {
          css = <style dangerouslySetInnerHTML={{ __html: require('!raw!./public/styles.css') }} />
        }

        return (
            <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <title>{title}</title>
                <meta name="description" content="" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css" />
                <TypographyStyle typography={typography} />
                <GoogleFont typography={typography} />
                {css}
            </head>
            <body>
                <div id="react-mount" dangerouslySetInnerHTML={{ __html: this.props.body }} />
                <script src={prefixLink(`/bundle.js?t=${BUILD_TIME}`)} />
            </body>
            </html>
        );
    }
});
