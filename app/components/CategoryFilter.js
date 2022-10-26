// Styles
import styles from '../styles/CategoryFilter.module.scss'

// Components
import Link from 'next/link'
import { Check } from './icons/Icons'

// React
import { useRouter } from 'next/router'
import { useMemo } from 'react'

// Lib
import _ from 'lodash'

const CategoryFilter = () => {
  const router = useRouter()

  const [brandActive] = useMemo(() => {
    let value = false

    if (_.isEmpty(router.query)) {
      value = true
    }

    if (router.query.filter === 'brand') {
      value = true
    }

    return [
      value
    ]
  }, [router.query])

  const [typeActive] = useMemo(() => {
    let value = false

    if (_.isEmpty(router.query)) {
      value = true
    }

    if (router.query.filter === 'type') {
      value = true
    }

    return [
      value
    ]
  }, [router.query])

  const [brandLink] = useMemo(() => {
    let value = '/'

    if (_.isEmpty(router.query)) {
      value = '/?filter=type'
    }

    if (router.query.filter === 'type') {
      value = '/'
    }

    if (router.query.filter === 'brand') {
      value = '/?filter=none'
    }

    if (router.query.filter === 'none') {
      value = '/?filter=brand'
    }

    return [
      value
    ]
  }, [router.query])

  const [typeLink] = useMemo(() => {
    let value = '/'

    if (_.isEmpty(router.query)) {
      value = '/?filter=brand'
    }

    if (router.query.filter === 'brand') {
      value = '/'
    }

    if (router.query.filter === 'type') {
      value = '/?filter=none'
    }

    if (router.query.filter === 'none') {
      value = '/?filter=type'
    }

    return [
      value
    ]
  }, [router.query])

  return (
    <nav className={`${styles.filters} mb-4 lg:mb-40 w-full lg:w-1/2`}>
      <ul className="flex h-full items-center">
        <li className="w-1/2">
          <Link href={brandLink}>
            <a className='text-md flex items-center fade'>
              <div className={`${styles.checkbox} mr-4 relative flex items-center justify-center`}>
                {brandActive && (
                  <Check/>
                )}
              </div>
              <span>Brand identity</span>
              <span>{brandActive}</span>
            </a>
          </Link>
        </li>
        <li className="w-1/2">
          <Link href={typeLink}>
            <a className='text-md flex items-center fade'>
              <div className={`${styles.checkbox} mr-4 relative flex items-center justify-center`}>
                {typeActive && (
                  <Check/>
                )}
              </div>
              <span>Type catalog</span>
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default CategoryFilter