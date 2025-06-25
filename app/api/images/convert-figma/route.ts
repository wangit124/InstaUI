export async function POST(request: Request) {
  const body = await request.json();
  const { figmaUrl } = body;

  const parsedUrl = new URL(figmaUrl);
  const nodeIds = parsedUrl.searchParams.get("node-id");
  const parseGroupsRegex = /^\/([^\/]+)\/([^\/]+)\/([^\/]+)$/;
  const matches = parsedUrl.pathname.match(parseGroupsRegex);

  if (!matches?.length || !nodeIds) {
    throw new Error("Invalid figma url please provide a link to a node");
  }

  const [, , file_key] = matches;
  const figmaResponse = await fetch(
    `https://api.figma.com/v1/images/${file_key}?ids=${nodeIds}`,
    {
      headers: {
        "X-Figma-Token": process.env.FIGMA_TOKEN,
      },
    }
  );
  const figmaData = await figmaResponse.json();

  if (!figmaData?.images || figmaData?.err) {
    throw new Error("Failed to convert figma image");
  }

  return new Response(
    JSON.stringify({ images: Object.values(figmaData.images) }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}
