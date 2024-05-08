import {
  BrokenImage,
  Email,
  Facebook,
  GitHub,
  Instagram,
  LinkedIn,
  Reddit,
  Telegram,
  Twitter,
} from '@mui/icons-material'

type IconComponent = typeof BrokenImage
type IconList = {
  [key: string]: IconComponent
}

// Icons added to this object will automatically appear in Payload, and will automatically support being displayed on the site
const iconList: IconList = {
  email: Email,
  facebook: Facebook,
  github: GitHub,
  instagram: Instagram,
  linkedin: LinkedIn,
  reddit: Reddit,
  telegram: Telegram,
  twitter: Twitter,
}

export const getSupportedIcons = function () {
  return Object.keys(iconList)
}

export const getIcon = function (iconName: string): IconComponent {
  // if the icon requested is not supported, use the broken image icon instead
  return iconList[iconName] || BrokenImage
}
