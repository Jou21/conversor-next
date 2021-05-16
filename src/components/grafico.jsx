import React from "react";
import ReactDOM from "react-dom";

export default class Grafico extends React.PureComponent {
  constructor(props) {
    super(props);
    this._ref = React.createRef();
  }
  componentDidMount() {
    /* const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js";
    script.async = true;
    script.innerHTML = this._ref.current.appendChild(script); */

    const scriptNovo = document.createElement("script");

    scriptNovo.onload = function () {
      new TradingView.widget({
        width: 980,
        height: 610,
        symbol: "NASDAQ:AAPL",
        interval: "D",
        timezone: "Etc/UTC",
        theme: "light",
        style: "1",
        locale: "br",
        toolbar_bg: "#f1f3f6",
        enable_publishing: false,
        allow_symbol_change: true,
        container_id: "tradingview_feb1b",
      });
    };

    scriptNovo.src = "https://s3.tradingview.com/tv.js";
    scriptNovo.async = true;
    scriptNovo.innerHTML = this._ref.current.appendChild(scriptNovo);
  }
  render() {
    return (
      <div className="tradingview-widget-container" ref={this._ref}>
        <div className="tradingview-widget-container__widget"></div>
        <div id="tradingview_feb1b"></div>
        <div class="tradingview-widget-copyright">
          <a
            href="https://br.tradingview.com/symbols/NASDAQ-AAPL/"
            rel="noopener"
            target="_blank"
          >
            <span class="blue-text">Gráfico AAPL</span>
          </a>
          por TradingView
        </div>
      </div>
    );
  }
}
