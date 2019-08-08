import React, { useState, useEffect, memo } from "react";

import Summary from "./Summary";

export default memo(({ selectedChar }) => {
  //state = { loadedCharacter: {}, isLoading: false };
  const [loadedCharacter, setLoadedCharacter] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = () => {
    console.log(
      "Sending Http request for new character with id " + selectedChar
    );
    setIsLoading(true);
    fetch("https://swapi.co/api/people/" + selectedChar)
      .then(response => {
        if (!response.ok) {
          throw new Error("Could not fetch person!");
        }
        return response.json();
      })
      .then(charData => {
        const loadedCharacter = {
          id: selectedChar,
          name: charData.name,
          height: charData.height,
          colors: {
            hair: charData.hair_color,
            skin: charData.skin_color
          },
          gender: charData.gender,
          movieCount: charData.films.length
        };

        setIsLoading(false);
        setLoadedCharacter(loadedCharacter);
      })
      .catch(err => {
        setIsLoading(false);
        console.log(err);
      });
  };

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log('shouldComponentUpdate');
  //   return (
  //     nextProps.selectedChar !== this.props.selectedChar ||
  //     nextState.loadedCharacter.id !== this.state.loadedCharacter.id ||
  //     nextState.isLoading !== this.state.isLoading
  //   );
  // }

  console.log("Rendering ... ");

  // componentDidUpdate(prevProps) {
  //   console.log('Component did update');
  //   if (prevProps.selectedChar !== this.props.selectedChar) {
  //     this.fetchData();
  //   }
  // }

  // componentDidMount() {
  //   this.fetchData();
  // }
  // useEffect(() => {
  //   fetchData();
  // }, [])
  useEffect(() => {
    fetchData();
    return () => {
      console.log("cleaning up ... ");
    };
  }, [selectedChar]);

  // componentWillUnmount() {
  //   console.log('Too soon...');
  // }
  useEffect(() => {
    return () => {
      console.log("component did unmount ... ");
    };
  }, []);

  let content = <p>Loading Character...</p>;

  if (!isLoading && loadedCharacter.id) {
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
  } else if (!isLoading && !loadedCharacter.id) {
    content = <p>Failed to fetch character.</p>;
  }
  return content;
});
