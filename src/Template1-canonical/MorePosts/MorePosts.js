import React from 'react'
import styles from './MorePosts.module.sass'

const MorePosts = ({ posts, Link, Img }) => (
  <div className={styles.MorePosts}>
    <div className={styles.MorePosts__header}>
      <div className={styles.MostPosts__header__text}>More Like This</div>
    </div>
    <div className={styles.MorePosts__container}>
      {posts.map(({ slug, title, excerpt, thumbnail }) => (
        <div className={styles.Post} key={slug}>
          <Link to={slug}>
            {thumbnail ? (
              <Img alt={title} fixed={thumbnail.childImageSharp.fixed} />
            ) : (
              <div style={{ height: 150, width: 200 }} />
            )}
            <div className={styles.Post__title}> {title}</div>
            <div className={styles.Post__excerpt}> {excerpt}</div>
          </Link>
        </div>
      ))}
    </div>
  </div>
)

export default MorePosts
