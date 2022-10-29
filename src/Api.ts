import axios, { AxiosError } from "axios";
import check from "check-types";
import type { PLATFORM } from "./typings/Api";
import type { PlayerResponse } from "./typings/Player";
import type { Season } from "./typings/Season";

export default class Api {
  private readonly PUBG_API_URL = "https://api.pubg.com/shards";
  private readonly apiKey: string;
  private readonly platform: PLATFORM;

  constructor(apiKey: string, platform: PLATFORM = "steam") {
    this.apiKey = apiKey;
    this.platform = platform;
  }

  /**
   * Get info about players. Automatically detects if searching by 'name' or by 'id'.
   * @param {string} nameOrId name like: 'MisterZack' or id like: 'account.93586f3af76b42628858d3f51fc08d08'
   */
  async getPlayers(nameOrId: string | string[]): Promise<PlayerResponse> {
    try {
      if (check.null(nameOrId)) throw new Error("An argument for 'nameOrId' was not provided.");
      if (check.not.string(nameOrId) && check.not.array(nameOrId)) throw new Error("An argument for 'nameOrId' must be a 'string | string[]'.");
      return (
        await axios.get(
          `${this.PUBG_API_URL}/${this.platform}/players?filter[${
            (check.string(nameOrId) && nameOrId.length <= 14) || (check.array(nameOrId) && nameOrId.map(id => id.length <= 14)) ? "playerNames" : "playerIds"
          }]=${String(nameOrId)}`,
          {
            headers: {
              Authorization: `Bearer ${this.apiKey}`,
              Accept: "application/vnd.api+json"
            }
          }
        )
      ).data;
    } catch (error: any) {
      if (error instanceof AxiosError) return error.response?.data;
      if (error instanceof Error) throw error;
      return { errors: [{ title: "Unknown" }] };
    }
  }

  /**
   * Get info about seasons.
   */
  async getSeasons(): Promise<Season> {
    try {
      return (
        await axios.get(`${this.PUBG_API_URL}/${this.platform}/seasons`, {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            Accept: "application/vnd.api+json"
          }
        })
      ).data;
    } catch (error: any) {
      if (error instanceof AxiosError) return error.response?.data;
      if (error instanceof Error) throw error;
      return { errors: [{ title: "Unknown" }] };
    }
  }
}
