import { rating } from "./rating";

export interface episode {
  title?: string;
  episode_id?: number;
  opening_crawl?: string;
  director?: string;
  producer?: string;
  release_date?: string;
  characters?: string[];
  planets?: string[];
  starships?: string[];
  vehicles?: string[];
  species?: string[];
  created?: string;
  edited?: string;
  url?: string;
  ratings?: rating[];
  average_rating?: number;
  poster?: string;
}
