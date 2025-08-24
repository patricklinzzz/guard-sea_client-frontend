<script setup>
  import { ref, onMounted } from 'vue'
  import { gsap } from 'gsap'

  import Pollution from '@/assets/images/Educate/Causes/ta.jpg'
  import Overfishing from '@/assets/images/Educate/Causes/overfishing_banner.jpeg'
  import Degradation from '@/assets/images/Educate/Causes/degradation_banner.jpeg'
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
  const props = defineProps(['code', 'title'])
  const svg = ref(null)
  const g = ref(null)
  const buttonPath = ref(null)
  let i = props.code % 3
  // switch (i) {
  //   case 0:
  //     pathD.value = 'M 210 10 A 200 200 0 1 1 210 410 A 200 200 0 1 1 210 10 Z'
  //     break
  //   case 1:
  //     pathD.value =
  //       'M285.8328 72.2304C313.632 89.5752 341.1936 113.3352 360.6768 149.4504 380.16 185.328 391.5648 234.036 374.4576 267.7752 357.1128 301.752 311.256 320.9976 265.8744 334.0656 220.4928 346.896 176.0616 353.7864 133.7688 343.0944 91.7136 332.1648 52.0344 303.8904 33.5016 266.3496 14.9688 228.5712 17.5824 181.2888 24.7104 134.0064 31.8384 86.724 43.7184 39.204 74.1312 22.3344 104.3064 5.4648 153.252 19.008 191.5056 31.3632 229.9968 43.7184 258.0336 54.8856 285.8328 72.2304Z'
  //     break
  //   case 2:
  //     pathD.value =
  //       'M331.6337 79.3702C371.9982 106.468 407.564 151.3487 408.4108 197.0763 409.2576 242.8038 375.3854 289.6604 335.3032 325.7908 295.221 361.9213 248.3644 387.6077 196.9915 392.4063 145.6186 397.2049 89.1648 381.1155 55.8571 344.9851 22.2671 308.8547 11.5409 252.401 20.5735 205.2621 29.6061 157.8409 58.1152 119.4524 91.7052 92.3545 125.013 64.9745 163.4015 48.6029 205.1773 45.4979 246.6708 42.1107 291.5515 51.9901 331.6337 79.3702Z'
  //     break
  // }

  const pathD = ref('M 210 10 A 200 200 0 1 1 210 410 A 200 200 0 1 1 210 10 Z')
  //const pathD = ref('M 322 111 A 200 200 0 1 1 210 410 A 200 200 0 1 1 230 72 Z')

  const init_svg = (el) => {
    svg.value = el ? el : null
  }
  const init_path = (el) => {
    buttonPath.value = el ? el : null
  }
  const init_g = (el) => {
    g.value = el ? el : null
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
      pathD.value = spline(liquidPoints, options.tension, options.close)
      gsap.set(path, {
        attr: {
          d: pathD.value,
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
  // const img_ref = '/src/assets/images/Educate/Causes/'
  const img_ref = ref(null)
  img_ref.value =
    props.title == 'pollution'
      ? Pollution
      : props.title == 'overfishing'
        ? Overfishing
        : Degradation
  onMounted(() => {
    if(g.value){
      gsap.to(g.value, {
      y: -12,                  
      duration: 1.5,           
      ease: "power1.inOut",    
      yoyo: true,              
      repeat: -1               
    });
    }
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
  <svg viewBox="0 0 420 420" :ref="(el) => init_svg(el)">
    <defs>
      <mask :id="'bubble_mask_' + code">
        <g :ref="(el) => init_g(el)">
          <path
            :ref="(el) => init_path(el)"
            :d="pathD"
            fill="#fff"
            stroke="black"
            stroke-width="3"
          />
        </g>
      </mask>
    </defs>
    <image
      preserveAspectRatio="xMidYMid slice"
      :mask="'url(#bubble_mask_' + code + ')'"
      :href="img_ref"
    ></image>
  </svg>
</template>

<style lang="scss" scoped>
  image {
    overflow: hidden;
    width: 100%;
    height: 100%;
  }
  svg {
    position: relative;
    width: 420px;
    height: 420px;
    cursor: pointer;

    @include respond(md) {
      width: 300px;
      height: 300px;
    }
  }
</style>
