import axios from "axios";

export async function revalidatePage(slug) {
    if (!process.env.PAYLOAD_PUBLIC_SITE_URL || !process.env.PAYLOAD_PUBLIC_SITE_URL){
        return null;
    }

    try {
        await axios({
            method: 'get',
            url: `${process.env.PAYLOAD_PUBLIC_SITE_URL}/api/revalidate?secret=${process.env.PAYLOAD_PUBLIC_FRONTEND_SECRET}&slug=${slug}`
        })
        console.log('Revalidation triggered')
    } catch (e) {
        console.log(e)
    }
}

