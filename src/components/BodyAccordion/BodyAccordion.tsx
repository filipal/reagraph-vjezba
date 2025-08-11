import { useEffect, useMemo, useRef, useState } from 'react'
import ArrowRight from '../../assets/arrow right.svg'
import styles from './BodyAccordion.module.scss'

type Measurement = { name: string; value: number }

export default function BodyAccordion({ measurements = [] as Measurement[] }: { measurements?: Measurement[] }) {
  // Categories grouped for body editing; values wiring will come later
  const categories = useMemo(
    () => [
      { key: 'Head', label: 'Head' },
      { key: 'Neck', label: 'Neck' },
      { key: 'Chest', label: 'Chest' },
      { key: 'Underchest', label: 'Underchest' },
      { key: 'Waist', label: 'Waist' },
      { key: 'Hips', label: 'Hips' },
      { key: 'Arms', label: 'Arms' },
      { key: 'Shoulder', label: 'Shoulder' },
      { key: 'Forearm', label: 'Forearm' },
      { key: 'Wrist', label: 'Wrist' },
      { key: 'Hands', label: 'Hands' },
      { key: 'Legs', label: 'Legs' },
      { key: 'Thigh', label: 'Thigh' },
      { key: 'Knee', label: 'Knee' },
      { key: 'Calf', label: 'Calf' },
      { key: 'Ankle', label: 'Ankle' },
      { key: 'Feet', label: 'Feet' },
      { key: 'Height', label: 'Height' },
    ],
    []
  )

  const [centerIdx, setCenterIdx] = useState<number>(2) // default to 'Chest' (index 2)

  const at = (offset: number) => {
    const n = categories.length
    let i = (centerIdx + offset) % n
    if (i < 0) i += n
    return categories[i]
  }

  const handleUp = () => setCenterIdx((i) => (i - 1 + categories.length) % categories.length)
  const handleDown = () => setCenterIdx((i) => (i + 1) % categories.length)

  // Right panel model: sliders per category, generated from measurements
  type Control = { key: string; label: string; value: number }
  const namesToValue = useMemo(() => {
    const map: Record<string, number> = {}
    for (const m of measurements) map[m.name] = m.value
    return map
  }, [measurements])

  const categoryMap: Record<string, string[]> = useMemo(
    () => ({
      Head: ['Head'],
      Neck: ['Neck'],
  // Chest shows custom controls per spec
  Chest: ['Shoulder Width 1', 'Sternum Depth', 'Waist Width', 'Belly Move InOut', 'Hip Size'],
      Underchest: ['Underchest'],
      Waist: ['Waist'],
      Hips: ['High Hip', 'Low Hip'],
      Arms: ['Bicep', 'Forearm', 'Wrist', 'Shoulder to Wrist'],
      Shoulder: ['Shoulder', 'Shoulder to Wrist'],
      Forearm: ['Forearm'],
      Wrist: ['Wrist'],
      Hands: ['Hand Length', 'Hand Breadth'],
      Legs: ['High Thigh', 'Mid Thigh', 'Knee', 'Calf', 'Ankle', 'Inseam'],
      Thigh: ['High Thigh', 'Mid Thigh'],
      Knee: ['Knee'],
      Calf: ['Calf'],
      Ankle: ['Ankle'],
      Feet: ['Foot Length', 'Foot Breadth'],
      Height: ['Height'],
    }),
    []
  )

  const selected = at(0)
  const selectedNames = categoryMap[selected.label] || []
  // For custom labels (e.g., Chest category), map to nearest measurement values when possible
  const chestLabelToMeasurement: Record<string, string | undefined> = {
    'Shoulder Width 1': 'Shoulder',
    'Sternum Depth': 'Chest', // approximate from chest girth for now
    'Waist Width': 'Waist',
    'Belly Move InOut': undefined, // no direct measurement; start at mid
    'Hip Size': 'Low Hip',
  }
  const toPercent = (val?: number) => (Number.isFinite(val as number) ? Math.max(0, Math.min(100, Math.round(((val as number)) / 2))) : 50)
  const resolveValue = (label: string) => {
    if (selected.label === 'Chest') {
      const mName = chestLabelToMeasurement[label]
      return toPercent(mName ? namesToValue[mName] : undefined)
    }
    return toPercent(namesToValue[label])
  }
  const list: Control[] = selectedNames.map((n) => ({ key: n, label: n, value: resolveValue(n) }))
  const VISIBLE = 5
  const [scrollIndex, setScrollIndex] = useState(0)
  const total = list.length
  const visibleCount = Math.min(VISIBLE, total)
  const maxScroll = Math.max(0, total - VISIBLE)
  const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n))

  const draggingRef = useRef(false)
  const onWheel = (e: React.WheelEvent) => {
    if (draggingRef.current) return // don't scroll list while dragging a slider
    if (!maxScroll) return
    const dir = e.deltaY > 0 ? 1 : -1
    setScrollIndex((i) => clamp(i + dir, 0, maxScroll))
  }

  // Reset/clamp scroll when category or list size changes
  useEffect(() => {
    setScrollIndex(0)
  }, [selected.label])
  useEffect(() => {
    setScrollIndex((i) => clamp(i, 0, Math.max(0, (list.length || 0) - VISIBLE)))
  }, [list.length])

  const view = list.slice(scrollIndex, scrollIndex + VISIBLE)

  // vertical indicator position
  const trackH = 130
  const fillH = total > 0 ? (visibleCount / total) * trackH : 0
  const fillTop = total > visibleCount && maxScroll > 0
    ? (scrollIndex / maxScroll) * (trackH - fillH)
    : 0

  // Slider row component
  function SliderRow({ control }: { control: Control }) {
    const [val, setVal] = useState(control.value)
    const barRef = useRef<HTMLDivElement | null>(null)
    const BAR_W = 170
    const onStart = (clientX: number) => {
      const bar = barRef.current
      if (!bar) return
      const rect = bar.getBoundingClientRect()
      draggingRef.current = true
      const update = (x: number) => {
        const rel = x - rect.left
        const width = rect.width
        const pct = clamp(Math.round((rel / width) * 100), 0, 100)
        setVal(pct)
      }
      update(clientX)
      const move = (e: PointerEvent) => update(e.clientX)
      const up = () => {
        window.removeEventListener('pointermove', move)
        window.removeEventListener('pointerup', up)
        draggingRef.current = false
      }
      window.addEventListener('pointermove', move)
      window.addEventListener('pointerup', up)
    }
    const leftPx = (val / 100) * BAR_W
    return (
      <div className={styles.row}>
        <div className={styles.rowLabel} title={control.label}>{control.label}</div>
        <div className={styles.sliderGroup}>
          <div className={styles.sliderBar} ref={barRef} onPointerDown={(e) => onStart(e.clientX)}>
            <button
              type="button"
              className={styles.sliderThumb}
              style={{ left: `${leftPx}px` }}
              onPointerDown={(e) => { e.stopPropagation(); onStart(e.clientX) }}
              aria-label={`Adjust ${control.label}`}
            />
          </div>
        </div>
        <div className={styles.rowPct}>{val}%</div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      {/* Left selector 80x171 */}
      <div className={styles.left}>
        <button type="button" className={`${styles.arrowBtn} ${styles.arrowUp}`} onClick={handleUp} aria-label="Previous">
          <img src={ArrowRight} alt="Up" />
        </button>

        <div className={styles.stack}>
          <div className={`${styles.item} ${styles.topSmall}`} title={at(-2).label}>{at(-2).label}</div>
          <div className={`${styles.item} ${styles.upper}`} title={at(-1).label}>{at(-1).label}</div>
          <div className={`${styles.item} ${styles.selected}`} title={at(0).label}>{at(0).label}</div>
          <div className={`${styles.item} ${styles.lower}`} title={at(1).label}>{at(1).label}</div>
          <div className={`${styles.item} ${styles.bottomSmall}`} title={at(2).label}>{at(2).label}</div>
        </div>

        <button type="button" className={`${styles.arrowBtn} ${styles.arrowDown}`} onClick={handleDown} aria-label="Next">
          <img src={ArrowRight} alt="Down" />
        </button>
      </div>

      {/* Right panel 350x171 (content depends on selected category) */}
      <div className={styles.right} onWheel={onWheel}>
        <div className={styles.rightInner}>
          <div className={styles.rows}>
            {view.map((c, i) => (
              <SliderRow key={`${c.key}-${i}`} control={c} />
            ))}
          </div>
        </div>
        <div className={styles.vTrack}>
          <div className={styles.vBar} />
          <div className={styles.vFill} style={{ top: `${fillTop}px`, height: `${fillH}px` }} />
        </div>
      </div>
    </div>
  )
}
