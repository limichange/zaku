import previewImage from './preview.png'

export default function Example1() {
  return (
    <div>
      <div className='imgWrap'>
        <img src={previewImage} alt='' />
      </div>
      <div>DatePicker</div>
    </div>
  )
}
