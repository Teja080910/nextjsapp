import React from 'react'

// interface StickyProps {
//     children: ReactNode
//     bgColor: string
// }

const StickyNav = () => {
    return (
        <div className="fixed top-0 left-0 z-50 w-full lg:pointer-events-none app">
            {/* <motion.nav initial={{ background: bgColor }} animate={{ background: bgColor }}>
                {children}
            </motion.nav> */}
            
        </div>
    )
}

export default StickyNav;