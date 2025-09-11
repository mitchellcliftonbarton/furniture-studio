// Styles
import styles from '../styles/CategoryFilter.module.scss'

// Components
import Link from 'next/link'
import { Check } from './icons/Icons'

// React
import { useRouter } from 'next/router'
import { useMemo } from 'react'

const CategoryFilter = ({ baseURL = '/' }) => {
  const router = useRouter()

  const [brandActive] = useMemo(() => {
    let value = false

    if (!router.query.filter) {
      value = true
    }

    if (router.query.filter === 'client') {
      value = true
    }

    return [value]
  }, [router.query])

  const [typeActive] = useMemo(() => {
    let value = false

    if (!router.query.filter) {
      value = true
    }

    if (router.query.filter === 'type') {
      value = true
    }

    return [value]
  }, [router.query])

  const [brandLink] = useMemo(() => {
    let value = baseURL

    if (!router.query.filter) {
      value = `${baseURL}?filter=type`
    }

    if (router.query.filter === 'type') {
      value = baseURL
    }

    if (router.query.filter === 'client') {
      value = `${baseURL}?filter=none`
    }

    if (router.query.filter === 'none') {
      value = `${baseURL}?filter=client`
    }

    return [value]
  }, [router.query])

  const [typeLink] = useMemo(() => {
    let value = baseURL

    if (!router.query.filter) {
      value = `${baseURL}?filter=client`
    }

    if (router.query.filter === 'client') {
      value = baseURL
    }

    if (router.query.filter === 'type') {
      value = `${baseURL}?filter=none`
    }

    if (router.query.filter === 'none') {
      value = `${baseURL}?filter=type`
    }

    return [value]
  }, [router.query])

  return (
    <nav className={`${styles.filters} filters mb-4 lg:mb-0 w-full bg-grey-1 lg:px-def-half h-full`}>
      <ul className="grid grid-cols-4 gap-4 h-full items-center pb-def-half lg:pb-0">
        <li className="col-span-2 lg:col-span-1">
          <Link href={brandLink}>
            <a className="text-base flex items-center fade">
              <div className={`${styles.checkbox} mr-4 relative flex items-center justify-center`}>
                {brandActive && <Check />}
              </div>
              <span>Client Projects</span>
              <span>{brandActive}</span>
            </a>
          </Link>
        </li>
        <li className="col-span-2 lg:col-span-1">
          <Link href={typeLink}>
            <a className="text-base flex items-center fade">
              <div className={`${styles.checkbox} mr-4 relative flex items-center justify-center`}>
                {typeActive && <Check />}
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
