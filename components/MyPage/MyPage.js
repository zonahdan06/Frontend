import "./MyPage.css";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import cookies from "react-cookies";
const MyPage = () => {
  const navigate = useNavigate();
  //const location = useLocation();
  //const { id } = location.state;
  const Id = cookies.load("Id");
  //console.log("state", location.state);
  const onClickHandler = () => {
    axios.get("/api/users/logout").then(response => {
      console.log(response.data);
      if (response.data.success) {
        cookies.remove("Id");
        navigate("/login");
      } else {
        alert("로그아웃 하는데 실패했습니다.");
      }
    });
  };
  //const navigateState = useNavigate().state;
  //const [userId, setUserId] = useState(navigateState && navigateState.id);
  return (
    <div className="Main">
      <div className="leftBook">
        <div className="header">
          <h1>내 정보</h1>
        </div>

        <div>
          <div className="User_info">
            <img
              className="user_img2"
              alt="user_img"
              src={require("../img/profile.png")}
            />
            <p className="user_id2"> 아이디 : {Id}</p>
            <p className="user_email"> 이메일 : aer561@naver.com</p>
            <p className="logout" onClick={onClickHandler}>
              로그아웃
            </p>
            <p className="withdraw">회원탈퇴</p>
          </div>
          <div className="header">
            <h1 className="load">불러오기</h1>
            <p className="load">동화가 아직 완성되지 않았어요.</p>
          </div>

          <div className="book">
            <img
              className="book_img"
              alt="book"
              src={require("../img/book1.png")}
            />
            <div className="bookTitle">
              <h2>토끼와 거북이</h2>
            </div>
          </div>
          <div className="book">
            <img
              className="book_img"
              alt="book"
              src={require("../img/book1.png")}
            />
            <div className="bookTitle">
              <h2>토끼와 거북이</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="line"></div>
      <div className="rightBook">
        <div className="header2">
          <button className="goMain" onClick={() => navigate(-1)}>
            메인화면
          </button>
        </div>
        <div className="bookSelect"></div>
      </div>
    </div>
  );
};

export default MyPage;
