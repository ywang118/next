import Link from 'next/link'
export default ({children})=> (
    <>
        <header>
            <Link href= '/a?id=1' as='/a/1'>
                <button>Index a</button>
            </Link>
            <Link href= '/b'>
                <button>Index b</button>
            </Link>
        </header>
        {children}
    </>
)
    
