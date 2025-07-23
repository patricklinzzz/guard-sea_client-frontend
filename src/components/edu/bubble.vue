<script setup>
  import { ref, onMounted } from 'vue'
  import { gsap } from 'gsap'
  function pointsInPath(path, numPoints = 10) {
    const pathLength = path.getTotalLength()
    const step = pathLength / numPoints
    const points = []

    for (let i = 0; i < pathLength; i += step) {
      points.push(path.getPointAtLength(i))
    }

    return points
  }

  function createCoordsTransformer(svg) {
    const pt = svg.createSVGPoint()

    return function (e) {
      pt.x = e.clientX
      pt.y = e.clientY

      return pt.matrixTransform(svg.getScreenCTM().inverse())
    }
  }

  function formatPoints(points, close) {
    points = [...points]

    if (!Array.isArray(points[0])) {
      points = points.map(({ x, y }) => [x, y])
    }

    if (close) {
      const lastPoint = points[points.length - 1]
      const secondToLastPoint = points[points.length - 2]

      const firstPoint = points[0]
      const secondPoint = points[1]

      points.unshift(lastPoint)
      points.unshift(secondToLastPoint)

      points.push(firstPoint)
      points.push(secondPoint)
    }

    return points.flat()
  }

  function spline(points = [], tension = 1, close = false, cb) {
    points = formatPoints(points, close)

    const size = points.length
    const last = size - 4

    const startPointX = close ? points[2] : points[0]
    const startPointY = close ? points[3] : points[1]

    let path = 'M' + [startPointX, startPointY]

    cb && cb('MOVE', [startPointX, startPointY])

    const startIteration = close ? 2 : 0
    const maxIteration = close ? size - 4 : size - 2
    const inc = 2

    for (let i = startIteration; i < maxIteration; i += inc) {
      const x0 = i ? points[i - 2] : points[0]
      const y0 = i ? points[i - 1] : points[1]

      const x1 = points[i + 0]
      const y1 = points[i + 1]

      const x2 = points[i + 2]
      const y2 = points[i + 3]

      const x3 = i !== last ? points[i + 4] : x2
      const y3 = i !== last ? points[i + 5] : y2

      const cp1x = x1 + ((x2 - x0) / 6) * tension
      const cp1y = y1 + ((y2 - y0) / 6) * tension

      const cp2x = x2 - ((x3 - x1) / 6) * tension
      const cp2y = y2 - ((y3 - y1) / 6) * tension

      path += 'C' + [cp1x, cp1y, cp2x, cp2y, x2, y2]

      cb && cb('CURVE', [cp1x, cp1y, cp2x, cp2y, x2, y2])
    }

    return path
  }

  const svg = ref(null)
  const buttonPath = ref(null)
  const init_svg = (el) => {
    svg.value = el ? el : null
  }
  const init_path = (el) => {
    buttonPath.value = el ? el : null
  }

  function createLiquidPath(path, options) {
    const svgPoints = pointsInPath(path, options.detail)
    const originPoints = svgPoints.map(({ x, y }) => ({ x, y }))
    const liquidPoints = svgPoints.map(({ x, y }) => ({ x, y }))

    const mousePos = { x: 0, y: 0 }
    const transformCoords = createCoordsTransformer(svg.value)

    const pointDistance = Math.hypot(
      originPoints[0].x - originPoints[1].x,
      originPoints[0].y - originPoints[1].y
    )
    const maxDist = {
      x: options.axis.includes('x') ? pointDistance / 2 : 0,
      y: options.axis.includes('y') ? pointDistance / 2 : 0,
    }

    gsap.ticker.add(() => {
      gsap.set(path, {
        attr: {
          d: spline(liquidPoints, options.tension, options.close),
        },
      })
    })
    return { transformCoords, liquidPoints, originPoints, maxDist, mousePos }
  }
  const options = {
    detail: 50,
    tension: 1,
    close: true,
    range: {
      x: 30,
      y: 30,
    },
    axis: ['x', 'y'],
  }

  onMounted(() => {
    window.addEventListener('mousemove', (e) => {
      const { x, y } = transformCoords(e)

      mousePos.x = x
      mousePos.y = y
      liquidPoints.forEach((point, index) => {
        const pointOrigin = originPoints[index]
        const distX = Math.abs(pointOrigin.x - mousePos.x)
        const distY = Math.abs(pointOrigin.y - mousePos.y)

        if (distX <= options.range.x && distY <= options.range.y) {
          const difference = {
            x: pointOrigin.x - mousePos.x,
            y: pointOrigin.y - mousePos.y,
          }

          const target = {
            x: pointOrigin.x + difference.x,
            y: pointOrigin.y + difference.y,
          }

          const x = gsap.utils.clamp(pointOrigin.x - maxDist.x, pointOrigin.x + maxDist.x, target.x)

          const y = gsap.utils.clamp(pointOrigin.y - maxDist.y, pointOrigin.y + maxDist.y, target.y)
          gsap.to(point, {
            x: x,
            y: y,
            ease: 'sine',
            overwrite: true,
            duration: 0.175,
            onComplete() {
              gsap.to(point, {
                x: pointOrigin.x,
                y: pointOrigin.y,
                ease: 'elastic.out(1, 0.3)',
                duration: 1.25,
              })
            },
          })
        }
      })
    })
    const { transformCoords, liquidPoints, originPoints, maxDist, mousePos } = createLiquidPath(
      buttonPath.value,
      options
    )
  })
</script>

<template>
  <svg width="450" height="450" viewBox="0 0 450 450" :ref="(el) => init_svg(el)">
    <!-- The centered circle path -->
    <path
      :ref="(el) => init_path(el)"
      d="M 225 25 A 200 200 0 1 1 225 425 A 200 200 0 1 1 225 25 Z"
      fill="transparent"
      stroke="black"
      stroke-width="3"
    />
  </svg>

  <!-- <svg
    width="481"
    height="481"
    viewBox="0 0 600 600"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    :ref="(el) => init_svg(el)"
  >
    <path
      :ref="(el) => init_path(el)"
      d="M1.5,240.5a239,239 0 1,0 478,0a239,239 0 1,0 -478,0"
      stroke="black"
      stroke-width="3"
    ></path>
  </svg> -->
</template>

<style lang="scss" scoped></style>
