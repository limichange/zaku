import inputPreviewImage from './images/inputPreview.png'
import datepickerPreviewImage from './images/datepickerPreview.png'
import buttonPreviewImage from './images/buttonPreview.png'

const config = [
  {
    type: 'AntdInput',
    tag: 'Input',
    name: 'Input',
    noChildren: true,
    previewImage: inputPreviewImage
  },
  {
    type: 'AntdButton',
    tag: 'Button',
    name: 'Button',
    text: 'Button',
    previewImage: buttonPreviewImage
  },
  {
    noChildren: true,
    type: 'AntdDatePicker',
    tag: 'DatePicker',
    name: 'DatePicker',
    previewImage: datepickerPreviewImage
  },
  {
    type: 'AntdTooltip',
    tag: 'Tooltip',
    name: 'Tooltip',
    noHover: true,
    previewImage: '',
    attributes: {
      title: 'test'
    }
  },
  {
    type: 'AntdRow',
    tag: 'Row',
    name: 'Row',
    previewImage: '',
    emptyPlaceholder: true,
    attributes: {
      type: 'flex'
    }
  },
  {
    type: 'AntdCol',
    tag: 'Col',
    name: 'Col',
    emptyPlaceholder: true,
    previewImage: '',
    attributes: {
      span: 4
    }
  },
  // Header, Footer, Sider, Content, Layout
  {
    type: 'AntdLayout',
    tag: 'Layout',
    name: 'Layout',
    emptyPlaceholder: true
  },
  {
    type: 'AntdHeader',
    tag: 'Layout.Header',
    name: 'Header',
    emptyPlaceholder: true
  },
  {
    type: 'AntdFooter',
    tag: 'Layout.Footer',
    name: 'Footer',
    emptyPlaceholder: true
  },
  {
    type: 'AntdSider',
    tag: 'Layout.Sider',
    name: 'Sider',
    emptyPlaceholder: true
  },
  {
    type: 'AntdContent',
    tag: 'Layout.Content',
    name: 'Content',
    emptyPlaceholder: true
  },
  {
    type: 'div',
    tag: 'div',
    name: 'div',
    emptyPlaceholder: true
  }
]

export default config
