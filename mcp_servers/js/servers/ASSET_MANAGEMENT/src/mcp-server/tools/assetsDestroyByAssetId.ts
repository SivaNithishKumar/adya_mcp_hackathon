/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import { assetsDestroyByAssetId } from "../../funcs/assetsDestroyByAssetId.js";
import * as components from "../../models/components/index.js";
import { formatResult, ToolDefinition } from "../tools.js";
import * as z from "zod";

const args = {
  apiKey: z.string().describe("Cloudinary API Key"),
  apiSecret: z.string().describe("Cloudinary API Secret"),
  cloudName: z.string().optional().describe("Cloudinary Cloud Name"),
  request: components.DestroyRequest$inboundSchema,
};

export const tool$assetsDestroyByAssetId: ToolDefinition<typeof args> = {
  name: "delete-asset",
  description: `Delete asset by asset-id

Deletes an asset using its asset ID. This endpoint replaces the legacy /resources/by_asset_id endpoint.
Returns the deletion status and asset folder information when folder decoupling is enabled.
`,
  scopes: ["admin"],
  args,
  tool: async (client, args, ctx) => {
    const [result, apiCall] = await assetsDestroyByAssetId(
      client,
      args.request,
      { fetchOptions: { signal: ctx.signal } },
    ).$inspect();

    if (!result.ok) {
      return {
        content: [{ type: "text", text: result.error.message }],
        isError: true,
      };
    }

    const value = result.value;

    return formatResult(value, apiCall);
  },
};
