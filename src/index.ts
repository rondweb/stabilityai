/*export default {
    async fetch(request, env) {
        if (request.method !== "POST") {
            const documentation = `
                Only POST requests are allowed.
                
                Example usage with curl:
                curl -X POST https://your-cloudflare-worker-url \
                -H "Content-Type: application/json" \
                -d '{"prompt": "your-prompt", "model": "your-model"}'
            `;
            return new Response(documentation, { status: 406, headers: { "content-type": "text/plain" } });
        }

        let requestBody;
        try {
            requestBody = await request.json();
        } catch (error) {
            return new Response("Invalid JSON body", { status: 400 });
        }

        const { prompt, model } = requestBody;

        if (!prompt || !model) {
            return new Response("Missing 'prompt' or 'model' in request body", { status: 400 });
        }

        const inputs = { prompt };

        try {
            const response = await env.AI.run(model, inputs);

            return new Response(response, {
                headers: {
                    "content-type": "image/png",
                },
            });
        } catch (error) {
            return new Response("Error generating image", { status: 500 });
        }
    },
} satisfies ExportedHandler<Env>;
*/

export default {
    async fetch(request, env) {
        if (request.method !== "POST") {
            const documentation = `
                Only POST requests are allowed.
                
                Example usage with curl:
                curl -X POST https://stabilityai.rondweb.workers.dev \
                -H "Content-Type: application/json" \
                -d '{"prompt": "your-prompt", "model": "your-model"}'
            `;
            return new Response(documentation, { status: 406, headers: { "content-type": "text/plain" } });
        }

        let requestBody;
        try {
            requestBody = await request.json();
        } catch (error) {
            return new Response("Invalid JSON body", { status: 400 });
        }

        const { prompt, model } = requestBody;

        if (!prompt || !model) {
            return new Response("Missing 'prompt' or 'model' in request body", { status: 400 });
        }

        const inputs = { prompt };

        try {
            const response = await env.AI.run(model, inputs);

            // Convert the response (image) to base64
            const imageBuffer = await response.arrayBuffer();
            const base64Image = btoa(String.fromCharCode(...new Uint8Array(imageBuffer)));

            return new Response(JSON.stringify({ image: base64Image }), {
                headers: {
                    "content-type": "application/json",
                },
            });
        } catch (error) {
            return new Response("Error generating image", { status: 500 });
        }
    },
} satisfies ExportedHandler<Env>;
