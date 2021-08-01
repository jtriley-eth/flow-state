import { useState } from 'react'

export function useRender() {
	const [placeHolder, setPlaceHolder] = useState(false)
	return () => setPlaceHolder(!placeHolder)
}
