import supabase from '../../../utils/supabase'
import { notFound } from 'next/navigation'
import RealtimePost from './realtime-post'

export const revalidate = 0

export default async function Post({ id }) {
    const { data } = await supabase
        .from('posts')
        .select()
        .match( { id })
        .single()

    if (!data) { notFound() }

    return <RealtimePost serverPost={data} />
}