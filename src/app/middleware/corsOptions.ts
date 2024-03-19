export const corsOptions = {
    origin: (origin: any, callback: any) => {
        console.log(`NERDX::${new Date()}::Origin: ${origin}`);
        let originSplit = origin.toLowerCase().split('.');
        origin = originSplit
            .slice(Math.max(originSplit.length - 2, 0))
            .join('.');
        if (
            origin.search(/nerdx128\.(?:com|local)/g) > -1 ||
            // corsAccessList.includes(origin) ||
            origin.toLowerCase().indexOf('localhost') > -1
            // origin.indexOf('127.0.0.1') > -1
        ) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
};
