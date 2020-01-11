import { Subject } from 'rxjs'

const subject = new Subject()

export type initialStateInterface = {
  tabIndex: string
  key: string
  components: any
}

const initialState: initialStateInterface = {
  components: [
    // debug
    {
      type: 'div',
      tag: 'div',
      text: 'div',
      key: 'aksdhf22u',
      components: [
        {
          type: 'div',
          tag: 'div',
          text: 'div',
          key: 'aksdhfu',
          components: []
        }
      ]
    }
  ],
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

function findComponent(key) {
  let parent = null
  let index = null
  let findComponent = null

  function find(component) {
    const { components } = component
    if (!components || components?.length <= 0 || findComponent) {
      return null
    }

    let result = components.find(c => c.key === key)

    if (result) {
      index = components.findIndex(c => c.key === key)
      parent = component
      findComponent = result
    } else {
      components.forEach(find)
    }
  }

  find(state)

  return {
    component: findComponent,
    index,
    parent
  }
}

function insertComponent() {}

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
  moveComponent(key, toKey, gap, position) {
    const { parent, component, index } = findComponent(key)
    const {
      parent: targetParent,
      component: target,
      index: targetIndex
    } = findComponent(toKey)

    if (gap) {
      parent.components.splice(index, 1)

      targetParent.components.splice(
        position === -1 ? targetIndex : targetIndex + 1,
        0,
        component
      )
    } else {
      if (target.key === parent.key) return

      parent.components.splice(index, 1)

      if (!target.components) target.components = []

      target.components.push(component)
    }

    subject.next({ ...state })
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
  removeComponent(componentKey) {
    state = {
      ...state,
      components: state.components.filter(c => c.key !== componentKey)
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
