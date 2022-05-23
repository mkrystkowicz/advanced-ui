import React, { useState, useEffect, useRef, useCallback } from "react";
import data from "./beers.json";
import * as paginate from "paginatejson";
import styled from "styled-components";

// Styles

const Wrapper = styled.div`
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(2, 400px);
  grid-template-rows: auto;
  grid-gap: 50px;
`;

const BeerWrapper = styled.div`
  border: 10px solid black;
  width: 100%;
  position: relative;
  padding: 20px 0 20px 30px;

  img {
    height: 320px;
    object-fit: contain;
  }

  div {
    position: absolute;
    background-color: #ffd121;
    width: 100%;
    left: 0;
    bottom: 10%;
    font-weight: bold;
    text-align: right;
    padding-right: 15px;
    z-index: -1;
  }
`;

// End-styles

const getShortName = (name) => {
  const words = name.split(" ");
  return `${words[0]} ${words[1]}...`;
};

const Beer = ({ data: { image_url: imageUrl, name, abv } }) => {
  return (
    <BeerWrapper>
      <img src={imageUrl} alt={name} />
      <div>
        <p>{name.length > 12 ? getShortName(name) : name}</p>
        <p>ABV: {abv}%</p>
      </div>
    </BeerWrapper>
  );
};

const fetchBeers = (page = 1) => {
  const { items, ...pageInfo } = paginate.paginate(data, page, 6);
  return new Promise((resolve) =>
    setTimeout(() => resolve({ items, page: pageInfo }), 500)
  );
};

const InfiniteScroll = () => {
  const [page, setPage] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchBeers()
      .then(({ items, page }) => {
        setItems([...items]);
        setPage(page);
      })
      .catch((err) => console.log(err));
  }, []);

  const getMoteBeers = () => {
    fetchBeers(page.next).then((res) => {
      setItems([...items, ...res.items]);
      setPage(res.page);
    });
  };

  return (
    <>
      <button onClick={getMoteBeers}>Load more</button>
      <Wrapper>
        {items.map((item) => (
          <Beer key={item.id} data={item} />
        ))}
      </Wrapper>
    </>
  );
};

export default InfiniteScroll;

