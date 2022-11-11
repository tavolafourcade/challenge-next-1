import React, {useState} from 'react'

import {Filter} from '../types'

type Props = {
  onChange: (filter: Filter) => void
}

const PriceRangeFilter: React.FC<Props> = ({onChange}) => {
  const [min, setMin] = useState<number>(0)
  const [max, setMax] = useState<number>(0)

  const handleChangeMin = (value: number) => {
    setMin(value)

    onChange(value ? (product) => product.price >= value && product.price <= max : null)
  }

  const handleChangeMax = (value: number) => {
    setMax(value)

    onChange(value ? (product) => product.price >= min && product.price <= value : null)
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
      <h4>Price</h4>
      <ul style={{}}>
        <li style={{listStyle: 'none'}}>
          <label style={{display: 'flex', gap: 12}}>
            Minimo:
            <input
              name="color"
              type="number"
              value={min}
              onChange={(e) => handleChangeMin(Number(e.target.value))}
            />
          </label>
        </li>
        <li style={{listStyle: 'none'}}>
          <label style={{display: 'flex', gap: 12}}>
            Máximo:
            <input
              name="color"
              type="number"
              value={max}
              onChange={(e) => handleChangeMax(Number(e.target.value))}
            />
          </label>
        </li>
      </ul>
    </div>
  )
}

export default PriceRangeFilter
