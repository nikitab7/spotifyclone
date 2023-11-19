import { useState, useEffect } from "react";
import getEnv from "./env";

import { getMyTopTracks, getAlbumTracks } from "./apiOptions";

const { ALBUM_ID } = getEnv();

const useSpotifyTracks = (token) => {
  const [tracks, setTracks] = useState(null);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);

  const fetchMoreTracks = async () => {
    try {
      const newTracks = await getMyTopTracks(token, offset);
      setTracks((prevTracks) =>
        prevTracks ? [...prevTracks, ...newTracks] : newTracks || []
      );

      setOffset((prevOffset) => prevOffset + 20);
    } catch (error) {
      console.error("Error fetching more tracks:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchTracks = async () => {
      if (token != null && !loading) {
        setLoading(true);
        await fetchMoreTracks();
      }
    };

    fetchTracks();
  }, [token, offset, loading]);

  return { tracks, loading, fetchMoreTracks };
};

export default useSpotifyTracks;
