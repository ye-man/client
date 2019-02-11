// @flow
//
// Notes:
// leaving headerhoc
// default screens have no header
// opt into new split header, MUST set header to undefined in their connector navigatinoOptions
//
// Offline
//
//
import * as Kb from '../common-adapters/mobile.native'
import * as Styles from '../styles'
import * as React from 'react'
import GlobalError from '../app/global-errors/container'
import TabBar from './tab-bar/container'
import {createAppContainer} from '@react-navigation/native'
import {createSwitchNavigator} from '@react-navigation/core'
import {createStackNavigator} from 'react-navigation-stack'
import {modalRoutes, routes, nameToTab, loggedOutRoutes} from './routes'
import {LeftAction} from '../common-adapters/header-hoc'
import * as Shared from './router.shared'
import {useScreens} from 'react-native-screens'
import * as Shim from './shim.native'

// turn on screens
useScreens()

// The nested modal nav can't easily show a header so we just inject it in
// TODO move this into common
// import StackHeader from 'react-navigation-stack/src/views/Header/Header'
// const ModalHeader = p => {
// // const scene = {index: 0, isActive: true, descriptor: {options: {}}}
// const scene = {descriptor: {options: {...p.navigationOptions}}, index: 0, isActive: true}
// const scenes = [scene]
// // const navigation = {state: {index: 0}}
// // const getScreenDetails = () => ({
// // options: {
// // title: 'Modal',
// // // headerLeft: <Kb.Button type='title="Cancel" onPress={() => p.navigation.goBack()} />,
// // },
// // })
// // <StackHeader scene={scene} scenes={scenes} navigation={navigation} getScreenDetails={getScreenDetails} />
// return <StackHeader mode="screen" scene={scene} scenes={scenes} navigation={p.navigation} />
// }

// Options used by default on all navigators
const defaultNavigationOptions = {
  header: null,
  headerLeft: hp => (
    <LeftAction badgeNumber={0} leftAction="back" onLeftAction={hp.onPress} disabled={hp.scene.index === 0} />
  ),
  headerTitle: hp => (
    <Kb.Text type="BodyBig" style={styles.headerTitle} lineClamp={1}>
      {hp.children}
    </Kb.Text>
  ),
}
const headerMode = 'float'

// Where the main app stuff happens. You're logged in and have a tab bar etc
const MainStackNavigatorPlain = createStackNavigator(Shim.shim(routes), {
  defaultNavigationOptions: p => ({
    ...defaultNavigationOptions,
  }),
  headerMode,
  initialRouteName: 'tabs:peopleTab',
  initialRouteParams: undefined,
})
class MainStackNavigator extends React.PureComponent<any> {
  static router = MainStackNavigatorPlain.router

  render() {
    const routeName = this.props.navigation.state.routes[this.props.navigation.state.index].routeName
    return (
      <Kb.Box2 direction="vertical" fullWidth={true} fullHeight={true}>
        <MainStackNavigatorPlain navigation={this.props.navigation} />
        <TabBar selectedTab={nameToTab[routeName]} />
        <GlobalError />
      </Kb.Box2>
    )
  }
}

const LoggedInStackNavigator = createStackNavigator(
  {
    Main: {screen: MainStackNavigator},
    ...Shim.shim(modalRoutes),
  },
  {
    headerMode: 'none',
    mode: 'modal',
  }
)

const LoggedOutStackNavigator = createStackNavigator(
  {...Shim.shim(loggedOutRoutes)},
  {
    defaultNavigationOptions: p => ({
      ...defaultNavigationOptions,
    }),
    headerMode,
    initialRouteName: 'login',
    initialRouteParams: undefined,
  }
)

const RootStackNavigator = createSwitchNavigator(
  {
    loggedIn: LoggedInStackNavigator,
    loggedOut: LoggedOutStackNavigator,
  },
  {initialRouteName: 'loggedOut'}
)

const AppContainer = createAppContainer(RootStackNavigator)

class RNApp extends React.PureComponent<any, any> {
  _nav = null
  // TODO remove this eventually, just so we can handle the old style actions
  dispatchOldAction = (old: any) => {
    const nav = this._nav
    if (!nav) {
      throw new Error('Missing nav?')
    }

    const actions = Shared.oldActionToNewActions(old, nav._navigation) || []
    actions.forEach(a => nav.dispatch(a))
  }

  getNavState = () => this._nav.state?.nav

  render() {
    return <AppContainer ref={nav => (this._nav = nav)} />
  }
}

const styles = Styles.styleSheetCreate({
  headerTitle: {color: Styles.globalColors.black_75},
  keyboard: {
    flexGrow: 1,
    position: 'relative',
  },
})

export default RNApp