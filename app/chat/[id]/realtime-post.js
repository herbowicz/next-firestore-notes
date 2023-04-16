'use client'

import { useState, useEffect } from 'react'
import supabase from '../../../utils/supabase'

export default function RealtimePost({ serverPost }) {
    const [post, setPost] = useState(serverPost)

    useEffect(() => {
        const channel = supabase
            .channel('realtime posts')
            .on('postgres_changes', {
                event: 'UPDATE',
                schema: 'public',
                table: 'posts',
                filter: `id=eq.${post.id}`
            }, (payload) => {
                setPost(payload.new)
            })
            .subscribe()

        return () => {
            supabase.removeChannel(channel)
        }
    }, [post, setPost])

    return <pre>{JSON.stringify(post, null, 2)}</pre>
}