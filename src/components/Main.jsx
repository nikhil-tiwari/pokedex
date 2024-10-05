import { CiSearch } from "react-icons/ci";
import { pokemonTypes, pokemonNames } from "../constants/index";
import { useState, useEffect, useRef, useCallback } from "react";
import { getAllPokemon, getPokemonData, getPokemonType } from "../api/api";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const [offset, setOffset] = useState(0);
  const [allPokemons, setAllPokemons] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [error, setError] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [type, setType] = useState("All"); // Changed setTYpe to setType
  const navigate = useNavigate();
  const lastDiv = useRef();
  const isFirstLoad = useRef(true);

  // Fetch Pokémon by type or default if "All"
  const fetchDataByType = useCallback(async () => {
    try {
      if (type === "All") {
        // Fetch all Pokémon
        const { data } = await getAllPokemon(offset);
        setAllPokemons((prevPokemons) => [...prevPokemons, ...data.results]);
      } else {
        // Fetch Pokémon by type
        const typeID = pokemonTypes.find((t) => t.name === type).id;
        const { data } = await getPokemonType(typeID);
        const filteredPokemons = data.pokemon.map((p) => p.pokemon);
        setAllPokemons(filteredPokemons); // Reset the list for specific type
      }
    } catch (error) {
      setError("Failed to fetch Pokémon data.");
    }
  }, [type, offset]);
  
  // Effect to handle the initial load and pagination (when type is "All")
  useEffect(() => {
    if(type === "All" && isFirstLoad.current) {
      fetchDataByType()
      isFirstLoad.current = false;
    }
    else if (type === "All" && offset > 0) {
      fetchDataByType(); // Fetch only if the offset changes for "All"
    }
  }, [offset, fetchDataByType, type]);
  
  // Effect to handle when the type changes
  useEffect(() => {
    if (type !== "All") {
      setOffset(0); // Reset offset to 0
      setAllPokemons([]); // Clear Pokémon list to avoid duplicates
      fetchDataByType(); // Fetch Pokémon of the selected type
    }
  }, [type, fetchDataByType]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && type === "All") {
          setOffset((prevOffset) => prevOffset + 20);
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 1.0,
      }
    );

    if (lastDiv.current) {
      observer.observe(lastDiv.current);
    }

    return () => {
      if (lastDiv.current) {
        observer.unobserve(lastDiv.current);
      }
    };
  }, [lastDiv, type]);

  const handleNavigatePokemon = (name) => {
    navigate(`/pokemon/${pokemonNames[name]}`, {
      state: { pokemonName: name },
    });
  };

  const handleSearch = async () => {
    const normalizedInput = searchInput.toLowerCase().trim();

    if (normalizedInput === "") {
      alert("Please enter the name");
      return;
    }
    const pokemonId = pokemonNames[normalizedInput];

    if (pokemonId) {
      try {
        const { data } = await getPokemonData(pokemonId);
        setSearchInput("");
        setSearchResult(data);
        setError(null);
        setSuggestions([]);
      } catch (error) {
        setSearchInput("");
        setError("No such Pokémon exists.");
        setSearchResult(null);
        setSuggestions([]);
      }
    } else {
      setSearchInput("");
      setError("No such Pokémon exists.");
      setSearchResult(null);
      setSuggestions([]);
    }
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setSearchInput(inputValue);

    if (inputValue) {
      const filteredSuggestions = Object.keys(pokemonNames).filter((pokemonName) =>
        pokemonName.toLowerCase().includes(inputValue.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (name) => {
    setSearchInput(name);
    setSuggestions([]);
  };

  const handleTypeChange = (e) => {
    const selectedType = pokemonTypes.find((t) => t.id === parseInt(e.target.value)).name;
    setType(selectedType);
    setAllPokemons([]); // Reset Pokémon list
    setOffset(0); // Reset offset for "All" type pagination
  };

  return (
    <div className="my-12">
      <div className="flex justify-center gap-2 items-center">
        <div className="flex relative">
          <input
            type="text"
            placeholder="enter pokemon name"
            className="w-96 h-10 p-2 rounded-lg placeholder:font-light placeholder:text-neutral-900 placeholder:font-sans bg-neutral-400"
            value={searchInput}
            onChange={handleInputChange}
          />
          <CiSearch
            className="h-10 text-neutral-900 w-6 absolute right-2 cursor-pointer"
            onClick={handleSearch}
          />
        </div>

        <select
          name="poke-type"
          id="poke-type"
          className="w-96 h-10 p-2 rounded-lg bg-neutral-400 font-sans"
          onChange={handleTypeChange}
        >
          {pokemonTypes.map((type) => (
            <option value={type.id} key={type.id}>
              {type.name}
            </option>
          ))}
        </select>

        <button
          className="bg-neutral-900 text-neutral-200 h-10 px-3 w-20 rounded-lg hover:bg-neutral-800 transition-all duration-500"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      {/* Suggestions Dropdown */}
      {suggestions.length > 0 && (
        <div className="absolute z-10 bg-white border rounded-md mt-1 w-96 shadow-lg">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="p-2 bg-neutral-800 text-neutral-200 hover:bg-neutral-200 hover:text-neutral-800 cursor-pointer"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}

      <div className="p-4 mt-10 h-[100rem] flex flex-wrap justify-center items-center content-start gap-8">
        {searchResult ? (
          <div
            onClick={() => handleNavigatePokemon(searchResult.name)}
            className="h-80 w-60 hover:scale-105 bg-neutral-800 rounded-lg shadow-md flex flex-col cursor-pointer hover:shadow-2xl transition-all duration-300"
          >
            <div className="h-3/4 flex justify-center items-center">
              <img
                className="h-40"
                src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${pokemonNames[searchResult.name]}.svg`}
                alt={`${searchResult.name}`}
              />
            </div>
            <div className="h-1/4 flex justify-center items-center">
              <p className="capitalize text-neutral-200 text-xl">
                {searchResult.name}
              </p>
            </div>
          </div>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          allPokemons.map((value, index) => (
            <div
              key={index + 1}
              onClick={() => handleNavigatePokemon(value.name)}
              className="h-80 w-60 hover:scale-105 bg-neutral-800 rounded-lg shadow-md flex flex-col cursor-pointer hover:shadow-2xl transition-all duration-300"
            >
              <div className="h-3/4 flex justify-center items-center">
                <img
                  className="h-40"
                  src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${pokemonNames[value.name]}.svg`}
                  alt={`${value.name}`}
                />
              </div>
              <div className="h-1/4 flex justify-center items-center">
                <p className="capitalize text-neutral-200 text-xl">
                  {value.name}
                </p>
              </div>
            </div>
          ))
        )}
        <div ref={lastDiv}></div>
      </div>
    </div>
  );
};

export default Main;
