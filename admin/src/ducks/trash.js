import { appName } from '../config'

/**
 * Constants
 * */
export const moduleName = 'trash'
const prefix = `${appName}/${moduleName}`
export const MOVE_TO_TRASH = `${prefix}/MOVE_TO_TRASH`

/**
 * Action Creators
 * */

export const moveToTrash = (entityType, id) => ({
  type: MOVE_TO_TRASH,
  payload: { entityType, id }
})
