import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Spinner } from "vtex.styleguide";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

import styles from "./styles.module.css";

export default function SliderComponent() {
  const [combos, setCombos] = useState([]);
  const [loading, setLoading] = useState(true);

  const sliderRef = useRef(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = axios.get(
          `https://fyzduqlrdrwd7xcsan75qflehy0anpmj.lambda-url.us-east-1.on.aws/`
        );
        await response.then(({ data }) => {
          console.log("data", data);
          setCombos(data);
        });
        setLoading(false);
      } catch (error) {
        console.error(`erro aqui ${error}`);
      }
    };

    getData();
  }, []);

  if (loading) {
    return (
      <div className={styles.spinnerContainer}>
        <Spinner />
      </div>
    );
  }

  if (!combos || !combos.length) return null;

  const handleChevronRightClick = () => {
    console.log(sliderRef.current.offsetWidth);
    sliderRef.current.scrollLeft += sliderRef.current.offsetWidth;
  };

  const handleChevronLeftClick = () => {
    console.log(sliderRef.current.offsetWidth);
    sliderRef.current.scrollLeft -= sliderRef.current.offsetWidth;
  };

  return (
    <div className={styles.Container}>
      <div className={styles.Chevron} onClick={handleChevronLeftClick}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </div>
      <div className={styles.Slider} ref={sliderRef}>
        {combos.map((comboItem) => {
          return (
            <div key={comboItem.id} className={styles.SliderItem}>
              <div>
                <img
                  src={comboItem.products[0].skus[0].image}
                  alt={comboItem.alt}
                />
                <h2 className={styles.SliderItemTitle}>
                  {comboItem.products[0].name}
                </h2>
                <h3 className={styles.SliderItemPrice}>
                  {` ${comboItem.products[0].skus[0].listPriceFormated} `}
                  <span>só hoje!</span>
                </h3>
              </div>
              <div className={styles.PlusContainer}>
                <FontAwesomeIcon icon={faPlus} />
              </div>
              <div>
                <img
                  src={comboItem.products[1].skus[0].image}
                  alt={comboItem.alt}
                />
                <h2 className={styles.SliderItemTitle}>
                  {comboItem.products[1].name}
                </h2>
                <h3 className={styles.SliderItemPrice}>
                  {` ${comboItem.products[1].skus[0].listPriceFormated} `}
                  <span>só hoje!</span>
                </h3>
              </div>
              <div className={styles.SliderButtonContainer}>
                <a
                  href={`https://speedwarehouse--speedware.myvtex.com/checkout/cart/add?sc=1&sku=${comboItem.products[0].skus[0].sku}&qty=1&seller=1&sku=${comboItem.products[1].skus[0].sku}&qty=1&seller=1`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <button className={styles.SliderButton}>
                    Adicionar ao carrinho
                  </button>
                </a>
              </div>
            </div>
          );
        })}
      </div>
      <div className={styles.Chevron} onClick={handleChevronRightClick}>
        <FontAwesomeIcon icon={faChevronRight} />
      </div>
    </div>
  );
}
