import { createClient } from '@blinkdotnew/sdk'

export const blink = createClient({
  projectId: 'pixel-quest-task-manager-8hvsy9tr',
  authRequired: true
})

export default blink