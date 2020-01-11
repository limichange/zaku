import inputPreviewImage from './images/inputPreview.png'
import datepickerPreviewImage from './images/datepickerPreview.png'
import buttonPreviewImage from './images/buttonPreview.png'

export default [
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
  }
]
