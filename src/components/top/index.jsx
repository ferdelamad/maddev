import React from 'react'
import { Link } from 'gatsby'
import { ThemeSwitch } from '../../components/theme-switch'
import { GitHubIcon } from '../social-share/github-icon'

import './index.scss'

export const Top = ({ title, location, rootPath }) => {
  const isRoot = location.pathname === rootPath
  return (
    <div className="top">
      {!isRoot && (
        <Link to={`/`} className="link">
          {title}
        </Link>
      )}
      <div className="theme">
        <ThemeSwitch />
      </div>
    </div>
  )
}
