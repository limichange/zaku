import { Subject } from 'rxjs'

const subject = new Subject()

const initialState = {
  tabIndex: '0'
}

let state = initialState

const EditorStore = {
  init: () => subject.next(state),
  subscribe: setState => subject.subscribe(setState),
  setIndex: tabIndex => {
    state = {
      ...state,
      tabIndex
    }

    subject.next(state)
  },
  clear: () => {
    state = initialState
    subject.next(state)
  },
  initialState
}

export default EditorStore
