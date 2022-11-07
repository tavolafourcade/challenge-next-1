import {FC} from 'react'

import {Product} from '../types'

type Props = {
  product: Product
}
const ProductCard: FC<Props> = ({product}) => {
  const {image, name, price, rating} = product

  return (
    <div
      style={{
        border: '1px solid black',
        padding: 12,
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
      }}
    >
      <img alt={name} src={image} />
      <h3>{name}</h3>
      <p>Valoración: {'★'.repeat(rating).padEnd(5, '☆')}</p>
      <p>{price.toLocaleString('en-US', {style: 'currency', currency: 'USD'})}</p>
    </div>
  )
}

export default ProductCard
