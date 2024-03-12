import supabase from '@/supabase'
import useStore from '@/store'

export default async function fetchProjectStats() {
  const store = useStore()

  const [counts, countryCount] = await Promise.all([getCounts(), getCountryCount()])

  store.setProjectStats({ ...counts, countries: countryCount })
}

async function getCounts() {
  let { data, error } = await supabase.rpc('get_counts').single()
  if (error) console.error(error)

  return data || { unique_users_count: '000', messages_count: '000', online_users_count: '1' }
}

async function getCountryCount() {
  const { data, error } = await supabase.rpc('get_country_count')
  if (error) console.error(error)

  return data || []
}
