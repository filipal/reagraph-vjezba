import { useState } from 'react'
import ArrowLeft from '../../assets/arrow left.svg'
import ArrowRight from '../../assets/arrow right.svg'
import Skin1 from '../../assets/skin1.svg?react'
import Skin2 from '../../assets/skin2.svg?react'
import Skin3 from '../../assets/skin3.svg?react'
import { darkenHex, lightenHex } from '../../utils/color'
import styles from './SkinAccordion.module.scss'

export default function SkinAccordion() {
  const [activeSide, setActiveSide] = useState<'left' | 'right'>('left')
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null) // null => show two; number => show one

  const basePalette = ['#f5e0d0', '#eac3a6', '#d7a381', '#b47b57', '#8a573b', '#5d3b2a']
  const [baseIndex, setBaseIndex] = useState(2)

  const items = [Skin1, Skin2, Skin3]
  const base = basePalette[baseIndex]
  const light = lightenHex(base)
  const dark = darkenHex(base)

  const handlePrev = () => {
    if (focusedIndex !== null) {
      setFocusedIndex((focusedIndex + items.length - 1) % items.length)
    }
    setBaseIndex((baseIndex + basePalette.length - 1) % basePalette.length)
  }

  const handleNext = () => {
    if (focusedIndex !== null) {
      setFocusedIndex((focusedIndex + 1) % items.length)
    }
    setBaseIndex((baseIndex + 1) % basePalette.length)
  }

  return (
    <div className={styles.container}>
      <div className={`${styles.left} ${activeSide === 'left' ? styles.active : ''}`} onClick={() => setActiveSide('left')} role="button" tabIndex={0}>
        <div className={styles.group} onClick={(e) => e.stopPropagation()}>
          <button type="button" className={styles.arrow} onClick={handlePrev}>
            <img src={ArrowLeft} alt="Prev" />
          </button>

          {focusedIndex === null ? (
            <div className={styles.iconsThree}>
              <button type="button" className={styles.iconBtn} onClick={() => setFocusedIndex(0)}>
                <Skin1 className={styles.iconSmall} style={{ color: light }} />
              </button>
              <button type="button" className={styles.iconBtn} onClick={() => setFocusedIndex(1)}>
                <Skin2 className={styles.iconLarge} style={{ color: base }} />
              </button>
              <button type="button" className={styles.iconBtn} onClick={() => setFocusedIndex(2)}>
                <Skin3 className={styles.iconSmall} style={{ color: dark }} />
              </button>
            </div>
          ) : (
            <div className={styles.iconOne}>
              <button type="button" className={styles.iconBtn} onClick={() => setFocusedIndex(null)}>
                {focusedIndex === 0 && <Skin1 className={styles.iconLarge} style={{ color: light }} />}
                {focusedIndex === 1 && <Skin2 className={styles.iconLarge} style={{ color: base }} />}
                {focusedIndex === 2 && <Skin3 className={styles.iconLarge} style={{ color: dark }} />}
              </button>
            </div>
          )}

          <button type="button" className={styles.arrow} onClick={handleNext}>
            <img src={ArrowRight} alt="Next" />
          </button>
        </div>
      </div>

      <div className={styles.divider} />

      <div className={`${styles.right} ${activeSide === 'right' ? styles.active : ''}`} onClick={() => setActiveSide('right')} role="button" tabIndex={0}>
        {/* TODO: right content per design */}
      </div>
    </div>
  )
}