
import supabase from '../../utils/supabase'
import RealtimePosts from './realtime-posts'
import Message from '../../components/Message'

export const revalidate = 0

export default async function Posts() {
    const { data } = await supabase.from('posts').select()

    return <div>

        <RealtimePosts serverPosts={data ?? []} />

        {/* <Message /> */}

    </div>
}