import "./portfolio.scss";

export default function Portfolio() {

  const arr = [0, 1, 2, 3]

  function tap(e){
      for( let i = 0; i < e.currentTarget.parentNode.childNodes.length; i++){
        console.log(e.currentTarget.id)
        e.currentTarget.parentNode.childNodes[i].classList.remove('active')
        e.currentTarget.classList.add('active');
        document.querySelectorAll('.con')[i].classList.remove('active')
        document.querySelectorAll('.con')[e.currentTarget.id].classList.add('active')
      }
  }

  return (
    <div className="portfolio" id="portfolio">
      <h1>Information</h1>
      <ul>
       <li onClick={(e)=>{tap(e)}} id={arr[0]}>기술</li>
       <li onClick={(e)=>{tap(e)}} id={arr[1]}>학력&경력</li>
       <li onClick={(e)=>{tap(e)}} id={arr[2]}>자격&어학</li>
       <li onClick={(e)=>{tap(e)}} id={arr[3]}>수상</li>
      </ul>

        <div className="con active">
        <p className="toolText">자주 사용하고 있어요</p>
          <div className="item">
            <img src="/img/react.png"></img>
            <img src="/img/js.png"></img>
            <img src="/img/html.png"></img>
            <img src="/img/css.png"></img>
            <img src="/img/git.png"></img>
            <img src="/img/boot.png"></img>
          </div>
          <hr></hr>
          <p className="toolText">사용 경험이 있어요</p>
          <div className="item">
            <img src="/img/figma.png"></img>
            <img src="/img/spring.png"></img>
            <img src="/img/mysql.png"></img>
            <img src="/img/maria.png"></img>
          </div>
        </div>
        <div className="con">
          <div className="item">
            학력
          </div>
          <p className="text">안양대학교 중국어과 졸업 3.75/4.5 (14.03~19.08)<br></br>
          구로하이미디어아카데미 수료(22.05~22.11)</p>
          <hr></hr>
          <div className="item">
            경력
          </div>
           <p className="text">수출입업무 (19.12~21.02)</p>
          <div>
          </div>
        </div>
        <div className="con">
          <div className="item">
          정보처리기사 - 필기
          </div>
          <hr></hr>
          <div className="item">
          중국어 - HSK 5급 (2018.10)<br></br>
          HSKK중급회화 (2018.10)<br></br>
         
          </div>
          <hr></hr>
          <div className="item">
          영어 - TOEIC 730점 (2019.10)<br></br>
          
          </div>
          <hr></hr>
          <div className="item">
          한자자격시험 2급 (2019.05)
          </div>
        </div>
        <div className="con">
          <p className="prizeText">구로하이미디어아카데미 최우수 학생 선발</p>
          <div className="item">
           <img className="prize" src="/img/prize.jpg"></img>
          </div>
        </div>

    </div>
  );
}
