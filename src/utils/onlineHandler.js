import supabaseClient from '@/supabase.js'
import useStore from '@/store'

export default function () {
  const channel = supabaseClient.channel('mainChannel')
  const store = useStore()

  channel
    .on('presence', { event: 'sync' }, () => {
      const newState = channel.presenceState()
      
      store.setOnlineNumber(Object.values(newState).length)
    })
    .subscribe(async (status) => {
      if (status !== 'SUBSCRIBED') {
        return
      }

      channel.track()
    })
}
