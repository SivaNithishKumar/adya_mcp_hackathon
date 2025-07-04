/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import * as z from "zod";
import { assetsUpdateResourceByAssetId } from "../../funcs/assetsUpdateResourceByAssetId.js";
import * as components from "../../models/components/index.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  apiKey: z.string().describe("Cloudinary API Key"),
  apiSecret: z.string().describe("Cloudinary API Secret"),
  cloudName: z.string().optional().describe("Cloudinary Cloud Name"),
  assetId: z.string(),
  resourceUpdateRequest: components.ResourceUpdateRequest$inboundSchema,
};

export const tool$assetsUpdateResourceByAssetId: ToolDefinition<typeof args> = {
  name: "asset-update",
  description:
    `Updates an existing asset's metadata, tags, and other attributes using its asset ID

Updates one or more attributes of a specified resource (asset) by its asset ID. This enables you to update details of an asset by its unique and immutable identifier, regardless of public ID, display name, asset folder, resource type or deliver type. Note that you can also update many attributes of an existing asset using the explicit method, which is not rate-limited.
`,
  scopes: ["librarian"],
  args,
  tool: async (client, args, ctx) => {
    const [result, apiCall] = await assetsUpdateResourceByAssetId(
      client,
      args.assetId,
      args.resourceUpdateRequest,
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
