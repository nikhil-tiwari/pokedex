import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { pokemonNames } from "../constants";
import { getPokemonData } from "../api/api";

const Pokemon = () => {
  const location = useLocation();
  const pokemonName = location.state?.pokemonName;
  const [pokemonData, setPokemonData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const pokemonId = pokemonNames[pokemonName];
      const { data } = await getPokemonData(pokemonId);
      console.log("Pokemon Data:", data);
      setPokemonData(data);
      setLoading(false);
    };
    fetchData();
  }, [pokemonName]);

  return (
    <div className="mt-16 w-full flex justify-evenly items-center">
      {loading ? (
        <div className="flex justify-center items-center h-[33rem] w-full">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-t-4 border-t-blue-500 border-gray-200"></div>
        </div>
      ) : (
        <>
          <div className="h-[33rem] w-[35%] rounded-lg flex justify-center items-center">
            <img
              className="h-[70%]"
              draggable={false}
              src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${pokemonNames[pokemonName]}.svg`}
              alt={pokemonName}
            />
          </div>
          <div className="p-4 h-[33rem] w-[55%] bg-neutral-900 rounded-lg flex flex-col justify-start items-start gap-4 overflow-auto">
            <h2 className="capitalize text-2xl text-neutral-200 bg-neutral-800 p-4 rounded-xl">
              <span className="font-semibold">Name: </span>
              {pokemonData?.name}
            </h2>
            <p className="capitalize text-neutral-200 bg-neutral-800 p-4 rounded-xl">
              <span className="font-semibold">Height(decimetres): </span>
              {pokemonData?.height}
            </p>
            <p className="capitalize text-neutral-200 bg-neutral-800 p-4 rounded-xl">
              <span className="font-semibold">Weight(hectograms): </span>
              {pokemonData?.weight}
            </p>
            <p className="capitalize text-neutral-200 bg-neutral-800 p-4 rounded-xl">
              <span className="font-semibold">Base Experience: </span>
              {pokemonData?.base_experience}
            </p>
            <p className="capitalize text-neutral-200 bg-neutral-800 p-4 rounded-xl">
              <span className="font-semibold">
                {pokemonData?.types?.length === 1 ? "Type" : "Types"}:{" "}
              </span>
              {pokemonData?.types.map((value) => value.type.name).join(", ")}
            </p>
            <p className="capitalize text-neutral-200 bg-neutral-800 p-4 rounded-xl">
              <span className="font-semibold">
                {pokemonData?.abilities?.length === 1 ? "Ability" : "Abilities"}:{" "}
              </span>
              {pokemonData?.abilities.map((value) => value.ability.name).join(", ")}
            </p>
            {pokemonData?.stats && (
              <div className="w-full p-4 bg-neutral-800 rounded-xl">
                <h3 className="text-xl text-neutral-200 font-semibold mb-4">Stats</h3>
                <ul className="grid grid-cols-2 gap-4 text-neutral-200">
                  {pokemonData.stats.map((statObj, index) => (
                    <li
                      key={index+1}
                      className="flex justify-between items-center bg-neutral-700 p-2 rounded-xl"
                    >
                      <span className="capitalize">
                        {statObj.stat.name.replace("-", " ")}
                      </span>
                      <span className="font-semibold">{statObj.base_stat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Pokemon;
