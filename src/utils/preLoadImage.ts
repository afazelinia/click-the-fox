const preLoadImages = async (urls: string[]) : Promise<any> => {
    const loadImage = (url: string) : any => new Promise((resolve, reject) => {
        const img = new Image();
        img.addEventListener('load', () => resolve(img));
        img.addEventListener('error', (err) => reject(err));
        img.src = url;
    });
    const urlsPromise = await Promise.allSettled(urls.map(url => loadImage(url)));
    const result: string[] = [];
    for (const urlPromise of urlsPromise) {
        if (urlPromise.status === 'fulfilled') {
            result.push(urlPromise.value.src);
        }
    }
    return result;
};

export default preLoadImages;
