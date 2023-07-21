import { useEffect, useState } from "react";
import axios from "axios";
import { HomeContainer } from "@/styles/styles";

export default function Home() {
  const [list, setList] = useState([]);

  const fetchListData = () => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/`)
      .then((response) => {
        const sortedArray = [...response.data.results]

        sortedArray.sort((a, b) => {
          return a.name.localeCompare(b.name);
        })
        
      setList(sortedArray);
    })}


  useEffect(() => {
    fetchListData();
  }, []);

  return (
    <>
      <h1>POKE API</h1>
      <hr />
      {list.map((item) => (
        <Pokemon key={item.name} data={item} />
      ))}
    </>
  );
}

const Pokemon = ({ data }) => {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    axios.get(data.url).then((response) => setDetails(response.data));
  }, []);

  if (details === null) {
    return <div>-</div>;
  }

  return (
    <HomeContainer>
      <div>
       <img src={details.sprites.front_default} />
        <span>
          <h1>{details.name}</h1> 
          <p> EXP {details.base_experience}</p>
        </span>
      </div>
    </HomeContainer>
  );
};
