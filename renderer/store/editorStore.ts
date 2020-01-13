import { Subject } from 'rxjs'

const subject = new Subject()

export type initialStateInterface = {
  tabIndex: string
  key: string
  components: any
  dragComponent: any
}

const initialState: initialStateInterface = {
  components: [],
  tabIndex: '0',
  key: '',
  dragComponent: null
}

let state = initialState

function updateComponentsByKey(componentKey, callback) {
  const { component } = findComponent(componentKey)
  callback(component)

  return state.components.concet()
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

function updateZoomIndex(components) {
  let zoomIndex = 1000

  function mark(components = []) {
    components.forEach(component => {
      component.zoomIndex = ++zoomIndex

      mark(component.components)
    })
  }

  mark(components)
}

const editorStore = {
  init: () => subject.next(state),
  findComponent,
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
    const { component } = findComponent(componentKey)

    Object.assign(component.attributes, keyValue)

    subject.next({ ...state })
  },
  moveComponent(key, toKey, gap, position) {
    const { parent, component, index } = findComponent(key)
    const {
      parent: targetParent,
      component: target,
      index: targetIndex
    } = findComponent(toKey)

    if (target.noChildren) return

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

    updateZoomIndex(state.components)

    subject.next({ ...state })
  },
  updateComponentText(componentKey, text) {
    const { component } = findComponent(componentKey)

    component.text = text

    subject.next({ ...state })
  },
  removeComponent(componentKey) {
    const { parent, index } = findComponent(componentKey)

    parent.components.splice(index, 1)

    subject.next({ ...state })
  },
  addComponent(component) {
    const components = [...state.components, component]
    updateZoomIndex(components)

    state = {
      ...state,
      components
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
