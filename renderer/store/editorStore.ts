import { Subject } from 'rxjs'
import uuid from 'uuid'

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

function moveComponent(key, toKey = null, gap = false, position = 0) {
  const { parent, component, index } = findComponent(key)
  if (key === toKey) return

  if (!toKey) {
    parent.components.splice(index, 1)

    state.components.push(component)
  } else {
    const {
      parent: targetParent,
      component: target,
      index: targetIndex
    } = findComponent(toKey)

    if (target.noChildren) return

    parent.components.splice(index, 1)

    if (gap) {
      targetParent.components.splice(
        position === -1 ? targetIndex : targetIndex + 1,
        0,
        component
      )
    } else {
      if (!target.components) target.components = []

      target.components.push(component)
    }
  }

  updateZoomIndex(state.components)

  subject.next({ ...state })
}

const editorStore = {
  init: () => subject.next(state),
  findComponent,
  moveComponent,
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
  addComponent(componentInfo, parentKey?) {
    let components = state.components
    const newComponent = {
      key: uuid(),
      attributes: {},
      components: [],
      ...componentInfo
    }

    if (!parentKey) {
      components = [...state.components, newComponent]
    } else {
      const { component } = findComponent(parentKey)
      component.components.push(newComponent)
    }

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
