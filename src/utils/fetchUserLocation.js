import useStore from '@/store'
import getRandomName from '@/utils/getRandomName'
import getLocationByIP from '@/utils/getLocationByIP'

export default function () {
  const store = useStore()
  store.setName(getRandomName())

  getLocationByIP().then((geo) => {
    store.setUserLocation(geo)
  })
}
