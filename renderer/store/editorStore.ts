import { Subject } from 'rxjs'

const subject = new Subject()

export type initialStateInterface = {
  tabIndex: string
  key: string
  components: any
}

const initialState: initialStateInterface = {
  components: [],
  tabIndex: '0',
  key: ''
}

let state = initialState

function updateComponentsByKey(componentKey, callback) {
  return state.components.concat().map(c => {
    if (c.key === componentKey) {
      callback(c)
    }

    return c
  })
}

const editorStore = {
  init: () => subject.next(state),
  subscribe: setState => {
    const sub = subject.subscribe(setState)
    subject.next(state)
    return sub
  },
  getComponentByKey(key) {
    return state.components.find(c => c.key === key)
  },
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
  updateComponentAttribute(componentKey, keyValue) {
    state = {
      ...state,
      components: updateComponentsByKey(componentKey, c => {
        Object.assign(c.attributes, keyValue)
      })
    }

    subject.next(state)
  },
  updateComponentText(componentKey, text) {
    state = {
      ...state,
      components: updateComponentsByKey(componentKey, c => {
        c.text = text
      })
    }

    subject.next(state)
  },
  addComponent(component) {
    state = {
      ...state,
      components: [...state.components, component]
    }

    subject.next(state)
  },
  clear: () => {
    state = initialState
    subject.next(state)
  },
  initialState,
  subject,
  state
}

export default editorStore
