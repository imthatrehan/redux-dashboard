import { createSlice } from '@reduxjs/toolkit'
import loadState from '../../app/storage'

const activitySlice = createSlice({
  name: 'activity',
  initialState: {
    items: loadState('activity', []),
  },
  reducers: {
    logActivity: (state, action) => {
      const newLog = {
        id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        text: action.payload,
        createdAt: Date.now(),
        dot: 'bg-[#3446f0]',
      }
      state.items.unshift(newLog)
      if (state.items.length > 10) {
        state.items.pop()
      }
    },
  },
})

export const { logActivity } = activitySlice.actions
export const getAllActivities = (state) => state.activity.items
export default activitySlice.reducer