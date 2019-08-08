import React, { memo, useEffect } from "react";
import { useHttp } from "../hooks/http";
import Summary from "./Summary";

export default memo(({ selectedChar }) => {
  const [isLoading, fetchedData] = useHttp(
    "https://swapi.co/api/people/" + selectedChar,
    [selectedChar]
  );

  let loadedCharacter = fetchedData
    ? {
        id: selectedChar,
        name: fetchedData.name,
        height: fetchedData.height,
        colors: {
          hair: fetchedData.hair_color,
          skin: fetchedData.skin_color
        },
        gender: fetchedData.gender,
        movieCount: fetchedData.films.length
      }
    : null;

  useEffect(() => {
    return () => {
      console.log("component did unmount ... ");
    };
  }, []);

  let content = <p>Loading Character...</p>;

  if (!isLoading && loadedCharacter) {
    content = (
      <Summary
        name={loadedCharacter.name}
        gender={loadedCharacter.gender}
        height={loadedCharacter.height}
        hairColor={loadedCharacter.colors.hair}
        skinColor={loadedCharacter.colors.skin}
        movieCount={loadedCharacter.movieCount}
      />
    );
  } else if (!isLoading && !loadedCharacter) {
    content = <p>Failed to fetch character.</p>;
  }
  return content;
});
