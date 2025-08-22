import React from "react";
import { useDispatch } from "react-redux";
import { Url } from "./slices/UrlSlice";

const config = null;
const dispatch = useDispatch();
export async function loadConfig() {
  if (!config) {
    const response = await fetch("/configuration.json");
    config = await response.json();
    dispatch(Url(config.API_URL));
  }
  return config;
}