const React = require("react");

class Footer extends React.Component {
  docUrl(doc) {
    const { baseUrl } = this.props.config;
    const { docsUrl } = this.props.config;
    const docsPart = `${docsUrl ? `${docsUrl}/` : ""}`;
    return `${baseUrl}${docsPart}${doc}`;
  }

  render() {
    return (
      <footer className="nav-footer" id="footer">
        <section className="sitemap">
          <div>
            <h5>Topics</h5>
            <a href={this.docUrl("quickstart")}>Quickstart</a>
            <a href={this.docUrl("overview")}>Overview</a>
            <a href={this.docUrl("philosophy")}>Philosophy</a>
            <a href={this.docUrl("security")}>Security</a>
            <a href={this.docUrl("terminology")}>Terminology</a>
          </div>
          <div>
            <h5>Community</h5>
            <a
              rel="noreferrer noopener"
              target="_blank"
              href="https://github.com/daviemakz/risen-js"
            >
              Code Repository
            </a>
            <a
              href="https://github.com/daviemakz/risen-js/issues"
              target="_blank"
              rel="noreferrer noopener"
            >
              Issues
            </a>
            <a
              rel="noreferrer noopener"
              target="_blank"
              href="https://github.com/daviemakz/risen-js/pulls"
            >
              Pull Requests
            </a>

            <a
              rel="noreferrer noopener"
              target="_blank"
              href="https://stackoverflow.com/search?q=risen-js"
            >
              Stack Overflow
            </a>
          </div>
          <div>
            <h5>Links</h5>

            <a
              rel="noreferrer noopener"
              target="_blank"
              href="https://www.npmjs.com/package/risen-js"
            >
              NPM
            </a>
            <a
              rel="noreferrer noopener"
              target="_blank"
              href="https://travis-ci.org/daviemakz/risen-js"
            >
              Build Status
            </a>
            <a
              rel="noreferrer noopener"
              target="_blank"
              href="https://app.fossa.io/projects/git%2Bgithub.com%2Fdaviemakz%2Frisen-js/"
            >
              Licence Status
            </a>
            <a
              rel="noreferrer noopener"
              target="_blank"
              href="https://libraries.io/github/daviemakz/risen-js"
            >
              Dependencies
            </a>
            <a
              rel="noreferrer noopener"
              target="_blank"
              href="https://github.com/daviemakz/risen-js"
            >
              <img
                alt="GitHub Repo stars"
                src="https://img.shields.io/github/stars/daviemakz/risen-js?style=social"
              />
            </a>

            {this.props.config.twitterUsername && (
              <div className="social">
                <a
                  rel="noreferrer noopener"
                  target="_blank"
                  href={`https://twitter.com/${this.props.config.twitterUsername}`}
                  className="twitter-follow-button"
                >
                  Follow @{this.props.config.twitterUsername}
                </a>
              </div>
            )}
            {this.props.config.facebookAppId && (
              <div className="social">
                <div
                  className="fb-like"
                  data-href={this.props.config.url}
                  data-colorscheme="dark"
                  data-layout="standard"
                  data-share="true"
                  data-width="225"
                  data-show-faces="false"
                />
              </div>
            )}
          </div>
        </section>
        <a
          href="https://opensource.facebook.com/"
          target="_blank"
          rel="noreferrer noopener"
          className="fbOpenSource"
        >
          <img
            src={`${this.props.config.baseUrl}img/oss_logo.png`}
            alt="Facebook Open Source"
            width="170"
            height="45"
          />
        </a>
        <section className="copyright">{this.props.config.copyright}</section>
      </footer>
    );
  }
}

module.exports = Footer;
