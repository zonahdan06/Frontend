import "./MyPage.css";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
const MyPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  console.log("state", location.state);
  const onClickHandler = () => {
    axios.get("/api/users/logout").then(response => {
      console.log(response.data);
      if (response.data.success) {
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
              src={require("../img/user.png")}
            />
            <p className="user_id2"> 아이디 : {id}</p>
            <button className="edit">수정</button>
            <p className="logout" onClick={onClickHandler}>
              로그아웃
            </p>
            <p className="withdraw">회원탈퇴</p>
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
