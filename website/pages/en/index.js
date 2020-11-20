/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require("react");

const CompLibrary = require("../../core/CompLibrary.js");

const { MarkdownBlock } = CompLibrary; /* Used to read markdown */
const { Container } = CompLibrary;
const { GridBlock } = CompLibrary;

class HomeSplash extends React.Component {
  render() {
    const { siteConfig, language = "" } = this.props;
    const { baseUrl, docsUrl } = siteConfig;
    const docsPart = `${docsUrl ? `${docsUrl}/` : ""}`;
    const langPart = `${language ? `${language}/` : ""}`;
    const docUrl = (doc) => `${baseUrl}${docsPart}${langPart}${doc}`;

    const SplashContainer = (props) => (
      <div className="homeContainer">
        <div className="homeSplashFade">
          <div className="wrapper homeWrapper">{props.children}</div>
        </div>
      </div>
    );

    const ProjectTitle = (props) => (
      <h2 className="projectTitle">
        {props.title}
        <small>{props.tagline}</small>
      </h2>
    );

    const PromoSection = (props) => (
      <div className="section promoSection">
        <div className="promoRow">
          <div className="pluginRowBlock">{props.children}</div>
        </div>
      </div>
    );

    const Button = (props) => (
      <div className="pluginWrapper buttonWrapper">
        <a className="button" href={props.href} target={props.target}>
          {props.children}
        </a>
      </div>
    );

    return (
      <SplashContainer>
        <div className="inner">
          <ProjectTitle tagline={siteConfig.tagline} title={siteConfig.title} />
          <PromoSection>
            <Button href={docUrl("quickstart")}>Get started</Button>
            <Button href="https://github.com/daviemakz/risen-js">
              Source code
            </Button>
          </PromoSection>
        </div>
      </SplashContainer>
    );
  }
}

class Index extends React.Component {
  render() {
    const { config: siteConfig, language = "" } = this.props;
    const { baseUrl, logoPath } = siteConfig;

    const Block = (props) => (
      <Container
        padding={["bottom", "top"]}
        id={props.id}
        background={props.background}
      >
        <GridBlock
          align="center"
          contents={props.children}
          layout={props.layout}
        />
      </Container>
    );

    const Logo = (props) => (
      <div className="projectLogo">
        <img src={props.logoPath} alt="Project Logo" />
      </div>
    );

    const FeatureCallout = () => (
      <div
        className="productShowcaseSection paddingBottom"
        style={{ textAlign: "center" }}
      >
        <div className="middleImage">
          <img src={`${baseUrl}img/undraw_open_source.svg`} />
        </div>
        <h2>Built For The Future</h2>
        <MarkdownBlock>
          Out of the box support for the latest ECMA+ features and full access
          to all NPM packages allows you to build
          flexible, high performance, scalable and products.
        </MarkdownBlock>
      </div>
    );

    const Features = () => (
      <Block layout="fourColumn">
        {[
          {
            content:
              "Designed to simplify data storage, services management, distributed business logic, logging (etc.) leaving you to focus on your requirements.",
            image: `${baseUrl}img/undraw_code_review.svg`,
            imageAlign: "top",
            title: "Fast, Simple and Unopinionated",
          },
          {
            content:
              "Under the hood, this framework uses the Express package and Quick-DB for long-term persistent storage providing everything you need to quickly deploy server-side applications.",
            image: `${baseUrl}img/undraw_operating_system.svg`,
            imageAlign: "top",
            title: "Everything In One Place",
          },
        ]}
      </Block>
    );

    return (
      <div>
        <Logo logoPath={logoPath} />
        <HomeSplash siteConfig={siteConfig} language={language} />
        <div className="mainContainer">
          <Features />
          <FeatureCallout />
        </div>
      </div>
    );
  }
}

module.exports = Index;
