import supabase from '@/supabase'

export async function fetchMessages(page = 1) {
  const { data, error } = await supabase
    .from('message')
    .select('*')
    .order('created_at', { ascending: false })
    .range((page - 1) * 10, page * 10 - 1)

  if (error) console.log('API - Fetch Message - Error: ', error)

  return data || []
}

export async function createMessage(message) {
  const { error } = await supabase.from('message').insert(message)

  if (error) console.log('API - Create Message - Error: ', error)

  return error === null
}

export async function subscribeToMessagesInsert(callback) {
  supabase
    .channel('custom-insert-channel')
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'message' }, callback)
    .subscribe()
}

export async function insertUser(user) {
  await supabase.from('users').insert([{ location: user }])
}


