

import FontFamilyList from './FontFamilyList'

function FontFamilyMark({ children, mark: { data } }) {
  return <span style={{ fontFamily: FontFamilyList[data.get('fontFamilyIndex')].name }}>
    {children}
  </span>
}

export default FontFamilyMark
