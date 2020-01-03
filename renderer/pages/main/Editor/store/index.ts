import { Subject } from 'rxjs'

const subject = new Subject()

const initialState = {
  data: [],
  newDataCount: 0
}

let state = initialState

const EditorStore = {
  init: () => subject.next(state),
  subscribe: setState => subject.subscribe(setState),
  sendMessage: message => {
    state = {
      ...state,
      data: [...state.data, message],
      newDataCount: state.newDataCount + 1
    }

    subject.next(state)
  },
  clear: () => {
    state = initialState
    subject.next(state)
  }
}
