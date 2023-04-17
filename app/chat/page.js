
import supabase from '../../utils/supabase'
import RealtimePosts from './realtime-posts'

export const revalidate = 0

export default async function Posts() {
    const { data } = await supabase.from('posts').select().order('created_at', { ascending: true })

    return (
        <RealtimePosts serverPosts={data ?? []} />
    )
}