/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import { usageGetUsage } from "../funcs/usageGetUsage.js";
import { ClientSDK, RequestOptions } from "../lib/sdks.js";
import * as components from "../models/components/index.js";
import { unwrapAsync } from "../types/fp.js";
import { RFCDate } from "../types/rfcdate.js";

export class Usage extends ClientSDK {
  /**
   * Retrieves comprehensive usage metrics and account statistics
   *
   * @remarks
   * A report on the status of product environment usage, including storage, credits, bandwidth, requests, number of resources, and add-on usage.
   */
  async getUsage(
    date?: RFCDate | undefined,
    options?: RequestOptions,
  ): Promise<components.UsageResponse> {
    return unwrapAsync(usageGetUsage(
      this,
      date,
      options,
    ));
  }
}
