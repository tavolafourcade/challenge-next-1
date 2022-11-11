import React, {useMemo, useState} from 'react'

import {Filter, Product} from '../types'

type Props = {
  products: Product[]
  onChange: (filter: Filter) => void
}

const ColorFilter: React.FC<Props> = ({products, onChange}) => {
  const [selected, setSelected] = useState<Set<string>>(() => new Set())

  const colors = useMemo(() => {
    const buffer: Set<string> = new Set()

    for (let product of products) {
      buffer.add(product.color)
    }

    return Array.from(buffer)
  }, [products])

  const handleChange = (color: string, isChecked: boolean) => {
    const draft = structuredClone(selected) // new Set(selected)

    isChecked ? draft.add(color) : draft.delete(color)

    onChange(draft.size ? (product) => draft.has(product.color) : null)
    setSelected(draft)
  }

  return (
    <div
      style={{
        border: '1px solid white',
        padding: 12,
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
      }}
    >
      <h4>Colors</h4>
      <ul style={{}}>
        {colors.map((color) => (
          <li key={color} style={{display: 'flex', gap: 12}}>
            <input
              name="color"
              type="checkbox"
              value={color}
              onChange={(e) => handleChange(color, e.target.checked)}
            />
            <label>{color}</label>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ColorFilter
