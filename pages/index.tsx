import type {GetStaticProps, NextPage} from 'next'
import type {Filter, Product} from '../types'

import {useMemo, useState} from 'react'

import api from '../api'
import {ProductCard, PriceRangeFilter, ColorFilter, RatingFilter} from '../components/'

type Props = {
  products: Product[]
}
type Filters = Record<string, Filter>

export const getStaticProps: GetStaticProps<Props> = async () => {
  const products = await api.product.list()

  return {
    props: {
      products,
    },
  }
}
const Home: NextPage<Props> = ({products}) => {
  const [filters, setFilters] = useState<Filters>({
    price: null,
    color: null,
    rating: null,
  })

  // Show all products if no filters are applied, otherwise filter the products
  const matches = useMemo(() => {
    const filtersToApply = Object.values(filters).filter(Boolean)
    let matches = products

    for (let filter of filtersToApply) {
      matches = matches.filter(filter!) // filter (product)=>draft.has(product.color)
    }

    return matches
  }, [products, filters])

  console.log(matches)

  return (
    <main style={{display: 'flex', gap: 12}}>
      <aside>
        <PriceRangeFilter />
        <ColorFilter
          products={products}
          onChange={(filter: Filter) => setFilters((filters) => ({...filters, color: filter}))}
        />
        <RatingFilter />
      </aside>
      <div style={{display: 'flex', flexDirection: 'column', gap: 12}}>
        <h2>{matches.length} resultados</h2>
        <section
          style={{
            display: 'grid',
            flex: 1,
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: 12,
          }}
        >
          {matches.map((product) => {
            return (
              <article key={product.id}>
                <ProductCard product={product} />
              </article>
            )
          })}
        </section>
      </div>
    </main>
  )
}

export default Home
