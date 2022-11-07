import type {GetStaticProps, NextPage} from 'next'
import type {Product} from '../types'

import {useState} from 'react'

import api from '../api'
import {ProductCard, PriceRangeFilter, ColorFilter, RatingFilter} from '../components/'

type Props = {
  products: Product[]
}
export const getStaticProps: GetStaticProps<Props> = async () => {
  const products = await api.product.list()

  return {
    props: {
      products,
    },
  }
}
const Home: NextPage<Props> = ({products}) => {
  const [filters, setFilters] = useState({
    price: null,
    color: null,
    rating: null,
  })

  return (
    <main style={{display: 'flex', gap: 12}}>
      <aside>
        <PriceRangeFilter />
        <ColorFilter />
        <RatingFilter />
      </aside>
      <section
        style={{
          display: 'grid',
          flex: 1,
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: 12,
        }}
      >
        {products.map((product) => {
          return (
            <article key={product.id}>
              <ProductCard product={product} />
            </article>
          )
        })}
      </section>
    </main>
  )
}

export default Home
