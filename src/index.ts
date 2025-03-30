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
        const url = new URL(request.url);

        if (request.method === "GET") {
            const format = url.searchParams.get("format");

            if (!format || (format !== "jsonstring" && format !== "image")) {
                return new Response("Invalid or missing 'format' query parameter. Use 'jsonstring' or 'image'.", {
                    status: 400,
                });
            }

            const exampleResponse = {
                message: "This is an example response for GET requests.",
                usage: {
                    format: "Specify 'jsonstring' or 'image' in the 'format' query parameter.",
                },
            };

            if (format === "jsonstring") {
                return new Response(JSON.stringify(exampleResponse), {
                    headers: { "content-type": "application/json" },
                });
            } else if (format === "image") {
                // Return a placeholder image or handle image generation for GET requests
                const placeholderImage = "Placeholder image content"; // Replace with actual image data
                return new Response(placeholderImage, {
                    headers: { "content-type": "image/png" },
                });
            }
        }

        if (request.method === "POST") {
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
        }

        return new Response("Only GET and POST requests are allowed.", { status: 405 });
    },
} satisfies ExportedHandler<Env>;
