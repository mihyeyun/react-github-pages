
import { useState } from "react";
import { useDrop } from "react-dnd";
import './shopping.scss';
import Picture from "./Picture.js";
import Puzzle from "./Puzzle.js";

function Shopping() {
  const PictureList = [
    {
      id: 1,
      name: "banana",
      count: 1,
      price: 1000,
      photo: "/img/banana.png",
    },
    {
      id: 2,
      name: "cherry",
      count: 1,
      price: 2000,
      photo: "/img/cherry.png",
    },
    {
      id: 3,
      name: "eggplant",
      count: 1,
      price: 1500,
      photo: "/img/eggplant.png",
    },
    {
      id: 4,
      name: "carrot",
      count: 1,
      price: 700,
      photo: "/img/carrot.png",
    },
    {
      id: 5,
      name: "kiwi",
      count: 1,
      price: 5500,
      photo: "/img/kiwi.png",
    },
    {
      id: 6,
      name: "tomato",
      count: 1,
      price: 2000,
      photo: "/img/tomato.png",
    },
  ];

  const [board, setBoard] = useState([]);
  const arr = Array();
  const [calc, setCalc] = useState([]);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "image",
    drop: (item) => addImageToBoard(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const addImageToBoard = (id) => {
    let pictureList = PictureList.filter((picture) => id === picture.id);
    if (!arr.includes(id)) {
      arr.push(pictureList[0].id);
      calc.push(pictureList[0]);
      setBoard((board) => [...board, pictureList[0]]);
    } else {
      pictureList[0].count += 1;
    }
  };

  const [modal, setModal] = useState(false);
  const [finalPrice, setFinalPrice] = useState(0);

  function calculation() {
    let result = 0;
    console.log(calc[0].price, calc[0].count);
    calc.map((a, i) => {
      result += calc[i].price * calc[i].count;
      return result;
    });
    setFinalPrice(result);
  }

  const [coupon, setCoupon] = useState(0);
  function couponHandler(data) {
    setCoupon(data);
  }

  let calcPrice = finalPrice - coupon;

  const [showGame, setShowGame] = useState(false);

  var nowZoom = 100; // ????????????
  var maxZoom = 200; // ????????????(500???????????? 5??? ?????????)
  var minZoom = 80; // ????????????
  function zoomIn() {
    if (nowZoom < maxZoom) {
      nowZoom += 0; //25%??? ?????????.
    } else {
      return;
    }
    document.body.style.zoom = nowZoom + "%";
  }

  //?????? ?????????.
  function zoomOut() {
    if (nowZoom > minZoom) {
      nowZoom -= 40; //25%??? ????????????.
    } else {
      return;
    }
    document.body.style.zoom = nowZoom + "%";
  }

  return (
    <div className="wrap">
      <div className="content">
        <h4>
          ????????? ???????????????{" "}
          <span style={{ background: "yellow", fontWeight: "bold" }}>
            ?????????
          </span>
          ????????????
        </h4>
        <div className="Pictures">
          {PictureList.map((picture) => {
            return (
              <>
                <div className="item">
                  <Picture
                    id={picture.id}
                    name={picture.name}
                    count={picture.count}
                    price={picture.price}
                    photo={picture.photo}
                    key={picture.id}
                  />
                  <p className="name">{picture.name}</p>
                  <p className="price">{picture.price}</p>
                </div>
              </>
            );
          })}
        </div>

        <div className="Board" ref={drop}>
          <button
            className="buyBtn"
            onClick={() => {
              setModal(true);
              calculation();
            }}
          >
            BUY
          </button>
          {board.map((picture) => {
            return (
              <>
                <div className="item">
                  <Picture
                    id={picture.id}
                    name={picture.name}
                    count={picture.count}
                    price={picture.price}
                    photo={picture.photo}
                    key={picture.id}
                  />
                  <div className="text">{picture.count}</div>
                </div>
              </>
            );
          })}
          <div style={{ clear: "both" }}></div>
        </div>

        {modal == false ? null : (
          <div className="receipt">
            <div className="white-bg">
              <h3>?????????</h3>
              <p>??? ????????? {finalPrice}????????????.</p>
              <h4>
                <br></br>????????????
              </h4>
              {calc.map((a, i) => {
                return (
                  <>
                    <div>
                      {calc[i].name} {calc[i].count}???
                    </div>
                  </>
                );
              })}
              <p className="cou-text">My Coupon: {coupon}</p>
              <button
                className="btn-pink"
                onClick={() => {
                  setFinalPrice(calcPrice);
                  setCoupon(0);
                }}
              >
                ??????????????????
              </button>

              <p>
                <br></br>?????????????????? ???????????????.
              </p>

              <button
                className="btn-yellow"
                onClick={() => {
                  setShowGame(true);
                  alert("??????????????? ???????????? ???????????????");
                }}
              >
                ?????????????????????
              </button>
              <button
                className="btn-gray"
                onClick={() => {
                  setModal(false);
                }}
              >
                ??????
              </button>
              <div style={{ clear: "both" }}></div>
              {showGame == true ? zoomOut() : zoomIn()}
              {showGame == true ? (
                <div className="bg">
                  <Puzzle
                    couponHandler={couponHandler}
                    setShowGame={setShowGame}
                  ></Puzzle>
                </div>
              ) : null}

              <div className="upDown"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Shopping;
