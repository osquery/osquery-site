import React, { Component } from 'react'
import MediaQuery from 'react-responsive'
import { Link } from 'react-router-dom'

import Button from 'components/Button'
import content from 'data/pages/home'
import featuredProjects from 'data/featured_projects'
import GithubCard from 'components/GithubCard'
import H1SuperHeading from 'components/text/H1SuperHeading'
import Heading1 from 'components/text/Heading1'
import Heading2 from 'components/text/Heading2'
import Heading3 from 'components/text/Heading3'
import Heading5 from 'components/text/Heading5'
import Icon from 'components/Icon'
import IosTerminal from 'components/terminals/IosTerminal'
import Monospace from 'components/text/Monospace'
import OsqueryTableSnapshot from 'components/terminals/OsqueryTableSnapshot'
import osqueryTableSnapshots from 'data/osquery_table_snapshots.json'
import Paragraph from 'components/text/Paragraph'
import ProminentCta from 'components/ProminentCta'
import SectionBreak from 'components/SectionBreak'
import Tab from 'components/Tab'
import './Home.css'

const baseClass = 'home'
const mobileWidth = 800
const {
  additionalResources,
  communityProjects,
  hero,
  howItWorks,
  whatYouShouldKnow,
} = content.sections

class Home extends Component {
  state = {
    howItWorksActiveTab: 'security',
  }

  featuredProjects = () => {
    return featuredProjects.sort(() => 0.5 - Math.random()).slice(0, 6)
  }

  onHowItWorksTabClick = tabName => {
    return () => {
      this.setState({
        ...this.state,
        howItWorksActiveTab: tabName,
      })
    }
  }

  renderMeta = () => {
    return (
      <section className={`${baseClass}__meta`}>
        <div className={`${baseClass}__facebook-open-source`}>
          <Icon name="facebookOpenSource" />

          <span>Facebook Open Source</span>
        </div>

        <p className={`${baseClass}__copyright`}>&copy; 2017 Project License</p>

        <p className={`${baseClass}__made-by-kolide`}>
          Site made with
          <span className={`${baseClass}__heart-text`}> &#10084; </span>
          by Kolide in memory of Parse
        </p>
      </section>
    )
  }

  renderOsqueryTableSnapshots = () => {
    return (
      <div className={`${baseClass}__snapshot-wrapper`}>
        {osqueryTableSnapshots.map((snapshot, idx) => {
          return (
            <OsqueryTableSnapshot
              className={`${baseClass}__snapshot`}
              data={snapshot}
              key={`${snapshot.title}-${idx}`}
            />
          )
        })}
      </div>
    )
  }

  render() {
    const { howItWorksActiveTab } = this.state
    const { featuredProjects, onHowItWorksTabClick, renderMeta, renderOsqueryTableSnapshots } = this

    return (
      <div>
        <div className={`${baseClass}__heading-wrapper`}>
          <div className={`${baseClass}__heading-content-wrapper`}>
            <H1SuperHeading>{hero.sectionSuperHeading}</H1SuperHeading>

            <Heading1>{hero.sectionHeading}</Heading1>

            <div className={`${baseClass}__icon-wrapper`}>
              <Icon className={`${baseClass}__platform-icon`} name="apple" />

              <Icon className={`${baseClass}__platform-icon`} name="centos" />

              <Icon className={`${baseClass}__platform-icon`} name="ubuntu" />

              <Icon className={`${baseClass}__platform-icon`} name="windows" />

              <Icon className={`${baseClass}__platform-icon`} name="linux" />
            </div>
          </div>

          <section className={`${baseClass}__hero-section`}>
            <div className={`${baseClass}__computer-wrapper`}>
              <Icon className={`${baseClass}__frame-overlay`} name="frameOverlay" />

              <Icon className={`${baseClass}__hero-computer`} name="imacLg" />
            </div>

            {renderOsqueryTableSnapshots()}
          </section>
        </div>

        <section className={`${baseClass}__section`}>
          <Heading2>{howItWorks.sectionHeading}</Heading2>

          <Paragraph className={`${baseClass}__paragraph`}>
            {howItWorks.sectionSubheading}
          </Paragraph>

          <div className={`${baseClass}__tab-wrapper`}>
            <Tab
              active={howItWorksActiveTab === 'security'}
              className={`${baseClass}__tab`}
              onClick={onHowItWorksTabClick('security')}
              size="large"
              text="Security"
            />

            <Tab
              active={howItWorksActiveTab === 'compliance'}
              className={`${baseClass}__tab`}
              onClick={onHowItWorksTabClick('compliance')}
              size="large"
              text="Compliance"
            />

            <Tab
              active={howItWorksActiveTab === 'devops'}
              className={`${baseClass}__tab`}
              onClick={onHowItWorksTabClick('devops')}
              size="large"
              text="DevOps"
            />
          </div>

          {this.state.howItWorksActiveTab === 'security' && (
            <div>
              <IosTerminal className={`${baseClass}__ios-terminal`}>
                <Monospace>
                  <strong>osquery> </strong>
                  SELECT name, path, pid FROM processes WHERE on_disk = 0;
                </Monospace>
                <Monospace>name = Drop_Agent</Monospace>
                <Monospace>path = /Users/jim/bin/dropage</Monospace>
                <Monospace>pid = 561</Monospace>
              </IosTerminal>

              <Heading3>{howItWorks.subSection1Heading}</Heading3>

              <Paragraph className={`${baseClass}__paragraph`}>
                {howItWorks.subSection1Paragraph1}
              </Paragraph>
            </div>
          )}

          {this.state.howItWorksActiveTab === 'compliance' && (
            <div>
              <IosTerminal className={`${baseClass}__ios-terminal`}>
                <Monospace>
                  <strong>osquery> </strong>
                  SELECT * FROM mounts m, disk_encryption d
                </Monospace>
                <Monospace>WHERE m.device_alias = d.name</Monospace>
                <Monospace>AND m.path = "/"</Monospace>
                <Monospace>AND d.encrypted = 0;</Monospace>
              </IosTerminal>

              <Heading3>{howItWorks.subSection2Heading}</Heading3>

              <Paragraph className={`${baseClass}__paragraph`}>
                {howItWorks.subSection2Paragraph1}
              </Paragraph>
            </div>
          )}

          {this.state.howItWorksActiveTab === 'devops' && (
            <div>
              <IosTerminal className={`${baseClass}__ios-terminal`}>
                <Monospace>
                  <strong>osquery> </strong>
                  SELECT * FROM last
                </Monospace>
                <Monospace>WHERE username = "root"</Monospace>
                <Monospace>AND time > (( SELECT unix_time FROM time ) - 3600 );</Monospace>
              </IosTerminal>

              <Heading3>{howItWorks.subSection3Heading}</Heading3>

              <Paragraph className={`${baseClass}__paragraph`}>
                {howItWorks.subSection3Paragraph1}
              </Paragraph>
            </div>
          )}

          <Button
            className={`${baseClass}__cta-button ${baseClass}__available-tables-button`}
            href="/schema"
          >
            See Available Tables
          </Button>
        </section>

        <SectionBreak />

        <section className={`${baseClass}__section`}>
          <Heading2>{whatYouShouldKnow.sectionHeading}</Heading2>

          <div className={`${baseClass}__things-to-know`}>
            <div className={`${baseClass}__thing-to-know`}>
              <div>
                <Heading3 className={`${baseClass}__thing-to-know-heading`}>
                  {whatYouShouldKnow.subSection1Heading}
                </Heading3>

                <Paragraph className={`${baseClass}__thing-to-know-p`}>
                  {whatYouShouldKnow.subSection1Paragraph1}
                </Paragraph>
              </div>

              <Button
                className={`${baseClass}__thing-to-know-button`}
                href="https://github.com/facebook/osquery"
              >
                View the Code
              </Button>
            </div>

            <div className={`${baseClass}__thing-to-know`}>
              <div>
                <Heading3 className={`${baseClass}__thing-to-know-heading`}>
                  {whatYouShouldKnow.subSection2Heading}
                </Heading3>

                <Paragraph className={`${baseClass}__thing-to-know-p`}>
                  {whatYouShouldKnow.subSection2Paragraph1}
                </Paragraph>
              </div>

              <Button className={`${baseClass}__thing-to-know-button`} href="/downloads">
                Download Osquery
              </Button>
            </div>

            <div className={`${baseClass}__thing-to-know`}>
              <div>
                <Heading3 className={`${baseClass}__thing-to-know-heading`}>
                  {whatYouShouldKnow.subSection3Heading}
                </Heading3>

                <Paragraph className={`${baseClass}__thing-to-know-p`}>
                  {whatYouShouldKnow.subSection3Paragraph1}
                </Paragraph>
              </div>

              <Button className={`${baseClass}__thing-to-know-button`} href="/blog">
                Read Community Articles
              </Button>
            </div>
          </div>
        </section>

        <SectionBreak />

        <section className={`${baseClass}__section`}>
          <Heading2>{communityProjects.sectionHeading}</Heading2>

          <Paragraph>{communityProjects.sectionSubHeading}</Paragraph>

          <div className={`${baseClass}__project-cards`}>
            {featuredProjects().map((project, idx) => {
              const { description, name, url } = project

              return (
                <div className={`${baseClass}__project-card-wrapper`} key={idx}>
                  <GithubCard description={description} name={name} url={url} />
                </div>
              )
            })}
          </div>
        </section>

        <SectionBreak />

        <section className={`${baseClass}__section`}>
          <Heading2>{additionalResources.sectionHeading}</Heading2>

          <Paragraph>{additionalResources.sectionSubHeading}</Paragraph>

          <div className={`${baseClass}__additional-resources`}>
            <ProminentCta className={`${baseClass}__prominent-cta`} icon={<Icon name="slack" />}>
              <a href="https://osquery-slack.herokuapp.com/">Join the Osquery Slack</a>
            </ProminentCta>

            <ProminentCta
              className={`${baseClass}__prominent-cta`}
              icon={<Icon name="osqueryDocs" />}
            >
              <a href="https://osquery.readthedocs.io/en/stable/">Read the Osquery Docs</a>
            </ProminentCta>

            <ProminentCta className={`${baseClass}__prominent-cta`} icon={<Icon name="octocat" />}>
              <a href="https://github.com/facebook/osquery">View the Github Project</a>
            </ProminentCta>
          </div>
        </section>

        <footer className={`${baseClass}__footer`}>
          <MediaQuery minWidth={mobileWidth + 1}>{renderMeta()}</MediaQuery>

          <section className={`${baseClass}__open-source-links`}>
            <Heading5>Open Source</Heading5>

            <ul>
              <li className={`${baseClass}__footer-li`}>
                <a href="https://github.com/facebook/osquery">View the code on Github</a>
              </li>
            </ul>
          </section>

          <section className={`${baseClass}__resource-links`}>
            <Heading5>Resources</Heading5>

            <ul>
              <li className={`${baseClass}__footer-li`}>
                <Link to="/blog">Blog</Link>
              </li>

              <li className={`${baseClass}__footer-li`}>
                <Link to="/schema">Schema</Link>
              </li>

              <li className={`${baseClass}__footer-li`}>
                <a href="https://osquery.readthedocs.io/en/stable/">Docs</a>
              </li>

              <li className={`${baseClass}__footer-li`}>
                <Link to="/downloads">Downloads</Link>
              </li>
            </ul>
          </section>

          <MediaQuery maxWidth={mobileWidth}>{renderMeta()}</MediaQuery>
        </footer>
      </div>
    )
  }
}

export default Home
