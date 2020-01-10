import $style from './index.less'

export default function Box() {
  return (
    <div className={$style.Box}>
      <div className={$style.marginBox}>
        <div className={$style.borderBox}>
          <div className={$style.paddingBox}>
            <div className={$style.sizeBox}>100 x 100</div>
          </div>
        </div>
      </div>
    </div>
  )
}
