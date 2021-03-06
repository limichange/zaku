import React, { useLayoutEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import G6 from '@antv/g6'
import editorStyle from './utils/style'
import nodes from './nodes'

const data = {
  nodes: [
    {
      id: 'parallel-gateway-node',
      shape: 'parallel-gateway-node',
      x: 100,
      y: 200
    },
    {
      id: 'node2',
      x: 300,
      y: 200
    },
    {
      id: 'node3',
      x: 300,
      y: 300
    },
    {
      id: 'node-modelRect',
      x: 300,
      y: 100,
      shape: 'modelRect',
      label: 'modelRect',
      anchorPoints: [
        [0, 1],
        [0.5, 1]
      ]
    },
    {
      id: 'node-modelRect2',
      x: 300,
      y: 300,
      shape: 'modelRect',
      label: 'modelRect',
      anchorPoints: [
        [0, 1],
        [0.5, 1]
      ]
    }
  ],
  edges: [
    {
      id: 'edge1',
      target: 'node2',
      source: 'node1'
    }
  ]
}

function createG6MiniMap() {
  return new G6.Minimap({
    size: [100, 100],
    className: 'minimap',
    type: 'delegate'
  })
}

export default function() {
  const ref = React.useRef(null)
  let graph = null

  useLayoutEffect(() => {
    if (!graph) {
      let addedCount = 0
      G6.registerBehavior('click-add-edge', {
        getEvents() {
          return {
            'node:click': 'onClick',
            mousemove: 'onMousemove',
            'edge:click': 'onEdgeClick' // 点击空白处，取消边
          }
        },
        onClick(ev) {
          const node = ev.item
          const graph = this.graph
          const point = {
            x: ev.x,
            y: ev.y
          }
          const model = node.getModel()
          if (this.addingEdge && this.edge) {
            graph.updateItem(this.edge, {
              target: model.id
            })
            // graph.setItemState(this.edge, 'selected', true);
            this.edge = null
            this.addingEdge = false
          } else {
            this.edge = graph.addItem('edge', {
              source: model.id,
              target: point
            })
            this.addingEdge = true
          }
        },
        onMousemove(ev) {
          const point = {
            x: ev.x,
            y: ev.y
          }
          if (this.addingEdge && this.edge) {
            this.graph.updateItem(this.edge, {
              target: point
            })
          }
        },
        onEdgeClick(ev) {
          const currentEdge = ev.item
          // 拖拽过程中，点击会点击到新增的边上
          if (this.addingEdge && this.edge == currentEdge) {
            graph.removeItem(this.edge)
            this.edge = null
            this.addingEdge = false
          }
        }
      })

      // Register a custom behavior to add node
      G6.registerBehavior('click-add-node', {
        getEvents() {
          return {
            'canvas:click': 'onClick'
          }
        },
        onClick(ev) {
          const graph = this.graph
          const node = this.graph.addItem('node', {
            x: ev.canvasX,
            y: ev.canvasY,
            id: `node-${addedCount}` // 生成唯一的 id
          })
          addedCount++
        }
      })

      graph = new G6.Graph({
        container: ReactDOM.findDOMNode(ref.current),
        width: 500,
        height: 500,
        modes: {
          default: ['drag-node', 'click-select'],
          addNode: ['click-add-node', 'click-select'],
          addEdge: ['click-add-edge', 'click-select']
        },
        // The node styles in different states
        nodeStateStyles: {
          selected: {
            fill: '#95D6FB'
          },
          hover: {
            cursor: editorStyle.cursor.hoverNode
          }
        },
        plugins: [createG6MiniMap()]
      })

      nodes(G6)
      graph.setMode('edit')
      graph.data(data)
    }

    graph.render()
  }, [])

  return <div ref={ref}></div>
}
