import React, { useState, useEffect, useCallback, Suspense } from 'react'

const Ellipse = props => {
  const { coin, style } = props

  const Art = React.lazy(() => import(`./assets/${coin}.svg`));

  const [timeoutId, setTimeoutId] = useState()
  const [state, setState] = useState({
    top: 0,
    left: 0,
  })

  const updatePos = useCallback(() => {
    setState({
      top: (50 * Math.random() + 250) * (Math.random() > 0.5 ? -1 : 1),
      left: (50 * Math.random() + 250) * (Math.random() > 0.5 ? -1 : 1),
    })

    setTimeoutId(setTimeout(updatePos, Math.random() * (9700 - 3500) + 3500))
  }, [])

  useEffect(() => {
    updatePos()
    return () => {
      clearTimeout(timeoutId)
    }
  }, [])
  
  
  return (
    <Suspense fallback={<></>}>
      <div className="Ellipse-container">
        <div className="Ellipse">
          <div
            className="Ellipse__inner"
            style={{
              width: style.width,
              height: style.height,
              transform: `translate(${state.top}px, ${state.left}px)`,
            }}
          >
            <Art />
          </div>
        </div>
      </div>
    </Suspense>
  );
}

export default Ellipse;
