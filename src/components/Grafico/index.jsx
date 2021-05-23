import React, { useState, useEffect } from "react";

export default function Grafico(props) {
  let url = `https://br.tradingview.com/symbols/${props.simbolo}`;

  const ref = React.useRef(null);

  useEffect(() => {
    let scriptNovo = document.createElement("script");

    scriptNovo.onload = function () {
      new TradingView.widget({
        width: 980,
        height: 610,
        symbol: `${props.simbolo}`,
        interval: "D",
        timezone: "America/Sao_Paulo",
        theme: "light",
        style: "1",
        locale: "br",
        toolbar_bg: "#f1f3f6",
        enable_publishing: false,
        hide_side_toolbar: false,
        allow_symbol_change: true,
        show_popup_button: true,
        popup_width: "1200",
        popup_height: "850",
        container_id: "tradingview_823e3",
      });
    };

    scriptNovo.src = "https://s3.tradingview.com/tv.js";
    scriptNovo.async = true;
    scriptNovo.innerHTML = ref.current.appendChild(scriptNovo);
  }, [url]);

  return (
    <div className="tradingview-widget-container" ref={ref}>
      <div className="tradingview-widget-container__widget"></div>
      <div id="tradingview_823e3"></div>
      <div className="tradingview-widget-copyright">
        powered by
        <a href={url} rel="noopener" target="_blank">
          <span className="blue-text"> TradingView</span>
        </a>
      </div>
    </div>
  );
}

//import ReactDOM from "react-dom";

/* export default class Grafico extends React.PureComponent {
  constructor(props) {
    super(props);
    this._ref = React.createRef();

    this.componentDidMount = this.componentDidMount.bind(this);

    this.state = {
      simbolo: props.simbolo,
    };
  }
  componentDidMount() {
    let { simbolo } = this.state;

    let scriptNovo = document.createElement("script");

    scriptNovo.onload = function () {
      new TradingView.widget({
        width: 980,
        height: 610,
        symbol: `${simbolo}`,
        interval: "D",
        timezone: "America/Sao_Paulo",
        theme: "light",
        style: "1",
        locale: "br",
        toolbar_bg: "#f1f3f6",
        enable_publishing: false,
        hide_side_toolbar: false,
        allow_symbol_change: true,
        show_popup_button: true,
        popup_width: "1200",
        popup_height: "850",
        container_id: "tradingview_823e3",
      });
    };

    scriptNovo.src = "https://s3.tradingview.com/tv.js";
    scriptNovo.async = true;
    scriptNovo.innerHTML = this._ref.current.appendChild(scriptNovo);
  }

  render() {
    const { simbolo } = this.state;

    const url = `https://br.tradingview.com/symbols/${simbolo}`; //${simbolo}/?exchange=BINANCE

    return (
      <div className="tradingview-widget-container" ref={this._ref}>
        <div className="tradingview-widget-container__widget"></div>
        <div id="tradingview_823e3"></div>
        <div className="tradingview-widget-copyright">
          powered by
          <a href={url} rel="noopener" target="_blank">
            <span className="blue-text"> TradingView</span>
          </a>
        </div>
      </div>
    );
  }
} */
