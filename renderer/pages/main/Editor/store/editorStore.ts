import { Subject } from 'rxjs'

const subject = new Subject()

export type initialStateInterface = {
  tabIndex: string
  key: string
}

const initialState: initialStateInterface = {
  tabIndex: '0',
  key: ''
}

let state = initialState

const editorStore = {
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
  initialState,
  subject
}

export default editorStore
