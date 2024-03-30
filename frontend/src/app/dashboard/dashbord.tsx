'use client'
import { usePathname } from 'next/navigation'
export default function LocaleSwitcher() {
  const pathname = usePathname()
 
  function switchLocale(locale: string)
  {
    const newPath = `/${locale}${pathname}`
    window.history.replaceState(null, '', newPath)
  }
 
  return (
    <>
      <button onClick={() => switchLocale('en')}>English</button>
      <br/>
      <button onClick={() => switchLocale('fr')}>French</button>
    </>
  )
}