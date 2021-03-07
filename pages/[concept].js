import { useRouter } from 'next/router'
import Layout from "../components/Layout";
import wiki from 'wikijs';



const Concept = (props) => {
    const { isFallback } = useRouter();
    return ( 
        <Layout>
            <p>{props.summary}</p>
        </Layout>
     );
}

export async function getStaticProps({params}) {

    let page = await wiki().page(params.concept);

    let summary = await page.summary();
    let infoBox = await page.fullInfo();
    let tables = await page.tables();
    console.log(infoBox)
    console.log(tables)

    return {
      props: { summary: await page.summary() }, // will be passed to the page component as props
      revalidate: 30 * 24 * 60 * 60
    }
}

export async function getStaticPaths() {
    return { paths: [], fallback: true }
}
 
export default Concept;