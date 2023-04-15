import superbase from "../../utils/superbase"

export default async function Posts() {
    const { data } = await superbase.from('posts').select()
    return (
        <pre>
            {JSON.stringify(data, null, 2)}
        </pre>
    )
}