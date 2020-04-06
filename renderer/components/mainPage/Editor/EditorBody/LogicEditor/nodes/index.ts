const deepMix = require('@antv/util/lib/deep-mix')
import editorStyle from '../utils/style'

const taskDefaultOptions = {
  icon: null,
  iconStyle: {
    width: 12,
    height: 12,
    left: 2,
    top: 2
  },
  style: {
    ...editorStyle.nodeStyle,
    fill: '#E7F7FE',
    stroke: '#1890FF',
    cursor: 'default'
  },
  stateStyles: {
    selected: {
      fill: '#95D6FB'
    },
    hover: {
      cursor: editorStyle.cursor.hoverNode
    }
  }
}

const gatewayDefaultOptions = {
  icon: null,
  iconStyle: {
    width: 20,
    height: 20,
    left: 2,
    top: 2
  },
  style: {
    ...editorStyle.nodeStyle,
    fill: '#E8FEFA',
    stroke: '#13C2C2',
    cursor: 'default'
  },
  stateStyles: {
    selected: {
      fill: '#8CE8DE'
    },
    hover: {
      cursor: editorStyle.cursor.hoverNode
    }
  }
}

const startDefaultOptions = {
  icon: null,
  iconStyle: {
    width: 18,
    height: 18,
    left: 6,
    top: 6
  },
  style: {
    ...editorStyle.nodeStyle,
    fill: '#FEF7E8',
    stroke: '#FA8C16',
    cursor: 'default'
  },
  stateStyles: {
    selected: {
      fill: '#FCD49A'
    },
    hover: {
      cursor: editorStyle.cursor.hoverNode
    }
  }
}

const endDefaultOptions = {
  icon: null,
  iconStyle: {
    width: 18,
    height: 18,
    left: 6,
    top: 6
  },
  style: {
    ...editorStyle.nodeStyle,
    fill: '#EFF7E8',
    stroke: '#F5222D',
    cursor: 'default'
  },
  stateStyles: {
    selected: {
      fill: '#CFD49A'
    },
    hover: {
      cursor: editorStyle.cursor.hoverNode
    }
  }
}

const catchDefaultOptions = {
  icon: null,
  iconStyle: {
    width: 20,
    height: 20,
    left: -10,
    top: -8
  },
  style: {
    ...editorStyle.nodeStyle,
    fill: '#FEF7E8',
    stroke: '#FA8C16',
    cursor: 'default'
  },
  stateStyles: {
    selected: {
      fill: '#FCD49A'
    },
    hover: {
      cursor: editorStyle.cursor.hoverNode
    }
  }
}

export default function(G6) {
  G6.registerNode(
    'task-node',
    {
      shapeType: 'rect',
      options: {
        ...taskDefaultOptions
      },
      getShapeStyle(cfg) {
        cfg.size = [80, 44]
        const width = cfg.size[0]
        const height = cfg.size[1]
        const style = {
          x: 0 - width / 2,
          y: 0 - height / 2,
          width,
          height,
          ...this.options.style
        }
        return style
      }
    },
    'base-node'
  )
  G6.registerNode(
    'gateway-node',
    {
      shapeType: 'path',
      labelPosition: 'bottom',
      options: {
        ...gatewayDefaultOptions
      },
      getShapeStyle(cfg) {
        cfg.size = [40, 40]
        const width = cfg.size[0]
        const height = cfg.size[1]
        const gap = 4
        const style = {
          path: [
            ['M', 0 - gap, 0 - height / 2 + gap],
            ['Q', 0, 0 - height / 2, gap, 0 - height / 2 + gap],
            ['L', width / 2 - gap, 0 - gap],
            ['Q', width / 2, 0, width / 2 - gap, gap],
            ['L', gap, height / 2 - gap],
            ['Q', 0, height / 2, 0 - gap, height / 2 - gap],
            ['L', -width / 2 + gap, gap],
            ['Q', -width / 2, 0, -width / 2 + gap, 0 - gap],
            ['Z']
          ],
          ...this.options.style
        }
        return style
      }
    },
    'base-node'
  )
  G6.registerNode(
    'exclusive-gateway-node',
    {
      afterDraw(cfg, group) {
        group.icon = group.addShape('path', {
          attrs: {
            path: [
              ['M', -8, -8],
              ['L', 8, 8],
              ['Z'],
              ['M', 8, -8],
              ['L', -8, 8],
              ['Z']
            ],
            lineWidth: 2,
            stroke: this.options.style.stroke
          }
        })
        // this.runAnimate(cfg, group)
      }
    },
    'gateway-node'
  )
  G6.registerNode(
    'parallel-gateway-node',
    {
      afterDraw(cfg, group) {
        group.icon = group.addShape('path', {
          attrs: {
            path: [
              ['M', 0, -10],
              ['L', 0, 10],
              ['Z'],
              ['M', -10, 0],
              ['L', 10, 0],
              ['Z']
            ],
            lineWidth: 2,
            stroke: this.options.style.stroke
          }
        })
        // this.runAnimate(cfg, group)
      }
    },
    'gateway-node'
  )
  G6.registerNode(
    'inclusive-gateway-node',
    {
      afterDraw(cfg, group) {
        group.icon = group.addShape('circle', {
          attrs: {
            x: 0,
            y: 0,
            r: 10,
            lineWidth: 2,
            stroke: this.options.style.stroke
          }
        })
        // this.runAnimate(cfg, group)
      }
    },
    'gateway-node'
  )
  G6.registerNode(
    'start-node',
    {
      shapeType: 'circle',
      labelPosition: 'bottom',
      options: {
        ...startDefaultOptions
      },
      getShapeStyle(cfg) {
        cfg.size = [30, 30]
        const width = cfg.size[0]
        const style = {
          x: 0,
          y: 0,
          r: width / 2,
          ...this.options.style
        }
        return style
      },
      afterDraw(cfg, group) {
        group.icon = group.addShape('path', {
          attrs: {
            path: [
              ['M', -4, -6],
              ['L', 6, 0],
              ['L', -4, 6],
              ['Z'] // close
            ],
            fill: this.options.style.stroke,
            stroke: this.options.style.stroke
          }
        })
      },
      getAnchorPoints() {
        return [
          [0.5, 0], // top
          [1, 0.5], // right
          [0.5, 1] // bottom
        ]
      }
    },
    'base-node'
  )
  G6.registerNode(
    'end-node',
    {
      shapeType: 'circle',
      labelPosition: 'bottom',
      options: {
        ...endDefaultOptions
      },
      getShapeStyle(cfg) {
        cfg.size = [30, 30]
        const width = cfg.size[0]
        const style = {
          x: 0,
          y: 0,
          r: width / 2,
          ...this.options.style
        }
        return style
      },
      afterDraw(cfg, group) {
        group.icon = group.addShape('path', {
          attrs: {
            path: [
              ['M', -4, -4],
              ['L', 4, -4],
              ['L', 4, 4],
              ['L', -4, 4],
              ['Z'] // close
            ],
            fill: this.options.style.stroke,
            stroke: this.options.style.stroke
          }
        })
      },
      getAnchorPoints() {
        return [
          [0.5, 0], // top
          [0.5, 1], // bottom
          [0, 0.5] // left
        ]
      }
    },
    'base-node'
  )
  G6.registerNode(
    'catch-node',
    {
      shapeType: 'path',
      labelPosition: 'bottom',
      options: {
        ...catchDefaultOptions
      },
      getShapeStyle(cfg) {
        cfg.size = [50, 30]
        const width = cfg.size[0]
        const height = cfg.size[1]
        const style = {
          path: [
            ['M', 0, -height / 3],
            ['L', width / 2, -height / 3],
            ['L', 0, (height / 3) * 2],
            ['L', -width / 2, -height / 3],
            ['Z'] // close
          ],
          ...this.options.style
        }
        return style
      },
      getAnchorPoints() {
        return [
          [0.5, 0], // top
          [0.8, 0.38], // right
          [0.5, 1], // bottom
          [0.2, 0.38] // left
        ]
      }
    },
    'base-node'
  )
}
