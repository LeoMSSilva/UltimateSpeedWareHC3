import React, { useState, useEffect, useRef, Fragment } from "react";
import axios from "axios";
import { Spinner } from "vtex.styleguide";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

import styles from "../styles/css/sliderComponent.css";

const urlBasePDP = "https://speedwarehouse--speedware.myvtex.com/";

export default function SliderComponent() {
  const [combos, setCombos] = useState(null);
  const [loading, setLoading] = useState(true);
  const sliderRef = useRef(null);

  useEffect(() => {
    getData();
  }, []);

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

  const handleChevronRightClick = () =>
    (sliderRef.current.scrollLeft += sliderRef.current.offsetWidth);

  const handleChevronLeftClick = () =>
    (sliderRef.current.scrollLeft -= sliderRef.current.offsetWidth);

  return (
    <div className={styles.Container}>
      {loading ? (
        <div className={styles.spinnerContainer}>
          <Spinner />
        </div>
      ) : (
        <Fragment>
          <div className={styles.Chevron} onClick={handleChevronLeftClick}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </div>
          <div className={styles.Slider} ref={sliderRef}>
            {combos.map((comboItem) => (
              <div key={comboItem.id} className={styles.SliderItem}>
                <a href={`${urlBasePDP}${comboItem.products[0].productId}/p`}>
                  <img
                    src={comboItem.products[0].skus[0].image}
                    alt={comboItem.alt}
                  />
                  <h2 className={styles.SliderItemTitle}>
                    {comboItem.products[0].name}
                  </h2>
                  <h3 className={styles.SliderItemPrice}>
                    {`${comboItem.products[0].skus[0].listPriceFormated}`}&nbsp;
                    <span>só hoje!</span>
                  </h3>
                </a>
                <div className={styles.PlusContainer}>
                  <FontAwesomeIcon icon={faPlus} />
                </div>
                <a href={`${urlBasePDP}${comboItem.products[1].productId}/p`}>
                  <img
                    src={comboItem.products[1].skus[0].image}
                    alt={comboItem.alt}
                  />
                  <h2 className={styles.SliderItemTitle}>
                    {comboItem.products[1].name}
                  </h2>
                  <h3 className={styles.SliderItemPrice}>
                    {`${comboItem.products[1].skus[0].listPriceFormated}`}&nbsp;
                    <span>só hoje!</span>
                  </h3>
                </a>
                <div className={styles.SliderButtonContainer}>
                  <a
                    href={`${urlBasePDP}checkout/cart/add?sc=1&sku=${comboItem.products[0].skus[0].sku}&qty=1&seller=1&sku=${comboItem.products[1].skus[0].sku}&qty=1&seller=1`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <button className={styles.SliderButton}>
                      Adicionar ao carrinho
                    </button>
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.Chevron} onClick={handleChevronRightClick}>
            <FontAwesomeIcon icon={faChevronRight} />
          </div>
        </Fragment>
      )}
    </div>
  );
}
