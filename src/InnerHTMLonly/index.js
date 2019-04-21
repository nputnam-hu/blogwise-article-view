import React from 'react'
import './styles.sass'
const InnerHTML = ({ htmlBody }) => (
  <div
    className="bodytext ql-editor"
    dangerouslySetInnerHTML={{ __html: htmlBody }}
  />
)

export default InnerHTML
