import { Subject } from 'rxjs'

const subject = new Subject()

const initialState = {
  tabIndex: '0',
  key: ''
}

let state = initialState

const EditorStore = {
  init: () => subject.next(state),
  subscribe: setState => subject.subscribe(setState),
  setComponentKey: key => {
    state = {
      ...state,
      key
    }

    subject.next(state)
  },
  setIndex: tabIndex => {
    state = {
      ...state,
      tabIndex
    }

    subject.next(state)
  },
  update: data => {
    state = {
      ...state,
      ...data
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
