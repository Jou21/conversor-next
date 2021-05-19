import React from "react";
import Coins from "./Coins";

export default function CoinsList({ filteredCoins }) {
  return (
    <div>
      {filteredCoins.map((coin, index) => {
        return (
          <Coins
            key={index}
            name={coin.name}
            id={coin.id}
            price={coin.current_price}
            symbol={coin.symbol}
            marketcap={coin.market_cap}
            volume={coin.total_volume}
            image={coin.image}
            priceChange={coin.price_change_percentage_24h}
            parDeMoeda={coin.parDeMoeda}
          />
        );
      })}
    </div>
  );
}
