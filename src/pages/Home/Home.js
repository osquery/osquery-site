import React, { Component } from 'react'
import MediaQuery from 'react-responsive'

import Button from 'components/Button'
import content from 'data/pages/home'
import EventList from 'components/EventList'
import featuredProjectsData from 'data/featured_projects'
import getGithubRepo from 'helpers/get_github_repo'
import GithubCard from 'components/GithubCard'
import H1SuperHeading from 'components/text/H1SuperHeading'
import Heading1 from 'components/text/Heading1'
import Heading2 from 'components/text/Heading2'
import Heading3 from 'components/text/Heading3'
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
const minMarqueeWidth = 1000
const {
  additionalResources,
  communityEvents,
  communityProjects,
  hero,
  howItWorks,
  whatYouShouldKnow,
} = content.sections

class Home extends Component {
  state = {
    howItWorksActiveTab: 'security',
    featuredProjects: featuredProjectsData,
  }

  componentWillMount() {
    const { loadFeaturedProjects } = this
    loadFeaturedProjects()
  }

  addFeaturedProject = (owner, repo) => {
    return getGithubRepo(owner, repo).then(response => {
      const { description, name, owner, stargazers_count, html_url } = response.data

      return Promise.resolve({
        description: description,
        owner: owner.login,
        repo: name,
        star_count: stargazers_count,
        url: html_url,
      })
    })
  }

  addFeaturedProjects = () => {
    return featuredProjectsData.map(({ owner, repo }) => {
      return this.addFeaturedProject(owner, repo)
    })
  }

  loadFeaturedProjects = () => {
    return Promise.all(this.addFeaturedProjects()).then(data => {
      const sortedData = data.sort((a, b) => {
        return b.star_count - a.star_count
      })
      this.setState({ featuredProjects: sortedData })
    })
  }

  onHowItWorksTabClick = tabName => {
    return () => {
      this.setState({
        ...this.state,
        howItWorksActiveTab: tabName,
      })
    }
  }

  renderFeaturedProjects = () => {
    const { featuredProjects } = this.state

    return featuredProjects.map((project, idx) => {
      const { description, owner, repo, star_count: starCount, url } = project

      return (
        <div className={`${baseClass}__project-card-wrapper`} key={idx}>
          <GithubCard
            description={description}
            name={`${owner} / ${repo}`}
            starCount={starCount}
            url={url}
          />
        </div>
      )
    })
  }

  renderOsqueryTableSnapshots = () => {
    const { renderSnapshotSet } = this

    return (
      <div>
        <MediaQuery minWidth={minMarqueeWidth}>
          <div className={`${baseClass}__snapshot-wrapper-1`}>{renderSnapshotSet()}</div>

          <div className={`${baseClass}__snapshot-wrapper-2`}>{renderSnapshotSet()}</div>

          <div className={`${baseClass}__snapshot-wrapper-3`}>{renderSnapshotSet()}</div>
        </MediaQuery>

        <MediaQuery maxWidth={minMarqueeWidth - 1}>
          <div className={`${baseClass}__snapshot-wrapper`}>{renderSnapshotSet()}</div>
        </MediaQuery>
      </div>
    )
  }

  renderSnapshotSet = () => {
    return osqueryTableSnapshots.map((snapshot, idx) => {
      return (
        <OsqueryTableSnapshot
          className={`${baseClass}__snapshot`}
          data={snapshot}
          key={`${snapshot.title}-${idx}`}
        />
      )
    })
  }

  render() {
    const { howItWorksActiveTab } = this.state
    const { onHowItWorksTabClick, renderFeaturedProjects, renderOsqueryTableSnapshots } = this

    return (
      <div>
        <div className={`${baseClass}__heading-wrapper`}>
          <div className={`${baseClass}__heading-content-wrapper`}>
            <H1SuperHeading>{hero.sectionSuperHeading}</H1SuperHeading>

            <Heading1>{hero.sectionHeading}</Heading1>

            <div className={`${baseClass}__icon-wrapper`}>
              <Icon className={`${baseClass}__platform-icon`} name="darwin" />

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

          <SectionBreak fullScreen />
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
              <IosTerminal
                bodyClassName={`${baseClass}__ios-terminal-body`}
                className={`${baseClass}__ios-terminal`}
              >
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
              <IosTerminal
                bodyClassName={`${baseClass}__ios-terminal-body`}
                className={`${baseClass}__ios-terminal`}
              >
                <Monospace>
                  <strong>osquery> </strong>
                  SELECT * FROM mounts m, disk_encryption d
                </Monospace>
                <Monospace>WHERE m.device_alias = d.name</Monospace>
                <Monospace>AND m.path = "/"</Monospace>
                <Monospace>AND d.encrypted = 0;</Monospace>
                <br />
                <Monospace>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;device =
                  /dev/disk1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </Monospace>
                <Monospace>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;device_alias =
                  /dev/disk1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </Monospace>
                <Monospace>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;path
                  = /
                </Monospace>
                <Monospace>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;type
                  = hfs
                </Monospace>
                <Monospace>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;blocks_size = 4096</Monospace>
                <Monospace>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;blocks =
                  121815040
                </Monospace>
                <Monospace>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;blocks_free = 48994214
                </Monospace>
                <Monospace>&nbsp;&nbsp;blocks_available = 48930214</Monospace>
                <Monospace>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;inodes =
                  4294967279
                </Monospace>
                <Monospace>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;inodes_free = 4292826261
                </Monospace>
                <Monospace>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;flags
                  = 75550720
                </Monospace>
                <Monospace>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;name
                  = /dev/disk1
                </Monospace>
                <Monospace>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;uuid
                  = 23446C9A-18F9-4BCF-A088-801E376691FA
                </Monospace>
                <Monospace>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;encrypted = 0
                </Monospace>
                <Monospace>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;type
                  =
                </Monospace>
                <Monospace>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;uid
                  =
                </Monospace>
                <Monospace>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;user_uuid =
                </Monospace>
              </IosTerminal>

              <Heading3>{howItWorks.subSection2Heading}</Heading3>

              <Paragraph className={`${baseClass}__paragraph`}>
                {howItWorks.subSection2Paragraph1}
              </Paragraph>
            </div>
          )}

          {this.state.howItWorksActiveTab === 'devops' && (
            <div>
              <IosTerminal
                bodyClassName={`${baseClass}__ios-terminal-body`}
                className={`${baseClass}__ios-terminal`}
              >
                <Monospace>
                  <strong>osquery> </strong>
                  SELECT * FROM last
                </Monospace>
                <Monospace>WHERE username = "root"</Monospace>
                <Monospace>AND time > (( SELECT unix_time FROM time ) - 3600 );</Monospace>
                <br />
                <Monospace>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;username = root
                </Monospace>
                <Monospace>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;tty
                  = pts/0
                </Monospace>
                <Monospace>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;pid
                  = 1798
                </Monospace>
                <Monospace>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;type
                  = 7
                </Monospace>
                <Monospace>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;time
                  = 1494350961
                </Monospace>
                <Monospace>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;host
                  = 10.0.2.2
                </Monospace>
              </IosTerminal>

              <Heading3>{howItWorks.subSection3Heading}</Heading3>

              <Paragraph className={`${baseClass}__paragraph`}>
                {howItWorks.subSection3Paragraph1}
              </Paragraph>
            </div>
          )}

          <Button
            className={`${baseClass}__cta-button ${baseClass}__available-tables-button`}
            href={`${process.env.PUBLIC_URL}/schema`}
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
                href="https://github.com/osquery/osquery"
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

              <Button
                className={`${baseClass}__thing-to-know-button`}
                href={`${process.env.PUBLIC_URL}/downloads`}
              >
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

              <Button
                className={`${baseClass}__thing-to-know-button`}
                href={`${process.env.PUBLIC_URL}/blog`}
              >
                Read Community Articles
              </Button>
            </div>
          </div>
        </section>

        <SectionBreak />

        <section className={`${baseClass}__section`}>
          <Heading2>{communityEvents.sectionHeading}</Heading2>

          <Paragraph>{communityEvents.sectionSubHeading}</Paragraph>

          <Paragraph className={`${baseClass}__community-events-header`} highlight>
            {communityEvents.subSection1Heading}
          </Paragraph>

          <EventList />
        </section>

        <SectionBreak />

        <section className={`${baseClass}__section`}>
          <Heading2>{communityProjects.sectionHeading}</Heading2>

          <Paragraph>{communityProjects.sectionSubHeading}</Paragraph>

          <div className={`${baseClass}__project-cards`}>{renderFeaturedProjects()}</div>
        </section>

        <SectionBreak />

        <section className={`${baseClass}__section`}>
          <Heading2>{additionalResources.sectionHeading}</Heading2>

          <Paragraph>{additionalResources.sectionSubHeading}</Paragraph>

          <div className={`${baseClass}__additional-resources`}>
            <ProminentCta
              className={`${baseClass}__prominent-cta`}
              href="https://osquery-slack.herokuapp.com/"
              icon={<Icon name="slack" />}
            >
              <span>Join the Osquery Slack</span>
            </ProminentCta>

            <ProminentCta
              className={`${baseClass}__prominent-cta`}
              href="https://osquery.readthedocs.io/en/stable/"
              icon={<Icon name="osqueryDocs" />}
            >
              <span>Read the Osquery Docs</span>
            </ProminentCta>

            <ProminentCta
              className={`${baseClass}__prominent-cta`}
              href="https://github.com/osquery/osquery"
              icon={<Icon name="octocat" />}
            >
              <span>View the GitHub Project</span>
            </ProminentCta>
          </div>
        </section>
      </div>
    )
  }
}

export default Home
