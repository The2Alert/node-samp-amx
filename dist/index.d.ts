export type Value = number | string | number[];

export interface NativeResult extends Array<Value> {
    retval: number;
}

export type PublicCallback = (...params: Value[]) => number | void;

export interface PublicListener {
    paramTypes: string;
    callback: PublicCallback;
}

export type PublicEvents = Record<string, PublicListener[]>;

/**
 * Call native function.
 * @param name Native name.
 * @param paramTypes Types of parameters.
 * 
 * Types:
 * 
 * `i` - Integer.
 * 
 * `f` - Float.
 * 
 * `s` - String.
 * 
 * `a` - Array of integers.
 * 
 * `v` - Array of floats.
 * 
 * `I` - Reference to integer.
 * 
 * `F` - Reference to float.
 * 
 * `S` - Reference to string.
 * 
 * `A` - Reference to array of integers.
 * 
 * `V` - Reference to array of floats.
 * 
 * @param params Parameters.
 * @return Return value and referenced parameters.
 * @example
 * amx.callNative("SendClientMessage", "iis", playerid, 0xaeeb34AA, "Hello, world!");
 * @example
 * const [x, y, z] = amx.callNative("GetPlayerPos", "iFFF", playerid);
 */
export function callNative(name: string, paramTypes?: string, ...params: Value[]): NativeResult;

/**
 * Similar to the `callNative` function, except that float is returned.
 * @param name Native name.
 * @param paramTypes Types of parameters.
 * @param params Parameters.
 * @return Return value and referenced parameters.
 */
export function callNativeInFloat(name: string, paramTypes?: string, ...params: Value[]): NativeResult;

/**
 * Register public function listener.
 * @param name Public name.
 * @param callback Callback.
 * @return Return listener.
 * @example
 * amx.onPublicCall("OnGameModeInit", () => {
 *     console.log("Hello, world!");
 * });
 */
export function onPublicCall(name: string, callback: PublicCallback): PublicListener;

/**
 * Register public function listener.
 * @param name Public name.
 * @param paramTypes Types of parameters.
 * 
 * Types:
 * 
 * `i` - Integer.
 * 
 * `f` - Float.
 * 
 * `s` - String.
 * 
 * `a` - Array of integers.
 * 
 * `v` - Array of floats.
 * 
 * @param callback Callback.
 * @return Return listener.
 * @example
 * amx.onPublicCall("OnPlayerText", "is", (playerid, text) => {
 *     amx.callNative("SendClientMessage", "iis", playerid, 0x71f5b9AA, `Text: ${text}.`);
 * });
 */
export function onPublicCall(name: string, paramTypes: string, callback: PublicCallback): PublicListener;

/**
 * Remove public function listeners.
 * @param name Public name.
 * @return Return whether deleted.
 */
export function removePublic(name: string): boolean;

export const publicEvents: PublicEvents;