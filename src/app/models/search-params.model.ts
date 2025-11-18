import { Recipe } from "./recipe.model";

export interface RecipesParams {
  search?: string;
  tag?: string;
  limit: number;
  skip: number;
}

export interface RecipesListResponse {
  recipes: Recipe[];
  total: number;
  skip: number;
  limit: number;
}

export interface RecipesSearchResponse {
  recipes: Recipe[];
  total: number;
}

export type RecipesResponse = RecipesListResponse | RecipesSearchResponse;