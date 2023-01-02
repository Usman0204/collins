/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  data: [],
}

export const toastsSlice = createSlice({
  name: 'toasts',
  initialState,
  reducers: {
    push: (state, action) => {
      const { payload } = action
      const toastIndex = state.data.findIndex((toast) => toast.id === action.payload.id)

      // If id already matches remove it before adding it to the top of the stack
      if (toastIndex >= 0) {
        state.data.splice(toastIndex, 1)
      }

      state.data.unshift(payload)
    },
    remove: (state, action) => {
      const toastIndex = state.data.findIndex((toast) => toast.id === action.payload)

      if (toastIndex >= 0) {
        state.data.splice(toastIndex, 1)
      }
    },
    clear: (state) => {
      state.data = []
    },
  },
})

// Actions
export const { clear, remove, push } = toastsSlice.actions

export default toastsSlice.reducer
