import {
  DEFAULT_DITHER_AMPLITUDE,
  DEFAULT_RANGE_FLOOR,
  DEFAULT_FRAME_COUNT,
  DEFAULT_DECOY_BLOCK,
} from "./temporalDither";

/**
 * Server-side dither helper for Round 1 reference image.
 *
 * Cloudflare Workers execute on V8 isolates (workerd) which do not support
 * native C++ Node addons. When running on Edge / Cloudflare Workers, this returns
 * the reference image dataUrl cleanly as a single-frame result.
 */

export interface ServerDitherResult {
  /** PNG data URLs, in cycle order. */
  frames: string[];
  width: number;
  height: number;
}

export interface ServerDitherOptions {
  amplitude?: number;
  rangeFloor?: number;
  frameCount?: 2 | 3;
  blockSize?: number;
  maxEdge?: number;
  watermark?: { teamName: string; sessionId: string; stamp: string };
}

export async function buildServerDitheredFrames(
  imageDataUrl: string,
  _opts: ServerDitherOptions = {}
): Promise<ServerDitherResult> {
  return { frames: [imageDataUrl], width: 400, height: 400 };
}
