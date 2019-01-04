// @flow
// NOTE: This file is GENERATED from json files in actions/json. Run 'yarn build-actions' to regenerate
/* eslint-disable no-unused-vars,prettier/prettier,no-use-before-define */

import * as I from 'immutable'
import * as RPCTypes from '../constants/types/rpc-gen'
import * as Types from '../constants/types/tracker2'

// Constants
export const resetStore = 'common:resetStore' // not a part of tracker2 but is handled by every reducer. NEVER dispatch this
export const typePrefix = 'tracker2:'
export const changeFollow = 'tracker2:changeFollow'
export const closeTracker = 'tracker2:closeTracker'
export const ignore = 'tracker2:ignore'
export const load = 'tracker2:load'
export const updateAssertion = 'tracker2:updateAssertion'
export const updateResult = 'tracker2:updateResult'
export const updatedDetails = 'tracker2:updatedDetails'

// Payload Types
type _ChangeFollowPayload = $ReadOnly<{|guiID: string, follow: boolean|}>
type _CloseTrackerPayload = $ReadOnly<{|guiID: string|}>
type _IgnorePayload = $ReadOnly<{|guiID: string|}>
type _LoadPayload = $ReadOnly<{|assertion: string, forceDisplay?: boolean, fromDaemon?: boolean, guiID: string, ignoreCache?: boolean, reason: string|}>
type _UpdateAssertionPayload = $ReadOnly<{|guiID: string, type: string, value: string, siteURL: string, siteIcon: string, proofURL: string, state: Types.AssertionState, metas: Array<Types._AssertionMeta>, color: Types.AssertionColor|}>
type _UpdateResultPayload = $ReadOnly<{|guiID: string, result: Types.DetailsState, reason: ?string|}>
type _UpdatedDetailsPayload = $ReadOnly<{|guiID: string, bio: string, followThem: boolean, followersCount: number, followingCount: number, followsYou: boolean, fullname: string, location: string, teamShowcase: Array<Types._TeamShowcase>|}>

// Action Creators
export const createChangeFollow = (payload: _ChangeFollowPayload) => ({payload, type: changeFollow})
export const createCloseTracker = (payload: _CloseTrackerPayload) => ({payload, type: closeTracker})
export const createIgnore = (payload: _IgnorePayload) => ({payload, type: ignore})
export const createLoad = (payload: _LoadPayload) => ({payload, type: load})
export const createUpdateAssertion = (payload: _UpdateAssertionPayload) => ({payload, type: updateAssertion})
export const createUpdateResult = (payload: _UpdateResultPayload) => ({payload, type: updateResult})
export const createUpdatedDetails = (payload: _UpdatedDetailsPayload) => ({payload, type: updatedDetails})

// Action Payloads
export type ChangeFollowPayload = {|+payload: _ChangeFollowPayload, +type: 'tracker2:changeFollow'|}
export type CloseTrackerPayload = {|+payload: _CloseTrackerPayload, +type: 'tracker2:closeTracker'|}
export type IgnorePayload = {|+payload: _IgnorePayload, +type: 'tracker2:ignore'|}
export type LoadPayload = {|+payload: _LoadPayload, +type: 'tracker2:load'|}
export type UpdateAssertionPayload = {|+payload: _UpdateAssertionPayload, +type: 'tracker2:updateAssertion'|}
export type UpdateResultPayload = {|+payload: _UpdateResultPayload, +type: 'tracker2:updateResult'|}
export type UpdatedDetailsPayload = {|+payload: _UpdatedDetailsPayload, +type: 'tracker2:updatedDetails'|}

// All Actions
// prettier-ignore
export type Actions =
  | ChangeFollowPayload
  | CloseTrackerPayload
  | IgnorePayload
  | LoadPayload
  | UpdateAssertionPayload
  | UpdateResultPayload
  | UpdatedDetailsPayload
  | {type: 'common:resetStore', payload: null}