import type {GetStaticProps, NextPage} from 'next'
import type {Product} from '../types'

import api from '../api'
import ProductCard from '../components/ProductCard'

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
  return (
    <main style={{display: 'flex', gap: 12}}>
      <aside>Filtros</aside>
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
