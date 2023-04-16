import supabase from './supabase'

export const addMessage = async ({ title, author }) => {

    const input = {
        title,
        author
    }

    console.log('>>>>', input)

    let { error } = await supabase.from('posts').upsert(input)

    if (error) {
        alert(error.message)
    }
}


