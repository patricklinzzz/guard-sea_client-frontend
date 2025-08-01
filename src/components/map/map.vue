<script setup>
  import { onMounted, onBeforeUnmount, ref } from 'vue'
  import L from 'leaflet'
  import 'leaflet/dist/leaflet.css'
  import Card from '@/components/map/map_card.vue'
  import { useRouter } from 'vue-router'
  import { creaturesData } from '@/assets/data/map_creatures.js'
  import { areasData } from '@/assets/data/map_area.js'

  const router = useRouter()

  const map = ref(null)

  const area = ref([]) // 各區域的圓
  const creatureMarkers = ref([]) // 用來儲存生物標記的陣列

  const showHoverText = ref(false) //顯示目前移到的圓圈地名
  const hoverText = ref('')
  const hoverPosition = ref({ x: 0, y: 0 })

  const showCard = ref(false)
  const cardContent = ref({
    imgUrl: '',
    actionLink: '',
    title: '',
  })
  const closeCard = () => {
    showCard.value = false
    cardContent.value = {
      imgUrl: '',
      actionLink: '',
      title: '',
    }
  }

  onMounted(() => {
    if (map.value) {
      return
    }

    map.value = L.map('map_container', {
      maxBounds: window.L.latLngBounds([-85, -250], [85, 180]),
      maxBoundsViscosity: 1,
      zoomAnimation: true,
      zoomControl: false,
    }).setView([0, 0], 1)

    L.tileLayer(
      'https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryTopo/MapServer/tile/{z}/{y}/{x}',
      {
        maxZoom: 8,
        minZoom: 1,
        attribution: 'Tiles courtesy of the <a href="https://usgs.gov/">U.S. Geological Survey</a>',
      }
    ).addTo(map.value)

    // 各區域的圓
    function addArea(areas) {
      areas.forEach((data) => {
        const newArea = L.circle(data.center_pointer, {
          color: 'orange',
          weight: 1.5,
          dashArray: '10, 10',
          fillColor: '#FA0',
          fillOpacity: 0.08,
          radius: data.radius,
          className: 'animated_circle',
        }).addTo(map.value)
        area.value.push(newArea)
        // 各區域的圓點擊
        newArea.on('click', () => {
          const centerLatLng = newArea.getLatLng()
          map.value.setView(centerLatLng, 3, {
            animate: true,
            duration: 1.5, // 動畫持續時間
            easeLinearity: 0, // 動畫平滑度
          })
        })
        //各區域的圓-滑鼠移至圓圈內時顯示文字
        newArea.on('mouseover', (e) => {
          showHoverText.value = true
          hoverText.value = `${data.hover_text}`
          updateHoverPosition(e.containerPoint)
        })
        newArea.on('mouseout', () => {
          showHoverText.value = false // 滑鼠移出隱藏提示框
        })
      })
    }
    addArea(areasData)
    // 滑鼠移動時更新提示框位置
    map.value.on('mousemove', (e) => {
      if (showHoverText.value) {
        updateHoverPosition(e.containerPoint)
      }
    })
    // 更新提示框的位置
    const updateHoverPosition = (point) => {
      hoverPosition.value = {
        x: point.x + 10,
        y: point.y - 10,
      }
    }

    function addCreatureMarkers(creatures) {
      creatureMarkers.value.forEach((marker) => {
        marker.remove()
      })
      creatureMarkers.value = []

      creatures.forEach((data) => {
        //生物圖標
        const creatureIcon = L.divIcon({
          className: 'creature-icon',
          html: `<img src="${data.iconUrl}">`,
          iconSize: [60, 60],
          iconAnchor: [30, 30],
        })
        // //生物標記
        const markerInstance = L.marker(data.latLng, { icon: creatureIcon }).addTo(map.value)
        creatureMarkers.value.push(markerInstance)
        //圖標點擊 顯示卡片
        markerInstance.on('click', (e) => {
          cardContent.value = {
            imgUrl: data.iconUrl,
            actionLink: data.actionLink,
            title: data.title,
          }
          const CenterLatLng = [data.latLng[0], data.latLng[1] - 15]
          map.value.setView(CenterLatLng, 3, {
            animate: true,
            duration: 1.5, // 動畫持續時間
            easeLinearity: 0, // 動畫平滑度
          })
          showCard.value = true
        })
      })
    }
    addCreatureMarkers(creaturesData)
  })

  onBeforeUnmount(() => {
    if (map.value) {
      area.value.forEach((circle) => {
        circle.remove()
      })
      creatureMarkers.value.forEach((marker) => {
        marker.remove()
      })
      creatureMarkers.value = []
      area.value = []

      map.value.remove()
      map.value = null
    }
    closeCard()
  })

  const handleCardNavigate = (link) => {
    router.push(link)
    closeCard()
  }
</script>

<template>
  <div id="map_container">
    <div
      v-if="showHoverText"
      class="hover_text"
      :style="{ left: hoverPosition.x + 'px', top: hoverPosition.y + 'px' }"
    >
      {{ hoverText }}
    </div>
    <Card
      :is-visible="showCard"
      @close="closeCard"
      :imgUrl="cardContent.imgUrl"
      :actionLink="cardContent.actionLink"
      :title="cardContent.title"
      @navigate="handleCardNavigate"
    ></Card>
  </div>
</template>

<style scoped lang="scss">
  #map_container {
    width: 62.5vw;
    height: 450px;
    margin: auto;
    @include respond(md) {
      width: 90vw;
      height: 50vh;
    }
  }
  .hover_text {
    position: absolute;
    color: white;
    font-weight: bold;
    transform: translate(50%, -100%);
    pointer-events: none;
    z-index: 1000;
    @include respond(md) {
      display: none;
    }
  }
  :deep(.creature-icon) {
    img {
      width: 60px;
      height: 60px;
    }
  }
  :deep(.animated_circle) {
    animation: dash_rotate 20s linear infinite;
  }
  @keyframes dash_rotate {
    from {
      stroke-dashoffset: 0;
    }
    to {
      stroke-dashoffset: -200;
    }
  }
</style>
