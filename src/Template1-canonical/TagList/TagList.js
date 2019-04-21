import React from 'react'

import styles from './TagList.module.sass'

class TagList extends React.Component {
  render() {
    const { tags, title, Link, isPreview } = this.props
    return (
      <div className={styles.Index__tags}>
        {title && <div className={styles.Index__tags__title}>{title}</div>}
        <ul className={styles.Index__tags__list}>
          {tags.map(tag =>
            isPreview ? (
              <span key={tag}>
                <li>{tag}</li>
              </span>
            ) : (
              <Link key={tag.slug} to={tag.slug}>
                <li>{tag.name}</li>
              </Link>
            ),
          )}
        </ul>
      </div>
    )
  }
}

export default TagList
