import React, { Component } from 'react'

// import AuthorList from '../../components/AuthorList'
import Time from './Time'
import Content from './Content'
import TagList from './TagList'
import MorePosts from './MorePosts'
import styles from './blog-post.module.sass'
import './css/quill.core.css'
import './styles/global.sass'

class BlogPostTemplate extends Component {
  constructor(props) {
    super(props)
    this.state = { scrollHeight: 0, pageUrl: '' }
    this.handleScroll = this.handleScroll.bind(this)
  }
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
    this.setState({ pageUrl: window.location.href })
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }
  handleScroll() {
    this.setState({
      scrollHeight:
        window.scrollY /
        (document.getElementById('article-container').scrollHeight -
          window.innerHeight),
    })
  }
  render() {
    const {
      htmlBody,
      contentComponent,
      helmet,
      coverPhoto,
      description,
      tags = [],
      title,
      publishDate,
      author,
      morePosts = [],
      Link,
      Img,
      isPreview,
      EmailIcon,
      FacebookIcon,
      LinkedinIcon,
      TwitterIcon,
      EmailShareButton,
      FacebookShareButton,
      LinkedinShareButton,
      TwitterShareButton,
    } = this.props
    const PostContent = contentComponent || Content
    const { pageUrl } = this.state

    // Construct progress bar
    const Progressbar = (
      <div
        className={styles.BlogPost__progressbar}
        style={{
          width:
            this.state.scrollHeight < 1
              ? `calc(100% * ${this.state.scrollHeight} `
              : 0,
        }}
      />
    )
    return (
      <section
        id="article-container"
        className={`${styles.BlogPost} ${
          isPreview ? styles.BlogPost__preview : ''
        }`}
      >
        {Progressbar}
        {helmet || ''}
        {/* Blog Post Info */}
        <div className={styles.BlogPost__title}>{title}</div>
        <div className={styles.BlogPost__authorInfo}>
          {isPreview ? (
            author && (
              <span style={{ textDecoration: 'none' }} to={author.slug}>
                <img
                  className={styles.authorInfo__image}
                  alt={`${author.name} headshot`}
                  src={author.headshotUri}
                />
              </span>
            )
          ) : (
            <Link style={{ textDecoration: 'none' }} to={author.slug}>
              <Img
                className={styles.authorInfo__image}
                alt={`${author.name} headshot`}
                fixed={author.headshot.childImageSharp.small}
              />
            </Link>
          )}
          <div className={styles.authorInfo__text}>
            {isPreview ? (
              author && (
                <span style={{ textDecoration: 'none', color: 'black' }}>
                  <div className={styles.authorInfo__text__name}>
                    {author.name}
                  </div>
                </span>
              )
            ) : (
              <Link
                style={{ textDecoration: 'none', color: 'black' }}
                to={author.slug}
              >
                <div className={styles.authorInfo__text__name}>
                  {author.name}
                </div>
              </Link>
            )}
            <Time size="large" date={publishDate} />
          </div>
        </div>
        <PostContent
          className={styles.BlogPost__description}
          content={description}
        />
        {/* Cover Photo */}
        {coverPhoto && !isPreview && (
          <Img fluid={coverPhoto.childImageSharp.fluid} alt="Cover Photo" />
        )}
        {coverPhoto && isPreview && (
          <img
            style={{ maxWidth: '100%' }}
            src={coverPhoto}
            alt="Cover Photo"
          />
        )}
        {/* Post Content Section */}
        <PostContent
          className={`${styles.BlogPost__content} ${styles.bodytext} ql-editor`}
          content={htmlBody}
        />
        {/* Tags Section */}
        {tags && tags.length > 0 && (
          <div className={styles.BlogPost__taglistContainer}>
            <TagList tags={tags} isPreview={isPreview} Link={Link} />
          </div>
        )}
        {/* Article Footer */}
        <div className={styles.Article__footer}>
          {!isPreview && (
            <div className={styles.AuthorPage__sharebuttons}>
              <FacebookShareButton url={pageUrl} quote={title}>
                <FacebookIcon size={32} round />
              </FacebookShareButton>
              <TwitterShareButton url={pageUrl} title={title}>
                <TwitterIcon size={32} round />
              </TwitterShareButton>
              <EmailShareButton url={pageUrl} subject={title}>
                <EmailIcon size={32} round />
              </EmailShareButton>
              <LinkedinShareButton url={pageUrl} title={title}>
                <LinkedinIcon size={32} round />
              </LinkedinShareButton>
            </div>
          )}
          <div className={styles.AuthorPage__header}>
            <div className={styles.AuthorPage__header__imageContainer}>
              {isPreview ? (
                author && (
                  <img
                    className={styles.AuthorPage__header__image}
                    alt={author.name}
                    src={author.headshotUri}
                  />
                )
              ) : (
                <Img
                  className={styles.AuthorPage__header__image}
                  alt={author.name}
                  fixed={author.headshot.childImageSharp.large}
                />
              )}
            </div>
            {/* <div className={styles.AuthorPage__header__imageContainerMobile}>
              <Img
                className={styles.AuthorPage__header__imageMobile}
                alt={name}
                fixed={headshot.childImageSharp.small}
              />
            </div> */}
            <div className={styles.AuthorPage__header__text}>
              {author ? (
                <div>
                  <div className={styles.AuthorPage__header__text__name}>
                    {author.name}
                  </div>
                  <div className={styles.AuthorPage__header__text__bio}>
                    {author.bio}
                  </div>
                </div>
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
        {!isPreview && <hr />}
        {morePosts && morePosts.length > 0 && (
          <MorePosts posts={morePosts} Link={Link} Img={Img} />
        )}
      </section>
    )
  }
}

export default BlogPostTemplate
