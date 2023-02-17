import { useEffect, useState } from "react";

type useFetchType = {
    data: string[];
    loading: boolean;
};

type fetchAddressType = {
    url: string;
    selector: string;
    fetchCount: number,
};

const useFetch = (fetchAddress: fetchAddressType, reFetch: number): useFetchType => {

    const [data, setData] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        const doFetch = async () => {
            try {
                setLoading(true);
                const urls = new Array(fetchAddress.fetchCount).fill(fetchAddress.url);
                const picsPromises = await Promise.allSettled(urls.map(async url => {
                    const resp = await fetch(url, { signal } );
                    return resp.json();
                }));
                const results = [];
                for (const pic of picsPromises) {
                    if (pic.status === 'fulfilled') {
                        results.push(pic.value[fetchAddress.selector]);
                    }
                }
                if (!signal.aborted) {
                    setData(results);
                }
            } catch {
                console.log("request was cancelled")
            } finally {
                if (!signal.aborted) {
                    setLoading(false);
                }
            }
        };
        doFetch();

        return () => {
            abortController.abort()
        }
    }, [fetchAddress.url, fetchAddress.selector, reFetch])

    return { data, loading };

}

export default useFetch;
