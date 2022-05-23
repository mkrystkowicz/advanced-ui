import React, { useState, useEffect, useRef, useCallback } from "react";
import data from "./beers.json";
import * as paginate from "paginatejson";
import styled, { keyframes } from "styled-components";

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

// Loader

const loaderAppear = keyframes`
   from {
     opacity: 0;
   }
  to {
    opacity: 100%;
  }
`;

const LoaderWrapper = styled.div`
  opacity: 0;
  animation: 0.2s ease-in forwards 1 ${loaderAppear};
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 9999;
  background-image: linear-gradient(0deg, white, rgba(255, 255, 255, 0.5));
  width: 100%;
  height: 400px;
  display: flex;
  flex-direction: column;
  padding: 0;
  align-items: center;
  p {
    margin: 20px 0 0 0;
    font-size: 45px;
    font-weight: bold;
    color: black;
    text-shadow: 3px 3px 0px rgba(254, 183, 16, 0.8);
  }
`;

const bubbling = keyframes`
  0% {
    opacity: 0;
    transform: translateY(100%);
  }
  50% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(-100%);
  }
`;

const Bubbles = styled.div`
  width: 150px;
  height: 150px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Bubble = styled.div`
  align-self: flex-end;
  width: 20px;
  height: 20px;
  border: 2px solid rgba(254, 183, 16, 0.8);
  background-color: rgba(254, 183, 16, 0.8);
  border-radius: 50px;
  opacity: 0;
  animation: linear infinite forwards ${bubbling};
  animation-delay: ${() => {
    return `${Math.ceil(Math.random() * (1 - 0.25 + 1) + 0.25)}s`;
  }};
  animation-duration: ${() => {
    return `${Math.ceil(Math.random() * (3 - 0.25 + 1) + 0.25)}s`;
  }};
`;

const Loader = () => (
  <LoaderWrapper>
    <Bubbles>
      <Bubble />
      <Bubble />
      <Bubble />
      <Bubble />
      <Bubble />
    </Bubbles>
    <p>More beers coming in...</p>
  </LoaderWrapper>
);

// End loader

const getShortName = (name) => {
  const words = name.split(" ");
  return `${words[0]} ${words[1]}...`;
};

const Beer = React.forwardRef(
  ({ data: { image_url: imageUrl, name, abv } }, ref) => {
    return (
      <BeerWrapper ref={ref}>
        <img src={imageUrl} alt={name} />
        <div>
          <p>{name.length > 12 ? getShortName(name) : name}</p>
          <p>ABV: {abv}%</p>
        </div>
      </BeerWrapper>
    );
  }
);

const fetchBeers = (page = 1) => {
  const { items, ...pageInfo } = paginate.paginate(data, page, 6);
  return new Promise((resolve) =>
    setTimeout(() => resolve({ items, page: pageInfo }), 2500)
  );
};

const InfiniteScroll = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(null);
  const [items, setItems] = useState([]);
  const lastItemRef = useRef(null);
  const observer = useRef(null);

  useEffect(() => {
    fetchBeers()
      .then(({ items, page }) => {
        setItems([...items]);
        setPage(page);
      })
      .catch((err) => console.log(err));
  }, []);

  const getMoreBeers = useCallback(() => {
    if (!page || !page.next || isLoading) return;
    setIsLoading(true);

    fetchBeers(page.next).then((res) => {
      setItems((i) => [...i, ...res.items]);
      setPage(res.page);
      setIsLoading(false);
    });
  }, [page, isLoading]);

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          getMoreBeers();
        }
      },
      {
        root: document,
        threshold: 1,
      }
    );

    if (lastItemRef.current) {
      observer.current.observe(lastItemRef.current);
    }

    return () => {
      observer.current.disconnect();
    };
  }, [getMoreBeers]);

  return (
    <Wrapper>
      {items.map((item, i) => {
        if (i === items.length - 1) {
          return <Beer key={item.id} data={item} ref={lastItemRef} />;
        }
        return <Beer key={item.id} data={item} ref={lastItemRef} />;
      })}
      {isLoading && <Loader />}
    </Wrapper>
  );
};

export default InfiniteScroll;

