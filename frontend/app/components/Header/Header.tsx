'use client'

import styles from './Header.module.css'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Corner from '@/app/components/Corner'

interface MenuItem {
  label: string
  url: string
  isExternal: boolean
}

interface CTAButton {
  text: string
  url: string
  isExternal: boolean
}

interface HeaderProps {
  data: {
    logo: {
      asset: {
        _id: string
        url: string
      }
      altText?: string
    }
    menuItems: MenuItem[]
    ctaButton: CTAButton
  }
}

export default function Header({ data }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const normalizePath = (path: string) => {
    if (!path) return '/'
    const trimmed = path.replace(/\/+$/, '')
    return trimmed === '' ? '/' : trimmed
  }

  const isActive = (url: string) => normalizePath(pathname) === normalizePath(url)

  const toggleMobileMenu = () => {
    const newState = !isMobileMenuOpen
    setIsMobileMenuOpen(newState)
    
    // Prevent body scroll when menu is open
    if (newState) {
      document.body.classList.add('mobile-menu-open')
    } else {
      document.body.classList.remove('mobile-menu-open')
    }
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      document.body.classList.remove('mobile-menu-open')
    }
  }, [])

  // Add safety checks for data
  if (!data) {
    return (
      <header className="header" id="header">
        <div className="header__container container">
          <div className="header__logo">
            <Link href="/">
              <span>Logo</span>
            </Link>
          </div>
        </div>
      </header>
    )
  }

  const { logo, menuItems, ctaButton } = data

  return (
    <header className={styles.header}>

      <div className={styles.header__container}>
        <Corner top={20} left={-12} rotatePosition='right-top' size={12} maxWidth={1050} />
        <Corner top={20} left={1030} rotatePosition='left-top' size={12} maxWidth={1050} />
        {/* Logo */}
        <div className={styles.header__logo}>
          <Link href="/">
            {logo?.asset?.url ? (
              <Image
                src={logo.asset.url}
                alt={logo.altText || 'Site Logo'}
                width={66}
                height={22}
                priority
              />
            ) : (
              <span>Logo</span>
            )}
          </Link>
        </div>

        {/* Navigation Menu */}
        {menuItems && menuItems.length > 0 && (
          <nav className={styles.header__nav}>
            <ul className={styles.header__menu}>
              {menuItems.map((item, index) => (
                <li key={index} className={styles.header__menu_item}>
                  {item.isExternal ? (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.header__menu_link}
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link 
                      href={item.url} 
                      className={`${styles.header__menu_link} ${isActive(item.url) ? styles.active : ''}`}
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        )}

        {/* CTA Button */}
        {ctaButton && (
          <div className={styles.header__cta}>
            {ctaButton.isExternal ? (
              <a
                href={ctaButton.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.btn} ${styles.btn_primary}`}
              >
                {ctaButton.text}
              </a>
            ) : (
              <Link href={ctaButton.url} className={`${styles.btn} ${styles.btn_primary}`}>
                {ctaButton.text}
              </Link>
            )}
          </div>
        )}

        {/* Mobile Menu Button */}
        <button 
          className={styles.header__mobile_menu_btn}
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          Menu
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <div className={`${styles.header__mobile_menu} ${isMobileMenuOpen ? styles.header__mobile_menu_open : ''}`}>
        <Corner top={-10} left={100} rotatePosition='right-bottom' size={12} />
        {menuItems && menuItems.length > 0 && (
          <nav className={styles.header__mobile_nav}>
            <ul className={styles.header__mobile_menu_list}>
              {menuItems.map((item, index) => (
                <li key={index} className={styles.header__mobile_menu_item}>
                  {item.isExternal ? (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.header__mobile_menu_link}
                      onClick={toggleMobileMenu}
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link 
                      href={item.url} 
                      className={`${styles.header__mobile_menu_link} ${isActive(item.url) ? styles.active : ''}`}
                      onClick={toggleMobileMenu}
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        )}

        {/* Mobile CTA Button */}
        {ctaButton && (
          <div className={styles.header__mobile_cta}>
            {ctaButton.isExternal ? (
              <a
                href={ctaButton.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.btn} ${styles.btn_primary} ${styles.header__mobile_cta_btn}`}
                onClick={toggleMobileMenu}
              >
                {ctaButton.text}
              </a>
            ) : (
              <Link 
                href={ctaButton.url} 
                className={`${styles.btn} ${styles.btn_primary} ${styles.header__mobile_cta_btn}`}
                onClick={toggleMobileMenu}
              >
                {ctaButton.text}
              </Link>
            )}
          </div>
        )}
      </div>
    </header>
  )
}
