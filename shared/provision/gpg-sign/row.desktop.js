// @flow
import * as React from 'react'
import {Icon, Text} from '../../common-adapters'
import {globalStyles, globalColors, transition, desktopStyles} from '../../styles'
import type {IconType} from '../../common-adapters'

type Props = {
  onClick: () => void,
  icon: IconType,
  title: string,
  subTitle?: string,
  style?: Object,
  children?: any,
}

const realCSS = `
  .register-row { background-color: ${globalColors.white}; }
  .register-row:hover { background-color: ${globalColors.blueLighter2}; }

  .register-row .register-background {  }
  .register-row:hover .register-background { opacity: 0 }

  .register-row:hover .register-icon { transform: translateX(15px)}

`

const RowCSS = () => <style>{realCSS}</style>

const Row = ({onClick, icon, title, subTitle, children, style}: Props) => {
  return (
    <div className="register-row" style={{...stylesRowContainer, ...style}} onClick={onClick}>
      <div style={stylesIconContainer}>
        <div className="register-background" style={stylesIconBackground} />
        <Icon
          className="register-icon"
          type={icon}
          style={stylesIcon}
          color={globalColors.black}
          fontSize={35}
        />
      </div>
      <div>
        <Text type="Header" style={stylesHeader}>
          {title}
        </Text>
        <Text type="BodySmall">{subTitle}</Text>
        {children}
      </div>
    </div>
  )
}

const stylesRowContainer = {
  ...globalStyles.flexBoxRow,
  ...desktopStyles.clickable,
  alignItems: 'center',
  maxHeight: 100,
  minHeight: 100,
  padding: 20,
  transition: 'background 0.1s ease-out',
}
const stylesHeader = {
  color: globalColors.blue,
}
const stylesIconContainer = {
  ...globalStyles.flexBoxRow,
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: 25,
  maxHeight: 80,
  maxWidth: 80,
  minHeight: 80,
  minWidth: 80,
  position: 'relative',
}
const stylesIcon = {
  ...transition('transform'),
  height: 'inherit',
  textAlign: 'center',
  width: 'inherit',
  zIndex: 1,
}
const stylesIconBackground = {
  ...transition('opacity'),
  backgroundColor: globalColors.greyLight,
  borderRadius: 40,
  left: 0,
  maxHeight: 80,
  maxWidth: 80,
  minHeight: 80,
  minWidth: 80,
  position: 'absolute',
  top: 0,
}

export default Row
export {RowCSS}