/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import * as z from "zod";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdkvalidationerror.js";

export type RestoreResourcesByAssetIDsGlobals = {
  /**
   * The cloud name of your product environment.
   */
  cloudName?: string | undefined;
};

export type RestoreResourcesByAssetIDsRequest = {
  /**
   * The unique and immutable asset IDs of backed up assets to restore.
   */
  assetIds: Array<string>;
  /**
   * The version of each asset to restore. Must match length of asset_ids if provided.
   */
  versions?: Array<string> | undefined;
  /**
   * The URL that will receive notification when restore is complete.
   */
  notificationUrl?: string | undefined;
};

/** @internal */
export const RestoreResourcesByAssetIDsGlobals$inboundSchema: z.ZodType<
  RestoreResourcesByAssetIDsGlobals,
  z.ZodTypeDef,
  unknown
> = z.object({
  cloud_name: z.string().optional(),
}).transform((v) => {
  return remap$(v, {
    "cloud_name": "cloudName",
  });
});

/** @internal */
export type RestoreResourcesByAssetIDsGlobals$Outbound = {
  cloud_name?: string | undefined;
};

/** @internal */
export const RestoreResourcesByAssetIDsGlobals$outboundSchema: z.ZodType<
  RestoreResourcesByAssetIDsGlobals$Outbound,
  z.ZodTypeDef,
  RestoreResourcesByAssetIDsGlobals
> = z.object({
  cloudName: z.string().optional(),
}).transform((v) => {
  return remap$(v, {
    cloudName: "cloud_name",
  });
});

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace RestoreResourcesByAssetIDsGlobals$ {
  /** @deprecated use `RestoreResourcesByAssetIDsGlobals$inboundSchema` instead. */
  export const inboundSchema = RestoreResourcesByAssetIDsGlobals$inboundSchema;
  /** @deprecated use `RestoreResourcesByAssetIDsGlobals$outboundSchema` instead. */
  export const outboundSchema =
    RestoreResourcesByAssetIDsGlobals$outboundSchema;
  /** @deprecated use `RestoreResourcesByAssetIDsGlobals$Outbound` instead. */
  export type Outbound = RestoreResourcesByAssetIDsGlobals$Outbound;
}

export function restoreResourcesByAssetIDsGlobalsToJSON(
  restoreResourcesByAssetIDsGlobals: RestoreResourcesByAssetIDsGlobals,
): string {
  return JSON.stringify(
    RestoreResourcesByAssetIDsGlobals$outboundSchema.parse(
      restoreResourcesByAssetIDsGlobals,
    ),
  );
}

export function restoreResourcesByAssetIDsGlobalsFromJSON(
  jsonString: string,
): SafeParseResult<RestoreResourcesByAssetIDsGlobals, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => RestoreResourcesByAssetIDsGlobals$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'RestoreResourcesByAssetIDsGlobals' from JSON`,
  );
}

/** @internal */
export const RestoreResourcesByAssetIDsRequest$inboundSchema: z.ZodType<
  RestoreResourcesByAssetIDsRequest,
  z.ZodTypeDef,
  unknown
> = z.object({
  asset_ids: z.array(z.string()),
  versions: z.array(z.string()).optional(),
  notification_url: z.string().optional(),
}).transform((v) => {
  return remap$(v, {
    "asset_ids": "assetIds",
    "notification_url": "notificationUrl",
  });
});

/** @internal */
export type RestoreResourcesByAssetIDsRequest$Outbound = {
  asset_ids: Array<string>;
  versions?: Array<string> | undefined;
  notification_url?: string | undefined;
};

/** @internal */
export const RestoreResourcesByAssetIDsRequest$outboundSchema: z.ZodType<
  RestoreResourcesByAssetIDsRequest$Outbound,
  z.ZodTypeDef,
  RestoreResourcesByAssetIDsRequest
> = z.object({
  assetIds: z.array(z.string()),
  versions: z.array(z.string()).optional(),
  notificationUrl: z.string().optional(),
}).transform((v) => {
  return remap$(v, {
    assetIds: "asset_ids",
    notificationUrl: "notification_url",
  });
});

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace RestoreResourcesByAssetIDsRequest$ {
  /** @deprecated use `RestoreResourcesByAssetIDsRequest$inboundSchema` instead. */
  export const inboundSchema = RestoreResourcesByAssetIDsRequest$inboundSchema;
  /** @deprecated use `RestoreResourcesByAssetIDsRequest$outboundSchema` instead. */
  export const outboundSchema =
    RestoreResourcesByAssetIDsRequest$outboundSchema;
  /** @deprecated use `RestoreResourcesByAssetIDsRequest$Outbound` instead. */
  export type Outbound = RestoreResourcesByAssetIDsRequest$Outbound;
}

export function restoreResourcesByAssetIDsRequestToJSON(
  restoreResourcesByAssetIDsRequest: RestoreResourcesByAssetIDsRequest,
): string {
  return JSON.stringify(
    RestoreResourcesByAssetIDsRequest$outboundSchema.parse(
      restoreResourcesByAssetIDsRequest,
    ),
  );
}

export function restoreResourcesByAssetIDsRequestFromJSON(
  jsonString: string,
): SafeParseResult<RestoreResourcesByAssetIDsRequest, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => RestoreResourcesByAssetIDsRequest$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'RestoreResourcesByAssetIDsRequest' from JSON`,
  );
}
