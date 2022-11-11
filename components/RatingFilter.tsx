import React, {useState} from 'react'

import {Filter} from '../types'

type Props = {
  onChange: (filter: Filter) => void
}

const RatingFilter: React.FC<Props> = ({onChange}) => {
  const [selected, setSelected] = useState<Set<number>>(() => new Set())

  const handleChange = (rating: number, isChecked: boolean) => {
    const draft = structuredClone(selected) // new Set(selected)

    isChecked ? draft.add(rating) : draft.delete(rating)

    onChange(draft.size ? (product) => draft.has(product.rating) : null)
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
      <h4>Average Rating</h4>
      <ul style={{}}>
        {[1, 2, 3, 4, 5].map((rating) => (
          <li key={String(rating)} style={{listStyle: 'none'}}>
            <label style={{display: 'flex', gap: 12}}>
              <input
                name="color"
                type="checkbox"
                value={rating}
                onChange={(e) => handleChange(rating, e.target.checked)}
              />
              {'★'.repeat(rating).padEnd(5, '☆')}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default RatingFilter
