import { useEffect } from "react"

const BASE_TITLE = 'Contact'

const useTitle = (title) => {
    useEffect(() => {
        document.title = `${BASE_TITLE} | ${title}`;
    }, [title]
    )
}

export {useTitle} 