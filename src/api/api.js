import axios from "axios"

export const getPokemonData = (id=1) => {
    const data = axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
    return data;
}

export const getAllPokemon = (offset=0) => {
    const data = axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=20`);
    return data;
}

export const getPokemonType = (id=1) => {
    const data = axios.get(`https://pokeapi.co/api/v2/type/${id}`);
    return data;
}

// export const getPokemonPhoto = (id=1) => {
//     const data = axios.get(`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${id}.svg`);
//     return data;
// }