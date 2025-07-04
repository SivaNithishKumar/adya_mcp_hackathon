/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import * as z from "zod";
import { ClosedEnum } from "../../types/enums.js";

/**
 * The type the of asset.
 */
export const ResourceTypeParameter = {
  Image: "image",
  Video: "video",
  Raw: "raw",
} as const;
/**
 * The type the of asset.
 */
export type ResourceTypeParameter = ClosedEnum<typeof ResourceTypeParameter>;

/** @internal */
export const ResourceTypeParameter$inboundSchema: z.ZodNativeEnum<
  typeof ResourceTypeParameter
> = z.nativeEnum(ResourceTypeParameter);

/** @internal */
export const ResourceTypeParameter$outboundSchema: z.ZodNativeEnum<
  typeof ResourceTypeParameter
> = ResourceTypeParameter$inboundSchema;

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace ResourceTypeParameter$ {
  /** @deprecated use `ResourceTypeParameter$inboundSchema` instead. */
  export const inboundSchema = ResourceTypeParameter$inboundSchema;
  /** @deprecated use `ResourceTypeParameter$outboundSchema` instead. */
  export const outboundSchema = ResourceTypeParameter$outboundSchema;
}
