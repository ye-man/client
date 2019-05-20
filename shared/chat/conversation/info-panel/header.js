// @flow
import * as React from 'react'
import * as Kb from '../../../common-adapters'
import * as Styles from '../../../styles'
import InfoPanelMenu from './menu/container'
import * as ChatTypes from '../../../constants/types/chat2'

type SmallProps = {
  admin: boolean,
  teamname: string,
  channelname?: string,
  conversationIDKey: ChatTypes.ConversationIDKey,
  participantCount: number,
  isSmallTeam: boolean,
} & Kb.OverlayParentProps

const gearIconSize = Styles.isMobile ? 24 : 16

const _TeamHeader = (props: SmallProps) => {
  let title = props.teamname
  if (props.channelname) {
    title += '#' + props.channelname
  }
  return (
    <Kb.Box2 direction="vertical" fullWidth={true} gap="small">
      <Kb.Box2 direction="horizontal" style={styles.smallContainer} fullWidth={true}>
        <InfoPanelMenu
          attachTo={props.getAttachmentRef}
          onHidden={props.toggleShowingMenu}
          isSmallTeam={props.isSmallTeam}
          teamname={props.teamname}
          conversationIDKey={props.conversationIDKey}
          visible={props.showingMenu}
        />
        <Kb.ConnectedNameWithIcon
          containerStyle={styles.flexOne}
          horizontal={true}
          teamname={props.teamname}
          onClick="profile"
          title={title}
          metaOne={props.participantCount.toString() + ' member' + (props.participantCount !== 1 ? 's' : '')}
        />
        <Kb.Icon
          type="iconfont-gear"
          onClick={props.toggleShowingMenu}
          ref={props.setAttachmentRef}
          style={Kb.iconCastPlatformStyles(styles.gear)}
          fontSize={gearIconSize}
        />
      </Kb.Box2>
      {props.admin && props.isSmallTeam && (
        <Kb.Button mode="Primary" type="Default" label="Add members to team" style={styles.addMembers} />
      )}
      {!props.isSmallTeam && (
        <Kb.Button mode="Primary" type="Default" label="Add members to channel" style={styles.addMembers} />
      )}
    </Kb.Box2>
  )
}
const TeamHeader = Kb.OverlayParentHOC(_TeamHeader)

type AdhocProps = {|
  participants: Array<{
    username: string,
    fullname: string,
  }>,
|}

export const AdhocHeader = (props: AdhocProps) => {
  return (
    <Kb.Box2 direction="vertical" fullWidth={true} style={styles.adhocContainer} gap="tiny">
      <Kb.ScrollView>
        {props.participants.map(p => {
          return (
            <Kb.NameWithIcon
              key={p.username}
              colorFollowing={true}
              containerStyle={styles.adhocPartContainer}
              horizontal={true}
              username={p.username}
              metaOne={p.fullname}
            />
          )
        })}
      </Kb.ScrollView>
      <Kb.Button mode="Primary" type="Default" label="Add people" style={styles.addMembers} />
      <Kb.Text type="BodyTiny" center={true}>
        A new conversation will be created.
      </Kb.Text>
      <Kb.Button mode="Secondary" type="Default" label="Turn into a team" style={styles.addMembers} />
      <Kb.Text type="BodyTiny" center={true}>
        Add and delete members as you wish.
      </Kb.Text>
    </Kb.Box2>
  )
}

const styles = Styles.styleSheetCreate({
  addMembers: {
    marginLeft: Styles.globalMargins.small,
    marginRight: Styles.globalMargins.small,
  },
  adhocContainer: {
    maxHeight: 230,
  },
  adhocPartContainer: {
    padding: Styles.globalMargins.tiny,
  },
  channelnameContainer: {
    alignSelf: 'center',
    marginBottom: 2,
    marginTop: Styles.globalMargins.medium,
    position: 'relative',
  },
  description: {
    paddingLeft: Styles.globalMargins.small,
    paddingRight: Styles.globalMargins.small,
    textAlign: 'center',
  },
  editBox: {
    ...Styles.globalStyles.flexBoxRow,
    position: 'absolute',
    right: -50,
    top: Styles.isMobile ? 2 : 1,
  },
  editIcon: {marginRight: Styles.globalMargins.xtiny},
  flexOne: {flex: 1},
  gear: Styles.platformStyles({
    common: {
      height: gearIconSize,
      paddingLeft: 16,
      paddingRight: 16,
      width: gearIconSize,
    },
    isMobile: {
      marginRight: 16,
      width: gearIconSize + 32,
    },
  }),
  smallContainer: {
    alignItems: 'center',
    paddingLeft: Styles.globalMargins.small,
  },
})

export {TeamHeader}
