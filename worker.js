import { merge } from 'cidr-tools'

addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
    const { pathname } = new URL(request.url);

    let irCIDR = []
    try {
        const response = await fetch("https://mikrotikconfig.com/firewall/index.php#address", {
            "headers": {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            "body": "language%5B%5D=IR&submit1=Generate+Address+List&LANInterface2=&LANInterface3=",
            "method": "POST",
        });

        if (!response.ok) {
            return new Response('Request failed', { status: response.status });
        }

        const responseBody = await response.text();

        const regex = /(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\/\d{1,2})/g;

        const lines = responseBody.split('\n'); // Split the data into lines

        lines.forEach(line => {
            const match = line.match(regex);
            if (match && match.length > 0) {
                irCIDR.push(match[0])
            }
        });
    } catch (error) {
        return new Response('Error while making the request', { status: 500 });
    }

    try {
        const derak = 'https://api.derak.cloud/public/ipv4';
        const arvan = 'https://www.arvancloud.ir/en/ips.txt';
        const response = await fetch(arvan);
        const responseDerak = await fetch(derak);

        if (!response.ok) {
            return new Response('Failed to fetch address', { status: 500 });
        }
        const body = await response.text();
        const bodyDerak = await responseDerak.text();

        const arvanCIDR = body.split('\n');
        const derakCIDR = bodyDerak.split('\n');

        const allCIDR = Array.from(new Set([...irCIDR, ...arvanCIDR, ...derakCIDR]));

        const mergeCIDR = merge(allCIDR)

        const htmlResponse = mergeCIDR.join('\n');

        if (pathname === '/mikroTik') {
            // add address= list=Bypass
            let mikroTikCIDR = ['/ip firewall address-list']
            mergeCIDR.forEach(cidr => {
                mikroTikCIDR.push(`add address=${cidr} list=Iran`)
            })
            return new Response(mikroTikCIDR.join('\n'), {
                headers: { 'Content-Type': 'text/plain' },
            });
        }

        return new Response(htmlResponse, {
            headers: { 'Content-Type': 'text/plain' },
        });
    } catch (error) {
        return new Response('Error fetching or displaying the address', { status: 500 });
    }
}
