import { Dimensions, Platform, StatusBar } from 'react-native'

const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get('window')
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('screen')

const STATUSBAR_HEIGHT = Platform.select({
  ios: 20,
  android: StatusBar.currentHeight,
  default: 0,
})

const NAVBAR_HEIGHT = Platform.select({
  ios: 44,
  android: 56,
  default: 64,
})

const dimensions = {
  window: {
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
  },
  screen: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  statusBar: STATUSBAR_HEIGHT,
  navBar: NAVBAR_HEIGHT,
  isSmallDevice: WINDOW_WIDTH < 375,
}

export const { window, screen, statusBar, navBar, isSmallDevice } = dimensions
export default dimensions
