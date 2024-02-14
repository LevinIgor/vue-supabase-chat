import supabase from '@/supabase'

export async function fetchMessages() {
  const { data, error } = await supabase
    .from('message')
    .select('*')
    .order('created_at', { ascending: true })

  if (error) console.log('API - Fetch Message - Error: ', error)

  return data || []
}

export async function createMessage(message) {
  const { error } = await supabase.from('message').insert(message)

  if (error) console.log('API - Create Message - Error: ', error)

  return error === null
}

export async function subscribeToMessages(callback) {
  supabase
    .channel('custom-insert-channel')
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'message' }, callback)
    .subscribe()
}


