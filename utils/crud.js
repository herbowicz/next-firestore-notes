import supabase from './supabase'

export const addMessage = async ({ title, author, email }) => {

    const input = {
        title,
        author,
        email
    }

    console.log(input)

    let { error } = await supabase.from('posts').upsert(input)

    if (error) {
        alert(error.message)
    }
}


