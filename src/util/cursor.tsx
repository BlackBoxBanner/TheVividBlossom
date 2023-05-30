import React, {useEffect, useState, useRef} from 'react'
import useWindowSize from '@/hook/useWindowSize'


function Circle({children}: { children: React.ReactNode }) {
  const cursorColor = "#FDFCF5"
  const cursorHoverColor = "#2A2E21"

  const midX = useWindowSize().width / 2
  const midY = useWindowSize().height / 2

  let cursor = useRef({
    x: midX,
    y: midY,
  })

  let mouseFollow = useRef({
    x: midX,
    y: midY,
  })

  let currenPos = useRef({
    x: midX,
    y: midY,
  })

  // const [allow, setAllow] = useState(true)

  useEffect(() => {
    const mouseCircle = document.getElementById('mouseCircle')
    const cursorPoint = document.getElementById('cursor')
    if (!mouseCircle) return console.error('mouseCircle not found')
    if (!cursorPoint) return console.error('cursorPoint not found')

    // NOTE - check if browser is safari
    // function isSafari() {
    //   return /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
    // }

    // NOTE - if browser is safari then set allow to false
    // if (isSafari()) {
    //   setAllow(false)
    //   return
    // }

    // NOTE - set position of mouse circle and cursor with delay
    function delayMouseFollow() {
      const delay = 15 // NOTE - delay of circle follow cursor
      mouseFollow.current = {
        x:
          mouseFollow.current.x +
          (currenPos.current.x - mouseFollow.current.x) / delay,
        y:
          mouseFollow.current.y +
          (currenPos.current.y - mouseFollow.current.y) / delay,
      }
    }

    // NOTE - set position of cursor
    function delayCursorFollow() {
      cursor.current = {
        x: cursor.current.x + (currenPos.current.x - cursor.current.x),
        y: cursor.current.y + (currenPos.current.y - cursor.current.y),
      }
    }

    // NOTE - get window page offset if scroll
    function getPagePos() {
      return {
        x: window.scrollX,
        y: window.scrollY,
      }
    }

    // NOTE - push event listener to mouse click
    // NOTE - change cursor style
    document.addEventListener('click', function () {
      cursorPoint.style.transform = 'scale(1.2)'
      mouseCircle.style.transform = 'scale(0.8)';
      cursorPoint.style.backgroundColor = cursorHoverColor;
      setTimeout(() => {
        cursorPoint.style.transform = 'scale(1)';
        mouseCircle.style.transform = 'scale(1)';
        cursorPoint.style.backgroundColor = cursorColor;
      }, 200)
    })

    // NOTE - push event listener to mouse move
    document.addEventListener('mousemove', (event) => {
      currenPos.current.x = event.clientX
      currenPos.current.y = event.clientY
    })

    function cursorMoved() {
      if (!mouseCircle) return console.error('mouseCircle not found')
      if (!cursorPoint) return console.error('cursorPoint not found')
      if (
        currenPos.current.x.toFixed(2) == mouseFollow.current.x.toFixed(2) &&
        currenPos.current.y.toFixed(2) == mouseFollow.current.y.toFixed(2)
      ) {
        if (mouseCircle.style.opacity != '0') {
          mouseCircle.style.opacity = '0'
        }
      } else if (mouseCircle.style.opacity == '0') {
        mouseCircle.style.opacity = '100'
      }
    }

    let interval = setInterval(() => {
      requestAnimationFrame(delayMouseFollow)
      requestAnimationFrame(delayCursorFollow)

      // NOTE - check if mouse move or not to hide mouse circle when mouse not move
      cursorMoved()

      // NOTE - Calculate delay of circle follow cursor and set position
      delayCursorFollow()
      cursorPoint.style.top = cursor.current.y + getPagePos().y + 'px'
      cursorPoint.style.left = cursor.current.x + getPagePos().x + 'px'

      // NOTE - Calculate delay of cursor follow mouse and set position
      delayMouseFollow()
      mouseCircle.style.top = mouseFollow.current.y + getPagePos().y + 'px'
      mouseCircle.style.left = mouseFollow.current.x + getPagePos().x + 'px'
    }, 15)

    return () => {
      clearInterval(interval)
    }
  }, [
    currenPos,
    cursor.current.x,
    cursor.current.y,
    mouseFollow.current.x,
    mouseFollow.current.y,
  ])

  // if (!allow) {
  //   return <>{children}</>
  // }

  return (
    <>
      <div id="canvas" style={{minHeight: '100vh', position: 'relative'}}>
        <div style={{
          minHeight: "100%",
          height: "100%",
          width: "100%",
          display: "block",
          position: "relative",
          overflow: "scroll",
          wordWrap: "normal"
        }}>
          {children}
        </div>
        <span
          id="cursor"
          style={{
            position: 'absolute',
            width: '12px',
            height: '12px',
            margin: '-6px 0 0 -6px',
            borderRadius: '50%',
            pointerEvents: 'none',
            mixBlendMode: "difference",
            backdropFilter: "blur(8px)",
            backgroundColor: cursorColor,
            transition: 'transform 0.2s ease',
            zIndex: 1000000,
          }}
        />
        <span
          id="mouseCircle"
          style={{
            position: 'absolute',
            width: '64px',
            height: '64px',
            margin: '-32px 0 0 -32px',
            border: `1px solid ${cursorColor}`,
            // backdropFilter: "blur(0.1px)",
            borderRadius: '50%',
            pointerEvents: 'none',
            mixBlendMode: "difference",
            transition: 'transform 0.2s ease 0.2s, opacity 0.5s ease 0s',
            zIndex: 1000000,
          }}
        />
      </div>
      <style global jsx>
        {`
          * {
            cursor: none;
          }
        `}
      </style>
    </>
  )
}

export default Circle