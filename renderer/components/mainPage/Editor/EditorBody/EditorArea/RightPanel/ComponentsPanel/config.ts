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
    attributes: {
      type: 'flex'
    }
  },
  {
    type: 'AntdCol',
    tag: 'Col',
    name: 'Col',
    previewImage: '',
    attributes: {
      span: 4
    }
  },
  {
    type: 'div',
    tag: 'div',
    name: 'div'
  }
]

export default config
