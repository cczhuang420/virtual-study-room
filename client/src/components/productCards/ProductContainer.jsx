import { Box } from "@mui/material";
import BackgroundProductCard from "./BackgroundProductCard.jsx";
import ProfileProductCard from "./ProfileProductCard.jsx";
import MusicProductCard from "./MusicProductCard.jsx";
import React from "react";
import { useFetch } from "../../hooks/useFetch.js";

// TODO: add real product later
const ProductContainer = ({ value }) => {
  // const assetList =
  //   value === 0
  //     ? useFetch(`products?type=background`, {})
  //     : value === 1
  //     ? useFetch(`products?type=profile-image`, {})
  //     : useFetch(`products?type=music`, {});
  //
  // console.log(assetList);

  const url =
    value === 0
      ? `products?type=background`
      : value === 1
      ? `products?type=profile-image`
      : `products?type=music`;

  const { isLoading, data } = useFetch(url, {});

  return (
    <div>
      {value === 0 ? (
        <Box className="flex flex-row flex-wrap space-x-10 space-y-10">
          <div></div>
          {isLoading
            ? "Loading..."
            : data.map((it, index) => (
                <BackgroundProductCard
                  key={index}
                  value={it.price}
                  productName={it.name}
                  image={`/src/assets/backgrounds/${it.url}`}
                />
              ))}
        </Box>
      ) : value === 1 ? (
        <Box className="flex flex-row flex-wrap space-x-10 space-y-10">
          <div></div>
          {isLoading
            ? "Loading..."
            : data.map((it, index) => (
                <ProfileProductCard
                  key={index}
                  value={it.price}
                  productName={it.name}
                  image={`/src/assets/profiles/${it.url}`}
                />
              ))}
        </Box>
      ) : value === 2 ? (
        <Box className="flex flex-row flex-wrap space-x-10 space-y-10">
          <div></div>
          <MusicProductCard
            value="200"
            productName="Happy Birthday"
            artist="Frank jI"
          />
          <MusicProductCard
            value="200"
            productName="世上只有妈妈好"
            artist="Frank jI"
          />
          <MusicProductCard
            value="200"
            productName="Baa Baa Black Sheep"
            artist="Frank jI"
          />
          <MusicProductCard
            value="200"
            productName="哆啦a梦"
            artist="Frank jI"
          />
        </Box>
      ) : (
        <> </>
      )}
    </div>
  );
};

export default ProductContainer;
